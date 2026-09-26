interface Photo {
  src: string
  alt: string
}

/* One photo shows as a tall portrait; two or more become a tidy grid. */
export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  const shown = photos.slice(0, 6)
  return (
    <div className={`pf-photos${shown.length > 1 ? ' is-grid' : ''}`}>
      {shown.map((p) => (
        <img key={p.src} src={p.src} alt={p.alt} />
      ))}
    </div>
  )
}
