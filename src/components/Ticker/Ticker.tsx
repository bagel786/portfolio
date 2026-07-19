import styles from './Ticker.module.css'

const items = [
  'SYSTEMS',
  'SIMULATION',
  'GAME DESIGN',
  'AI',
  'PROBABILITY ENGINES',
  'SERIOUS GAMES',
  'PROCEDURAL CONTENT',
]

export default function Ticker() {
  const run = items.map((t) => `${t} // `).join('')
  return (
    <div className={styles.ticker} aria-hidden="true">
      {/* two copies for a seamless -50% translate loop */}
      <div className={styles.track}>
        <span>{run}</span>
        <span>{run}</span>
      </div>
    </div>
  )
}
