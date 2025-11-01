import { useEffect, useMemo, useRef, useState } from 'react';

export default function CommandPalette({ commands = [], onClose, onRun }) {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const inputRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(c => c.label.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') return onClose?.();
      if (e.key === 'ArrowDown') { e.preventDefault(); setIndex(i => Math.min(i + 1, Math.max(0, filtered.length - 1))); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setIndex(i => Math.max(i - 1, 0)); }
      if (e.key === 'Enter') {
        const cmd = filtered[index];
        if (cmd) onRun?.(cmd);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [filtered, index, onClose, onRun]);

  useEffect(() => { inputRef.current?.focus(); }, []);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative max-w-xl mx-auto mt-24 card">
        <div className="p-3 border-b border-zinc-800">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setIndex(0); }}
            placeholder="Type a command... (↑/↓ to navigate, Enter to run, Esc to close)"
            className="w-full"
          />
        </div>
        <div className="max-h-80 overflow-auto">
          {filtered.length === 0 && (
            <div className="p-3 text-sm text-zinc-400">No commands</div>
          )}
          {filtered.map((c, i) => (
            <button
              key={c.id}
              className={`w-full text-left px-3 py-2 border-b border-zinc-800 ${i === index ? 'bg-zinc-800' : ''}`}
              onMouseEnter={() => setIndex(i)}
              onClick={() => onRun?.(c)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="p-2 text-right text-xs text-zinc-500">Ctrl/Cmd+K</div>
      </div>
    </div>
  );
}
