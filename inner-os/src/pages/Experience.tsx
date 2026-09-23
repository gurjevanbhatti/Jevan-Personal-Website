import { experience } from '../data/content'

export default function Experience() {
  return (
    <div>
      <div className="callout">
        <img src="/inner-os/floppy.svg" alt="" className="callout-icon" />
        <div>
          <b>Looking for my resume?</b>
          <br />
          <a href="/inner-os/resume.pdf" target="_blank" rel="noreferrer" className="callout-link">
            Click here to download it!
          </a>
        </div>
      </div>

      {experience.map((job) => (
        <div className="entry-block" key={job.company}>
          <div className="entry-header">
            <h1 className="page-heading entry-title">{job.company}</h1>
            <div className="entry-meta">
              {job.link && (
                <a href={job.link} target="_blank" rel="noreferrer">
                  {job.link.replace('https://', '').replace(/\/$/, '')}
                </a>
              )}
              <div>{job.date}</div>
            </div>
          </div>
          <p className="page-subheading" style={{ marginTop: 0 }}>
            {job.role}
          </p>
          <ul>
            {job.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
