import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster 
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'hsl(220 16% 7%)',
          color: 'hsl(225 20% 97%)',
          border: '1px solid hsl(220 10% 15%)',
        },
      }}
    />
  </StrictMode>,
)
