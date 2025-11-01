import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      workbox: {
        navigateFallback: 'index.html',
      },
      manifest: {
        name: 'DevDock+',
        short_name: 'DevDock',
        description: 'Offline developer toolkit for JSON, Markdown, Commits & Snippets',
        theme_color: '#111827',
        background_color: '#111827',
        display: 'standalone',
        start_url: '.',
      },
    }),
  ],
})
