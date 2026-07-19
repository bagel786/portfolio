import { useRef } from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)

  // mouse parallax: bg drifts with the cursor, avatar counter-drifts
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--px', String((e.clientX - r.left) / r.width - 0.5))
    el.style.setProperty('--py', String((e.clientY - r.top) / r.height - 0.5))
  }

  return (
    <header className={styles.hero} ref={ref} onMouseMove={onMove}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.content}>
        <div className={styles.text}>
          <p className={styles.kicker}>HEY GUYS 👋 I'M SAF</p>
          <h1 className={styles.title}>
            Safiullah <span className={styles.glitchName}>Baig</span>
          </h1>
          <p className={styles.tagline}>
            17-year-old from Leander, Texas. I make <strong>games</strong> and{' '}
            <strong>tools</strong> that simulate weird systems — and I spend way too
            much time on anime, cricket, and the Pokémon Showdown ladder.
          </p>
          <div className={styles.ctas}>
            <a href="#projects" className={styles.ctaPrimary}>
              View Projects
            </a>
            <a href="#contact" className={styles.ctaSecondary}>
              Contact
            </a>
          </div>
          <p className={styles.footnote}>Also a massive Lego builder. Ask me about my Kanto living dex.</p>
        </div>
        <div className={styles.avatarParallax}>
        <div className={styles.avatarFrame}>
          <img
            src="/assets/avatar.jpg"
            alt="Safiullah Baig"
            className={styles.avatar}
            width={320}
            height={567}
          />
        </div>
        </div>
      </div>
    </header>
  )
}
