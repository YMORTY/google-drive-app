import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
          <div className="p-3 border bg-primary text-white">Item 1</div>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
          <div className="p-3 border bg-success text-white">Item 2</div>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
          <div className="p-3 border bg-danger text-white">Item 3</div>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
          <div className="p-3 border bg-warning text-white">Item 4</div>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
          <div className="p-3 border bg-info text-white">Item 5</div>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
          <div className="p-3 border bg-dark text-white">Item 6</div>
        </div>
      </div>
    </div>
  )
}

export default App
