import { useState, type FormEvent } from 'react'

const SHORTCUTS = [
  { label: 'My GitHub', url: 'https://github.com/gurjevanbhatti' },
  { label: 'Georgia Tech', url: 'https://www.gatech.edu/' },
  { label: 'Simon Fraser University', url: 'https://www.sfu.ca/' },
]

export default function SearchApp() {
  const [q, setQ] = useState('')
  const [last, setLast] = useState<string | null>(null)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const query = q.trim()
    if (!query) return
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank', 'noopener')
    setLast(query)
  }

  return (
    <div className="search-app">
      <h1 className="search-wordmark">SEARCH</h1>
      <p className="search-sub">the web, from 2026</p>

      <form onSubmit={submit} className="search-form">
        <input
          className="search-input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Type a search and press enter…"
          autoComplete="off"
        />
        <button className="pixel-button" type="submit">Go</button>
      </form>

      {last && (
        <p className="search-note">
          Opened results for <b>{last}</b> in a new tab.
        </p>
      )}

      <div className="search-shortcuts">
        <p className="search-sub">Bookmarks</p>
        {SHORTCUTS.map((s) => (
          <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="search-link">
            {s.label}
          </a>
        ))}
      </div>

      <p className="search-fineprint">
        Results open in a new tab — search engines block being displayed inside another page.
      </p>
    </div>
  )
}
