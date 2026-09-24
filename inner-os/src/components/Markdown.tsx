import { Fragment, type ReactNode } from 'react'

/* A small markdown renderer — enough for the project READMEs, and far nicer to
   read than raw source in the editor. No dependency, no HTML passed through. */

function inline(text: string, key: string): ReactNode {
  const out: ReactNode[] = []
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*/g
  let last = 0
  let m: RegExpExecArray | null
  let i = 0

  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const k = `${key}-${i++}`
    if (m[1]) {
      out.push(
        <a key={k} href={m[2]} target="_blank" rel="noreferrer">
          {m[1]}
        </a>
      )
    } else if (m[3]) {
      out.push(<strong key={k}>{m[3]}</strong>)
    } else if (m[4]) {
      out.push(<code key={k}>{m[4]}</code>)
    } else if (m[5]) {
      out.push(<em key={k}>{m[5]}</em>)
    }
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

export default function Markdown({ source }: { source: string }) {
  const lines = source.replace(/<[^>]+>/g, '').split('\n')
  const blocks: ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // fenced code
    if (line.trimStart().startsWith('```')) {
      const body: string[] = []
      i++
      while (i < lines.length && !lines[i].trimStart().startsWith('```')) {
        body.push(lines[i])
        i++
      }
      i++
      blocks.push(
        <pre key={`c${i}`}>
          <code>{body.join('\n')}</code>
        </pre>
      )
      continue
    }

    const heading = /^(#{1,4})\s+(.*)$/.exec(line)
    if (heading) {
      const level = heading[1].length
      const Tag = (['h1', 'h2', 'h3', 'h4'] as const)[level - 1]
      blocks.push(<Tag key={`h${i}`}>{inline(heading[2], `h${i}`)}</Tag>)
      i++
      continue
    }

    // lists — a continuation line is one that is indented
    const bullet = /^\s*[-*]\s+(.*)$/
    const ordered = /^\s*\d+\.\s+(.*)$/
    if (bullet.test(line) || ordered.test(line)) {
      const isOrdered = ordered.test(line)
      const re = isOrdered ? ordered : bullet
      const items: string[] = []
      while (i < lines.length) {
        const hit = re.exec(lines[i])
        if (hit) {
          items.push(hit[1])
          i++
        } else if (/^\s+\S/.test(lines[i]) && items.length) {
          items[items.length - 1] += ' ' + lines[i].trim()
          i++
        } else break
      }
      const List = isOrdered ? 'ol' : 'ul'
      blocks.push(
        <List key={`l${i}`}>
          {items.map((t, n) => (
            <li key={n}>{inline(t, `l${i}-${n}`)}</li>
          ))}
        </List>
      )
      continue
    }

    if (!line.trim()) {
      i++
      continue
    }

    // paragraph — gather until a blank line
    const para: string[] = []
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|\s*[-*]\s|\s*\d+\.\s)/.test(lines[i]) && !lines[i].trimStart().startsWith('```')) {
      para.push(lines[i].trim())
      i++
    }
    blocks.push(<p key={`p${i}`}>{inline(para.join(' '), `p${i}`)}</p>)
  }

  return (
    <div className="md">
      {blocks.map((b, n) => (
        <Fragment key={n}>{b}</Fragment>
      ))}
    </div>
  )
}
