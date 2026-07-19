import { useEffect, useRef } from 'react'
import styles from './NeonCursor.module.css'

const TRAIL = 4

export default function NeonCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return

    document.body.classList.add('neon-cursor-active')
    let mx = -100
    let my = -100
    // ring + trail dots lerp toward the mouse at decreasing speeds
    const pts = Array.from({ length: TRAIL + 1 }, () => ({ x: -100, y: -100 }))
    let raf = 0

    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
    }
    const onOver = (e: PointerEvent) => {
      const hot = (e.target as Element).closest?.('a, button')
      ringRef.current?.classList.toggle(styles.hot, !!hot)
    }

    const tick = () => {
      dotRef.current!.style.transform = `translate(${mx}px, ${my}px)`
      pts.forEach((p, i) => {
        const k = 0.35 / (i + 1)
        p.x += (mx - p.x) * k
        p.y += (my - p.y) * k
        const el = i === 0 ? ringRef.current : trailRefs.current[i - 1]
        if (el) el.style.transform = `translate(${p.x}px, ${p.y}px)`
      })
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      document.body.classList.remove('neon-cursor-active')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div aria-hidden="true">
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring} />
      {Array.from({ length: TRAIL }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            trailRefs.current[i] = el
          }}
          className={styles.trail}
          style={{ opacity: 0.5 - i * 0.11, scale: `${0.8 - i * 0.15}` }}
        />
      ))}
    </div>
  )
}
