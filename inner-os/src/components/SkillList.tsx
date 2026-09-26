import { skills } from '../data/content'

export default function SkillList() {
  return (
    <div className="pf-skills">
      {Object.entries(skills).map(([category, list]) => (
        <div className="pf-skill-row" key={category}>
          <p className="pf-label">{category}</p>
          <div className="pf-tags">
            {list.map((s) => (
              <span className="pf-tag" key={s}>{s}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
