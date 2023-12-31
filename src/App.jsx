import { createSignal } from 'solid-js'
import { TypingPrompt } from './TypingPrompt'
import './App.css'

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <>
      <TypingPrompt />
    </>
  )
}

export default App
