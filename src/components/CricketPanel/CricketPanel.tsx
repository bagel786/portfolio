import Panel from '../Panel/Panel'
import styles from './CricketPanel.module.css'

const scoreboard = [
  { label: 'SELECTED', value: 'U15 · U19 · U17', sub: '2024 – 2026' },
  { label: 'CAREER WICKETS', value: '132', sub: '' },
  { label: 'RANKED', value: '17 / 157', sub: 'LPCL Fall 2024' },
]

export default function CricketPanel() {
  return (
    <section className={styles.section}>
      <h2 className="section-title" data-reveal>On the Pitch</h2>
      <div className={styles.scoreboard} data-reveal>
        {scoreboard.map((s) => (
          <div key={s.label} className={styles.stat}>
            <span className={styles.statLabel}>{s.label}</span>
            <span className={styles.statValue}>{s.value}</span>
            {s.sub && <span className={styles.statSub}>{s.sub}</span>}
          </div>
        ))}
      </div>
      <Panel variant="cut-tr" accent="cyan" className={styles.card} reveal revealDelay={120}>
        <div className={styles.body}>
          <div className={styles.mediaFrame}>
            <img
              src="/assets/cricket-u19.jpeg"
              alt="2025 USA Cricket U19 West Conference Games team photo"
              loading="lazy"
              className={styles.media}
            />
          </div>
          <div className={styles.text}>
            <p className={styles.kicker}>USA Cricket — Western Conference</p>
            <h3 className={styles.title}>U15 · U19 · U17 Regionals</h3>
          </div>
        </div>
      </Panel>
    </section>
  )
}
