import { useState } from 'react'
import './App.css'

const data = [
  { id: '1', title: 'Learn React', isComplete: false },
  { id: '2', title: 'Build a Todo App', isComplete: false },
  { id: '3', title: 'Read JavaScript Documentation', isComplete: true },
  { id: '4', title: 'Write Unit Tests', isComplete: false },
  { id: '5', title: 'Implement Context, isComplete: true '},
  { id: '6', title: 'Create Portfolio Website', isComplete: false },
  { id: '7', title: 'Learn TypeScript', isComplete: false },
  { id: '8', title: 'Refactor Codebase', isComplete: true },
  { id: '9', title: 'Optimize Performance', isComplete: false },
  { id: '10', title: 'Deploy to Production', isComplete: true }
]
function App() {
  const [todos, setTodos] = useState(data)

  return (
    <>


    </>
  )
}

export default App
