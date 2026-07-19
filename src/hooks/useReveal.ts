import { useEffect } from 'react'

// Adds .revealed to any [data-reveal] element when it enters the viewport.
// Elements start hidden via CSS in global.css and wipe in with a clip-path transition.
export function useReveal(active: boolean) {
  useEffect(() => {
    if (!active) return
    const els = document.querySelectorAll('[data-reveal]:not(.revealed)')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('revealed')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.15 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [active])
}
