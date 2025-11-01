import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppWrapper from './AppWrapper.jsx'
import { registerSW } from 'virtual:pwa-register'

// Apply saved theme before rendering
const savedTheme = localStorage.getItem('devdock_theme')
if (savedTheme === 'dark') document.documentElement.classList.add('dark')
if (savedTheme === 'light') document.documentElement.classList.remove('dark')

registerSW({ immediate: true })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper>
      <App />
    </AppWrapper>
  </StrictMode>,
)
