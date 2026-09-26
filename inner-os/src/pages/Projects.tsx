import { projects } from '../data/content'
import Emphasize from '../components/Emphasize'

type Media = (typeof projects)[number]['media']

function ProjectMedia({ media }: { media: Media }) {
  if (media.kind === 'youtube') {
    return (
      <div className="pf-media pf-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${media.id}`}
          title={media.title}
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }
  return (
    <figure className="pf-media">
      <img src={media.src} alt={media.alt} />
      {media.caption && <figcaption>{media.caption}</figcaption>}
    </figure>
  )
}

export default function Projects() {
  return (
    <div className="pf-page pf-page-wide">
      <h2 className="pf-h2">What I've <em>built</em></h2>
      <div className="pf-grid">
        {projects.map((p) => (
          <article className="pf-card" key={p.name}>
            <div className="pf-row-head">
              <h3 className="pf-h3">{p.name}</h3>
              <span className="pf-date">{p.date}</span>
            </div>
            <p className="pf-card-sub">{p.subtitle}</p>
            <ProjectMedia media={p.media} />
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
