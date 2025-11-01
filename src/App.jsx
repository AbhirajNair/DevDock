import { useState } from 'react'
import JsonFormatter from './components/JsonFormatter.jsx'
import MarkdownPreviewer from './components/MarkdownPreviewer.jsx'
import CommitMessageGen from './components/CommitMessageGen.jsx'
import SnippetSaver from './components/SnippetSaver.jsx'
import Settings from './components/Settings.jsx'
import JsonDiff from './components/JsonDiff.jsx'

const TABS = [
  { id: 'json', label: 'JSON Formatter', component: JsonFormatter },
  { id: 'markdown', label: 'Markdown Previewer', component: MarkdownPreviewer },
  { id: 'commit', label: 'Commit Message Generator', component: CommitMessageGen },
  { id: 'snippets', label: 'Snippet Saver', component: SnippetSaver },
  { id: 'diff', label: 'JSON Diff', component: JsonDiff },
]

export default function App() {
  const [active, setActive] = useState('json')
  const [showSettings, setShowSettings] = useState(false)
  const ActiveComp = TABS.find(t => t.id === active)?.component ?? JsonFormatter

  return (
    <div className="min-h-full flex flex-col">
      <header className="border-b border-zinc-800 bg-zinc-950/60 sticky top-0 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="text-xl font-semibold tracking-tight">DevDock</div>
          <nav className="hidden sm:flex gap-2">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={
                  `px-3 py-2 rounded-md border ${active === tab.id ? 'bg-blue-600 border-blue-500/20' : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800'}`
                }
              >
                {tab.label}
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
        <div className="max-w-6xl mx-auto px-4 py-6">
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
    </div>
  )
}
