import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Panel from '../Panel/Panel'
import StatLine from '../StatLine/StatLine'
import type { PanelVariant } from '../Panel/Panel'
import type { Project } from '../../data/projects'
import styles from './ProjectPanel.module.css'

const variants: PanelVariant[] = ['cut-tl', 'cut-br', 'cut-tr', 'cut-bl']

export default function ProjectPanel({ project, index }: { project: Project; index: number }) {
  const [zoomed, setZoomed] = useState(false)

  // lock page scroll + close on Esc while the lightbox is open
  useEffect(() => {
    if (!zoomed) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomed(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [zoomed])

  return (
    <Panel
      variant={variants[index % variants.length]}
      accent={project.accent}
      className={styles.card}
      reveal
      revealDelay={(index % 3) * 110}
    >
      <article className={styles.body}>
        {project.media.type === 'image' && (
          <div className={styles.mediaFrame}>
            <button
              type="button"
              className={styles.mediaButton}
              onClick={() => setZoomed(true)}
              aria-label={`Enlarge ${project.title} image`}
            >
              <img
                src={project.media.src}
                alt={project.media.alt ?? project.title}
                loading="lazy"
                className={styles.media}
                style={project.media.ratio ? { aspectRatio: project.media.ratio } : undefined}
              />
            </button>
          </div>
        )}
        <p className={styles.role}>{project.role}</p>
        <h3 className={styles.title}>{project.title}</h3>
        {project.stat && <StatLine text={project.stat} className={styles.stat} />}
        <p className={styles.desc}>{project.description}</p>
        <ul className={styles.tags}>
          {project.stack.map((t) => (
            <li key={t} className={styles.tag}>
              {t}
            </li>
          ))}
        </ul>
        {(project.links.live || project.links.github || project.links.slides || project.links.paper) && (
          <div className={styles.links}>
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noreferrer">
                Visit {project.title} ↗
              </a>
            )}
            {project.links.paper && (
              <a href={project.links.paper} target="_blank" rel="noreferrer">
                Paper ↗
              </a>
            )}
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noreferrer">
                {project.title} on GitHub ↗
              </a>
            )}
            {project.links.slides && (
              <a href={project.links.slides} target="_blank" rel="noreferrer">
                Slides ↗
              </a>
            )}
          </div>
        )}
      </article>
      {zoomed &&
        createPortal(
          <div
            className={styles.lightbox}
            role="dialog"
            aria-label={`${project.title} image enlarged`}
            onClick={() => setZoomed(false)}
          >
            <img
              src={project.media.src}
              alt={project.media.alt ?? project.title}
              className={styles.lightboxImg}
            />
          </div>,
          document.body,
        )}
    </Panel>
  )
}
