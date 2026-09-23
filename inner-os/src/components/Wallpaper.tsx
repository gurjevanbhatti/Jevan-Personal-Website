import { useEffect, useRef } from 'react'

export type WallpaperId = 'marble' | 'glitter' | 'water' | 'blossom' | 'notes' | 'plain'

export const WALLPAPERS: { id: WallpaperId; name: string }[] = [
  { id: 'marble', name: 'Pastel Marble' },
  { id: 'glitter', name: 'Rose Glitter' },
  { id: 'water', name: 'Sunlit Water' },
  { id: 'blossom', name: 'Blossom' },
  { id: 'notes', name: 'Notes' },
  { id: 'plain', name: 'Plain' },
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

const star = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, k = 0.2) => {
  ctx.beginPath()
  ctx.moveTo(cx, cy - r)
  ctx.quadraticCurveTo(cx + r * k, cy - r * k, cx + r, cy)
  ctx.quadraticCurveTo(cx + r * k, cy + r * k, cx, cy + r)
  ctx.quadraticCurveTo(cx - r * k, cy + r * k, cx - r, cy)
  ctx.quadraticCurveTo(cx - r * k, cy - r * k, cx, cy - r)
  ctx.closePath()
  ctx.fill()
}

const EQUATIONS = [
  'F = ma', 'p = mv', 'J = ∫F dt = Δp', 'Eₖ = ½mv²', 'a꜀ = v²/r',
  'Σ F = dp/dt', 'W = ∫ F·dx', 'U = mgh', 'τ = r × F', 'L = Iω',
  'v = v₀ + at', 'x = x₀ + v₀t + ½at²', 'x꜀ₘ = Σmᵢxᵢ / Σmᵢ',
  'd/dx xⁿ = n xⁿ⁻¹', '∫ xⁿ dx = xⁿ⁺¹/(n+1)', '∇·E = ρ/ε₀',
  'σ² = E[(X − μ)²]', 'P(A|B) = P(B|A)P(A) / P(B)', 'ŷ = Xβ + ε',
  'MSE = (1/n) Σ(yᵢ − ŷᵢ)²', 'θ ← θ − α∇J(θ)', 'Var(X) = E[X²] − E[X]²',
]

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

      if (variant === 'plain') {
        ctx.fillStyle = '#eef0f5'
        ctx.fillRect(0, 0, w, h)
        return
      }

      if (variant === 'marble' || variant === 'water') {
        // per-pixel field rendered at reduced scale, then upscaled (both are smooth)
        const sc = 0.32
        const bw = Math.max(2, Math.round(w * sc))
        const bh = Math.max(2, Math.round(h * sc))
        const img = ctx.createImageData(bw, bh)
        const d = img.data

        const marbleStops: { p: number; c: RGB }[] = [
          { p: 0.00, c: [252, 226, 236] },
          { p: 0.22, c: [248, 196, 214] },
          { p: 0.42, c: [236, 214, 240] },
          { p: 0.60, c: [206, 232, 232] },
          { p: 0.78, c: [252, 232, 206] },
          { p: 1.00, c: [255, 246, 238] },
        ]
        const waterStops: { p: number; c: RGB }[] = [
          { p: 0.00, c: [246, 226, 228] },
          { p: 0.45, c: [252, 238, 240] },
          { p: 0.72, c: [255, 250, 250] },
          { p: 1.00, c: [255, 255, 255] },
        ]

        for (let y = 0; y < bh; y++) {
          for (let x = 0; x < bw; x++) {
            const u = (x / bw) * 5.5
            const v = (y / bh) * 3.2
            let t: number
            if (variant === 'marble') {
              const q1 = fbm(u, v, 11)
              const q2 = fbm(u + 3.1, v + 1.7, 23)
              const r1 = fbm(u + 4 * q1, v + 4 * q2, 37)
              t = fbm(u + 4 * r1, v + 4 * r1 * 0.6, 51)
              t = Math.min(1, Math.max(0, (t - 0.18) / 0.62))
            } else {
              const rip =
                Math.sin(u * 5.2 + fbm(u, v, 7) * 7) * 0.5 +
                Math.sin(v * 7.4 + fbm(u * 1.6, v * 1.6, 19) * 9) * 0.5
              t = 0.5 + rip * 0.32
              t = Math.min(1, Math.max(0, t))
            }
            const c = ramp(variant === 'marble' ? marbleStops : waterStops, t)
            const i = (y * bw + x) * 4
            d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2]; d[i + 3] = 255
          }
        }
        const off = document.createElement('canvas')
        off.width = bw; off.height = bh
        off.getContext('2d')!.putImageData(img, 0, 0)
        ctx.imageSmoothingEnabled = true
        ctx.drawImage(off, 0, 0, w, h)

        if (variant === 'marble') {
          // gold flecks + stars
          for (let i = 0; i < 900; i++) {
            const x = rnd() * w, y = rnd() * h, r = rnd() * 1.6 + 0.4
            ctx.globalAlpha = 0.25 + rnd() * 0.6
            ctx.fillStyle = rnd() < 0.5 ? '#e7bd63' : '#f6dfa6'
            ctx.beginPath(); ctx.arc(x, y, r, 0, 6.3); ctx.fill()
          }
          for (let i = 0; i < 46; i++) {
            const x = rnd() * w, y = rnd() * h, r = 4 + rnd() * 11
            ctx.globalAlpha = 0.55 + rnd() * 0.4
            ctx.fillStyle = '#e3b451'
            star(ctx, x, y, r, 0.30)
          }
          ctx.globalAlpha = 1
        } else {
          // caustic highlights + bubbles
          ctx.globalCompositeOperation = 'lighter'
          for (let i = 0; i < 160; i++) {
            const x = rnd() * w, y = rnd() * h
            const g = ctx.createRadialGradient(x, y, 0, x, y, 30 + rnd() * 90)
            g.addColorStop(0, 'rgba(255,255,255,0.32)')
            g.addColorStop(1, 'rgba(255,255,255,0)')
            ctx.fillStyle = g
            ctx.fillRect(x - 120, y - 120, 240, 240)
          }
          ctx.globalCompositeOperation = 'source-over'
          for (let i = 0; i < 420; i++) {
            const x = rnd() * w, y = rnd() * h, r = rnd() * 2.2 + 0.4
            ctx.globalAlpha = 0.3 + rnd() * 0.6
            ctx.fillStyle = '#fff'
            ctx.beginPath(); ctx.arc(x, y, r, 0, 6.3); ctx.fill()
          }
          for (let i = 0; i < 40; i++) {
            const x = rnd() * w, y = rnd() * h, r = 5 + rnd() * 16
            ctx.globalAlpha = 0.28
            ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.4
            ctx.beginPath(); ctx.arc(x, y, r, 0, 6.3); ctx.stroke()
          }
          ctx.globalAlpha = 1
        }
        return
      }

      if (variant === 'glitter') {
        const g = ctx.createRadialGradient(w * 0.5, h * 0.42, 0, w * 0.5, h * 0.42, Math.max(w, h) * 0.8)
        g.addColorStop(0, '#f8cfe0')
        g.addColorStop(0.45, '#eeb2ce')
        g.addColorStop(1, '#d391b4')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)

        ctx.globalCompositeOperation = 'lighter'
        for (let i = 0; i < 26; i++) {
          const x = rnd() * w, y = rnd() * h, r = 80 + rnd() * 220
          const b = ctx.createRadialGradient(x, y, 0, x, y, r)
          b.addColorStop(0, `rgba(255,${210 + rnd() * 40 | 0},${225 + rnd() * 30 | 0},0.20)`)
          b.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.fillStyle = b
          ctx.beginPath(); ctx.arc(x, y, r, 0, 6.3); ctx.fill()
        }
        ctx.globalCompositeOperation = 'source-over'

        for (let i = 0; i < 4200; i++) {
          const x = rnd() * w, y = rnd() * h
          const r = rnd() * 1.5 + 0.25
          ctx.globalAlpha = 0.2 + rnd() * 0.7
          const pick = rnd()
          ctx.fillStyle = pick < 0.45 ? '#fff' : pick < 0.8 ? '#ffe8b8' : '#ffc6de'
          ctx.beginPath(); ctx.arc(x, y, r, 0, 6.3); ctx.fill()
        }
        for (let i = 0; i < 70; i++) {
          const x = rnd() * w, y = rnd() * h, r = 3 + rnd() * 12
          ctx.globalAlpha = 0.55 + rnd() * 0.45
          ctx.fillStyle = rnd() < 0.6 ? '#fff' : '#ffe6ad'
          star(ctx, x, y, r, 0.16)
        }
        ctx.globalAlpha = 1
        return
      }

      if (variant === 'blossom') {
        const g = ctx.createLinearGradient(0, 0, 0, h)
        g.addColorStop(0, '#5b3b63')
        g.addColorStop(0.35, '#9c5f83')
        g.addColorStop(0.68, '#e7a9c0')
        g.addColorStop(1, '#f6d7e2')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)

        // light shafts
        ctx.globalCompositeOperation = 'lighter'
        for (let i = 0; i < 14; i++) {
          const x = rnd() * w
          const lg = ctx.createLinearGradient(x, 0, x + 40, h * 0.8)
          lg.addColorStop(0, 'rgba(255,240,220,0.16)')
          lg.addColorStop(1, 'rgba(255,240,220,0)')
          ctx.fillStyle = lg
          ctx.fillRect(x - 30, 0, 80, h * 0.85)
        }
        ctx.globalCompositeOperation = 'source-over'

        // canopy: clusters of soft petals, denser at the top
        for (let i = 0; i < 1400; i++) {
          const x = rnd() * w
          const bias = Math.pow(rnd(), 1.9)
          const y = bias * h * 0.72
          const r = 6 + rnd() * 22
          ctx.globalAlpha = 0.12 + rnd() * 0.30
          const p = rnd()
          ctx.fillStyle = p < 0.4 ? '#f7b7cd' : p < 0.75 ? '#efa0c0' : '#fcd9e6'
          ctx.beginPath(); ctx.arc(x, y, r, 0, 6.3); ctx.fill()
        }
        // trunks
        ctx.globalAlpha = 0.5
        for (let i = 0; i < 7; i++) {
          const x = rnd() * w
          ctx.strokeStyle = '#4b3340'
          ctx.lineWidth = 6 + rnd() * 16
          ctx.beginPath()
          ctx.moveTo(x, h * 0.78)
          ctx.quadraticCurveTo(x + (rnd() - 0.5) * 70, h * 0.4, x + (rnd() - 0.5) * 120, 0)
          ctx.stroke()
        }
        ctx.globalAlpha = 1

        // water band
        const wg = ctx.createLinearGradient(0, h * 0.78, 0, h)
        wg.addColorStop(0, 'rgba(226,190,210,0.85)')
        wg.addColorStop(1, 'rgba(244,222,232,0.95)')
        ctx.fillStyle = wg
        ctx.fillRect(0, h * 0.78, w, h * 0.22)
        ctx.globalAlpha = 0.5
        ctx.strokeStyle = '#fff'
        for (let i = 0; i < 26; i++) {
          const y = h * 0.79 + rnd() * h * 0.2
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(rnd() * w * 0.4, y)
          ctx.lineTo(rnd() * w * 0.4 + w * 0.35, y)
          ctx.stroke()
        }
        ctx.globalAlpha = 1

        // glowing motes
        for (let i = 0; i < 260; i++) {
          const x = rnd() * w, y = rnd() * h * 0.9, r = rnd() * 2.2 + 0.5
          ctx.globalAlpha = 0.35 + rnd() * 0.6
          ctx.fillStyle = '#ffeec4'
          ctx.beginPath(); ctx.arc(x, y, r, 0, 6.3); ctx.fill()
        }
        ctx.globalAlpha = 1
        return
      }

      if (variant === 'notes') {
        ctx.fillStyle = '#07070a'
        ctx.fillRect(0, 0, w, h)
        const gap = 22
        ctx.fillStyle = 'rgba(255,255,255,0.13)'
        for (let y = 0; y < h + gap; y += gap)
          for (let x = 0; x < w + gap; x += gap) ctx.fillRect(x, y, 1.4, 1.4)

        ctx.textBaseline = 'middle'
        const cols = Math.max(3, Math.round(w / 230))
        const rows = Math.max(4, Math.round(h / 110))
        let n = 0
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (rnd() < 0.12) continue
            const cw = w / cols, ch = h / rows
            ctx.save()
            ctx.translate(c * cw + rnd() * cw * 0.4, r * ch + rnd() * ch * 0.7)
            ctx.rotate((rnd() - 0.5) * 0.14)
            ctx.globalAlpha = 0.5 + rnd() * 0.5
            ctx.fillStyle = '#ff5fa2'
            ctx.font = `600 ${17 + rnd() * 12}px Caveat, "Comic Sans MS", cursive`
            ctx.fillText(EQUATIONS[n++ % EQUATIONS.length], 0, 0)
            ctx.restore()
          }
        }
        ctx.globalAlpha = 1
        const vg = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.72)
        vg.addColorStop(0, 'rgba(0,0,0,0)')
        vg.addColorStop(1, 'rgba(0,0,0,0.55)')
        ctx.fillStyle = vg
        ctx.fillRect(0, 0, w, h)
      }
    }

    document.fonts.load('600 28px Caveat').catch(() => undefined).finally(render)

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
