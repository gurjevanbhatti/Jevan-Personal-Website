import { useRef, useState } from 'react'
import type { PageId } from './types'
import TopNav from './components/TopNav'
import Landing from './pages/Landing'
import About from './pages/About'
import Experience from './pages/Experience'
import Education from './pages/Education'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import './portfolio.css'

export default function Showcase() {
  const [page, setPage] = useState<PageId>('home')
  const bodyRef = useRef<HTMLDivElement>(null)

  const navigate = (next: PageId) => {
    setPage(next)
    bodyRef.current?.scrollTo(0, 0)
  }

  return (
    <div className="pf">
      <TopNav current={page} onNavigate={navigate} />
      <div className="pf-body" ref={bodyRef}>
        {page === 'home' && <Landing onNavigate={navigate} />}
        {page === 'about' && <About onNavigate={navigate} />}
        {page === 'experience' && <Experience />}
        {page === 'education' && <Education />}
        {page === 'projects' && <Projects />}
        {page === 'contact' && <Contact />}
      </div>
    </div>
  )
}
