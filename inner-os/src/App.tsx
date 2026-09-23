import { useState, lazy, Suspense } from 'react'
import { APPS } from './apps'
import type { AppId, WindowState } from './types'
import Window from './components/Window'
import Taskbar from './components/Taskbar'
import Showcase from './Showcase'
import SearchApp from './apps/SearchApp'
import WordApp from './apps/WordApp'
import CreditsApp from './apps/CreditsApp'
import DisplayApp from './apps/DisplayApp'
import Wallpaper, { type WallpaperId } from './components/Wallpaper'
import './win98.css'

// Monaco is heavy — only pulled in when VS Code is actually opened
const VSCodeApp = lazy(() => import('./apps/VSCodeApp'))

let nextZ = 10

function App() {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [activeId, setActiveId] = useState<AppId | null>(null)
  const [startOpen, setStartOpen] = useState(false)
  const [wallpaper, setWallpaper] = useState<WallpaperId>(() => {
    try {
      return (localStorage.getItem('wallpaper') as WallpaperId) || 'bubbles'
    } catch {
      return 'bubbles'
    }
  })

  const changeWallpaper = (id: WallpaperId) => {
    setWallpaper(id)
    try { localStorage.setItem('wallpaper', id) } catch { /* private mode */ }
  }

  const openApp = (id: AppId) => {
    const def = APPS.find((a) => a.id === id)
    if (!def) return
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id)
      if (existing) {
        return prev.map((w) => (w.id === id ? { ...w, minimized: false, z: ++nextZ } : w))
      }
      const n = prev.length
      return [...prev, {
        id,
        x: 40 + n * 26,
        y: 30 + n * 22,
        width: def.width,
        height: def.height,
        z: ++nextZ,
        minimized: false,
        maximized: false,
      }]
    })
    setActiveId(id)
    setStartOpen(false)
  }

  const patch = (id: AppId, p: Partial<WindowState>) =>
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, ...p } : w)))

  const closeApp = (id: AppId) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
    setActiveId((prev) => (prev === id ? null : prev))
  }

  const focusApp = (id: AppId) => {
    setActiveId(id)
    patch(id, { z: ++nextZ })
  }

  const onTaskClick = (id: AppId) => {
    const w = windows.find((x) => x.id === id)
    if (!w) return
    if (w.minimized || activeId !== id) openApp(id)
    else patch(id, { minimized: true })
  }

  const render = (id: AppId) => {
    switch (id) {
      case 'showcase': return <Showcase />
      case 'search':   return <SearchApp />
      case 'word':     return <WordApp />
      case 'credits':  return <CreditsApp />
      case 'display':  return <DisplayApp value={wallpaper} onChange={changeWallpaper} />
      case 'vscode':
        return (
          <Suspense fallback={<div className="app-loading">Loading editor…</div>}>
            <VSCodeApp />
          </Suspense>
        )
    }
  }

  return (
    <div className="desktop" onMouseDown={() => setStartOpen(false)}>
      <Wallpaper variant={wallpaper} />
      <div className="desktop-icons">
        {APPS.map((a) => (
          <button
            key={a.id}
            className="desktop-icon"
            onDoubleClick={() => openApp(a.id)}
            onClick={(e) => e.detail === 0 && openApp(a.id)}
          >
            <div className="desktop-icon-glyph">{a.icon}</div>
            <div className="desktop-icon-label">{a.title}</div>
          </button>
        ))}
      </div>

      {windows.map((w) => {
        const def = APPS.find((a) => a.id === w.id)!
        return (
          <Window
            key={w.id}
            win={w}
            title={def.title}
            icon={def.icon}
            active={activeId === w.id}
            onClose={() => closeApp(w.id)}
            onFocus={() => focusApp(w.id)}
            onMinimize={() => patch(w.id, { minimized: true })}
            onToggleMaximize={() => patch(w.id, { maximized: !w.maximized })}
            onMove={(x, y) => patch(w.id, { x, y })}
          >
            {render(w.id)}
          </Window>
        )
      })}

      {startOpen && (
        <>
          <div className="start-backdrop" onMouseDown={() => setStartOpen(false)} />
          <div className="start-menu">
            {APPS.map((a) => (
              <button key={a.id} className="start-item" onClick={() => openApp(a.id)}>
                <span className="start-item-icon">{a.icon}</span>{a.title}
              </button>
            ))}
          </div>
        </>
      )}

      <Taskbar
        windows={windows}
        activeId={activeId}
        startOpen={startOpen}
        onToggleStart={() => setStartOpen((v) => !v)}
        onTaskClick={onTaskClick}
      />
    </div>
  )
}

export default App
