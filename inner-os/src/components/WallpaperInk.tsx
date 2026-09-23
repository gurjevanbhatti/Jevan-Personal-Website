import { useEffect, useRef } from 'react'

/**
 * Original animated wallpaper: layered ink-wash ridges, watercolour blooms,
 * drifting mist and falling blossom petals. All drawn in code.
 */
export default function WallpaperInk() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = cv.clientWidth
      h = cv.clientHeight
      cv.width = w * dpr
      cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const rnd = (a: number, b: number) => a + Math.random() * (b - a)

    const petals = Array.from({ length: 34 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: rnd(3.5, 8),
      fall: rnd(7, 20),
      sway: rnd(10, 34),
      phase: Math.random() * 6.3,
      spin: rnd(-0.7, 0.7),
      hue: rnd(336, 352),
      alpha: rnd(0.55, 0.95),
    }))

    // fixed ridge profiles so the silhouettes stay stable between frames
    const ridges = [
      { base: 0.60, amp: 0.085, k: 1.5, seed: 0.0, col: 'rgba(120,140,128,0.30)', drift: 3 },
      { base: 0.70, amp: 0.070, k: 2.3, seed: 1.7, col: 'rgba(86,106,96,0.34)', drift: 6 },
      { base: 0.82, amp: 0.055, k: 3.1, seed: 3.4, col: 'rgba(56,70,64,0.36)', drift: 10 },
    ]

    const bloom = (cx: number, cy: number, rad: number, col: string, a: number) => {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad)
      g.addColorStop(0, col)
      g.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.globalAlpha = a
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(cx, cy, rad, 0, 6.3)
      ctx.fill()
      ctx.globalAlpha = 1
    }

    let t = 0
    const draw = () => {
      t += 1 / 60

      // paper ground
      const pg = ctx.createLinearGradient(0, 0, 0, h)
      pg.addColorStop(0, '#f6efe3')
      pg.addColorStop(0.55, '#f1e7d8')
      pg.addColorStop(1, '#e8ddcc')
      ctx.fillStyle = pg
      ctx.fillRect(0, 0, w, h)

      // watercolour blooms, slowly breathing
      bloom(w * 0.24 + Math.sin(t * 0.09) * 26, h * 0.30, Math.min(w, h) * 0.40,
        'rgba(228,150,175,0.55)', 0.55 + Math.sin(t * 0.3) * 0.06)
      bloom(w * 0.78 + Math.cos(t * 0.07) * 30, h * 0.26, Math.min(w, h) * 0.34,
        'rgba(150,186,160,0.50)', 0.5 + Math.sin(t * 0.26 + 1.2) * 0.06)
      bloom(w * 0.55 + Math.sin(t * 0.05 + 2) * 20, h * 0.66, Math.min(w, h) * 0.42,
        'rgba(198,176,214,0.36)', 0.42)

      // ink ridges
      ridges.forEach((r) => {
        const off = Math.sin(t * 0.05 + r.seed) * r.drift
        ctx.beginPath()
        ctx.moveTo(0, h)
        for (let x = 0; x <= w; x += 6) {
          const n =
            Math.sin((x / w) * 6.3 * r.k + r.seed) * 0.6 +
            Math.sin((x / w) * 6.3 * r.k * 2.3 + r.seed * 1.7) * 0.3 +
            Math.sin((x / w) * 6.3 * r.k * 4.1 + r.seed * 2.9) * 0.1
          ctx.lineTo(x, h * r.base + n * h * r.amp + off)
        }
        ctx.lineTo(w, h)
        ctx.closePath()
        ctx.fillStyle = r.col
        ctx.fill()
      })

      // drifting mist bands
      for (let i = 0; i < 3; i++) {
        const y = h * (0.56 + i * 0.11) + Math.sin(t * 0.22 + i) * 8
        const x = ((t * (7 + i * 4)) % (w + 500)) - 250
        const g = ctx.createLinearGradient(x - 220, 0, x + 220, 0)
        g.addColorStop(0, 'rgba(255,255,255,0)')
        g.addColorStop(0.5, 'rgba(255,255,255,0.45)')
        g.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = g
        ctx.fillRect(x - 220, y, 440, 26 + i * 8)
      }

      // blossom petals
      for (const p of petals) {
        const py = ((p.y * h + t * p.fall) % (h + 60)) - 30
        const px = p.x * w + Math.sin(t * 0.7 + p.phase) * p.sway
        const rot = t * p.spin + p.phase
        ctx.save()
        ctx.translate(px, py)
        ctx.rotate(rot)
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = `hsl(${p.hue}, 62%, 78%)`
        ctx.beginPath()
        ctx.moveTo(0, -p.r)
        ctx.quadraticCurveTo(p.r * 0.95, -p.r * 0.25, 0, p.r)
        ctx.quadraticCurveTo(-p.r * 0.95, -p.r * 0.25, 0, -p.r)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }
      ctx.globalAlpha = 1

      // soft vignette
      const vg = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.75)
      vg.addColorStop(0, 'rgba(0,0,0,0)')
      vg.addColorStop(1, 'rgba(60,45,35,0.18)')
      ctx.fillStyle = vg
      ctx.fillRect(0, 0, w, h)

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="wallpaper" />
}
