import { useState } from 'react'
import type { WindowState } from './types'
import BrowserWindow from './components/BrowserWindow'
import Taskbar from './components/Taskbar'
import Showcase from './Showcase'
import { profile } from './data/content'
import './win98.css'

const initialWindow: WindowState = {
  x: 60,
  y: 40,
  width: 860,
  height: 560,
  minimized: false,
  maximized: false,
}

function App() {
  const [win, setWin] = useState<WindowState>(initialWindow)
  const [closed, setClosed] = useState(false)

  const toggleWindow = () => {
    if (closed) {
      setClosed(false)
      setWin((w) => ({ ...w, minimized: false }))
      return
    }
    setWin((w) => ({ ...w, minimized: !w.minimized }))
  }

  return (
    <div className="desktop">
      <div className="desktop-icons">
        <button className="desktop-icon" onDoubleClick={() => setClosed(false)}>
          <div className="desktop-icon-glyph">🖥️</div>
          <div className="desktop-icon-label">My Showcase</div>
        </button>
        <button className="desktop-icon">
          <div className="desktop-icon-glyph">💻</div>
          <div className="desktop-icon-label">My Computer</div>
        </button>
        <button className="desktop-icon">
          <div className="desktop-icon-glyph">🗑️</div>
          <div className="desktop-icon-label">Recycle Bin</div>
        </button>
      </div>

      {!closed && (
        <BrowserWindow
          title={`${profile.name} - ${profile.showcaseYear}`}
          win={win}
          onClose={() => setClosed(true)}
          onMinimize={() => setWin((w) => ({ ...w, minimized: true }))}
          onToggleMaximize={() => setWin((w) => ({ ...w, maximized: !w.maximized }))}
          onMove={(x, y) => setWin((w) => ({ ...w, x, y }))}
        >
          <Showcase />
        </BrowserWindow>
      )}

      <Taskbar windowOpen={!closed && !win.minimized} onToggleWindow={toggleWindow} />
    </div>
  )
}

export default App
