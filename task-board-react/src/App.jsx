import { useState } from 'react'
import List from './components/List.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="bg-gray-100 text-gray-800 p-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Le mie attività</h1>
          </header>
          <List />
        </div>
      </div>
  )
}

export default App
