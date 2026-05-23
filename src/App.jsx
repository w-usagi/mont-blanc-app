import { useEffect, useRef } from "react"

function App() {
  const canvasRef = useRef(null)

  useEffect(() => {

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    canvas.width = 400
    canvas.height = 400

    // =========================
    // 音
    // =========================

    const audioCtx =
      new window.AudioContext()

    function playCutSound() {

      const oscillator =
        audioCtx.createOscillator()

      const gainNode =
        audioCtx.createGain()

      oscillator.connect(gainNode)

      gainNode.connect(
        audioCtx.destination
      )

      oscillator.type = "square"

      oscillator.frequency.value =
        180 + Math.random() * 120

      gainNode.gain.value = 0.03

      oscillator.start()

      oscillator.stop(
        audioCtx.currentTime + 0.03
      )
    }

    // =========================
    // 栗
    // =========================

    const chestnut = {
      x: 200,
      y: 140,
    }

    // =========================
    // フォーク
    // =========================

    const fork = {
      x: 0,
      y: 0,
      visible: false,
    }

    // =========================
    // モンブラン線データ
    // =========================

    const pasteLines = []

    const centerX = 200
    const topY = 120
    const bottomY = 280
    const maxWidth = 140

    // 最初に1回だけ生成
    for (let i = 0; i <= 56; i++) {

      const t =
        (i / 56) * 2 - 1

      const curve =
        Math.cos(
          t * Math.PI / 2
        )

      const x =
        centerX +
        t * maxWidth * 0.5

      const startY =
        topY +
        (1 - curve) * 80

      const lineWidth =
        8 - Math.abs(t) * 4

      pasteLines.push({
        x,
        startY,
        lineWidth,
        cut: false,
      })
    }

    for (let i = 56; i >= 0; i--) {

      const t =
        (i / 56) * 2 - 1

      const curve =
        Math.cos(
          t * Math.PI / 2
        )

      const x =
        centerX +
        t * maxWidth * 0.5

      const startY =
        topY +
        (1 - curve) * 80

      const lineWidth =
        8 - Math.abs(t) * 4

      pasteLines.push({
        x,
        startY,
        lineWidth,
        cut: false,
      })
    }

    // =========================
    // 描画
    // =========================

    function draw() {

      // 全消し
      ctx.clearRect(
        0,
        0,
        400,
        400
      )

      // 背景
      ctx.fillStyle = "#fff8ef"
      ctx.fillRect(
        0,
        0,
        400,
        400
      )

      // =========================
      // 皿
      // =========================

      ctx.fillStyle = "#e78c92"

      ctx.beginPath()
      ctx.ellipse(
        200,
        280,
        180,
        70,
        0,
        0,
        Math.PI * 2
      )
      ctx.fill()

      ctx.fillStyle = "#f8f8f8"

      ctx.beginPath()
      ctx.ellipse(
        200,
        280,
        120,
        45,
        0,
        0,
        Math.PI * 2
      )
      ctx.fill()

      ctx.strokeStyle = "#d8c36a"
      ctx.lineWidth = 4

      ctx.beginPath()
      ctx.ellipse(
        200,
        280,
        180,
        70,
        0,
        0,
        Math.PI * 2
      )
      ctx.stroke()

      // =========================
      // タルト
      // =========================

      ctx.fillStyle = "#b8742f"

      ctx.beginPath()
      ctx.ellipse(
        202,
        290,
        74,
        20,
        0,
        0,
        Math.PI * 2
      )
      ctx.fill()

      const tartGradient =
        ctx.createLinearGradient(
          0,
          260,
          0,
          320
        )

      tartGradient.addColorStop(
        0,
        "#a06b32"
      )

      tartGradient.addColorStop(
        1,
        "#c9872b"
      )

      ctx.fillStyle =
        tartGradient

      ctx.beginPath()
      ctx.ellipse(
        202,
        285,
        76,
        18,
        0,
        0,
        Math.PI * 2
      )
      ctx.fill()

      // =========================
      // モンブラン線
      // =========================

      pasteLines.forEach(
        (line, index) => {

          if (line.cut) return

          const x = line.x
          const y = line.startY

          const gradient =
            ctx.createLinearGradient(
              x,
              y,
              x,
              bottomY
            )

          gradient.addColorStop(
            0,
            "#f0d798"
          )

          gradient.addColorStop(
            0.4,
            "#d8b36a"
          )

          gradient.addColorStop(
            1,
            "#a06b32"
          )

          ctx.strokeStyle =
            gradient

          ctx.lineWidth =
            line.lineWidth

          ctx.lineCap =
            "round"

          ctx.beginPath()

          ctx.moveTo(x, y)

          ctx.bezierCurveTo(
            x +
              Math.sin(
                index * 0.5
              ) * 25,

            y + 40,

            x -
              Math.sin(
                index * 0.5
              ) * 20,

            y + 100,

            x,
            bottomY
          )

          ctx.stroke()
        }
      )

      // =========================
      // 栗
      // =========================

      const chestnutGradient =
        ctx.createLinearGradient(
          chestnut.x - 20,
          chestnut.y - 30,

          chestnut.x + 20,
          chestnut.y + 30
        )

      chestnutGradient.addColorStop(
        0,
        "#b56a2a"
      )

      chestnutGradient.addColorStop(
        0.5,
        "#7a3f16"
      )

      chestnutGradient.addColorStop(
        1,
        "#5a2b12"
      )

      ctx.fillStyle =
        chestnutGradient

      ctx.beginPath()

      ctx.moveTo(
        chestnut.x - 25,
        chestnut.y
      )

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

      // テカリ
      ctx.fillStyle =
        "rgba(255,255,255,0.7)"

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

      // =========================
      // フォーク
      // =========================

      if (fork.visible) {

        ctx.save()

        ctx.translate(
          fork.x,
          fork.y
        )

        ctx.rotate(-0.5)

        // 持ち手
        ctx.fillStyle = "#777"

        ctx.fillRect(
          -50,
          -5,
          70,
          10
        )

        // 先端
        ctx.fillStyle = "#ddd"

        for (
          let i = 0;
          i < 4;
          i++
        ) {

          ctx.fillRect(
            20,
            -14 + i * 8,
            20,
            3
          )
        }

        ctx.restore()
      }
    }

    // 初回描画
    draw()

    // =========================
    // マウス移動
    // =========================

    async function handleMove(e) {

      // ← これ追加
      if (audioCtx.state === "suspended") {
        await audioCtx.resume()
      }

      const rect =
        canvas.getBoundingClientRect()

      fork.x =
        e.clientX - rect.left

      fork.y =
        e.clientY - rect.top

      fork.visible = true

      // 当たり判定
      pasteLines.forEach(
        (line) => {

          if (line.cut) return

          const distance =
            Math.abs(
              line.x - fork.x
            )

          if (
            distance <
              line.lineWidth + 3 &&
            fork.y >
              line.startY &&
            fork.y < bottomY
          ) {

            line.cut = true

            playCutSound()
          }
        }
      )

      draw()
    }

    canvas.addEventListener(
      "mousemove",
      handleMove
    )

    // cleanup
    return () => {

      canvas.removeEventListener(
        "click",
        unlockAudio
      )
    }

    function unlockAudio() {
      audioCtx.resume()
    }

    canvas.addEventListener("click", unlockAudio)

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