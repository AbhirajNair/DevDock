import { useState } from 'react'
import { Code2, FileCode, GitCommit, BookOpenText, Diff } from 'lucide-react'
import JsonFormatter from './components/JsonFormatter.jsx'
import MarkdownPreviewer from './components/MarkdownPreviewer.jsx'
import CommitMessageGen from './components/CommitMessageGen.jsx'
import SnippetSaver from './components/SnippetSaver.jsx'
import Settings from './components/Settings.jsx'
import JsonDiff from './components/JsonDiff.jsx'
import CommandPalette from './components/CommandPalette.jsx'

const TABS = [
  { id: 'json', label: 'JSON Formatter', icon: FileCode, sub: 'Prettify, minify, and convert between JSON and YAML', component: JsonFormatter },
  { id: 'markdown', label: 'Markdown Previewer', icon: BookOpenText, sub: 'Live editor with export, copy, and print to PDF', component: MarkdownPreviewer },
  { id: 'commit', label: 'Commit Message Generator', icon: GitCommit, sub: 'Conventional commits with body and breaking change', component: CommitMessageGen },
  { id: 'snippets', label: 'Snippet Saver', icon: Code2, sub: 'Save code with tags, search, export/import, highlighting', component: SnippetSaver },
  { id: 'diff', label: 'JSON Diff', icon: Diff, sub: 'Compare two JSON blobs with side-by-side changes', component: JsonDiff },
]

export default function App() {
  const [active, setActive] = useState('json')
  const [showSettings, setShowSettings] = useState(false)
  const [showPalette, setShowPalette] = useState(false)
  const activeTab = TABS.find(t => t.id === active)
  const ActiveComp = activeTab?.component ?? JsonFormatter

  // Ctrl/Cmd+K to open command palette
  if (typeof window !== 'undefined') {
    window.__devdock_keybind_initialized ||= (() => {
      window.addEventListener('keydown', (e) => {
        const isMac = navigator.platform.toUpperCase().includes('MAC')
        if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault()
          const el = document.activeElement
          if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.getAttribute('contenteditable') === 'true')) return
          const evt = new CustomEvent('devdock:toggle-cmd')
          window.dispatchEvent(evt)
        }
      })
      return true
    })()
    // palette toggle listener
    window.__devdock_toggle_listener ||= (() => {
      const handler = () => setShowPalette((v) => !v)
      window.addEventListener('devdock:toggle-cmd', handler)
      return true
    })()
  }

  const commands = [
    ...TABS.map(t => ({ id: `tab:${t.id}`, label: `Go to: ${t.label}`, action: () => setActive(t.id) })),
    { id: 'settings', label: 'Open Settings', action: () => setShowSettings(true) },
  ]

  return (
    <div className="min-h-full flex flex-col light-gradient dark:dark-gradient">
      <header className="border-b border-zinc-800 bg-zinc-950/60 sticky top-0 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xl font-semibold tracking-tight">
            <Code2 className="w-5 h-5 text-blue-500" />
            <span>DevDock</span>
          </div>
          <nav className="hidden sm:flex gap-2">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={
                  `px-3 py-2 rounded-md border inline-flex items-center gap-2 ${active === tab.id ? 'bg-blue-600 border-blue-500/20' : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800'}`
                }
              >
                {tab.icon ? <tab.icon className="w-4 h-4" /> : null}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800" onClick={() => setShowSettings(true)}>Settings</button>
          </div>
        </div>
        <div className="sm:hidden px-4 pb-3">
          <select
            className="w-full"
            value={active}
            onChange={(e) => setActive(e.target.value)}
          >
            {TABS.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
          {activeTab && (
            <div className="flex items-start gap-3">
              {activeTab.icon ? <activeTab.icon className="w-6 h-6 text-blue-400 mt-1" /> : null}
              <div>
                <h1 className="text-xl font-semibold">{activeTab.label}</h1>
                {activeTab.sub && <p className="text-sm text-zinc-400">{activeTab.sub}</p>}
              </div>
            </div>
          )}
          <div className="card p-4">
            <ActiveComp />
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-800 bg-zinc-950/60">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-sm text-zinc-400">
          Made with ❤️ for OpenVerse Hackathon
        </div>
      </footer>
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
      {showPalette && (
        <CommandPalette
          commands={commands}
          onClose={() => setShowPalette(false)}
          onRun={(cmd) => { setShowPalette(false); cmd.action?.() }}
        />
      )}
    </div>
  )
}
