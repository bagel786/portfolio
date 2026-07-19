import { useEffect, useRef } from 'react'

// Renders a stat string ("30,000+ plays · 10,000+ players") and counts each
// number up from 0 the first time it scrolls into view.
export default function StatLine({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>('[data-target]'))
    if (!spans.length) return

    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const dur = 1300
        const step = (now: number) => {
          const t = Math.min((now - start) / dur, 1)
          const ease = 1 - Math.pow(1 - t, 3)
          for (const s of spans) {
            s.textContent = Math.round(Number(s.dataset.target) * ease).toLocaleString('en-US')
          }
          if (t < 1) raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [text])

  const parts = text.split(/([\d,]+)/)
  return (
    <p ref={ref} className={className}>
      {parts.map((part, i) => {
        const n = Number(part.replace(/,/g, ''))
        return /^[\d,]+$/.test(part) && !Number.isNaN(n) ? (
          <span key={i} data-target={n}>
            {part}
          </span>
        ) : (
          part
        )
      })}
    </p>
  )
}
