import { experience } from '../data/content'
import Timeline from './Timeline'

export default function ExperienceTimeline() {
  return (
    <Timeline
      items={experience.map((job) => ({
        id: `${job.role}-${job.company}`,
        logo: job.logo,
        title: job.role,
        org: job.company,
        link: job.link,
        date: job.date,
        bullets: job.bullets,
        tags: job.tech,
      }))}
    />
  )
}
