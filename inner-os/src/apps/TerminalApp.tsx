import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { profile, education, skills, experience, projects } from '../data/content'
import type { AppId } from '../types'

type Line = { kind: 'in' | 'out' | 'head' | 'dim'; text: string }

const PROMPT = 'jevan@desk ~ %'

const COMMANDS = [
  'help', 'whoami', 'about', 'experience', 'education',
  'skills', 'projects', 'contact', 'resume', 'open',
  'date', 'clear', 'ls', 'sudo',
]

const banner: Line[] = [
  { kind: 'head', text: `${profile.name}, ${profile.location}` },
  { kind: 'dim', text: "type 'help' to see what this thing does" },
]

export default function TerminalApp({ onOpen }: { onOpen: (id: AppId) => void }) {
  const [lines, setLines] = useState<Line[]>(banner)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [hIndex, setHIndex] = useState(-1)

  const scroller = useRef<HTMLDivElement>(null)
  const field = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight
  }, [lines])

  const say = (...out: Line[]) => setLines((l) => [...l, ...out])

  const run = (raw: string) => {
    const cmd = raw.trim()
    say({ kind: 'in', text: cmd })
    if (!cmd) return

    setHistory((h) => [...h, cmd])
    setHIndex(-1)

    const [name, ...args] = cmd.split(/\s+/)

    switch (name.toLowerCase()) {
      case 'help':
        say(
          { kind: 'head', text: 'commands' },
          { kind: 'out', text: '  whoami       who you are talking to' },
          { kind: 'out', text: '  about        the short version' },
          { kind: 'out', text: '  experience   where I have worked' },
          { kind: 'out', text: '  education    school' },
          { kind: 'out', text: '  skills       languages, frameworks, tools' },
          { kind: 'out', text: '  projects     what I have built' },
          { kind: 'out', text: '  contact      how to reach me' },
          { kind: 'out', text: '  resume       opens the PDF' },
          { kind: 'out', text: '  open <app>   showcase | vscode | safari | credits' },
          { kind: 'out', text: '  ls, date, clear' },
          { kind: 'dim', text: '  ↑ ↓ for history, tab to complete' }
        )
        break

      case 'whoami':
        say(
          { kind: 'out', text: profile.name },
          { kind: 'dim', text: `${profile.title} · ${profile.location}` }
        )
        break

      case 'about':
        say({ kind: 'out', text: profile.bio })
        break

      case 'experience':
      case 'work':
        experience.forEach((e) => {
          say(
            { kind: 'head', text: `${e.role} @ ${e.company}` },
            { kind: 'dim', text: e.date }
          )
          e.bullets.slice(0, 3).forEach((b) => say({ kind: 'out', text: `  · ${b}` }))
        })
        break

      case 'education':
        education.forEach((e) =>
          say(
            { kind: 'head', text: e.school },
            { kind: 'out', text: `  ${e.degree}` },
            { kind: 'dim', text: `  ${e.location} · ${e.date}` }
          )
        )
        break

      case 'skills':
        Object.entries(skills).forEach(([group, items]) =>
          say(
            { kind: 'head', text: group },
            { kind: 'out', text: `  ${(items as string[]).join(', ')}` }
          )
        )
        break

      case 'projects':
        projects.forEach((p) => {
          say(
            { kind: 'head', text: p.name },
            { kind: 'dim', text: `${p.subtitle} · ${p.date}` },
            { kind: 'out', text: `  ${p.tech.join(' · ')}` }
          )
        })
        say({ kind: 'dim', text: "the code is in VS Code. try 'open vscode'" })
        break

      case 'contact':
        say(
          { kind: 'out', text: `email      ${profile.email}` },
          { kind: 'out', text: `github     ${profile.github}` },
          { kind: 'out', text: `linkedin   ${profile.linkedin}` }
        )
        break

      case 'resume':
        window.open('/inner-os/resume.pdf', '_blank', 'noopener')
        say({ kind: 'out', text: 'opening resume.pdf…' })
        break

      case 'open': {
        const map: Record<string, AppId> = {
          showcase: 'showcase',
          vscode: 'vscode',
          code: 'vscode',
          safari: 'search',
          search: 'search',
          credits: 'credits',
        }
        const target = map[(args[0] ?? '').toLowerCase()]
        if (target) {
          onOpen(target)
          say({ kind: 'out', text: `opening ${args[0]}…` })
        } else {
          say({ kind: 'out', text: 'open what? showcase | vscode | safari | credits' })
        }
        break
      }

      case 'ls':
        say({ kind: 'out', text: COMMANDS.join('   ') })
        break

      case 'date':
        say({ kind: 'out', text: new Date().toString() })
        break

      case 'clear':
        setLines([])
        break

      case 'sudo':
        say({ kind: 'dim', text: 'nice try' })
        break

      default:
        say({ kind: 'out', text: `${name}: command not found. try 'help'` })
    }
  }

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input)
      setInput('')
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const next = hIndex < 0 ? history.length - 1 : Math.max(0, hIndex - 1)
      setHIndex(next)
      setInput(history[next])
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (hIndex < 0) return
      const next = hIndex + 1
      if (next >= history.length) {
        setHIndex(-1)
        setInput('')
      } else {
        setHIndex(next)
        setInput(history[next])
      }
      return
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      const hit = COMMANDS.find((c) => c.startsWith(input.trim()) && input.trim())
      if (hit) setInput(hit + ' ')
    }
  }

  return (
    <div className="term" onMouseDown={() => field.current?.focus()}>
      <div className="term-body" ref={scroller}>
        {lines.map((l, i) =>
          l.kind === 'in' ? (
            <p key={i} className="term-in">
              <span className="term-prompt">{PROMPT}</span> {l.text}
            </p>
          ) : (
            <p key={i} className={`term-${l.kind}`}>{l.text}</p>
          )
        )}

        <p className="term-line">
          <span className="term-prompt">{PROMPT}</span>
          <input
            ref={field}
            className="term-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoComplete="off"
            autoFocus
            aria-label="Terminal input"
          />
        </p>
      </div>
    </div>
  )
}
