import { useEffect, useState } from 'react'

const MENUS = ['File', 'Edit', 'View', 'Window', 'Help']

export default function MenuBar({ activeTitle }: { activeTitle: string }) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="menubar">
      <div className="menubar-left">
        <span className="menubar-mark">✦</span>
        <span className="menubar-app">{activeTitle}</span>
        {MENUS.map((m) => (
          <span className="menubar-item" key={m}>{m}</span>
        ))}
      </div>
      <div className="menubar-right">
        <span className="menubar-glyph">▮▮▮</span>
        <span className="menubar-glyph">100%</span>
        <span>{now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}</span>
        <span>{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  )
}
