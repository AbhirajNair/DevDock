import { useEffect, useMemo, useState } from 'react';

const TYPES = ['feat', 'fix', 'refactor', 'docs', 'style'];

export default function CommitMessageGen() {
  const [type, setType] = useState('feat');
  const [scope, setScope] = useState('');
  const [desc, setDesc] = useState('');
  const [body, setBody] = useState('');
  const [breaking, setBreaking] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('devdock_commit') || '{}');
    if (saved.type) setType(saved.type);
    if (saved.scope) setScope(saved.scope);
    if (saved.desc) setDesc(saved.desc);
    if (saved.body) setBody(saved.body);
    if (saved.breaking) setBreaking(saved.breaking);
  }, []);

  useEffect(() => {
    localStorage.setItem('devdock_commit', JSON.stringify({ type, scope, desc, body, breaking }));
  }, [type, scope, desc, body, breaking]);

  const subject = useMemo(() => {
    const s = scope.trim();
    const d = desc.trim();
    const scopePart = s ? `(${s})` : '';
    return d ? `${type}${scopePart}: ${d}` : '';
  }, [type, scope, desc]);

  const fullMessage = useMemo(() => {
    if (!subject) return '';
    const parts = [subject];
    if (body.trim()) parts.push('', body.trim());
    if (breaking.trim()) parts.push('', `BREAKING CHANGE: ${breaking.trim()}`);
    return parts.join('\n');
  }, [subject, body, breaking]);

  const copy = async (text) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid md:grid-cols-3 gap-3">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-zinc-400">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-zinc-400">Scope (optional)</label>
          <input value={scope} onChange={(e) => setScope(e.target.value)} placeholder="ui, api, deps..." />
        </div>
        <div className="flex flex-col gap-2 md:col-span-1">
          <label className="text-sm text-zinc-400">Description</label>
          <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="short imperative summary" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-zinc-400">Body (optional)</label>
          <textarea className="min-h-[120px] p-3 font-mono text-sm" value={body} onChange={(e) => setBody(e.target.value)} placeholder="additional context, motivation, or details" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-zinc-400">Breaking change (optional)</label>
          <textarea className="min-h-[120px] p-3 font-mono text-sm" value={breaking} onChange={(e) => setBreaking(e.target.value)} placeholder="describe breaking changes" />
        </div>
      </div>

      <div className="card p-3 flex items-center justify-between gap-3">
        <code className="font-mono text-sm break-words whitespace-pre-wrap">{fullMessage || 'Enter details to generate a commit message...'}</code>
        <div className="flex gap-2 shrink-0">
          <button onClick={() => copy(subject)} disabled={!subject}>Copy Subject</button>
          <button onClick={() => copy(fullMessage)} disabled={!fullMessage}>{copied ? 'Copied' : 'Copy Full'}</button>
        </div>
      </div>
    </div>
  );
}
