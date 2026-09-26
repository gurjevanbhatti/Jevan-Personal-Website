import { highlights, photos, profile } from '../data/content'
import Emphasize from '../components/Emphasize'
import ExperienceTimeline from '../components/ExperienceTimeline'
import PhotoGrid from '../components/PhotoGrid'
import SkillList from '../components/SkillList'

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Landing() {
  return (
    <div className="pf-page pf-page-wide">
      <section className="pf-hero">
        <div className="pf-hero-text">
          <h1 className="pf-display">
            Hi, I'm <span className="pf-accent">{profile.name.split(' ')[0]}</span>
          </h1>
          <ul className="pf-highlights">
            {highlights.map((h) => (
              <li key={h.text}>
                <span className="pf-logo-tile">
                  <img src={h.logo} alt="" />
                </span>
                <span>
                  <span className="pf-hl-year">{h.year}</span> <Emphasize text={h.text} />
                  {h.org && (
                    <>
                      {' '}@ <strong>{h.org}</strong>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ul>

          <div className="pf-actions">
            <a className="pf-btn pf-btn-primary" href="/inner-os/resume.pdf" target="_blank" rel="noreferrer">
              View resume
            </a>
            <button className="pf-btn" onClick={() => scrollTo('experience')}>
              See my work
            </button>
          </div>
        </div>
        <PhotoGrid photos={photos} />
      </section>

      <section className="pf-section" id="experience">
        <h2 className="pf-h2">Experience</h2>
        <ExperienceTimeline />
      </section>

      <section className="pf-section" id="skills">
        <h2 className="pf-h2">Skills</h2>
        <SkillList />
      </section>
    </div>
  )
}
