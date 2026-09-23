import { projects } from '../data/content'

export default function Projects() {
  return (
    <div>
      {projects.map((p) => (
        <div className="entry-block" key={p.name}>
          <div className="entry-header">
            <h1 className="page-heading entry-title">{p.name}</h1>
            <div className="entry-meta">
              <div>{p.date}</div>
            </div>
          </div>
          <p className="page-subheading" style={{ marginTop: 0 }}>
            {p.subtitle}
          </p>
          <div className="tag-row">
            {p.tech.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
          <ul>
            {p.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
