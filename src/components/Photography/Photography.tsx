import { photos } from '../../data/photography'
import styles from './Photography.module.css'

export default function Photography() {
  return (
    <section className={styles.section}>
      <h2 className="section-title" data-reveal>Through the Lens</h2>
      <div className={styles.strip}>
        {photos.map((src, i) => (
          <figure
            key={src}
            className={styles.frame}
            data-reveal
            style={{ '--reveal-delay': `${i * 40}ms` } as React.CSSProperties}
          >
            <span className={styles.sprockets} aria-hidden="true" />
            <img src={src} alt="" loading="lazy" className={styles.shot} />
            <figcaption className={styles.frameNo}>{String(i + 1).padStart(2, '0')}A</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
