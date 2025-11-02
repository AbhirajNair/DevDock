# DevDock+ – Open Source Developer Toolkit

A modern, offline-capable developer toolkit built with React + Vite and TailwindCSS. Includes JSON utilities, Markdown preview, a Conventional Commit generator, a snippet manager with syntax highlighting, and JSON Diff — all running entirely in the browser.

## ✨ Features

- **JSON Formatter**: Pretty/Minify, JSON ⇄ YAML, clear error messages.
- **Markdown Previewer**: Live two‑pane editor with `react-markdown`, export `.md`, copy markdown.
- **Commit Message Generator**: Type/scope/description, optional body & breaking change, copy Subject/Full.
- **Snippet Saver**: Save/view/delete, tags + search, export/import, Prism syntax highlighting (lazy‑loaded).
- **JSON Diff**: Compare two JSON blobs with added/removed/changed markers.
- **Settings**: Light/Dark theme toggle (persisted), Clear Data, Global Backup/Restore (all `devdock_` keys).
- **PWA**: Installable and works offline (service worker + SPA fallback).



## 🧱 Tech Stack

- React (Vite)
- TailwindCSS v4
- LocalStorage (persistence)
- react-markdown, react-hot-toast, framer-motion, js-yaml
- PWA via `vite-plugin-pwa`
- Testing: Jest + React Testing Library

## 📁 Project Structure

```text
src/
 ┣ components/
 ┃ ┣ JsonFormatter.jsx
 ┃ ┣ MarkdownPreviewer.jsx
 ┃ ┣ CommitMessageGen.jsx
 ┃ ┣ SnippetSaver.jsx
 ┃ ┗ JsonDiff.jsx
 ┣ App.jsx
 ┣ AppWrapper.jsx
 ┣ main.jsx
 ┗ index.css
```

## 🚀 Getting Started

1. Install dependencies

```bash
npm install
```

1. Start the dev server

```bash
npm run dev
```

1. Open the Local URL shown in the terminal.

## 🔧 Scripts

- `npm run dev` — start Vite dev server (PWA dev SW enabled)
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run test` — run Jest + RTL tests

## 📦 PWA & Offline

- Service worker registered with auto‑update and SPA fallback.
- To reliably test offline:
  1. `npm run build`
  2. `npm run preview`
  3. Open in Chrome → DevTools → Application → check Service Worker/Manifest
  4. Network → Offline → refresh

## ☁️ Deployment

- Static site — deploy `dist/` to Netlify or Vercel.
- Netlify: build `npm run build`, publish `dist/`.
- Vercel: detects Vite; output `dist/`.

## ✅ Testing

- Unit/component tests via Jest + RTL.
- Example test: `src/components/__tests__/JsonFormatter.test.jsx`.

```bash
npm run test
```

## 🤝 Contributing

Issues and PRs are welcome! Consider adding:

- JSON Diff side‑by‑side view, Markdown → HTML/PDF export, Command Palette, snippet folders.

## 📜 License

MIT

---

Made with ❤️ for OpenVerse Hackathon
