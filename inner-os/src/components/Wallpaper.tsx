import { useEffect, useRef } from 'react'

export type WallpaperId = 'stars' | 'bubbles' | 'aurora' | 'grid' | 'plain'

export const WALLPAPERS: { id: WallpaperId; name: string }[] = [
  { id: 'stars', name: 'Starfield' },
  { id: 'bubbles', name: 'Bubblegum' },
  { id: 'aurora', name: 'Aurora' },
  { id: 'grid', name: 'Retro Grid' },
  { id: 'plain', name: 'Plain' },
]

export default function Wallpaper({ variant }: { variant: WallpaperId }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0, h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = cv.clientWidth; h = cv.clientHeight
      cv.width = w * dpr; cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const rnd = (a: number, b: number) => a + Math.random() * (b - a)
    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random(), y: Math.random(), r: rnd(0.6, 2.0), s: rnd(0.2, 0.9), p: Math.random() * 6.3,
    }))
    const bubbles = Array.from({ length: 26 }, () => ({
      x: Math.random(), y: Math.random(), r: rnd(10, 46), v: rnd(4, 14), d: rnd(-6, 6), o: rnd(0.18, 0.5),
    }))

    let t = 0
    const draw = () => {
      t += 1 / 60
      ctx.clearRect(0, 0, w, h)

      if (variant === 'plain') {
        ctx.fillStyle = '#eef0f5'
        ctx.fillRect(0, 0, w, h)
      }

      if (variant === 'stars') {
        const g = ctx.createLinearGradient(0, 0, 0, h)
        g.addColorStop(0, '#2b1633'); g.addColorStop(0.55, '#5c2b52'); g.addColorStop(1, '#b3648f')
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h)
        for (const s of stars) {
          const x = ((s.x + t * 0.004 * s.s) % 1) * w
          const y = s.y * h
          const tw = 0.55 + 0.45 * Math.sin(t * 2 + s.p)
          ctx.globalAlpha = tw
          ctx.fillStyle = '#fff'
          ctx.beginPath(); ctx.arc(x, y, s.r, 0, 6.3); ctx.fill()
          if (s.r > 1.5) {
            ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(x - s.r * 3, y); ctx.lineTo(x + s.r * 3, y)
            ctx.moveTo(x, y - s.r * 3); ctx.lineTo(x, y + s.r * 3)
            ctx.stroke()
          }
        }
        ctx.globalAlpha = 1
      }

      if (variant === 'bubbles') {
        const g = ctx.createLinearGradient(0, 0, w, h)
        g.addColorStop(0, '#ffe3f1'); g.addColorStop(1, '#dfe7ff')
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h)
        for (const b of bubbles) {
          const y = h - (((b.y * h + t * b.v) % (h + 120)) - 60)
          const x = b.x * w + Math.sin(t * 0.6 + b.y * 9) * b.d * 3
          ctx.globalAlpha = b.o
          ctx.fillStyle = '#ff8fc7'
          ctx.beginPath(); ctx.arc(x, y, b.r, 0, 6.3); ctx.fill()
          ctx.globalAlpha = b.o * 0.9
          ctx.fillStyle = '#fff'
          ctx.beginPath(); ctx.arc(x - b.r * 0.32, y - b.r * 0.34, b.r * 0.18, 0, 6.3); ctx.fill()
        }
        ctx.globalAlpha = 1
      }

      if (variant === 'aurora') {
        ctx.fillStyle = '#16121f'; ctx.fillRect(0, 0, w, h)
        const bands = [
          { c: 'rgba(246,188,217,0.40)', k: 0.9, o: 0 },
          { c: 'rgba(160,190,255,0.32)', k: 1.4, o: 2.1 },
          { c: 'rgba(255,214,234,0.24)', k: 0.6, o: 4.2 },
        ]
        bands.forEach((b, i) => {
          ctx.beginPath()
          ctx.moveTo(0, h)
          for (let x = 0; x <= w; x += 8) {
            const y = h * (0.42 + i * 0.12)
              + Math.sin(x * 0.006 * b.k + t * 0.7 + b.o) * 38
              + Math.sin(x * 0.013 + t * 0.4 + b.o) * 16
            ctx.lineTo(x, y)
          }
          ctx.lineTo(w, h); ctx.closePath()
          ctx.fillStyle = b.c; ctx.fill()
        })
      }

      if (variant === 'grid') {
        const g = ctx.createLinearGradient(0, 0, 0, h)
        g.addColorStop(0, '#1b1026'); g.addColorStop(0.5, '#3d1b3a'); g.addColorStop(1, '#0d0813')
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h)
        const hz = h * 0.45
        ctx.strokeStyle = 'rgba(246,188,217,0.55)'; ctx.lineWidth = 1
        for (let i = 0; i < 26; i++) {
          const x = (i / 25) * w * 2 - w * 0.5
          ctx.beginPath(); ctx.moveTo(w / 2, hz); ctx.lineTo(x, h); ctx.stroke()
        }
        const off = (t * 26) % 40
        for (let i = 0; i < 24; i++) {
          const p = i / 24
          const y = hz + Math.pow(p, 2.1) * (h - hz) + off * Math.pow(p, 1.6)
          if (y > hz && y < h) {
            ctx.globalAlpha = 0.25 + p * 0.55
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
          }
        }
        ctx.globalAlpha = 1
        ctx.fillStyle = 'rgba(255,170,205,0.85)'
        ctx.beginPath(); ctx.arc(w / 2, hz - 34, 44, 0, 6.3); ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [variant])

  return <canvas ref={ref} className="wallpaper" />
}
