import { useState } from 'react'
import { experience } from '../data/content'
import Emphasize from '../components/Emphasize'

const PREVIEW = 3

/* "September 2025 - December 2025" -> ["Sep 2025", "Dec 2025"] */
const shortDates = (date: string) => date.split(' - ').map((d) => d.replace(/^([A-Za-z]{3})[a-z]*/, '$1'))

function Job({ job }: { job: (typeof experience)[number] }) {
  const [open, setOpen] = useState(false)
  const extra = job.bullets.length - PREVIEW
  const shown = open ? job.bullets : job.bullets.slice(0, PREVIEW)
  const [start, end] = shortDates(job.date)

  return (
    <li className="pf-xp-item">
      <div className="pf-xp-date">
        {start}
        {end && <> –<br />{end}</>}
      </div>
      <div className="pf-xp-node">
        <span className="pf-logo-tile pf-logo-round">
          <img src={job.logo} alt="" />
        </span>
      </div>
      <div className="pf-xp-body">
        <h3 className="pf-h3">{job.role}</h3>
        {job.link ? (
          <a className="pf-org" href={job.link} target="_blank" rel="noreferrer">{job.company}</a>
        ) : (
          <span className="pf-org">{job.company}</span>
        )}
        <span className="pf-date pf-xp-date-inline">{job.date}</span>
        <ul className="pf-bullets">
          {shown.map((b, i) => (
            <li key={i}><Emphasize text={b} /></li>
          ))}
        </ul>
        {extra > 0 && (
          <button className="pf-link" onClick={() => setOpen(!open)}>
            {open ? 'Show less' : `Show ${extra} more`}
          </button>
        )}
      </div>
    </li>
  )
}

export default function Experience() {
  return (
    <div className="pf-page pf-page-wide">
      <h2 className="pf-h2">Experience</h2>
      <p className="pf-muted pf-intro">Where I've worked and what I shipped.</p>
      <ol className="pf-xp">
        {experience.map((job) => (
          <Job key={job.company} job={job} />
        ))}
      </ol>
    </div>
  )
}
