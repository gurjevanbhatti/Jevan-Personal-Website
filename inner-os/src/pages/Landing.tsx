import { profile } from '../data/content'
import type { PageId } from '../types'

interface Props {
  onNavigate: (page: PageId) => void
}

export default function Landing({ onNavigate }: Props) {
  return (
    <div className="landing">
      <h1 className="landing-name">{profile.name}</h1>
      <p className="landing-title">{profile.title}</p>
      <div className="landing-nav">
        <a href="#about" onClick={() => onNavigate('about')}>
          ABOUT
        </a>
        <a href="#experience" onClick={() => onNavigate('experience')}>
          EXPERIENCE
        </a>
        <a href="#projects" onClick={() => onNavigate('projects')}>
          PROJECTS
        </a>
        <a href="#contact" onClick={() => onNavigate('contact')}>
          CONTACT
        </a>
      </div>
    </div>
  )
}
