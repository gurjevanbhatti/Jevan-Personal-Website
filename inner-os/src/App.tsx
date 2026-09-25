import { useState, lazy, Suspense } from 'react'
import { APPS } from './apps'
import type { AppId, WindowState } from './types'
import Window from './components/Window'
import MenuBar from './components/MenuBar'
import Dock from './components/Dock'
import AppIcon from './components/AppIcon'
import Showcase from './Showcase'
import SearchApp from './apps/SearchApp'
import CreditsApp from './apps/CreditsApp'
import Wallpaper, { WALLPAPERS, type WallpaperId } from './components/Wallpaper'
import TerminalApp from './apps/TerminalApp'
import './win98.css'

// Monaco is heavy — only pulled in when VS Code is actually opened
const VSCodeApp = lazy(() => import('./apps/VSCodeApp'))

let nextZ = 10

function App() {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [activeId, setActiveId] = useState<AppId | null>(null)
  const [wallpaper, setWallpaper] = useState<WallpaperId>(() => {
    try {
      const saved = localStorage.getItem('wallpaper') as WallpaperId | null
      return saved && WALLPAPERS.some((x) => x.id === saved) ? saved : 'barbie'
    } catch {
      return 'barbie'
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
        y: 44 + n * 22,
        width: def.width,
        height: def.height,
        z: ++nextZ,
        minimized: false,
        maximized: false,
      }]
    })
    setActiveId(id)
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
    if (!w) { openApp(id); return }
    if (w.minimized || activeId !== id) openApp(id)
    else patch(id, { minimized: true })
  }

  const activeTitle =
    (activeId && APPS.find((a) => a.id === activeId)?.title) || 'Finder'

  const render = (w: WindowState) => {
    const id = w.id
    switch (id) {
      case 'showcase': return <Showcase />
      case 'search':   return <SearchApp />
      case 'credits':  return <CreditsApp />
      case 'terminal': return <TerminalApp onOpen={openApp} />
      case 'vscode':
        return (
          <Suspense fallback={<div className="app-loading">Loading editor…</div>}>
            <VSCodeApp />
          </Suspense>
        )
    }
  }

  return (
    <div className="desktop">
      <Wallpaper variant={wallpaper} />
      <MenuBar activeTitle={activeTitle} wallpaper={wallpaper} onWallpaper={changeWallpaper} />
      <div className="desktop-icons">
        {APPS.map((a) => (
          <button
            key={a.id}
            className="desktop-icon"
            onDoubleClick={() => openApp(a.id)}
            onClick={(e) => e.detail === 0 && openApp(a.id)}
          >
            <div className="desktop-icon-glyph"><AppIcon icon={a.icon} /></div>
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
            {render(w)}
          </Window>
        )
      })}

      <Dock windows={windows} activeId={activeId} onLaunch={onTaskClick} />
    </div>
  )
}

export default App
