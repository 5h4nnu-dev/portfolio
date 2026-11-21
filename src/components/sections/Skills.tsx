import SectionHeading from "@/components/ui/SectionHeading"
import ScrollReveal from "@/components/ui/ScrollReveal"
import { skillGroups } from "@/lib/data"

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="05 / toolkit"
          title="Skills"
          lead="Approximate proficiency, not measured precision. The last group is explicitly in progress — learning is part of the work."
        />
        <div className="skill-grid">
          {skillGroups.map((group, i) => (
            <ScrollReveal key={group.id} delay={i * 60} className="card-wrap">
              <div className={`skill-group ${group.id === "learning" ? "skill-group--learning" : ""}`}>
                <div className="skill-group__head">
                  <h3>{group.label}</h3>
                  <code>$ {group.prompt}</code>
                </div>
                {group.skills.map((skill) => (
                  <div className="skill-row" key={skill.name}>
                    <span>{skill.name}</span>
                    <em>{group.id === "learning" ? "learning" : "≈" + skill.level}</em>
                    <div className="skill-bar" aria-hidden="true">
                      <i style={{ "--level": `${skill.level}%` } as React.CSSProperties} />
                    </div>
                  </div>
                ))}
                {group.note && <p className="skill-note">↳ {group.note}</p>}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
