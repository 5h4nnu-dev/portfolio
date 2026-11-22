import SectionHeading from "@/components/ui/SectionHeading"
import ScrollReveal from "@/components/ui/ScrollReveal"
import Badge from "@/components/ui/Badge"
import { projects } from "@/lib/data"

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="04 / builds"
          title="Other projects"
          lead="Things I am building around the core mission: intelligent tooling, assessment kits and autonomous systems."
        />
        <div className="project-grid">
          {projects.map((project, i) => (
            <ScrollReveal key={project.name} delay={i * 55} className="card-wrap">
              <article className="project-card">
                <div className="project-card__top">
                  <span className="project-card__index">0x0{i + 1}</span>
                  <Badge tone={project.status === "Completed" ? "green" : "amber"}>{project.status}</Badge>
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="project-card__tags">
                  {project.tags.map((tag) => <Badge key={tag} tone="sky">{tag}</Badge>)}
                </div>
                <div className="project-card__foot">
                  <span>{project.tags[0]?.toLowerCase() ?? "project"}</span>
                  <span>shield / build</span>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
