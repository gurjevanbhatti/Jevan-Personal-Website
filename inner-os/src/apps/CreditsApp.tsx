export default function CreditsApp() {
  return (
    <div className="credits-app">
      <h1 className="credits-title">Credits</h1>

      <section className="credits-card">
        <p className="credits-label">This version</p>
        <p>
          I designed and built this desktop and every app inside it: the Safari
          home page, the VS Code workspace, the terminal, the menu bar and dock,
          and this page. I retextured the 3D scene around it, recolouring the
          computer and the objects on the desk, and put my own resume on the
          sheet of paper. All of the writing is mine.
        </p>
        <p className="credits-tech">
          Three.js · React · TypeScript · Vite · Monaco Editor · webpack
        </p>
      </section>

      <section className="credits-card quiet">
        <p className="credits-label">Built on</p>
        <p>
          The 3D scene began as <b>Henry Heffernan</b>&rsquo;s open source
          portfolio, released under the MIT licence. The Three.js application,
          the shaders and the camera system are his.
        </p>
        <ul className="credits-list">
          <li><b>Mickael Boitte</b>, computer model</li>
          <li><b>Sean Nicolas</b>, environment models</li>
          <li><b>Henry Heffernan</b>, texturing and UVs</li>
        </ul>
        <p className="credits-small">Copyright 2024 Henry Heffernan</p>
        <p className="credits-small">
          Thank you for open sourcing it. This site would not exist otherwise.
        </p>
      </section>
    </div>
  )
}
