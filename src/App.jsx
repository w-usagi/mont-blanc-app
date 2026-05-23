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

      // 影
ctx.fillStyle = "rgba(0,0,0,0.15)"

ctx.beginPath()
ctx.ellipse(210, 320, 110, 35, 0, 0, Math.PI * 2)
ctx.fill()

      // 土台
      ctx.fillStyle = "#d6b48a"
      ctx.beginPath()
      ctx.ellipse(200, 300, 100, 30, 0, 0, Math.PI * 2)
      ctx.fill()

      // モンブラン本体

const centerX = 200
const topY = 120
const bottomY = 280
const maxWidth = 140

// ペースト保存用
const pasteLines = []

for (let i = 0; i < 55; i++) {

  // 左右位置 (-1 ~ 1)
  const t = (i / 54) * 2 - 1

  // 山型シルエット
  const curve = Math.cos(t * Math.PI / 2)

  // x位置
  const x = centerX + t * maxWidth * 0.5

  // 高さ
  const startY =
    topY + (1 - curve) * 80

  // 太さ
  const lineWidth =
    8 - Math.abs(t) * 4

  // 線データ保存
  pasteLines.push({
    x,
    startY,
    lineWidth,
  })
}

// 描画
pasteLines.forEach((line, index) => {

  const x = line.x
  const y = line.startY

  // 色グラデーション
  const gradient = ctx.createLinearGradient(
    x,
    y,
    x,
    bottomY
  )

  gradient.addColorStop(0, "#f0d798")
  gradient.addColorStop(0.4, "#d8b36a")
  gradient.addColorStop(1, "#a06b32")

  ctx.strokeStyle = gradient

  ctx.lineWidth = line.lineWidth

  ctx.lineCap = "round"

  ctx.beginPath()

  // 上から開始
  ctx.moveTo(x, y)

  // モンブランっぽいうねり
  ctx.bezierCurveTo(
    x + Math.sin(index * 0.5) * 25,
    y + 40,

    x - Math.sin(index * 0.5) * 20,
    y + 100,

    x,
    bottomY
  )

  ctx.stroke()
})

// 生クリーム
const creamGradient = ctx.createRadialGradient(
  200,
  115,
  10,
  200,
  115,
  45
)

creamGradient.addColorStop(0, "#ffffff")
creamGradient.addColorStop(1, "#e8dccf")

ctx.fillStyle = creamGradient

ctx.beginPath()
ctx.arc(200, 120, 35, 0, Math.PI * 2)
ctx.fill()

      // 栗グラデーション
const chestnutGradient = ctx.createRadialGradient(
  chestnutX - 5,
  95,
  5,
  chestnutX,
  100,
  25
)

chestnutGradient.addColorStop(0, "#c58a52")
chestnutGradient.addColorStop(1, "#6b3b1d")

ctx.fillStyle = chestnutGradient

ctx.beginPath()
ctx.arc(chestnutX, 85, 20, 0, Math.PI * 2)
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
