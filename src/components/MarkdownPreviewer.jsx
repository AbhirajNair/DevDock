import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import { Download, Clipboard, FileCode, Printer } from 'lucide-react';

const DEFAULT_MD = `# Welcome to DevDock

- Live markdown editing
- Preview on the right

> Built for the OpenVerse Hackathon ✨`;

export default function MarkdownPreviewer() {
  const [text, setText] = useState('');
  const previewRef = useRef(null);

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

  const getPreviewHTML = () => previewRef.current?.innerHTML || '';

  const exportHTML = () => {
    try {
      const content = getPreviewHTML();
      const html = `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>DevDock Markdown Export</title><style>body{font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:24px;max-width:860px;margin:0 auto;background:#111827;color:#e5e7eb} a{color:#60a5fa} pre,code{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace}</style></head><body>${content}</body></html>`;
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'devdock.html';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success('HTML exported');
    } catch {
      toast.error('Export failed');
    }
  };

  const printPDF = () => {
    const content = getPreviewHTML();
    const html = `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>DevDock Print</title><style>body{font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:24px;max-width:860px;margin:0 auto} a{color:#2563eb} pre,code{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace}</style></head><body>${content}<script>setTimeout(()=>window.print(),50)</script></body></html>`;
    const w = window.open('', '_blank');
    if (!w) return toast.error('Popup blocked');
    w.document.write(html);
    w.document.close();
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
        <button className="bg-green-600 hover:bg-green-500 border-green-500/20 inline-flex items-center gap-2" onClick={exportMarkdown}><Download className="w-4 h-4"/> Export .md</button>
        <button className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 inline-flex items-center gap-2" onClick={copyMarkdown}><Clipboard className="w-4 h-4"/> Copy Markdown</button>
        <button className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 inline-flex items-center gap-2" onClick={exportHTML}><FileCode className="w-4 h-4"/> Export HTML</button>
        <button className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 inline-flex items-center gap-2" onClick={printPDF}><Printer className="w-4 h-4"/> Print / PDF</button>
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
        <div ref={previewRef} className="card scroll-panel p-4 min-h-[320px] space-y-3 leading-relaxed">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
