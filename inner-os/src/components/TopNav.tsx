import type { PageId } from '../types'

interface Props {
  current: PageId
  onNavigate: (page: PageId) => void
}

export default function TopNav({ current, onNavigate }: Props) {
  return (
    <div className="top-nav">
      <a
        href="#home"
        className={current === 'home' ? 'active' : ''}
        onClick={() => onNavigate('home')}
      >
        Home
      </a>
      <a
        href="#contact"
        className={current === 'contact' ? 'active' : ''}
        onClick={() => onNavigate('contact')}
      >
        Contact
      </a>
    </div>
  )
}
