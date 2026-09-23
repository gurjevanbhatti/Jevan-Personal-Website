import { useEffect, useState } from 'react'

interface Props {
  windowOpen: boolean
  onToggleWindow: () => void
}

export default function Taskbar({ windowOpen, onToggleWindow }: Props) {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000 * 15)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="taskbar">
      <button className="start-button" onClick={onToggleWindow}>
        <span className="start-flag">🪟</span> Start
      </button>
      <div className="taskbar-tasks">
        <button className={`taskbar-task ${windowOpen ? 'pressed' : ''}`} onClick={onToggleWindow}>
          🖥️ My Showcase
        </button>
      </div>
      <div className="taskbar-clock">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  )
}
