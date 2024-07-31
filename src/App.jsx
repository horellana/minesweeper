import { useState } from 'react'
// import './App.css'

function Square({ size = 50 }) {
  const styles = {
    "height": `${size}px`,
    "width": `${size}px`,
    "paddingBottom": "20%",
    "backgroundColor": "red",
    "display": "inline-block"
  };


  return (
    <div style={styles}>
      <div>
      </div>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Square/>
    </>
  )
}

export default App
