import { useEffect, useMemo, useRef, useState } from 'react'
import * as monaco from 'monaco-editor'
import Markdown from '../components/Markdown'
import editorWorker from 'monaco-editor/editor/editor.worker.js?worker'
import tsWorker from 'monaco-editor/language/typescript/ts.worker.js?worker'
import cssWorker from 'monaco-editor/language/css/css.worker.js?worker'

/* Real files. RED SEA is the cmd-f team project, pulled from the repo it lives
   in. The .tsx is a piece of this very site. */
import rsReadme from '../data/code/redsea/README.md?raw'
import rsApp from '../data/code/redsea/app.py?raw'
import rsMap from '../data/code/redsea/Map.js?raw'
import rsSafety from '../data/code/redsea/WomenSafety.js?raw'
import frameSrc from '../components/SafariFrame.tsx?raw'

self.MonacoEnvironment = {
  getWorker(_: unknown, label: string) {
    if (label === 'typescript' || label === 'javascript') return new tsWorker()
    if (label === 'css') return new cssWorker()
    return new editorWorker()
  },
}

interface FileNode {
  kind: 'file'
  name: string
  path: string
  lang: string
  code: string
}
interface FolderNode {
  kind: 'folder'
  name: string
  children: FileNode[]
}
type Node = FileNode | FolderNode

const TREE: Node[] = [
  {
    kind: 'folder',
    name: 'red-sea',
    children: [
      {
        kind: 'file',
        name: 'README.md',
        path: '~/portfolio/red-sea/README.md',
        lang: 'markdown',
        code: rsReadme,
      },
      {
        kind: 'file',
        name: 'app.py',
        path: '~/portfolio/red-sea/backend/app.py',
        lang: 'python',
        code: rsApp,
      },
      {
        kind: 'file',
        name: 'Map.js',
        path: '~/portfolio/red-sea/frontend/pages/Map.js',
        lang: 'javascript',
        code: rsMap,
      },
      {
        kind: 'file',
        name: 'WomenSafety.js',
        path: '~/portfolio/red-sea/frontend/pages/WomenSafety.js',
        lang: 'javascript',
        code: rsSafety,
      },
    ],
  },
  {
    kind: 'folder',
    name: 'this-website',
    children: [
      {
        kind: 'file',
        name: 'SafariFrame.tsx',
        path: '~/portfolio/this-website/SafariFrame.tsx',
        lang: 'typescript',
        code: frameSrc,
      },
    ],
  },
]

const flatten = (nodes: Node[]): FileNode[] =>
  nodes.flatMap((n) => (n.kind === 'file' ? [n] : n.children))

const FILES = flatten(TREE)

/* ---------- little icons ---------- */

const DocIcon = ({ tint }: { tint: string }) => (
  <svg viewBox="0 0 16 16" className="vsc-doc" aria-hidden>
    <path
      d="M4 1.5h5.2L13 5.3V14a.5.5 0 0 1-.5.5h-8A.5.5 0 0 1 4 14V2a.5.5 0 0 1 .5-.5Z"
      fill="none"
      stroke={tint}
      strokeWidth="1.2"
    />
    <path d="M9 1.6V5.5h4" fill="none" stroke={tint} strokeWidth="1.2" />
  </svg>
)

const FolderIcon = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 16 16" className="vsc-doc" aria-hidden>
    <path
      d={
        open
          ? 'M1.5 12.5V4a.5.5 0 0 1 .5-.5h3.6l1.4 1.6H14a.5.5 0 0 1 .5.5v1H4.2L1.5 12.5Z'
          : 'M1.5 13V4a.5.5 0 0 1 .5-.5h3.6l1.4 1.6H14a.5.5 0 0 1 .5.5V13a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5Z'
      }
      fill="none"
      stroke="#7fa8d6"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
)

const tintFor = (name: string) =>
  name.endsWith('.py')
    ? '#e0559a'
    : name.endsWith('.md')
    ? '#c98ea0'
    : name.endsWith('.js')
    ? '#d9a441'
    : '#7fa8d6'

const LANG_LABEL: Record<string, string> = {
  python: 'Python',
  markdown: 'Markdown',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
}

const ACTIVITY = [
  { id: 'files', d: 'M2 5.2V3.4a.6.6 0 0 1 .6-.6h3.1l1.5 1.7h9.2a.6.6 0 0 1 .6.6v9.5a.6.6 0 0 1-.6.6H2.6a.6.6 0 0 1-.6-.6V5.2Z' },
  { id: 'search', d: 'M8.6 14.2a5.6 5.6 0 1 0 0-11.2 5.6 5.6 0 0 0 0 11.2ZM12.8 12.8 17 17' },
  { id: 'git', d: 'M6 4.6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 6.8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8-6.8a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM6 8.6v2.8m8-2.8c0 2.6-2.4 3.1-4.6 3.4' },
  { id: 'ext', d: 'M3 3h5.4v5.4H3V3Zm8.6 0H17v5.4h-5.4V3ZM3 11.6h5.4V17H3v-5.4Zm8.6 0H17V17h-5.4v-5.4Z' },
]

export default function VSCodeApp() {
  const host = useRef<HTMLDivElement>(null)
  const editor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const [openTabs, setOpenTabs] = useState<string[]>([FILES[0].path])
  const [active, setActive] = useState(FILES[0].path)
  const [expanded, setExpanded] = useState<string[]>(['red-sea'])
  const [pane, setPane] = useState('files')

  const file = useMemo(() => FILES.find((f) => f.path === active) ?? FILES[0], [active])
  const isDoc = file.lang === 'markdown'

  useEffect(() => {
    if (!host.current) return
    monaco.editor.defineTheme('jevan-pink', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: 'ef9fc2', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'd6338a', fontStyle: 'bold' },
        { token: 'string', foreground: '1faa62' },
        { token: 'number', foreground: 'dd8a2a' },
        { token: 'type', foreground: '8b5cc7' },
        { token: 'type.identifier', foreground: '8b5cc7' },
        { token: 'delimiter', foreground: 'b07b93' },
        { token: 'tag', foreground: 'd6338a' },
        { token: 'attribute.name', foreground: '8b5cc7' },
        { token: 'attribute.value', foreground: '1faa62' },
      ],
      colors: {
        'editor.background': '#fffcfd',
        'editor.foreground': '#3c2f36',
        'editorLineNumber.foreground': '#f2bed3',
        'editorLineNumber.activeForeground': '#d6338a',
        'editor.selectionBackground': '#fbdcea',
        'editor.lineHighlightBackground': '#fff5f9',
        'editorCursor.foreground': '#d6338a',
        'editorIndentGuide.background1': '#fbeaf1',
        'editorWidget.background': '#fff5f9',
        'scrollbarSlider.background': '#f7d3e2',
        'scrollbarSlider.hoverBackground': '#f0b6cf',
      },
    })

    editor.current = monaco.editor.create(host.current, {
      value: FILES[0].code,
      language: FILES[0].lang,
      theme: 'jevan-pink',
      fontSize: 12.5,
      fontFamily: "'Space Mono', ui-monospace, monospace",
      lineHeight: 21,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 4,
      renderLineHighlight: 'line',
      padding: { top: 14, bottom: 14 },
      scrollbar: { verticalScrollbarSize: 9, horizontalScrollbarSize: 9 },
    })
    return () => editor.current?.dispose()
  }, [])

  useEffect(() => {
    const ed = editor.current
    if (!ed) return
    ed.setValue(file.code)
    const model = ed.getModel()
    if (model) monaco.editor.setModelLanguage(model, file.lang)
    ed.setScrollTop(0)
  }, [file])

  const openFile = (path: string) => {
    setOpenTabs((t) => (t.includes(path) ? t : [...t, path]))
    setActive(path)
  }

  const closeTab = (path: string) => {
    setOpenTabs((prev) => {
      const rest = prev.filter((t) => t !== path)
      if (path === active && rest.length) setActive(rest[rest.length - 1])
      return rest.length ? rest : [FILES[0].path]
    })
    if (openTabs.length === 1) setActive(FILES[0].path)
  }

  const toggle = (name: string) =>
    setExpanded((e) => (e.includes(name) ? e.filter((x) => x !== name) : [...e, name]))

  return (
    <div className="vsc">
      {/* title bar */}
      <div className="vsc-title">
        <span className="vsc-path">{file.path}</span>
      </div>

      <div className="vsc-body">
        {/* activity bar */}
        <div className="vsc-activity">
          {ACTIVITY.map((a) => (
            <button
              key={a.id}
              className={`vsc-act ${pane === a.id ? 'on' : ''}`}
              onClick={() => setPane(a.id)}
              aria-label={a.id}
            >
              <svg viewBox="0 0 20 20" aria-hidden>
                <path d={a.d} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>

        {/* sidebar */}
        <div className="vsc-side">
          <div className="vsc-side-head">Explorer</div>
          <div className="vsc-workspace">JEVAN-WORKSPACE</div>

          {pane === 'files' ? (
            <div className="vsc-tree">
              {TREE.map((n) =>
                n.kind === 'file' ? (
                  <button
                    key={n.path}
                    className={`vsc-row ${active === n.path ? 'on' : ''}`}
                    onClick={() => openFile(n.path)}
                  >
                    <DocIcon tint={tintFor(n.name)} />
                    <span>{n.name}</span>
                  </button>
                ) : (
                  <div key={n.name}>
                    <button className="vsc-row folder" onClick={() => toggle(n.name)}>
                      <FolderIcon open={expanded.includes(n.name)} />
                      <span>{n.name}</span>
                    </button>
                    {expanded.includes(n.name) &&
                      n.children.map((c) => (
                        <button
                          key={c.path}
                          className={`vsc-row nested ${active === c.path ? 'on' : ''}`}
                          onClick={() => openFile(c.path)}
                          title={c.name}
                        >
                          <DocIcon tint={tintFor(c.name)} />
                          <span>{c.name}</span>
                        </button>
                      ))}
                  </div>
                )
              )}
            </div>
          ) : null}
        </div>

        {/* editor column */}
        <div className="vsc-main">
          <div className="vsc-tabs">
            {openTabs.map((path) => {
              const f = FILES.find((x) => x.path === path)
              if (!f) return null
              return (
                <div
                  key={path}
                  className={`vsc-tab ${path === active ? 'on' : ''}`}
                  onMouseDown={() => setActive(path)}
                  title={path}
                >
                  <DocIcon tint={tintFor(f.name)} />
                  <span>{f.name}</span>
                  <button
                    className="vsc-tab-x"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => closeTab(path)}
                    aria-label={`Close ${f.name}`}
                  >
                    ✕
                  </button>
                </div>
              )
            })}
          </div>

          <div className="vsc-editorwrap">
            <div
              ref={host}
              className="vsc-editor"
              style={{ display: isDoc ? 'none' : 'block' }}
            />
            {isDoc && <Markdown source={file.code} />}
          </div>

          <div className="vsc-status">
            <span>{LANG_LABEL[file.lang] ?? file.lang}</span>
            <span>UTF-8</span>
            <span className="vsc-status-note">
              {isDoc
                ? 'project notes'
                : 'real source, go ahead and edit it, nothing saves'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
