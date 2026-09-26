import { about } from '../data/content'

export default function About() {
  return (
    <div className="pf-page pf-page-wide">
      <h2 className="pf-h2">
        About <em>me</em>
      </h2>
      <blockquote className="pf-quote">{about.quote}</blockquote>

      {about.rows.map((row, i) => (
        <div className={`pf-about${i % 2 ? ' is-flipped' : ''}`} key={row.photo.src}>
          <div>
            {row.text.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <figure className="pf-polaroid">
            <img
              src={row.photo.src}
              alt={row.photo.alt}
              style={'position' in row.photo ? { objectPosition: row.photo.position } : undefined}
            />
            <figcaption>{row.photo.caption}</figcaption>
          </figure>
        </div>
      ))}

      <section className="pf-section">
        <h2 className="pf-h2">
          Little <em>snapshots</em>
        </h2>
        <div className="pf-snapshots">
          {about.snapshots.map((p) => (
            <figure className="pf-polaroid" key={p.src}>
              <img src={p.src} alt={p.alt} />
            </figure>
          ))}
        </div>
      </section>
    </div>
  )
}
