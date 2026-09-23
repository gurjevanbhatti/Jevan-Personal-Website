import { profile } from '../data/content'
import type { PageId } from '../types'

const NAV: { id: PageId; label: string }[] = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'contact', label: 'CONTACT' },
]

interface Props {
  current: PageId
  onNavigate: (page: PageId) => void
}

export default function Sidebar({ current, onNavigate }: Props) {
  return (
    <div className="sidebar">
      <div className="sidebar-name">{profile.name}</div>
      <div className="sidebar-year">{profile.showcaseYear}</div>
      <nav className="sidebar-nav">
        {NAV.map((item) => (
          <a
            key={item.id}
            className="sidebar-link"
            onClick={() => onNavigate(item.id)}
            href={`#${item.id}`}
          >
            {current === item.id && <span className="sidebar-active-dot">○ </span>}
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  )
}
