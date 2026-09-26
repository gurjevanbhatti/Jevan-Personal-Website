import { about } from '../data/content'

// chapters with a photo alternate sides: right, left, right...
const photoChapters = about.chapters.filter((ch) => 'photo' in ch)

export default function About() {
  return (
    <div className="pf-page pf-page-wide">
      <h2 className="pf-h2">
        About <em>me</em>
      </h2>
      <blockquote className="pf-quote">{about.quote}</blockquote>

      <div className="pf-story">
        {about.chapters.map((ch) => {
          const flipped = photoChapters.indexOf(ch) % 2 === 1
          return (
            <section className="pf-chapter" key={ch.title.join(' ')}>
              <h3 className="pf-chapter-title">
                {ch.title[0]} <em>{ch.title[1]}</em>
              </h3>
              <div className={`pf-about${'photo' in ch && ch.photo ? '' : ' no-photo'}${flipped ? ' is-flipped' : ''}`}>
                <div>
                  {ch.text.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {'photo' in ch && ch.photo && (
                  <figure className="pf-polaroid">
                    <img src={ch.photo.src} alt={ch.photo.alt} />
                    <figcaption>{ch.photo.caption}</figcaption>
                  </figure>
                )}
              </div>
            </section>
          )
        })}
      </div>

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
