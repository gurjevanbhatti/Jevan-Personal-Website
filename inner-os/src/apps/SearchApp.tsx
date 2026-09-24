import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from 'react'
import { profile } from '../data/content'
import SafariFrame from '../components/SafariFrame'

const HOME = 'safari://home'

/* The page is Jevan's own artwork. Sizes below are its native pixels; `k`
   scales them to whatever the window is, and the frame stretches to match so
   there is never a band of empty space. */
const W = 1920
const H = 1080

/* logos lifted out of the artwork with their backgrounds removed; the discs
   under them are drawn, so they stay perfectly round at any size. `h` is the
   optical height each mark wants inside the disc. */
const SHORTCUTS = [
  { img: 'github', h: 50, label: 'Github', url: profile.github },
  { img: 'linkedin', h: 49, label: 'Linkedin', url: profile.linkedin },
  { img: 'gt', h: 40, label: 'Georgia Tech', url: 'https://www.gatech.edu/' },
  { img: 'sfu', h: 61, label: 'SFU', url: 'https://www.sfu.ca/' },
  { img: 'email', h: 48, label: 'Email', url: `mailto:${profile.email}` },
  { img: 'resume', h: 59, label: 'Resume', url: '/inner-os/resume.pdf' },
]

interface Tab {
  id: number
  history: string[]
  cursor: number
  q: string
}

let nextTabId = 2
const freshTab = (): Tab => ({ id: nextTabId++, history: [HOME], cursor: 0, q: '' })

/* turn whatever was typed into somewhere to actually go */
function resolve(raw: string): string {
  const t = raw.trim()
  if (!t) return ''
  if (/^(https?|mailto):/i.test(t)) return t
  if (/^[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(t)) return `https://${t}`
  return `https://www.google.com/search?q=${encodeURIComponent(t)}`
}

/* the address bar should read like what you asked for, not a query string */
function pretty(url: string): string {
  const m = url.match(/^https?:\/\/(?:www\.)?google\.[^/]+\/search\?q=([^&]*)/)
  return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : url
}

function tabTitle(url: string): string {
  if (url === HOME) return 'Safari'
  if (url.startsWith('mailto:')) return 'Mail'
  if (url.startsWith('/')) return 'Resume'
  const q = pretty(url)
  if (q !== url) return q
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return 'Safari'
  }
}

const STAR_KEY = 'safari-stars'

export default function SearchApp() {
  const [tabs, setTabs] = useState<Tab[]>([{ id: 1, history: [HOME], cursor: 0, q: '' }])
  const [active, setActive] = useState(1)
  const [addr, setAddr] = useState(HOME)
  const [listening, setListening] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [flash, setFlash] = useState(false)
  const [stars, setStars] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(STAR_KEY) ?? '[]') } catch { return [] }
  })
  const [box, setBox] = useState({ w: W, h: H, k: 1 })

  const viewRef = useRef<HTMLDivElement>(null)
  const recRef = useRef<any>(null)

  const tab = tabs.find((t) => t.id === active) ?? tabs[0]
  const current = tab.history[tab.cursor]

  /* keep the artwork whole at any window size */
  useLayoutEffect(() => {
    const el = viewRef.current
    if (!el) return
    const fit = () => {
      const { width, height } = el.getBoundingClientRect()
      if (width && height) {
        setBox({ w: width, h: height, k: Math.min(width / W, height / H, 1) })
      }
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(t)
  }, [toast])

  const starred = stars.includes(current)
  const toggleStar = () => {
    const next = starred ? stars.filter((u) => u !== current) : [...stars, current]
    setStars(next)
    try { localStorage.setItem(STAR_KEY, JSON.stringify(next)) } catch { /* private mode */ }
    setToast(starred ? 'Removed from favourites' : 'Added to favourites')
  }

  const patch = (id: number, p: Partial<Tab>) =>
    setTabs((prev) => prev.map((t) => (t.id === id ? { ...t, ...p } : t)))

  /* ---- tabs ---- */
  const newTab = () => {
    const t = freshTab()
    setTabs((prev) => [...prev, t])
    setActive(t.id)
    setAddr(HOME)
  }

  const closeTab = (id: number) => {
    setTabs((prev) => {
      const rest = prev.filter((t) => t.id !== id)
      if (rest.length === 0) {
        const t = freshTab()
        setActive(t.id)
        setAddr(HOME)
        return [t]
      }
      if (id === active) {
        const i = prev.findIndex((t) => t.id === id)
        const next = rest[Math.min(i, rest.length - 1)]
        setActive(next.id)
        setAddr(pretty(next.history[next.cursor]))
      }
      return rest
    })
  }

  const selectTab = (id: number) => {
    const t = tabs.find((x) => x.id === id)
    if (!t) return
    setActive(id)
    setAddr(pretty(t.history[t.cursor]))
  }

  /* ---- navigation ---- */
  const visit = (raw: string) => {
    const url = resolve(raw)
    if (!url) return
    window.open(url, '_blank', 'noopener')
    const history = [...tab.history.slice(0, tab.cursor + 1), url]
    patch(tab.id, { history, cursor: history.length - 1 })
    setAddr(pretty(url))
    setToast(`Opened ${url.replace(/^https?:\/\//, '').slice(0, 52)}`)
  }

  const jump = (delta: number) => {
    const to = tab.cursor + delta
    if (to < 0 || to >= tab.history.length) return
    patch(tab.id, { cursor: to, q: '' })
    setAddr(pretty(tab.history[to]))
  }

  /* reload — same as closing this tab and opening it again */
  const reload = () => {
    patch(tab.id, { history: [current], cursor: 0, q: '' })
    setAddr(pretty(current))
    setFlash(true)
    setTimeout(() => setFlash(false), 280)
    if (current !== HOME) window.open(current, '_blank', 'noopener')
  }

  const goHome = () => {
    const history = [...tab.history.slice(0, tab.cursor + 1), HOME]
    patch(tab.id, { history, cursor: history.length - 1, q: '' })
    setAddr(HOME)
  }

  const mic = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) {
      setToast('Voice search needs Chrome, type instead')
      return
    }
    if (listening) {
      recRef.current?.stop()
      return
    }
    const rec = new SR()
    recRef.current = rec
    rec.lang = 'en-US'
    rec.interimResults = true
    rec.onresult = (e: any) => {
      let text = ''
      for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript
      text = text.trim()
      patch(tab.id, { q: text })
      if (e.results[e.results.length - 1].isFinal && text) {
        rec.stop()
        // let the words land in the box before the results open
        setTimeout(() => visit(text), 550)
      }
    }
    rec.onend = () => setListening(false)
    rec.onerror = () => setListening(false)
    rec.start()
    setListening(true)
  }

  const submitAddr = (e: FormEvent) => {
    e.preventDefault()
    visit(addr)
  }

  return (
    <div className="sf">
      {/* ---- tab strip ---- */}
      <div className="sf-tabs">
        {tabs.map((t) => (
          <div
            key={t.id}
            className={`sf-tab ${t.id === active ? 'on' : ''}`}
            onMouseDown={() => selectTab(t.id)}
          >
            <span>{tabTitle(t.history[t.cursor])}</span>
            <button
              className="sf-x"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => closeTab(t.id)}
              title="Close tab"
            >
              ✕
            </button>
          </div>
        ))}
        <button className="sf-plus" onClick={newTab} title="New tab">＋</button>
      </div>

      {/* ---- toolbar ---- */}
      <form className="sf-bar" onSubmit={submitAddr}>
        <button type="button" className="sf-nav" disabled={tab.cursor === 0} onClick={() => jump(-1)} title="Back">⟵</button>
        <button type="button" className="sf-nav" disabled={tab.cursor >= tab.history.length - 1} onClick={() => jump(1)} title="Forward">⟶</button>
        <button type="button" className="sf-nav" onClick={reload} title="Reload">⟳</button>
        <button type="button" className="sf-nav" onClick={goHome} title="Home">⌂</button>
        <div className="sf-url">
          <input
            value={addr}
            onChange={(e) => setAddr(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            aria-label="Address bar"
          />
          <button
            type="button"
            className={`sf-star ${starred ? 'on' : ''}`}
            onClick={toggleStar}
            title={starred ? 'Remove from favourites' : 'Add to favourites'}
            aria-pressed={starred}
          >
            {starred ? '★' : '☆'}
          </button>
        </div>
        <span className="sf-avatar">{profile.name.charAt(0)}</span>
      </form>

      {/* ---- the page ---- */}
      <div className="sf-viewport" ref={viewRef}>
        <SafariFrame w={box.w} h={box.h} k={box.k} />

        <div
          key={tab.id}
          className={`sf-page ${flash ? 'flash' : ''}`}
          style={{ ['--k' as string]: box.k }}
        >
          <img className="sf-word" src="/inner-os/sf/wordmark.png" alt="Safari" draggable={false} />

          <div className={`sf-pill ${listening ? 'live' : ''}`}>
            <svg className="sf-mag" viewBox="0 0 24 24" aria-hidden>
              <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
              <path d="M15.5 15.5 21 21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            <input
              value={tab.q}
              onChange={(e) => patch(tab.id, { q: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && visit(tab.q)}
              placeholder="Ask Safari...."
              spellCheck={false}
              autoComplete="off"
              aria-label="Search"
            />
            <button type="button" className="sf-mic" onClick={mic} title="Voice search" aria-label="Voice search">
              <svg viewBox="0 0 24 24" aria-hidden>
                <rect x="9.2" y="3" width="5.6" height="10.6" rx="2.8" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M5.8 11.4a6.2 6.2 0 0 0 12.4 0M12 17.8v3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="sf-links">
            {SHORTCUTS.map((s) => (
              <a key={s.label} className="sf-hit" href={s.url} target="_blank" rel="noreferrer">
                <span className="sf-disc">
                  <img
                    src={`/inner-os/sf/logo-${s.img}.png`}
                    alt=""
                    style={{ height: s.h * box.k }}
                    draggable={false}
                  />
                </span>
                <span className="sf-label">{s.label}</span>
              </a>
            ))}
          </div>

          {toast && <div className="sf-toast">{toast}</div>}
        </div>
      </div>
    </div>
  )
}
