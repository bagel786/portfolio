import { projects } from '../../data/projects'
import ProjectPanel from '../ProjectPanel/ProjectPanel'
import styles from './ProjectGrid.module.css'

export default function ProjectGrid() {
  return (
    <section id="projects" className={styles.section}>
      <h2 className="section-title" data-reveal>Projects</h2>
      <div className={styles.grid}>
        {projects.map((p, i) => (
          <ProjectPanel key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
