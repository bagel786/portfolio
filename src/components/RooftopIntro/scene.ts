import * as THREE from 'three'
import { buildCity } from './city'
import { createEvaluator, REVEAL, TOTAL, type TimelineCallbacks } from './timeline'

export interface IntroScene {
  skip: () => void
  dispose: () => void
}

export function createIntroScene(
  canvas: HTMLCanvasElement,
  cbs: TimelineCallbacks,
): IntroScene | null {
  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false })
  } catch {
    return null // no WebGL → caller skips straight to the site
  }

  const small = window.innerWidth < 600
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 1.75))
  renderer.setSize(window.innerWidth, window.innerHeight)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#09070f')
  const fog = new THREE.FogExp2('#1a0b2e', 0.012)
  scene.fog = fog

  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    400,
  )

  const { group, figure, particles, beaconMat } = buildCity(small)
  scene.add(group)

  const evaluate = createEvaluator(cbs)

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onResize)

  // manual clock: accumulates only while the tab is visible
  let t = 0
  let last = performance.now()
  const onVisibility = () => {
    last = performance.now()
  }
  document.addEventListener('visibilitychange', onVisibility)

  let raf = 0
  const posAttr = particles.geometry.getAttribute('position') as THREE.BufferAttribute
  const loop = () => {
    raf = requestAnimationFrame(loop)
    const now = performance.now()
    if (!document.hidden) t += Math.min((now - last) / 1000, 0.1)
    last = now
    const tt = Math.min(t, TOTAL)

    if (!reduced) {
      for (let i = 0; i < posAttr.count; i++) {
        let y = posAttr.getY(i) - 0.12 // rain-speed drift
        if (y < 0) y = 80
        posAttr.setY(i, y)
      }
      posAttr.needsUpdate = true
      beaconMat.opacity = 0.55 + 0.45 * Math.sin(t * 3.5)
    }

    // ponytail: reduced motion = hold the t=3 rooftop frame, timer below ends it
    evaluate(reduced ? 3 : tt, { camera, figure, fog })
    renderer.render(scene, camera)
  }
  loop()

  let reducedTimer = 0
  if (reduced) reducedTimer = window.setTimeout(() => cbs.onReveal(), 2800)

  return {
    skip() {
      if (reduced) {
        clearTimeout(reducedTimer)
        cbs.onReveal()
      } else if (t < REVEAL) {
        t = REVEAL
      }
    },
    dispose() {
      cancelAnimationFrame(raf)
      clearTimeout(reducedTimer)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh
        mesh.geometry?.dispose?.()
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        for (const mat of mats) {
          if (!mat) continue
          ;(mat as THREE.MeshBasicMaterial).map?.dispose()
          mat.dispose()
        }
      })
      // no forceContextLoss: StrictMode remounts reuse this canvas in dev
      renderer.dispose()
    },
  }
}
