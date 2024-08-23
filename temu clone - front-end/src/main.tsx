import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoginModal from './TemuUI.tsx'
import Component from './TemuUI.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Component />
    <LoginModal />
  </StrictMode>,
)
