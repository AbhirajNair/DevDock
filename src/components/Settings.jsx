import { useEffect, useState } from 'react';

export default function Settings({ onClose }) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('devdock_theme');
    if (saved === 'dark') setDarkMode(true);
    else if (saved === 'light') setDarkMode(false);
    else setDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('devdock_theme', next ? 'dark' : 'light');
  };

  const clearData = () => {
    if (confirm('Clear all local data?')) localStorage.clear();
  };

  // Backup only keys belonging to DevDock
  const backup = () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('devdock_')) data[k] = localStorage.getItem(k);
    }
    const blob = new Blob([JSON.stringify({ __devdock__: true, data }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'devdock-backup.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const importRef = typeof window !== 'undefined' ? document.createElement('input') : null;
  if (importRef) {
    importRef.type = 'file';
    importRef.accept = 'application/json';
    importRef.onchange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(String(ev.target?.result ?? 'null'));
          if (parsed && parsed.__devdock__ && parsed.data && typeof parsed.data === 'object') {
            Object.entries(parsed.data).forEach(([k, v]) => localStorage.setItem(String(k), String(v)));
            // update current theme immediately if provided
            const theme = parsed.data['devdock_theme'];
            if (theme === 'dark') document.documentElement.classList.add('dark');
            if (theme === 'light') document.documentElement.classList.remove('dark');
            alert('Backup imported successfully.');
          } else {
            alert('Invalid backup file.');
          }
        } catch {
          alert('Failed to import backup.');
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    };
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative card w-full max-w-md p-4">
        <div className="text-lg font-semibold mb-3">Settings</div>
        <div className="flex gap-2 mb-3">
          <button onClick={toggleTheme} className="bg-zinc-800 hover:bg-zinc-700 border-zinc-700">
            Toggle {darkMode ? 'Light' : 'Dark'} Mode
          </button>
          <button onClick={clearData} className="bg-red-600 hover:bg-red-500 border-red-500/20">
            Clear Data
          </button>
          <button onClick={backup} className="bg-green-600 hover:bg-green-500 border-green-500/20">Backup</button>
          <button onClick={() => importRef && importRef.click()} className="bg-blue-600">Restore</button>
        </div>
        <div className="text-right">
          <button onClick={onClose} className="bg-blue-600">Close</button>
        </div>
      </div>
    </div>
  );
}
