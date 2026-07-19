import { anime } from '../../data/anime'
import styles from './FavoriteAnime.module.css'

export default function FavoriteAnime() {
  return (
    <section className={styles.section}>
      <h2 className="section-title" data-reveal>On Repeat</h2>
      <div className={styles.wall}>
        {anime.map((a, i) => (
          <div
            key={a.title}
            className={styles.poster}
            data-reveal
            style={
              {
                '--reveal-delay': `${i * 70}ms`,
                '--tilt': `${(i % 2 === 0 ? -1 : 1) * (2 + (i % 3))}deg`,
              } as React.CSSProperties
            }
          >
            <img src={a.src} alt={`${a.title} poster`} loading="lazy" className={styles.art} />
            <span className={styles.title}>{a.title}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
