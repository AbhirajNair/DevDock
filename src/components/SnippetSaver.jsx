import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function SnippetSaver() {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [tags, setTags] = useState('');
  const [query, setQuery] = useState('');
  const [snippets, setSnippets] = useState([]);
  const key = 'devdock_snippets_v1';
  const fileInputRef = useRef(null);
  const [style, setStyle] = useState(null);
  const CodeBlock = useMemo(() => lazy(() => import('react-syntax-highlighter').then(m => ({ default: m.Prism }))), []);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    setSnippets(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(snippets));
  }, [snippets]);

  useEffect(() => {
    // lazy-load theme to reduce initial bundle
    import('react-syntax-highlighter/dist/esm/styles/prism').then(m => setStyle(m.dracula)).catch(() => {});
  }, []);

  const add = () => {
    if (!code.trim()) return;
    const tagList = tags.split(',').map(t => t.trim()).filter(Boolean);
    const item = { id: crypto.randomUUID(), title: title.trim() || 'Untitled', code, tags: tagList };
    setSnippets([item, ...snippets]);
    setTitle('');
    setCode('');
    setTags('');
    toast.success('Snippet saved');
  };

  const remove = (id) => {
    setSnippets(snippets.filter(s => s.id !== id));
    toast('Snippet deleted', { icon: '🗑️' });
  };

  const exportSnippets = () => {
    try {
      const blob = new Blob([JSON.stringify(snippets, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'devdock-snippets.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success('Snippets exported');
    } catch {
      toast.error('Export failed');
    }
  };

  const importSnippets = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(String(ev.target?.result ?? 'null'));
        if (Array.isArray(data)) {
          setSnippets(data);
          toast.success('Snippets imported');
        } else {
          toast.error('Invalid file format');
        }
      } catch {
        toast.error('Error reading JSON');
      } finally {
        // reset input so the same file can be chosen again
        e.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  const hasItems = useMemo(() => snippets.length > 0, [snippets]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return snippets;
    return snippets.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q) ||
      (Array.isArray(s.tags) && s.tags.some(t => t.toLowerCase().includes(q)))
    );
  }, [snippets, query]);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="md:col-span-2 flex flex-wrap gap-2 mb-2">
        <button className="bg-green-600 hover:bg-green-500 border-green-500/20" onClick={exportSnippets}>Export</button>
        <button className="bg-blue-600" onClick={() => fileInputRef.current?.click()}>Import</button>
        <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={importSnippets} />
        <div className="ml-auto flex items-center gap-2">
          <input className="w-56" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title, code, tags" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-zinc-400">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Snippet title" />
        <label className="text-sm text-zinc-400">Code</label>
        <textarea className="min-h-[220px] p-3 font-mono text-sm" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Paste code here..." />
        <label className="text-sm text-zinc-400">Tags (comma-separated)</label>
        <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g. react, hooks, api" />
        <div className="flex gap-2">
          <button onClick={add}>Save Snippet</button>
          <button className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700" onClick={() => { setTitle(''); setCode(''); }}>Clear</button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-zinc-400">Saved Snippets</label>
        {!hasItems && (
          <div className="text-sm text-zinc-400">No snippets yet. Save one on the left.</div>
        )}
        <div className="space-y-3">
          {filtered.map(s => (
            <div key={s.id} className="card p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium flex items-center gap-2 flex-wrap">
                  <span>{s.title}</span>
                  {Array.isArray(s.tags) && s.tags.length > 0 && (
                    <span className="flex gap-1 flex-wrap">
                      {s.tags.map(t => (
                        <span key={t} className="px-2 py-0.5 text-xs rounded bg-zinc-800 border border-zinc-700">{t}</span>
                      ))}
                    </span>
                  )}
                </div>
                <button className="bg-red-600 hover:bg-red-500 border-red-500/20" onClick={() => remove(s.id)}>Delete</button>
              </div>
              <div className="scroll-panel max-h-56 rounded-md border border-zinc-800">
                <Suspense fallback={<pre className="p-3 text-sm whitespace-pre-wrap">{s.code}</pre>}>
                  <CodeBlock language="javascript" style={style || undefined} customStyle={{ margin: 0, background: 'transparent' }}>
                    {s.code}
                  </CodeBlock>
                </Suspense>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
