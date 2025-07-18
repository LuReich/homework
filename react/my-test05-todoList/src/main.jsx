import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TodoListLayout from './pages/TodoListLayout.jsx'

createRoot(document.getElementById('root')).render(
  <TodoListLayout/>
)
