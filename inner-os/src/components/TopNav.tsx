import type { PageId } from '../types'
import { profile } from '../data/content'

const TABS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

interface Props {
  current: PageId
  onNavigate: (page: PageId) => void
}

export default function TopNav({ current, onNavigate }: Props) {
  return (
    <nav className="pf-nav">
      <button className="pf-brand" onClick={() => onNavigate('home')}>
        {profile.name}
      </button>
      <div className="pf-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`pf-tab${current === t.id ? ' is-active' : ''}`}
            onClick={() => onNavigate(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <a className="pf-btn pf-btn-primary pf-btn-sm" href="/inner-os/resume.pdf" target="_blank" rel="noreferrer">
        Resume
      </a>
    </nav>
  )
}
