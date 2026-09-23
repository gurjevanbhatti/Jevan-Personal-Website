import { useRef, useState } from 'react'
import { profile } from '../data/content'

const DOCS: Record<string, string> = {
  'Cover Letter.doc': `<h2>Hello —</h2>
<p>I'm ${profile.name}, a software engineer finishing a B.S. in Data Science at Simon Fraser
University and starting a Master's in Data Science at Georgia Tech.</p>
<p>I've spent the last couple of years on the unglamorous half of systems: deployment pipelines,
containers, monitoring, and cloud architecture that has to stay up. At Amazon I deployed Lambdas
across 30+ regions handling 330,000 requests per second. At Meta, through Major League Hacking,
I built a production Flask and MySQL template with CI/CD, Prometheus and Grafana wired in.</p>
<p>I like problems where the correct answer is boring and load-bearing. I also like building
things like this website.</p>
<p>— ${profile.name}<br/>${profile.email}</p>`,

  'Notes.txt': `TODO
-----------------------------
[x] rebuild portfolio
[x] make the computer pink
[x] put resume on the desk
[ ] decide what colour the mug should be
[ ] stop changing the chair`,
}

export default function WordApp() {
  const [open, setOpen] = useState<string>('Cover Letter.doc')
  const body = useRef<HTMLDivElement>(null)
  const cmd = (c: string) => {
    document.execCommand(c, false)
    body.current?.focus()
  }

  return (
    <div className="word-app">
      <div className="word-toolbar">
        <button className="pixel-button sm" onClick={() => cmd('bold')}><b>B</b></button>
        <button className="pixel-button sm" onClick={() => cmd('italic')}><i>I</i></button>
        <button className="pixel-button sm" onClick={() => cmd('underline')}><u>U</u></button>
        <span className="word-sep" />
        {Object.keys(DOCS).map((name) => (
          <button
            key={name}
            className={`pixel-button sm ${name === open ? 'on' : ''}`}
            onClick={() => setOpen(name)}
          >
            {name}
          </button>
        ))}
        <span className="word-sep" />
        <a className="pixel-button sm" href="/inner-os/resume.pdf" target="_blank" rel="noreferrer">
          Resume.pdf
        </a>
      </div>
      <div
        key={open}
        ref={body}
        className="word-page"
        contentEditable
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: DOCS[open] }}
      />
      <div className="word-status">{open} — editable, nothing is saved</div>
    </div>
  )
}
