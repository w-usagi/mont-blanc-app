import { useEffect, useRef } from "react"

function App() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    canvas.width = 400
    canvas.height = 400

    let chestnutX = 200

    function draw() {
      // 全消し
      ctx.clearRect(0, 0, 400, 400)

      // 背景
      ctx.fillStyle = "#fff8ef"
      ctx.fillRect(0, 0, 400, 400)

      // 土台
      ctx.fillStyle = "#d6b48a"
      ctx.beginPath()
      ctx.ellipse(200, 300, 100, 30, 0, 0, Math.PI * 2)
      ctx.fill()

      // モンブラン線
      for (let i = 0; i < 80; i++) {
        const x = 120 + Math.random() * 160
        const y = 120 + Math.random() * 140

        ctx.strokeStyle = "#b07a4f"
        ctx.lineWidth = 3

        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + (Math.random() - 0.5) * 10, y + 80)
        ctx.stroke()
      }

      // 栗
      ctx.fillStyle = "#7a4a24"
      ctx.beginPath()
      ctx.arc(chestnutX, 100, 20, 0, Math.PI * 2)
      ctx.fill()
    }

    draw()

    // クリック
    function handleClick() {
      chestnutX += 20

      console.log("clicked")

      draw()
    }

    canvas.addEventListener("click", handleClick)

    // 後片付け
    return () => {
      canvas.removeEventListener("click", handleClick)
    }

    // canvas.addEventListener("click", () => {
    //   chestnutX += 20
    //   draw()
    // })
  }, [])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "40px",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          border: "2px solid #ccc",
        }}
      />
    </div>
  )
}

export default App

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
