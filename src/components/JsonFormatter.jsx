import { useEffect, useState } from 'react';
import yaml from 'js-yaml';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('devdock_json_input');
    if (saved) setInput(saved);
    const savedOut = localStorage.getItem('devdock_json_output');
    if (savedOut) setOutput(savedOut);
  }, []);

  useEffect(() => {
    localStorage.setItem('devdock_json_input', input);
  }, [input]);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      const pretty = JSON.stringify(parsed, null, 2);
      setOutput(pretty);
      setError('');
      localStorage.setItem('devdock_json_output', pretty);
    } catch (e) {
      setError(e.message);
      setOutput('');
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      const compact = JSON.stringify(parsed);
      setOutput(compact);
      setError('');
      localStorage.setItem('devdock_json_output', compact);
    } catch (e) {
      setError(e.message);
      setOutput('');
    }
  };

  const toYAML = () => {
    try {
      const parsed = JSON.parse(input);
      const y = yaml.dump(parsed, { indent: 2, lineWidth: 120 });
      setOutput(y);
      setError('');
      localStorage.setItem('devdock_json_output', y);
    } catch (e) {
      setError(e.message);
      setOutput('');
    }
  };

  const fromYAML = () => {
    try {
      const parsed = yaml.load(input);
      const pretty = JSON.stringify(parsed, null, 2);
      setOutput(pretty);
      setError('');
      localStorage.setItem('devdock_json_output', pretty);
    } catch (e) {
      setError(e.message);
      setOutput('');
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <h2 className="md:col-span-2 text-lg font-semibold">JSON Formatter</h2>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-zinc-400">Input JSON</label>
        <textarea
          className="min-h-[260px] p-3 font-mono text-sm"
          placeholder="Paste messy JSON here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          <button onClick={format}>Format</button>
          <button className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800" onClick={minify}>Minify</button>
          <button className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800" onClick={toYAML}>To YAML</button>
          <button className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800" onClick={fromYAML}>From YAML</button>
          <button className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700" onClick={clearAll}>Clear</button>
        </div>
        {error && (
          <div className="mt-2 text-sm text-red-400 border border-red-900 bg-red-950/40 p-2 rounded">
            {error}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-zinc-400">Formatted Output</label>
        <pre className="scroll-panel min-h-[260px] p-3 font-mono text-sm whitespace-pre-wrap break-all">{output}</pre>
      </div>
    </div>
  );
}
