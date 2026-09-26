import { skillIcons, skills } from '../data/content'

export default function SkillList() {
  return (
    <div className="pf-skill-grid">
      {Object.entries(skills).map(([category, list]) => (
        <div className="pf-skill-card" key={category}>
          <h3 className="pf-skill-head">{category.replace(' / ', ' & ')}</h3>
          <div className="pf-chips">
            {list.map((s) => (
              <span className="pf-chip" key={s}>
                {skillIcons[s] && <img src={`/inner-os/skills/${skillIcons[s]}.svg`} alt="" />}
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
