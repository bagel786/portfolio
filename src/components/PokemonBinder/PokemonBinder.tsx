import { binderPages } from '../../data/pokemon'
import styles from './PokemonBinder.module.css'

export default function PokemonBinder() {
  return (
    <section className={styles.section}>
      <h2 className="section-title" data-reveal>The Binder</h2>
      <div className={styles.shelf}>
        {binderPages.map((src, i) => (
          <div
            key={src}
            className={styles.page}
            data-reveal
            style={{ '--reveal-delay': `${i * 70}ms` } as React.CSSProperties}
          >
            <span className={styles.tab}>PG. {String(i + 1).padStart(2, '0')}</span>
            <img src={src} alt={`Pokemon binder page ${i + 1}`} className={styles.sleeve} />
          </div>
        ))}
      </div>
    </section>
  )
}
