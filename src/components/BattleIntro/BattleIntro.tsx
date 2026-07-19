import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './BattleIntro.module.css'

// edit freely — the types flickered through before locking on [Developer]
const TYPES = ['Fire-Type', 'Water-Type', 'Libero', 'All-Rounder', 'Shiny Hunter']
const ENCOUNTER = 'A wild SAFIULLAH BAIG appeared!'
const ATTACK = 'SAFIULLAH used Portfolio!'

type Phase = 'enter' | 'cycling' | 'settled' | 'attack' | 'split'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

interface Props {
  onComplete: () => void
}

function Pokeball() {
  return (
    <svg className={styles.pokeball} viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="#f8f0e0" stroke="#2a2438" strokeWidth="2" />
      <path d="M1 10 a9 9 0 0 1 18 0 Z" fill="#e3350d" stroke="#2a2438" strokeWidth="2" />
      <line x1="1" y1="10" x2="19" y2="10" stroke="#2a2438" strokeWidth="2" />
      <circle cx="10" cy="10" r="3" fill="#f8f0e0" stroke="#2a2438" strokeWidth="2" />
    </svg>
  )
}

export default function BattleIntro({ onComplete }: Props) {
  const doneRef = useRef(false)
  const timersRef = useRef<number[]>([])
  const [phase, setPhase] = useState<Phase>('enter')
  const [typeIdx, setTypeIdx] = useState(0)
  const [typed, setTyped] = useState(0)

  const msg = phase === 'attack' || phase === 'split' ? ATTACK : ENCOUNTER
  const locked = phase !== 'enter' && phase !== 'cycling'
  const wildType = locked ? 'Developer' : TYPES[typeIdx]

  const finish = useCallback(() => {
    if (doneRef.current) return
    doneRef.current = true
    onComplete()
  }, [onComplete])

  const skipToSplit = useCallback(() => {
    if (doneRef.current) return
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setPhase('split')
    timersRef.current.push(window.setTimeout(finish, 650))
  }, [finish])

  // timeline: enter → cycling → settled → attack → split → finish
  useEffect(() => {
    if (reducedMotion()) {
      setPhase('settled')
      const t = window.setTimeout(finish, 1200)
      return () => clearTimeout(t)
    }
    const at = (ms: number, fn: () => void) =>
      timersRef.current.push(window.setTimeout(fn, ms))
    at(900, () => setPhase('cycling'))
    at(2700, () => setPhase('settled'))
    at(3500, () => setPhase('attack'))
    at(4600, () => setPhase('split'))
    at(5250, finish)
    const timers = timersRef.current
    return () => timers.forEach(clearTimeout)
  }, [finish])

  // typewriter for the battle text box; restarts when the message swaps
  useEffect(() => {
    if (reducedMotion()) {
      setTyped(msg.length)
      return
    }
    setTyped(0)
    const iv = window.setInterval(() => {
      setTyped((n) => {
        if (n >= msg.length) {
          clearInterval(iv)
          return n
        }
        return n + 1
      })
    }, 25)
    return () => clearInterval(iv)
  }, [msg])

  // type flicker on the wild pane while cycling
  useEffect(() => {
    if (phase !== 'cycling') return
    const iv = window.setInterval(() => setTypeIdx((i) => (i + 1) % TYPES.length), 180)
    return () => clearInterval(iv)
  }, [phase])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') skipToSplit()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [skipToSplit])

  const splitting = phase === 'split'

  return (
    <div className={`${styles.wrapper} ${splitting ? styles.splitting : ''}`} aria-hidden="true">
      <div className={`${styles.half} ${styles.topHalf}`}>
        {/* wild pokémon: safiullah — pane top-left, sprite top-right */}
        <div className={`${styles.pane} ${styles.topPane}`}>
          <div className={styles.nameRow}>
            <Pokeball />
            <span className={styles.name}>SAFIULLAH BAIG</span>
            <span className={styles.level}>Lv.17</span>
          </div>
          <div className={styles.nameRow}>
            <span className={`${styles.type} ${locked ? styles.typeLocked : ''}`}>
              [{wildType}]
            </span>
          </div>
          <div className={styles.hpRow}>
            <span className={styles.hpTag}>HP</span>
            <div className={styles.hpTrack}>
              <div className={styles.hpFill} />
            </div>
          </div>
        </div>
        <img
          src="/assets/sprite-saf.png"
          alt=""
          className={`${styles.sprite} ${styles.wildSprite} ${phase === 'attack' ? styles.lunge : ''}`}
        />
        <button className={styles.skip} onClick={skipToSplit} aria-label="Skip intro">
          SKIP //
        </button>
      </div>
      <div className={`${styles.half} ${styles.bottomHalf}`}>
        {/* the visitor: trainer back-sprite bottom-left, pane bottom-right */}
        <img src="/assets/sprite-trainer.png" alt="" className={`${styles.sprite} ${styles.trainerSprite}`} />
        <div className={`${styles.pane} ${styles.bottomPane}`}>
          <div className={styles.nameRow}>
            <span className={styles.name}>YOU</span>
            <span className={styles.level}>Lv.??</span>
          </div>
          <div className={styles.hpRow}>
            <span className={styles.hpTag}>HP</span>
            <div className={styles.hpTrack}>
              <div className={styles.hpFill} />
            </div>
          </div>
        </div>
        <div className={styles.textBox}>
          <span>{msg.slice(0, typed)}</span>
          <span className={styles.cursor}>▼</span>
        </div>
      </div>
    </div>
  )
}
