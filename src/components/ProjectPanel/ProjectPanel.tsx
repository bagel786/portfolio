import Panel from '../Panel/Panel'
import StatLine from '../StatLine/StatLine'
import type { PanelVariant } from '../Panel/Panel'
import type { Project } from '../../data/projects'
import styles from './ProjectPanel.module.css'

const variants: PanelVariant[] = ['cut-tl', 'cut-br', 'cut-tr', 'cut-bl']

export default function ProjectPanel({ project, index }: { project: Project; index: number }) {
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
            <img
              src={project.media.src}
              alt={project.media.alt ?? project.title}
              loading="lazy"
              className={styles.media}
            />
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
        {(project.links.live || project.links.github) && (
          <div className={styles.links}>
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noreferrer">
                Play / Visit ↗
              </a>
            )}
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            )}
          </div>
        )}
      </article>
    </Panel>
  )
}
