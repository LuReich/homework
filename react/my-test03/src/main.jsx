import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CardBoard from './pages/CardBoard.jsx'

createRoot(document.getElementById('root')).render(
  <CardBoard/>
)
