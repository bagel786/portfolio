import * as THREE from 'three'

export const TOTAL = 6.4
const TITLE_IN = 1.6
const TITLE_OUT = 3.8
const LEAP = 3.8
const DIVE = 4.6
export const REVEAL = 5.6

const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
const easeInQuad = (x: number) => x * x
const clamp01 = (x: number) => Math.min(1, Math.max(0, x))

// camera glide: high and far → hovering just off the hero rooftop
const arrivePath = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-30, 70, 110),
  new THREE.Vector3(-10, 48, 70),
  new THREE.Vector3(0, 32, 38),
  new THREE.Vector3(0, 28, 22),
])

export interface TimelineRefs {
  camera: THREE.PerspectiveCamera
  figure: THREE.Object3D
  fog: THREE.FogExp2
}

export interface TimelineCallbacks {
  onTitleIn: () => void
  onTitleOut: () => void
  onReveal: () => void
}

const figureStart = new THREE.Vector3(0, 24, 5.2)
const lookAt = new THREE.Vector3()
const pos = new THREE.Vector3()

export function createEvaluator(cbs: TimelineCallbacks) {
  let titleIn = false
  let titleOut = false
  let revealed = false

  return function evaluate(t: number, { camera, figure, fog }: TimelineRefs) {
    if (!titleIn && t >= TITLE_IN) ((titleIn = true), cbs.onTitleIn())
    if (!titleOut && t >= TITLE_OUT) ((titleOut = true), cbs.onTitleOut())
    if (!revealed && t >= REVEAL) ((revealed = true), cbs.onReveal())

    // figure: idle → crouch → leap off the ledge
    figure.position.copy(figureStart)
    figure.scale.setScalar(1)
    if (t >= LEAP) {
      const k = clamp01((t - LEAP) / 0.8)
      if (k < 0.3) {
        figure.scale.y = 1 - 0.25 * Math.sin((k / 0.3) * Math.PI) // crouch dip
      } else {
        const f = easeInQuad((k - 0.3) / 0.7)
        figure.position.z += f * 6 // forward arc off the ledge
        figure.position.y -= f * f * 30 // accelerating fall
        figure.rotation.z = f * 0.5
      }
    }

    // camera
    if (t < DIVE) {
      const k = easeInOutCubic(clamp01(t / 2.2))
      arrivePath.getPoint(k, pos)
      // gentle hover sway once arrived
      if (t > 2.2) {
        pos.x += Math.sin((t - 2.2) * 0.8) * 0.6
        pos.y += Math.sin((t - 2.2) * 0.5) * 0.4
      }
      camera.position.copy(pos)
      lookAt.copy(figureStart)
      camera.fov = 55
    } else {
      // dive: chase the figure down the building face
      const k = clamp01((t - DIVE) / 1.2) // fully down before the fade starts
      const f = easeInOutCubic(k)
      camera.position.set(Math.sin(t * 2) * 0.3, 28 - f * 26, 22 - f * 8)
      lookAt.set(0, camera.position.y - 6, 4)
      camera.fov = 55 + f * 15
      fog.density = 0.012 + f * 0.02
    }
    camera.lookAt(lookAt)
    camera.updateProjectionMatrix()
  }
}
