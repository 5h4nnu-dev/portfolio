import { ArrowUpRight, ExternalLink, Github } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"
import TerminalWindow from "@/components/ui/TerminalWindow"
import ScrollReveal from "@/components/ui/ScrollReveal"
import Badge from "@/components/ui/Badge"
import { attackChain, featuredProject } from "@/lib/data"

export default function Featured() {
  return (
    <section id="featured" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="02 / featured work"
          title="Flagship project"
          lead="One project, built end to end: an archive that turns every CTF box into a reusable lesson."
        />

        <div className="featured__grid">
          <ScrollReveal>
            <div>
              <span className="eyebrow">Featured / 001</span>
              <h3 className="featured__name">{featuredProject.name}<span>.</span></h3>
              <p className="featured__summary">{featuredProject.summary}</p>
              <p className="featured__desc">{featuredProject.description}</p>

              <ul className="feature-list">
                {featuredProject.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className="featured__cta">
                <a className="btn btn--primary" href={featuredProject.repo} target="_blank" rel="noreferrer noopener">
                  <Github size={15} aria-hidden="true" />
                  View repository
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
                <a className="btn" href="#writeups">
                  Browse the writeups
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <TerminalWindow title="CTF-Archive — stack & signals" copyText={featuredProject.stack.join(" · ")}>
              <p className="prompt-line"><span className="prompt">$</span> cat package.json | grep stack</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {featuredProject.stack.map((tech) => (
                  <Badge key={tech} tone="mint">{tech}</Badge>
                ))}
              </div>
              <p className="prompt-line"><span className="prompt">$</span> archive stats --summary</p>
              <div className="featured__metrics">
                {featuredProject.metrics.map((m) => (
                  <div className="metric" key={m.label}>
                    <strong>{m.value}</strong>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
              <p className="prompt-line" style={{ marginTop: 28, marginBottom: 0 }}>
                <span className="prompt">$</span> git remote -v
              </p>
              <p style={{ fontSize: 11.5, color: "var(--sky)", wordBreak: "break-all", marginTop: 6 }}>
                origin &nbsp;{featuredProject.repo}
              </p>
            </TerminalWindow>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={80}>
          <div className="chain">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
              <h3 style={{ fontSize: 15 }}>The attack chain</h3>
              <span className="mono" style={{ fontSize: 11, color: "var(--faint)" }}>
                every writeup follows the same path: recon → lesson
              </span>
            </div>
            <div className="chain__track">
              {attackChain.map((step) => (
                <div className="chain__step" data-tone={step.tone} key={step.step}>
                  <b>{step.step}</b>
                  <small>{step.detail}</small>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
