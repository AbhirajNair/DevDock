import { useEffect, useMemo, useState } from 'react';

function isObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v);
}

function formatValue(v) {
  try {
    return JSON.stringify(v, null, 2);
  } catch {
    return String(v);
  }
}

function diffObjects(a, b, basePath = '') {
  const lines = [];
  const aKeys = isObject(a) ? Object.keys(a) : [];
  const bKeys = isObject(b) ? Object.keys(b) : [];
  const keys = Array.from(new Set([...aKeys, ...bKeys])).sort();

  for (const k of keys) {
    const path = basePath ? `${basePath}.${k}` : k;
    const av = a && a[k];
    const bv = b && b[k];
    const aHas = aKeys.includes(k);
    const bHas = bKeys.includes(k);

    if (!aHas && bHas) {
      lines.push({ type: '+', path, a: undefined, b: bv });
      continue;
    }
    if (aHas && !bHas) {
      lines.push({ type: '-', path, a: av, b: undefined });
      continue;
    }

    // both have
    if (isObject(av) && isObject(bv)) {
      lines.push(...diffObjects(av, bv, path));
    } else {
      const aStr = JSON.stringify(av);
      const bStr = JSON.stringify(bv);
      if (aStr !== bStr) {
        lines.push({ type: '~', path, a: av, b: bv });
      }
    }
  }
  return lines;
}

export default function JsonDiff() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [error, setError] = useState('');
  const [diff, setDiff] = useState([]);

  useEffect(() => {
    const sa = localStorage.getItem('devdock_diff_a');
    const sb = localStorage.getItem('devdock_diff_b');
    if (sa) setA(sa);
    if (sb) setB(sb);
  }, []);

  useEffect(() => { localStorage.setItem('devdock_diff_a', a); }, [a]);
  useEffect(() => { localStorage.setItem('devdock_diff_b', b); }, [b]);

  const compare = () => {
    try {
      const ja = JSON.parse(a);
      const jb = JSON.parse(b);
      const lines = diffObjects(ja, jb);
      setDiff(lines);
      setError('');
    } catch (e) {
      setError(e.message);
      setDiff([]);
    }
  };

  const formatA = () => {
    try { setA(JSON.stringify(JSON.parse(a), null, 2)); setError(''); } catch (e) { setError(e.message); }
  };
  const formatB = () => {
    try { setB(JSON.stringify(JSON.parse(b), null, 2)); setError(''); } catch (e) { setError(e.message); }
  };
  const swap = () => { setA(b); setB(a); };
  const clearAll = () => { setA(''); setB(''); setDiff([]); setError(''); };

  const hasDiff = useMemo(() => diff.length > 0, [diff]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">JSON Diff</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-zinc-400">JSON A</label>
          <textarea className="min-h-[220px] p-3 font-mono text-sm" value={a} onChange={(e) => setA(e.target.value)} placeholder="Paste left JSON..." />
          <div className="flex gap-2">
            <button className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800" onClick={formatA}>Format A</button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-zinc-400">JSON B</label>
          <textarea className="min-h-[220px] p-3 font-mono text-sm" value={b} onChange={(e) => setB(e.target.value)} placeholder="Paste right JSON..." />
          <div className="flex gap-2">
            <button className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800" onClick={formatB}>Format B</button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={compare}>Compare</button>
        <button className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800" onClick={swap}>Swap</button>
        <button className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700" onClick={clearAll}>Clear</button>
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-400 border border-red-900 bg-red-950/40 p-2 rounded">{error}</div>
      )}

      <div className="card p-3">
        {!hasDiff && <div className="text-sm text-zinc-400">No differences found or not compared yet.</div>}
        {hasDiff && (
          <pre className="text-sm whitespace-pre-wrap break-words">
            {diff.map((d, i) => {
              const color = d.type === '+' ? 'text-green-400' : d.type === '-' ? 'text-red-400' : 'text-yellow-300';
              const label = d.type === '+' ? '+' : d.type === '-' ? '-' : '~';
              const val = d.type === '~' ? `${formatValue(d.a)} -> ${formatValue(d.b)}` : formatValue(d.type === '+' ? d.b : d.a);
              return (
                <div key={i} className={color}>
                  {label} {d.path}: {val}
                </div>
              );
            })}
          </pre>
        )}
      </div>
    </div>
  );
}
