import styles from './Contact.module.css'

const links = [
  { label: 'Email', href: 'mailto:safbaig5@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/bagel786' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/safiullah-baig-5a7689364/' },
]

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <h2 className="section-title" data-reveal>Contact</h2>
      <div className={styles.links}>
        {links.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className={styles.link}
            data-reveal
            style={{ '--reveal-delay': `${i * 100}ms` } as React.CSSProperties}
          >
            {l.label}
          </a>
        ))}
      </div>
    </section>
  )
}
