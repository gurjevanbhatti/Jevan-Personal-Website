/* Jevan's frame, sliced so it fits any window shape without dead space.
   The cuts fall on stretches of the ornament that are dead straight, so the
   only thing that ever stretches is a plain line — every scroll, sparkle and
   the heart keep their exact proportions. */

const SRC_W = 1920
const SRC_H = 1080

// column edges, and which columns absorb extra width
const XS = [0, 678, 723, 1188, 1233, SRC_W]
const X_STRETCH = [false, true, false, true, false]

// row edges, and which row absorbs extra height
const YS = [0, 478, 544, SRC_H]
const Y_STRETCH = [false, true, false]

function spans(edges: number[], stretch: boolean[], available: number, k: number) {
  const fixed = edges.slice(0, -1).reduce(
    (sum, e, i) => (stretch[i] ? sum : sum + (edges[i + 1] - e)), 0
  )
  const flexSrc = edges.slice(0, -1).reduce(
    (sum, e, i) => (stretch[i] ? sum + (edges[i + 1] - e) : sum), 0
  )
  const extra = Math.max(flexSrc * k, available - fixed * k)

  let pos = 0
  return edges.slice(0, -1).map((e, i) => {
    const src = edges[i + 1] - e
    const size = stretch[i] ? (extra * src) / flexSrc : src * k
    const cell = { sx: e, sw: src, dx: pos, dw: size }
    pos += size
    return cell
  })
}

export default function SafariFrame({ w, h, k }: { w: number; h: number; k: number }) {
  const cols = spans(XS, X_STRETCH, w, k)
  const rows = spans(YS, Y_STRETCH, h, k)

  return (
    <div className="sf-frame" aria-hidden>
      {rows.map((r, ri) =>
        cols.map((c, ci) => {
          const zx = c.dw / c.sw
          const zy = r.dw / r.sw
          return (
            <div
              key={`${ri}-${ci}`}
              className="sf-piece"
              style={{
                left: c.dx,
                top: r.dx,
                width: Math.ceil(c.dw) + 1,
                height: Math.ceil(r.dw) + 1,
                backgroundSize: `${SRC_W * zx}px ${SRC_H * zy}px`,
                backgroundPosition: `${-c.sx * zx}px ${-r.sx * zy}px`,
              }}
            />
          )
        })
      )}
    </div>
  )
}
