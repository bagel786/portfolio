import { techStack } from '../../data/techstack'
import styles from './TechStack.module.css'

export default function TechStack() {
  return (
    <section className={styles.section}>
      <h2 className="section-title" data-reveal>Stack</h2>
      <ul className={styles.badges}>
        {techStack.map((t, i) => (
          <li
            key={t}
            className={styles.badge}
            data-reveal
            style={{ '--reveal-delay': `${i * 55}ms` } as React.CSSProperties}
          >
            {t}
          </li>
        ))}
      </ul>
    </section>
  )
}
