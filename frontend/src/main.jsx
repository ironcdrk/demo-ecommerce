import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CategoriesPage from './pages/CategoriesPage.tsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <CategoriesPage />
  </StrictMode>,
)
