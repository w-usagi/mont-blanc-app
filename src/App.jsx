import { useEffect, useRef } from "react"

function App() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    canvas.width = 400
    canvas.height = 400

    let chestnut = {
      x: 200,
      y: 140,
    }

    function draw() {
      // 全消し
      ctx.clearRect(0, 0, 400, 400)

      // 背景
      ctx.fillStyle = "#fff8ef"
      ctx.fillRect(0, 0, 400, 400)

      // ===== 皿 =====

// 皿の外側
ctx.fillStyle = "#e78c92"

ctx.beginPath()
ctx.ellipse(200, 280, 180, 70, 0, 0, Math.PI * 2)
ctx.fill()

// 皿の白部分
ctx.fillStyle = "#f8f8f8"

ctx.beginPath()
ctx.ellipse(200, 280, 120, 45, 0, 0, Math.PI * 2)
ctx.fill()

// 皿の縁
ctx.strokeStyle = "#d8c36a"
ctx.lineWidth = 4

ctx.beginPath()
ctx.ellipse(200, 280, 180, 70, 0, 0, Math.PI * 2)
ctx.stroke()

// タルト側面
ctx.fillStyle = "#b8742f"

ctx.beginPath()
ctx.ellipse(202, 290, 74, 20, 0, 0, Math.PI * 2)
ctx.fill()

// タルト上面
const tartGradient = ctx.createLinearGradient(
  0,
  260,
  0,
  320
)

tartGradient.addColorStop(0, "#a06b32")
tartGradient.addColorStop(1, "#c9872b")

ctx.fillStyle = tartGradient

ctx.beginPath()
ctx.ellipse(202, 285, 76, 18, 0, 0, Math.PI * 2)
ctx.fill()

      // モンブラン本体

const centerX = 200
const topY = 120
const bottomY = 280
const maxWidth = 140

// ペースト保存用
const pasteLines = []

for (let i = 0; i <= 56; i++) {

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

for (let i = 54; i >= 0; i--) {

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
// const creamGradient = ctx.createRadialGradient(
//   200,
//   115,
//   10,
//   200,
//   115,
//   45
// )

// creamGradient.addColorStop(0, "#ffffff")
// creamGradient.addColorStop(1, "#e8dccf")

// ctx.fillStyle = creamGradient

// ctx.beginPath()
// ctx.arc(200, 120, 35, 0, Math.PI * 2)
// ctx.fill()
// ===== 栗 =====

// 栗グラデーション
const chestnutGradient = ctx.createLinearGradient(
  chestnut.x - 20,
  chestnut.y - 30,

  chestnut.x + 20,
  chestnut.y + 30
)

chestnutGradient.addColorStop(0, "#b56a2a")
chestnutGradient.addColorStop(0.5, "#7a3f16")
chestnutGradient.addColorStop(1, "#5a2b12")

ctx.fillStyle = chestnutGradient

ctx.beginPath()

// 栗形状
ctx.moveTo(chestnut.x - 25, chestnut.y)

ctx.bezierCurveTo(
  chestnut.x - 30,
  chestnut.y - 12,

  chestnut.x - 12,
  chestnut.y - 28,

  chestnut.x,
  chestnut.y - 26
)

ctx.bezierCurveTo(
  chestnut.x + 18,
  chestnut.y - 24,

  chestnut.x + 26,
  chestnut.y - 6,

  chestnut.x + 18,
  chestnut.y + 8
)

ctx.bezierCurveTo(
  chestnut.x + 8,
  chestnut.y + 16,

  chestnut.x - 10,
  chestnut.y + 14,

  chestnut.x - 18,
  chestnut.y + 4
)

ctx.fill()

// 栗テカリ
ctx.fillStyle = "rgba(255,255,255,0.75)"

ctx.beginPath()

ctx.ellipse(
  chestnut.x - 8,
  chestnut.y - 20,
  10,
  5,
  -0.7,
  0,
  Math.PI * 2
)

ctx.fill()

    }

    draw()

    // クリック
    function handleClick() {
      chestnut.x += 20

      console.log("clicked")

      draw()
    }

    canvas.addEventListener("click", handleClick)

    // 後片付け
    return () => {
      canvas.removeEventListener("click", handleClick)
    }

    // canvas.addEventListener("click", () => {
    //   chestnut += 20
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
