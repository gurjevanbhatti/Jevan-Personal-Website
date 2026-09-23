import { profile } from '../data/content'

export default function CreditsApp() {
  return (
    <div className="credits-app">
      <h1 className="page-heading">Credits</h1>

      <fieldset>
        <legend>Original 3D scene &amp; engine</legend>
        <p>
          <b>Henry Heffernan</b> — built the original interactive 3D portfolio this scene comes
          from, including the Three.js application, shaders, camera system and sound design.
        </p>
        <p className="credits-small">
          Released under the MIT licence.{' '}
          <a href="https://henryheffernan.com/" target="_blank" rel="noreferrer">
            henryheffernan.com
          </a>
        </p>
        <p className="credits-small">Copyright 2024 Henry Heffernan</p>
      </fieldset>

      <fieldset>
        <legend>3D models</legend>
        <p><b>Mickael Boitte</b> — computer model</p>
        <p><b>Sean Nicolas</b> — environment models</p>
        <p><b>Henry Heffernan</b> — texturing &amp; UVs</p>
      </fieldset>

      <fieldset>
        <legend>This version</legend>
        <p>
          <b>{profile.name}</b> — retextured the scene, and wrote this desktop OS, its apps and all
          of the content inside it.
        </p>
      </fieldset>

      <fieldset>
        <legend>Built with</legend>
        <p className="credits-small">
          Three.js · React · TypeScript · Vite · Monaco Editor · webpack
        </p>
      </fieldset>

      <p className="credits-small">
        Thank you to Henry for open-sourcing the original — this site would not exist without it.
      </p>
    </div>
  )
}
