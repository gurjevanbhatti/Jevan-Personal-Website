import { profile, skills } from '../data/content'
import type { PageId } from '../types'

interface Props {
  onNavigate: (page: PageId) => void
}

export default function About({ onNavigate }: Props) {
  return (
    <div className="pf-page">
      <h2 className="pf-h2">About me</h2>
      <p className="pf-lede">{profile.intro}</p>
      <p>{profile.bio}</p>
      <p className="pf-muted">Based in {profile.location}.</p>

      <h2 className="pf-h2">Skills</h2>
      <div className="pf-skills">
        {Object.entries(skills).map(([category, list]) => (
          <div className="pf-skill-row" key={category}>
            <p className="pf-label">{category}</p>
            <div className="pf-tags">
              {list.map((s) => (
                <span className="pf-tag" key={s}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="pf-muted">
        Questions or ideas? I'd love to hear them —{' '}
        <button className="pf-link" onClick={() => onNavigate('contact')}>get in touch</button>.
      </p>
    </div>
  )
}
