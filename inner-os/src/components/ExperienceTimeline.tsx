import { experience } from '../data/content'
import Emphasize from './Emphasize'

/* "September 2025 - December 2025" -> "Sep 2025 – Dec 2025" */
const shortDate = (date: string) =>
  date
    .split(' - ')
    .map((d) => d.replace(/^([A-Za-z]{3})[a-z]*/, '$1'))
    .join(' – ')

function Job({ job }: { job: (typeof experience)[number] }) {
  return (
    <li className="pf-xp-item">
      <div className="pf-xp-node">
        <span className="pf-logo-tile pf-logo-round">
          <img src={job.logo} alt="" />
        </span>
      </div>
      <div className="pf-xp-body">
        <div className="pf-row-head">
          <div>
            <h3 className="pf-h3">{job.role}</h3>
            {job.link ? (
              <a className="pf-org" href={job.link} target="_blank" rel="noreferrer">{job.company}</a>
            ) : (
              <span className="pf-org">{job.company}</span>
            )}
          </div>
          <span className="pf-date">{shortDate(job.date)}</span>
        </div>
        <ul className="pf-bullets">
          {job.bullets.map((b, i) => (
            <li key={i}><Emphasize text={b} /></li>
          ))}
        </ul>
        <div className="pf-tags">
          {job.tech.map((t) => (
            <span className="pf-tag" key={t}>{t}</span>
          ))}
        </div>
      </div>
    </li>
  )
}

export default function ExperienceTimeline() {
  return (
    <ol className="pf-xp">
      {experience.map((job) => (
        <Job key={`${job.role}-${job.company}`} job={job} />
      ))}
    </ol>
  )
}
