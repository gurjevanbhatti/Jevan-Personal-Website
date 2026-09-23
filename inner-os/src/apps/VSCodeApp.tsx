import { useEffect, useRef, useState } from 'react'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/editor/editor.worker.js?worker'
import tsWorker from 'monaco-editor/language/typescript/ts.worker.js?worker'
import cssWorker from 'monaco-editor/language/css/css.worker.js?worker'

// the actual source of this OS — not a mock-up
import showcaseSrc from '../Showcase.tsx?raw'
import contentSrc from '../data/content.ts?raw'
import appSrc from '../App.tsx?raw'
import cssSrc from '../win98.css?raw'

self.MonacoEnvironment = {
  getWorker(_: unknown, label: string) {
    if (label === 'typescript' || label === 'javascript') return new tsWorker()
    if (label === 'css') return new cssWorker()
    return new editorWorker()
  },
}

const FILES = [
  { name: 'Showcase.tsx', lang: 'typescript', code: showcaseSrc },
  { name: 'App.tsx', lang: 'typescript', code: appSrc },
  { name: 'content.ts', lang: 'typescript', code: contentSrc },
  { name: 'win98.css', lang: 'css', code: cssSrc },
]

export default function VSCodeApp() {
  const host = useRef<HTMLDivElement>(null)
  const editor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!host.current) return
    editor.current = monaco.editor.create(host.current, {
      value: FILES[0].code,
      language: FILES[0].lang,
      theme: 'vs-dark',
      fontSize: 12,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
    })
    return () => editor.current?.dispose()
  }, [])

  useEffect(() => {
    const ed = editor.current
    if (!ed) return
    const f = FILES[active]
    ed.setValue(f.code)
    const model = ed.getModel()
    if (model) monaco.editor.setModelLanguage(model, f.lang)
  }, [active])

  return (
    <div className="vscode">
      <div className="vscode-tabs">
        {FILES.map((f, i) => (
          <button
            key={f.name}
            className={`vscode-tab ${i === active ? 'on' : ''}`}
            onClick={() => setActive(i)}
          >
            {f.name}
          </button>
        ))}
      </div>
      <div ref={host} className="vscode-editor" />
      <div className="vscode-status">
        <span>{FILES[active].lang === 'css' ? 'CSS' : 'TypeScript'}</span>
        <span>this is the real source of the site you're looking at — try editing it</span>
      </div>
    </div>
  )
}
