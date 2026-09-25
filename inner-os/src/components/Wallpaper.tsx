import { useEffect, useRef } from 'react'

export type WallpaperId = 'barbie' | 'marble'

export const WALLPAPERS: { id: WallpaperId; name: string }[] = [
  { id: 'barbie', name: 'This Barbie' },
  { id: 'marble', name: 'Pastel Marble' },
]

/* ---------- tiny seeded value-noise / fBm ---------- */
const hash = (x: number, y: number, s: number) => {
  let n = (x * 374761393 + y * 668265263 + s * 1274126177) | 0
  n = (n ^ (n >> 13)) * 1274126177
  return ((n ^ (n >> 16)) >>> 0) / 4294967295
}
const smooth = (t: number) => t * t * (3 - 2 * t)
const vnoise = (x: number, y: number, s: number) => {
  const xi = Math.floor(x), yi = Math.floor(y)
  const xf = x - xi, yf = y - yi
  const u = smooth(xf), v = smooth(yf)
  const a = hash(xi, yi, s), b = hash(xi + 1, yi, s)
  const c = hash(xi, yi + 1, s), d = hash(xi + 1, yi + 1, s)
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v
}
const fbm = (x: number, y: number, s: number, oct = 5) => {
  let sum = 0, amp = 0.5, f = 1
  for (let i = 0; i < oct; i++) {
    sum += vnoise(x * f, y * f, s + i * 17) * amp
    f *= 2
    amp *= 0.5
  }
  return sum
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
type RGB = [number, number, number]
const ramp = (stops: { p: number; c: RGB }[], t: number): RGB => {
  t = Math.max(0, Math.min(1, t))
  for (let i = 0; i < stops.length - 1; i++) {
    const A = stops[i], B = stops[i + 1]
    if (t >= A.p && t <= B.p) {
      const k = (t - A.p) / (B.p - A.p || 1)
      return [lerp(A.c[0], B.c[0], k), lerp(A.c[1], B.c[1], k), lerp(A.c[2], B.c[2], k)]
    }
  }
  return stops[stops.length - 1].c
}

export default function Wallpaper({ variant }: { variant: WallpaperId }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const rnd = (() => {
      let s = 1337
      return () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff)
    })()

    const render = () => {
      const w = cv.clientWidth || 800
      const h = cv.clientHeight || 600
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = w * dpr
      cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      if (variant === 'barbie') {
        ctx.fillStyle = '#fdeaf1'
        ctx.fillRect(0, 0, w, h)

        const size = Math.max(15, Math.round(Math.min(w * 0.03, h * 0.055)))
        ctx.font = `600 ${size}px Fredoka, 'Trebuchet MS', sans-serif`
        ctx.textBaseline = 'alphabetic'

        const head = 'this barbie is an '
        const tail = 'engineer'
        const wHead = ctx.measureText(head).width
        const wTail = ctx.measureText(tail).width
        const x = (w - (wHead + wTail)) / 2
        const y = h / 2

        ctx.fillStyle = '#f2a3c6'
        ctx.fillText(head, x, y)
        ctx.fillStyle = '#ee78ab'
        ctx.fillText(tail, x + wHead, y)

        ctx.strokeStyle = '#ee78ab'
        ctx.lineWidth = Math.max(1, size * 0.06)
        ctx.beginPath()
        ctx.moveTo(x + wHead, y + size * 0.2)
        ctx.lineTo(x + wHead + wTail, y + size * 0.2)
        ctx.stroke()
        return
      }

      // pastel marble: domain-warped fBm, then gold flecks
      const sc = 0.32
      const bw = Math.max(2, Math.round(w * sc))
      const bh = Math.max(2, Math.round(h * sc))
      const img = ctx.createImageData(bw, bh)
      const d = img.data

      const stops: { p: number; c: RGB }[] = [
        { p: 0.0, c: [252, 226, 236] },
        { p: 0.22, c: [248, 196, 214] },
        { p: 0.42, c: [236, 214, 240] },
        { p: 0.6, c: [206, 232, 232] },
        { p: 0.78, c: [252, 232, 206] },
        { p: 1.0, c: [255, 246, 238] },
      ]

      for (let y = 0; y < bh; y++) {
        for (let x = 0; x < bw; x++) {
          const u = (x / bw) * 5.5
          const v = (y / bh) * 3.2
          const q1 = fbm(u, v, 11)
          const q2 = fbm(u + 3.1, v + 1.7, 23)
          const r1 = fbm(u + 4 * q1, v + 4 * q2, 37)
          let t = fbm(u + 4 * r1, v + 4 * r1 * 0.6, 51)
          t = Math.min(1, Math.max(0, (t - 0.18) / 0.62))
          const c = ramp(stops, t)
          const i = (y * bw + x) * 4
          d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2]; d[i + 3] = 255
        }
      }

      const off = document.createElement('canvas')
      off.width = bw
      off.height = bh
      off.getContext('2d')!.putImageData(img, 0, 0)
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(off, 0, 0, w, h)

      for (let i = 0; i < 900; i++) {
        const x = rnd() * w, y = rnd() * h, r = rnd() * 1.6 + 0.4
        ctx.globalAlpha = 0.25 + rnd() * 0.6
        ctx.fillStyle = rnd() < 0.5 ? '#e7bd63' : '#f6dfa6'
        ctx.beginPath(); ctx.arc(x, y, r, 0, 6.3); ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    document.fonts.load('600 28px Fredoka').catch(() => undefined).finally(render)

    let to: number | undefined
    const onResize = () => {
      window.clearTimeout(to)
      to = window.setTimeout(render, 120)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.clearTimeout(to)
      window.removeEventListener('resize', onResize)
    }
  }, [variant])

  return <canvas ref={ref} className="wallpaper" />
}
