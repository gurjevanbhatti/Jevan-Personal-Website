import { APPS } from '../apps'
import type { AppId, WindowState } from '../types'
import AppIcon from './AppIcon'

interface Props {
  windows: WindowState[]
  activeId: AppId | null
  onLaunch: (id: AppId) => void
}

export default function Dock({ windows, activeId, onLaunch }: Props) {
  return (
    <div className="dock">
      <div className="dock-inner">
        {APPS.map((a) => {
          const open = windows.some((w) => w.id === a.id)
          return (
            <button
              key={a.id}
              className={`dock-item ${a.id === activeId ? 'active' : ''}`}
              title={a.title}
              onClick={() => onLaunch(a.id)}
            >
              <AppIcon icon={a.icon} className="dock-glyph" />
              <span className="dock-tip">{a.title}</span>
              <span className={`dock-dot ${open ? 'on' : ''}`} />
            </button>
          )
        })}
        <span className="dock-divider" />
        <button className="dock-item" title="Recycle Bin" onClick={() => undefined}>
          <span className="dock-glyph">🗑️</span>
          <span className="dock-tip">Recycle Bin</span>
          <span className="dock-dot" />
        </button>
      </div>
    </div>
  )
}
