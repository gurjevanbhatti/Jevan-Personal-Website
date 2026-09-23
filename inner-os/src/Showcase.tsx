import { useState } from 'react'
import type { PageId } from './types'
import TopNav from './components/TopNav'
import Landing from './pages/Landing'
import About from './pages/About'
import Experience from './pages/Experience'
import Education from './pages/Education'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

export default function Showcase() {
  const [page, setPage] = useState<PageId>('home')

  return (
    <div className="showcase">
      <TopNav current={page} onNavigate={setPage} />
      <div className="showcase-body">
        {page === 'home' && <Landing onNavigate={setPage} />}
        {page === 'about' && <About onNavigate={setPage} />}
        {page === 'experience' && <Experience />}
        {page === 'education' && <Education />}
        {page === 'projects' && <Projects />}
        {page === 'contact' && <Contact />}
      </div>
    </div>
  )
}
