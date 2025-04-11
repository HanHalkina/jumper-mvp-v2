import React, { useState } from 'react'
import JumperModel from './components/JumperModel'

export default function App() {
  const [sleeve, setSleeve] = useState('short')
  const [showPocket, setShowPocket] = useState(true)

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
        <button onClick={() => setSleeve('short')}>Short Sleeve</button>
        <button onClick={() => setSleeve('long')}>Long Sleeve</button>
        <button onClick={() => setShowPocket(prev => !prev)}>
          Toggle Pocket
        </button>
      </div>
      <JumperModel sleeve={sleeve} showPocket={showPocket} />
    </div>
  )
}