import { useRef, type ReactNode, type MouseEvent as ReactMouseEvent } from 'react'
import type { WindowState } from '../types'

interface Props {
  title: string
  win: WindowState
  children: ReactNode
  onClose: () => void
  onMinimize: () => void
  onToggleMaximize: () => void
  onMove: (x: number, y: number) => void
}

export default function BrowserWindow({
  title,
  win,
  children,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
}: Props) {
  const dragState = useRef<{ startX: number; startY: number; winX: number; winY: number } | null>(null)

  const handleTitleMouseDown = (e: ReactMouseEvent) => {
    if (win.maximized) return
    dragState.current = { startX: e.clientX, startY: e.clientY, winX: win.x, winY: win.y }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragState.current) return
    const dx = e.clientX - dragState.current.startX
    const dy = e.clientY - dragState.current.startY
    onMove(Math.max(0, dragState.current.winX + dx), Math.max(0, dragState.current.winY + dy))
  }

  const handleMouseUp = () => {
    dragState.current = null
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  if (win.minimized) return null

  const style = win.maximized
    ? { left: 0, top: 0, width: '100%', height: 'calc(100% - 32px)' }
    : { left: win.x, top: win.y, width: win.width, height: win.height }

  return (
    <div className="browser-window" style={style}>
      <div className="title-bar" onMouseDown={handleTitleMouseDown} onDoubleClick={onToggleMaximize}>
        <span className="title-bar-text">🖥️ {title}</span>
        <div className="title-bar-controls">
          <button aria-label="Minimize" onClick={onMinimize}>
            _
          </button>
          <button aria-label="Maximize" onClick={onToggleMaximize}>
            {win.maximized ? '❐' : '□'}
          </button>
          <button aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>
      </div>
      <div className="window-body">{children}</div>
    </div>
  )
}
