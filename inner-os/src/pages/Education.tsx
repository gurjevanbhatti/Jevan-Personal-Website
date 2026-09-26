import { education } from '../data/content'

export default function Education() {
  return (
    <div className="pf-page">
      <h2 className="pf-h2">Education</h2>
      <div className="pf-stack">
        {education.map((e) => (
          <article className="pf-card pf-edu" key={e.school}>
            <img className="pf-edu-logo" src={e.logo} alt="" />
            <div className="pf-edu-text">
              <div className="pf-row-head">
                <h3 className="pf-h3">{e.school}</h3>
                <span className="pf-date">{e.date}</span>
              </div>
              <p className="pf-org">{e.degree}</p>
              <p className="pf-muted">{e.location}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
