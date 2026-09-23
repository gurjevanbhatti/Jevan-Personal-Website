import { education } from '../data/content'

export default function Education() {
  return (
    <div>
      <h1 className="page-heading">Education</h1>
      {education.map((e) => (
        <div className="entry-block" key={e.school}>
          <div className="entry-header">
            <h1 className="page-heading entry-title">{e.school}</h1>
            <div className="entry-meta">{e.date}</div>
          </div>
          <p className="page-subheading" style={{ marginTop: 0 }}>
            {e.degree}
          </p>
          <p>{e.location}</p>
        </div>
      ))}
    </div>
  )
}
