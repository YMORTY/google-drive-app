import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css' // Ensure this is imported

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-4 bg-blue-500 text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div className="p-4 bg-green-500">Item 1</div>
      <div className="p-4 bg-red-500">Item 2</div>
      <div className="p-4 bg-yellow-500">Item 3</div>
      <div className="p-4 bg-purple-500">Item 4</div>
    </div>
  )
}

export default App