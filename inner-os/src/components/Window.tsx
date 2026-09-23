import { useRef, type ReactNode, type MouseEvent as ReactMouseEvent } from 'react'
import type { WindowState } from '../types'
import AppIcon from './AppIcon'

interface Props {
  win: WindowState
  title: string
  icon: string
  active: boolean
  children: ReactNode
  onClose: () => void
  onFocus: () => void
  onMinimize: () => void
  onToggleMaximize: () => void
  onMove: (x: number, y: number) => void
}

export default function Window({
  win, title, icon, active, children,
  onClose, onFocus, onMinimize, onToggleMaximize, onMove,
}: Props) {
  const drag = useRef<{ sx: number; sy: number; wx: number; wy: number } | null>(null)

  const onTitleDown = (e: ReactMouseEvent) => {
    onFocus()
    if (win.maximized) return
    drag.current = { sx: e.clientX, sy: e.clientY, wx: win.x, wy: win.y }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }
  const onMouseMove = (e: MouseEvent) => {
    if (!drag.current) return
    onMove(
      Math.max(0, drag.current.wx + (e.clientX - drag.current.sx)),
      Math.max(0, drag.current.wy + (e.clientY - drag.current.sy))
    )
  }
  const onMouseUp = () => {
    drag.current = null
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }


  if (win.minimized) return null

  const style = win.maximized
    ? {
        left: 0,
        top: 'var(--menubar-h)',
        width: '100%',
        height: 'calc(100% - var(--menubar-h) - var(--dock-h))',
        zIndex: win.z,
      }
    : { left: win.x, top: win.y, width: win.width, height: win.height, zIndex: win.z }

  return (
    <div className={`browser-window ${active ? 'active' : ''}`} style={style} onMouseDown={onFocus}>
      <div className="title-bar" onMouseDown={onTitleDown} onDoubleClick={onToggleMaximize}>
        <span className="title-bar-text"><AppIcon icon={icon} className="title-bar-icon" /> {title}</span>
        <div className="title-bar-controls">
          <button aria-label="Minimize" onClick={onMinimize}>_</button>
          <button aria-label="Maximize" onClick={onToggleMaximize}>{win.maximized ? '❐' : '□'}</button>
          <button aria-label="Close" onClick={onClose}>×</button>
        </div>
      </div>
      <div className="window-body">{children}</div>
    </div>
  )
}
