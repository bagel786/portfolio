import { awards } from '../../data/awards'
import styles from './Awards.module.css'

export default function Awards() {
  return (
    <section className={styles.section}>
      <h2 className="section-title" data-reveal>Awards</h2>
      <ul className={styles.strip}>
        {awards.map((item, i) => (
          <li
            key={item.title}
            className={styles.item}
            data-reveal
            style={{ '--reveal-delay': `${i * 100}ms` } as React.CSSProperties}
          >
            <span className={styles.scope}>{item.scope}</span>
            <span className={styles.title}>{item.title}</span>
            <span className={styles.detail}>{item.detail}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
