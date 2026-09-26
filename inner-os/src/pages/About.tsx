import { about } from '../data/content'

export default function About() {
  return (
    <div className="pf-page pf-page-wide">
      <h2 className="pf-h2">About me</h2>
      <div className="pf-about">
        <div>
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <figure className="pf-figure">
          <img src={about.photo.src} alt={about.photo.alt} />
          <figcaption>
            <strong>Figure 1:</strong> {about.photo.caption}
          </figcaption>
        </figure>
      </div>
    </div>
  )
}
