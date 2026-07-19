import { leadership } from '../../data/leadership'
import styles from './LeadershipStrip.module.css'

export default function LeadershipStrip() {
  return (
    <section className={styles.section}>
      <h2 className="section-title" data-reveal>Beyond Code</h2>
      <ul className={styles.strip}>
        {leadership.map((item, i) => (
          <li
            key={item.org}
            className={styles.item}
            data-reveal
            style={{ '--reveal-delay': `${i * 100}ms` } as React.CSSProperties}
          >
            <span className={styles.role}>{item.role}</span>
            <span className={styles.org}>{item.org}</span>
            <span className={styles.detail}>{item.detail}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
