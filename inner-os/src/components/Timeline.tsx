import Emphasize from './Emphasize'

export interface TimelineEntry {
  id: string
  logo: string
  title: string
  org: string
  link?: string
  date: string
  bullets?: string[]
  tags?: string[]
}

/* "September 2025 - December 2025" -> "Sep 2025 – Dec 2025" */
const shortDate = (date: string) =>
  date
    .split(' - ')
    .map((d) => d.replace(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*/, '$1'))
    .join(' – ')

function Item({ item }: { item: TimelineEntry }) {
  return (
    <li className="pf-xp-item">
      <div className="pf-xp-node">
        <span className="pf-logo-tile pf-logo-round">
          <img src={item.logo} alt="" />
        </span>
      </div>
      <div className="pf-xp-body">
        <div className="pf-row-head">
          <div>
            <h3 className="pf-h3">{item.title}</h3>
            {item.link ? (
              <a className="pf-org" href={item.link} target="_blank" rel="noreferrer">{item.org}</a>
            ) : (
              <span className="pf-org">{item.org}</span>
            )}
          </div>
          <span className="pf-date">{shortDate(item.date)}</span>
        </div>
        {item.bullets && item.bullets.length > 0 && (
          <ul className="pf-bullets">
            {item.bullets.map((b, i) => (
              <li key={i}><Emphasize text={b} /></li>
            ))}
          </ul>
        )}
        {item.tags && item.tags.length > 0 && (
          <div className="pf-tags">
            {item.tags.map((t) => (
              <span className="pf-tag" key={t}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </li>
  )
}

export default function Timeline({ items }: { items: TimelineEntry[] }) {
  return (
    <ol className="pf-xp">
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ol>
  )
}
