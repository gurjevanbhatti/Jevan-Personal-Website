import { profile } from '../data/content'

export default function Contact() {
  const rows = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { label: 'GitHub', value: profile.github.replace('https://', ''), href: profile.github },
    { label: 'LinkedIn', value: 'linkedin.com/in/jevanbhatti', href: profile.linkedin },
    { label: 'Location', value: profile.location },
  ]

  return (
    <div className="pf-page">
      <h2 className="pf-h2">Get in touch</h2>
      <p className="pf-lede">Questions, opportunities, or just want to say hi? Email is the fastest way to reach me.</p>
      <a className="pf-btn pf-btn-primary" href={`mailto:${profile.email}`}>Email me</a>

      <dl className="pf-contact">
        {rows.map((r) => (
          <div className="pf-contact-row" key={r.label}>
            <dt className="pf-label">{r.label}</dt>
            <dd>
              {r.href ? (
                <a href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{r.value}</a>
              ) : (
                r.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
