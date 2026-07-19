import { useEffect, useRef, useState } from 'react'
import { createIntroScene, type IntroScene } from './scene'
import styles from './RooftopIntro.module.css'

interface Props {
  onComplete: () => void
}

export default function RooftopIntro({ onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<IntroScene | null>(null)
  const doneRef = useRef(false)
  const [titleVisible, setTitleVisible] = useState(false)
  const [fadingOut, setFadingOut] = useState(false)

  useEffect(() => {
    const finish = () => {
      if (doneRef.current) return
      doneRef.current = true
      onComplete()
    }

    const scene = createIntroScene(canvasRef.current!, {
      onTitleIn: () => setTitleVisible(true),
      onTitleOut: () => setTitleVisible(false),
      onReveal: () => {
        setFadingOut(true)
        setTimeout(finish, 700)
      },
    })
    if (!scene) {
      finish() // no WebGL — straight to the site
      return
    }
    sceneRef.current = scene

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') scene.skip()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      scene.dispose()
    }
  }, [onComplete])

  return (
    <div className={`${styles.wrapper} ${fadingOut ? styles.fadeOut : ''}`}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <h1
        className={`${styles.title} ${titleVisible ? styles.titleVisible : ''}`}
        aria-hidden="true"
      >
        Enter the Night
      </h1>
      <button
        className={styles.skip}
        onClick={() => sceneRef.current?.skip()}
        aria-label="Skip intro"
      >
        SKIP //
      </button>
    </div>
  )
}
