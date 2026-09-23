import { useState } from 'react'
import type { PageId } from './types'
import Sidebar from './components/Sidebar'
import Landing from './pages/Landing'
import About from './pages/About'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

export default function Showcase() {
  const [page, setPage] = useState<PageId>('home')

  if (page === 'home') {
    return <Landing onNavigate={setPage} />
  }

  return (
    <div className="showcase-layout">
      <Sidebar current={page} onNavigate={setPage} />
      <div className="showcase-content">
        {page === 'about' && <About onNavigate={setPage} />}
        {page === 'experience' && <Experience />}
        {page === 'projects' && <Projects />}
        {page === 'contact' && <Contact />}
      </div>
    </div>
  )
}
