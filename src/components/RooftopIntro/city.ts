import * as THREE from 'three'

// theme.css palette
const VIOLET = '#9d4edd'
const MINT = '#00f5d4'
const MAGENTA = '#f72585'

// ponytail: seeded PRNG so the skyline is identical every visit
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function windowTexture(rand: () => number) {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#0d0a18'
  ctx.fillRect(0, 0, 128, 128)
  const colors = [VIOLET, MINT, MAGENTA, '#ffd166']
  for (let y = 2; y < 128; y += 5) {
    for (let x = 2; x < 128; x += 4) {
      if (rand() < 0.3) {
        ctx.fillStyle = colors[Math.floor(rand() * colors.length)]
        ctx.globalAlpha = 0.4 + rand() * 0.6
        ctx.fillRect(x, y, 2, 3)
      }
    }
  }
  ctx.globalAlpha = 1
  const tex = new THREE.CanvasTexture(c)
  tex.magFilter = THREE.NearestFilter
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  return tex
}

function glowSprite(color: string, size: number) {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(64, 64, 8, 64, 64, 64)
  g.addColorStop(0, color)
  g.addColorStop(0.35, color + '66')
  g.addColorStop(1, 'transparent')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  const mat = new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(c),
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  const sprite = new THREE.Sprite(mat)
  sprite.scale.setScalar(size)
  return sprite
}

export interface City {
  group: THREE.Group
  figure: THREE.Object3D
  particles: THREE.Points
  beaconMat: THREE.PointsMaterial
}

export function buildCity(small: boolean): City {
  const rand = mulberry32(20260718)
  const group = new THREE.Group()

  // --- background buildings: one InstancedMesh ---
  const box = new THREE.BoxGeometry(1, 1, 1)
  box.translate(0, 0.5, 0) // origin at base
  const mat = new THREE.MeshBasicMaterial({ map: windowTexture(rand) })
  const count = small ? 300 : 500
  const buildings = new THREE.InstancedMesh(box, mat, count)
  const m = new THREE.Matrix4()
  const color = new THREE.Color()
  const beaconSpots: number[] = []
  let i = 0
  while (i < count) {
    const x = (rand() - 0.5) * 280
    const z = (rand() - 0.5) * 280
    if (Math.abs(x) < 12 && z > -20) continue // keep the hero corridor clear
    const w = 4 + rand() * 8
    const dist = Math.hypot(x, z)
    const h = (4 + rand() * 20) * Math.max(0.35, 1.4 - dist / 160)
    m.makeScale(w, h, 4 + rand() * 8)
    m.setPosition(x, 0, z)
    buildings.setMatrixAt(i, m)
    buildings.setColorAt(i, color.setScalar(0.5 + rand() * 0.5))
    if (h > 16 && rand() < 0.5) beaconSpots.push(x, h + 0.4, z)
    i++
  }
  group.add(buildings)

  // blinking red aircraft beacons on the tall towers
  const beaconGeo = new THREE.BufferGeometry()
  beaconGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(beaconSpots), 3))
  const beaconMat = new THREE.PointsMaterial({
    color: '#ff3355',
    size: 0.9,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  const beacons = new THREE.Points(beaconGeo, beaconMat)
  group.add(beacons)

  // --- hero building with neon rooftop rim ---
  const heroGeo = new THREE.BoxGeometry(14, 24, 14)
  heroGeo.translate(0, 12, 0)
  const heroWall = new THREE.MeshBasicMaterial({ map: windowTexture(rand), color: '#665577' })
  const heroRoof = new THREE.MeshBasicMaterial({ color: '#151022' })
  const hero = new THREE.Mesh(heroGeo, [
    heroWall, heroWall, heroRoof, heroRoof, heroWall, heroWall,
  ])
  group.add(hero)
  const rim = new THREE.LineSegments(
    new THREE.EdgesGeometry(heroGeo),
    new THREE.LineBasicMaterial({ color: VIOLET }),
  )
  group.add(rim)

  // rooftop clutter: AC units, ducts, antenna
  const propMat = new THREE.MeshBasicMaterial({ color: '#1c1530' })
  const propEdge = new THREE.LineBasicMaterial({ color: '#4a3d6b' })
  const props: [number, number, number, number, number, number][] = [
    // w, h, d, x, z, rotY
    [2.2, 1.2, 1.6, -4.5, -3.5, 0.2],
    [1.6, 1.0, 1.6, -1.8, -4.2, 0],
    [3.0, 0.8, 1.2, 3.8, -2.5, -0.15],
    [1.2, 2.2, 1.2, 5.2, -5.0, 0],
  ]
  for (const [w, h, d, x, z, ry] of props) {
    const g = new THREE.BoxGeometry(w, h, d)
    g.translate(0, h / 2, 0)
    const prop = new THREE.Mesh(g, propMat)
    prop.position.set(x, 24, z)
    prop.rotation.y = ry
    group.add(prop)
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(g), propEdge)
    e.position.copy(prop.position)
    e.rotation.copy(prop.rotation)
    group.add(e)
  }
  const antenna = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.08, 5, 6),
    new THREE.MeshBasicMaterial({ color: '#332a4d' }),
  )
  antenna.position.set(-5.5, 26.5, -5)
  group.add(antenna)

  // vertical neon signs flanking the dive corridor + one on the hero wall
  function signTexture(text: string, colorHex: string) {
    const sc = document.createElement('canvas')
    sc.width = 64
    sc.height = 256
    const sctx = sc.getContext('2d')!
    sctx.fillStyle = '#0b0716'
    sctx.fillRect(0, 0, 64, 256)
    sctx.strokeStyle = colorHex
    sctx.lineWidth = 5
    sctx.strokeRect(4, 4, 56, 248)
    sctx.fillStyle = colorHex
    sctx.font = 'bold 38px sans-serif'
    sctx.textAlign = 'center'
    sctx.textBaseline = 'middle'
    const chars = [...text]
    chars.forEach((ch, idx) => sctx.fillText(ch, 32, 132 + (idx - (chars.length - 1) / 2) * 52))
    return new THREE.CanvasTexture(sc)
  }
  // flanking towers the side signs hang on (the corridor itself stays clear)
  const flankMat = new THREE.MeshBasicMaterial({ map: windowTexture(rand), color: '#8877aa' })
  for (const [fx, fz, fh] of [[-18, 10, 20], [18, 5, 23], [-18, 18, 14]] as const) {
    const fg = new THREE.BoxGeometry(6, fh, 8)
    fg.translate(0, fh / 2, 0)
    const flank = new THREE.Mesh(fg, flankMat)
    flank.position.set(fx, 0, fz)
    group.add(flank)
  }
  const signs: [string, string, number, number, number, number][] = [
    // text, color, x, y, z, rotY (face the corridor)
    ['夜ふかし', MAGENTA, -14.9, 12, 10, Math.PI / 2],
    ['カラオケ', MINT, 14.9, 16, 5, -Math.PI / 2],
    ['深夜営業', VIOLET, -14.9, 6, 18, Math.PI / 2],
    ['よふかし', '#ffd166', 4, 14, 7.08, 0],
  ]
  for (const [text, colorHex, x, y, z, ry] of signs) {
    const sign = new THREE.Mesh(
      new THREE.PlaneGeometry(2.4, 9.6),
      new THREE.MeshBasicMaterial({ map: signTexture(text, colorHex) }),
    )
    sign.position.set(x, y, z)
    sign.rotation.y = ry
    group.add(sign)
  }

  // --- silhouette figure on the ledge (flat black shape, faces camera) ---
  const s = new THREE.Shape()
  s.moveTo(-0.35, 0)
  s.lineTo(-0.25, 1.1)
  s.lineTo(-0.45, 1.15) // arm hint
  s.lineTo(-0.2, 1.35)
  s.lineTo(0.2, 1.35)
  s.lineTo(0.45, 1.1)
  s.lineTo(0.25, 1.1)
  s.lineTo(0.35, 0)
  s.lineTo(0.12, 0)
  s.lineTo(0, 0.55)
  s.lineTo(-0.12, 0)
  s.closePath()
  const figureMesh = new THREE.Mesh(
    new THREE.ShapeGeometry(s),
    new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide }),
  )
  const headMesh = new THREE.Mesh(new THREE.CircleGeometry(0.22, 16), figureMesh.material)
  headMesh.position.y = 1.62
  const figure = new THREE.Group()
  figure.add(figureMesh, headMesh)
  figure.scale.setScalar(1.6)
  group.add(figure)

  // --- moon + city glow ---
  const moon = glowSprite(MINT, 30)
  moon.position.set(-45, 70, -90)
  group.add(moon)
  const haze = glowSprite(VIOLET, 140)
  haze.position.set(0, 8, -60)
  group.add(haze)

  // --- drifting particles ---
  const n = small ? 220 : 450
  const positions = new Float32Array(n * 3)
  for (let p = 0; p < n; p++) {
    positions[p * 3] = (rand() - 0.5) * 160
    positions[p * 3 + 1] = rand() * 80
    positions[p * 3 + 2] = (rand() - 0.5) * 160
  }
  const pGeo = new THREE.BufferGeometry()
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const particles = new THREE.Points(
    pGeo,
    new THREE.PointsMaterial({
      color: MINT,
      size: 0.35,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  )
  group.add(particles)

  return { group, figure, particles, beaconMat }
}
