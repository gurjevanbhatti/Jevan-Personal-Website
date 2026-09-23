import { profile } from '../data/content'

export default function Contact() {
  return (
    <div>
      <h1 className="page-heading">Get In Touch</h1>
      <p>
        If you have any questions or comments I would love to hear them. You can reach me at{' '}
        <a href={`mailto:${profile.email}`}>{profile.email}</a>.
      </p>
      <table className="contact-table">
        <tbody>
          <tr>
            <td>Email</td>
            <td>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{profile.phone}</td>
          </tr>
          <tr>
            <td>GitHub</td>
            <td>
              <a href={profile.github} target="_blank" rel="noreferrer">
                {profile.github.replace('https://', '')}
              </a>
            </td>
          </tr>
          <tr>
            <td>LinkedIn</td>
            <td>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                linkedin.com/in/jevanbhatti
              </a>
            </td>
          </tr>
          <tr>
            <td>Location</td>
            <td>{profile.location}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
