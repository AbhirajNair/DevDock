import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';

const DEFAULT_MD = `# Welcome to DevDock

- Live markdown editing
- Preview on the right

> Built for the OpenVerse Hackathon ✨`;

export default function MarkdownPreviewer() {
  const [text, setText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('devdock_md');
    setText(saved ?? DEFAULT_MD);
  }, []);

  useEffect(() => {
    localStorage.setItem('devdock_md', text);
  }, [text]);

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Markdown copied');
    } catch {
      toast.error('Copy failed');
    }
  };

  const exportMarkdown = () => {
    try {
      const blob = new Blob([text], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'devdock.md';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success('Markdown exported');
    } catch {
      toast.error('Export failed');
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="md:col-span-2 flex gap-2 mb-2">
        <button className="bg-green-600 hover:bg-green-500 border-green-500/20" onClick={exportMarkdown}>Export .md</button>
        <button className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800" onClick={copyMarkdown}>Copy Markdown</button>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-zinc-400">Markdown</label>
        <textarea
          className="min-h-[320px] p-3 font-mono text-sm"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-zinc-400">Preview</label>
        <div className="card scroll-panel p-4 min-h-[320px] space-y-3 leading-relaxed">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
