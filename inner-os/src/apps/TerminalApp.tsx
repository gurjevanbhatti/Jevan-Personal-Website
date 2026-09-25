import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { profile, education, skills, experience, projects } from '../data/content'
import type { AppId } from '../types'

type Line = { kind: 'in' | 'out' | 'head' | 'dim' | 'para'; text: string }

const PROMPT = 'jevan@desk ~ %'

const COMMANDS = [
  'help', 'whoisjevan', 'experience', 'education',
  'skills', 'projects', 'contact', 'resume', 'open',
  'date', 'clear', 'ls', 'sudo',
]

/* the version I would actually say out loud, about a minute */
const SUMMARY = [
  'I build the infrastructure that machine learning actually runs on. I care as much about whether a system holds up under load as whether the model is clever.',
  'I studied data science at Simon Fraser. In 2024 I spent a summer with the AWS Solution Architect team, deploying serverless services across more than thirty regions. Last year I moved into production engineering with Meta through Major League Hacking, containerizing deployments and standing up monitoring so the whole system could be watched in real time.',
  'In January I start my Master of Science in Data Science at Georgia Tech. What I want next is applied machine learning that has to survive real traffic and real users, not just a clean dataset.',
]

const banner: Line[] = [
  { kind: 'head', text: "Welcome to Jevan's Terminal" },
  { kind: 'dim', text: "type 'help' to see the available commands" },
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
          { kind: 'out', text: '  whoisjevan   a short summary of who I am' },
          { kind: 'out', text: '  experience   roles I have held' },
          { kind: 'out', text: '  education    my educational background' },
          { kind: 'out', text: '  skills       languages, frameworks and tools' },
          { kind: 'out', text: '  projects     selected work' },
          { kind: 'out', text: '  contact      how to reach me' },
          { kind: 'out', text: '  resume       opens my resume PDF' },
          { kind: 'out', text: '  open <app>   launch showcase, vscode, safari or credits' },
          { kind: 'out', text: '  ls           list every command' },
          { kind: 'out', text: '  date         the current date and time' },
          { kind: 'out', text: '  clear        clear the screen' },
          { kind: 'dim', text: '  ↑ ↓ for history, tab to complete' }
        )
        break

      case 'whoisjevan':
        say(
          { kind: 'head', text: profile.name },
          { kind: 'dim', text: profile.title },
          ...SUMMARY.map((text) => ({ kind: 'para' as const, text }))
        )
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
