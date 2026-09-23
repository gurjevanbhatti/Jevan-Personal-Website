import { useEffect, useState } from 'react'
import { APPS } from '../apps'
import type { AppId, WindowState } from '../types'

interface Props {
  windows: WindowState[]
  activeId: AppId | null
  startOpen: boolean
  onToggleStart: () => void
  onTaskClick: (id: AppId) => void
}

export default function Taskbar({ windows, activeId, startOpen, onToggleStart, onTaskClick }: Props) {
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 15000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="taskbar">
      <button
        className={`start-button ${startOpen ? 'pressed' : ''}`}
        onMouseDown={(e) => { e.stopPropagation(); onToggleStart() }}
      >
        <span className="start-flag">🪟</span> Start
      </button>
      <div className="taskbar-tasks">
        {windows.map((w) => {
          const def = APPS.find((a) => a.id === w.id)!
          return (
            <button
              key={w.id}
              className={`taskbar-task ${w.id === activeId && !w.minimized ? 'pressed' : ''}`}
              onClick={() => onTaskClick(w.id)}
            >
              {def.icon} {def.title}
            </button>
          )
        })}
      </div>
      <div className="taskbar-clock">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  )
}
