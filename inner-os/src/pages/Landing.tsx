import { profile } from '../data/content'
import type { PageId } from '../types'

const SECTIONS: { id: PageId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

interface Props {
  onNavigate: (page: PageId) => void
}

export default function Landing({ onNavigate }: Props) {
  return (
    <div className="landing">
      <h1 className="landing-name">{profile.name}</h1>
      <p className="landing-title">{profile.title.toUpperCase()} | DATA SCIENTIST</p>
      <div className="landing-buttons">
        {SECTIONS.map((s) => (
          <button key={s.id} className="pixel-button" onClick={() => onNavigate(s.id)}>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}
