import { profile, education, skills } from '../data/content'
import type { PageId } from '../types'

interface Props {
  onNavigate: (page: PageId) => void
}

export default function About({ onNavigate }: Props) {
  return (
    <div>
      <h1 className="page-heading">Welcome</h1>
      <h2 className="page-subheading">I'm {profile.name}</h2>
      <p>{profile.intro}</p>

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

      <h2 className="page-subheading">About Me</h2>
      <p>{profile.bio}</p>

      <div className="about-photo-row">
        <img className="about-photo" src="/inner-os/avatar-placeholder.svg" alt={profile.name} />
        <span className="figure-caption">Figure 1: Me, 2026</span>
      </div>

      <h2 className="page-subheading">Education</h2>
      {education.map((e) => (
        <p key={e.school}>
          <b>{e.school}</b>, {e.location} — {e.degree} ({e.date})
        </p>
      ))}

      <h2 className="page-subheading">Skills</h2>
      {Object.entries(skills).map(([category, list]) => (
        <div key={category} className="skill-group">
          <p className="skill-category">{category}</p>
          <div className="tag-row">
            {list.map((s) => (
              <span className="tag" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}

      <p>
        Thanks for reading about me! If you have any questions or comments I'd love to hear them —
        reach out through the{' '}
        <a href="#contact" onClick={() => onNavigate('contact')}>
          contact page
        </a>
        .
      </p>
    </div>
  )
}
