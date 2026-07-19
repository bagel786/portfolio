import type { ReactNode } from 'react'
import styles from './Panel.module.css'

export type PanelVariant = 'cut-tl' | 'cut-br' | 'cut-tr' | 'cut-bl'
export type PanelAccent = 'yellow' | 'cyan'

interface PanelProps {
  variant?: PanelVariant
  accent?: PanelAccent
  className?: string
  reveal?: boolean
  revealDelay?: number
  children: ReactNode
}

export default function Panel({
  variant = 'cut-br',
  accent = 'cyan',
  className = '',
  reveal = false,
  revealDelay = 0,
  children,
}: PanelProps) {
  return (
    <div
      className={`${styles.panel} ${styles[accent]} ${className}`}
      {...(reveal && {
        'data-reveal': '',
        style: { '--reveal-delay': `${revealDelay}ms` } as React.CSSProperties,
      })}
    >
      <div className={`${styles.frame} ${styles[variant]}`}>
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  )
}
