import { profile } from '../data/content'

export default function SocialLinks() {
  return (
    <div className="pf-social">
      <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
      <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      <a href={`mailto:${profile.email}`}>Email</a>
    </div>
  )
}
