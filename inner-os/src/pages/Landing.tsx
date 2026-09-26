import { highlights, photos, profile } from '../data/content'
import type { PageId } from '../types'
import Emphasize from '../components/Emphasize'
import PhotoGrid from '../components/PhotoGrid'
import SocialLinks from '../components/SocialLinks'

interface Props {
  onNavigate: (page: PageId) => void
}

export default function Landing({ onNavigate }: Props) {
  return (
    <div className="pf-page pf-page-wide">
      <section className="pf-hero">
        <div>
          <h1 className="pf-display">
            Hi, I'm <span className="pf-accent">{profile.name.split(' ')[0]}</span>
          </h1>
          <p className="pf-lede">{profile.tagline}</p>

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
            <button className="pf-btn" onClick={() => onNavigate('experience')}>
              See my work
            </button>
          </div>
          <SocialLinks />
        </div>
        <PhotoGrid photos={photos} />
      </section>
    </div>
  )
}
