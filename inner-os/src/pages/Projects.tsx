import { projects } from '../data/content'
import Emphasize from '../components/Emphasize'

export default function Projects() {
  return (
    <div className="pf-page">
      <h2 className="pf-h2">Projects</h2>
      <div className="pf-grid">
        {projects.map((p) => (
          <article className="pf-card" key={p.name}>
            <div className="pf-row-head">
              <h3 className="pf-h3">{p.name}</h3>
              <span className="pf-date">{p.date}</span>
            </div>
            <p className="pf-card-sub">{p.subtitle}</p>
            <ul className="pf-bullets">
              {p.bullets.map((b, i) => (
                <li key={i}><Emphasize text={b} /></li>
              ))}
            </ul>
            <div className="pf-tags">
              {p.tech.map((t) => (
                <span className="pf-tag" key={t}>{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
