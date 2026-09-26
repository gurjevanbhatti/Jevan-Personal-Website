import { useEffect, useRef, useState } from 'react'
import { WALLPAPERS, type WallpaperId } from './Wallpaper'
import { profile } from '../data/content'

interface Props {
  activeTitle: string
  wallpaper: WallpaperId
  onWallpaper: (id: WallpaperId) => void
}

export default function MenuBar({ activeTitle, wallpaper, onWallpaper }: Props) {
  const [now, setNow] = useState(() => new Date())
  const [open, setOpen] = useState<string | null>(null)
  const bar = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  /* mailto: links do nothing for anyone without a mail app set up, so hand
     over the address instead */
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      const t = document.createElement('textarea')
      t.value = profile.email
      document.body.appendChild(t)
      t.select()
      document.execCommand('copy')
      t.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!open) return
    const away = (e: MouseEvent) => {
      if (bar.current && !bar.current.contains(e.target as globalThis.Node)) setOpen(null)
    }
    document.addEventListener('mousedown', away)
    return () => document.removeEventListener('mousedown', away)
  }, [open])

  const toggle = (name: string) => setOpen((o) => (o === name ? null : name))

  return (
    <div className="menubar" ref={bar}>
      <div className="menubar-left">
        <span className="menubar-mark">✦</span>
        <span className="menubar-app">{activeTitle}</span>

        <span className="menubar-menu">
          <span
            className={`menubar-item ${open === 'view' ? 'on' : ''}`}
            onMouseDown={() => toggle('view')}
          >
            View
          </span>
        {open === 'view' && (
          <div className="menu-drop">
            <div className="menu-drop-head">Wallpaper</div>
            {WALLPAPERS.map((w) => (
              <button
                key={w.id}
                className="menu-drop-item"
                onMouseDown={() => {
                  onWallpaper(w.id)
                  setOpen(null)
                }}
              >
                <span className="menu-tick">{w.id === wallpaper ? '✓' : ''}</span>
                {w.name}
              </button>
            ))}
          </div>
        )}
        </span>

        <span className="menubar-menu">
          <span
            className={`menubar-item ${open === 'help' ? 'on' : ''}`}
            onMouseDown={() => toggle('help')}
          >
            Help
          </span>
        {open === 'help' && (
          <div className="menu-drop">
            <div className="menu-drop-head">Getting around</div>
            <p className="menu-drop-note">
              Everything on this desktop works. Click an app in the dock at the
              bottom, or double-click an icon on the desktop. A good place to
              start is the Terminal: type <b>help</b> and press enter.
            </p>
            <div className="menu-drop-head">Get in touch</div>
            <button className="menu-drop-item" onClick={copyEmail}>
              <span className="menu-tick">{copied ? '✓' : ''}</span>
              {copied ? 'Copied to clipboard' : profile.email}
            </button>
            <button
              className="menu-drop-item"
              onClick={() => {
                window.open(
                  `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`,
                  '_blank',
                  'noopener'
                )
                setOpen(null)
              }}
            >
              <span className="menu-tick" />
              Compose in Gmail
            </button>
          </div>
        )}
        </span>
      </div>

      <div className="menubar-right">
        <button
          className="menubar-exit"
          onClick={() => window.parent?.postMessage({ type: 'exitMonitor' }, '*')}
          title="Zoom back out to the desk"
        >
          <svg viewBox="0 0 16 16" aria-hidden>
            <path
              d="M6.2 9.8 1.8 14.2M6.2 9.8H2.6M6.2 9.8v3.6M9.8 6.2l4.4-4.4M9.8 6.2h3.6M9.8 6.2V2.6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Exit
        </button>
        <span className="menubar-glyph">▮▮▮</span>
        <span className="menubar-glyph">100%</span>
        <span>{now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}</span>
        <span>{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  )
}
