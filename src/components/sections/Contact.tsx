import { ArrowUpRight, Github } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"
import TerminalWindow from "@/components/ui/TerminalWindow"
import ScrollReveal from "@/components/ui/ScrollReveal"
import { profile } from "@/lib/data"

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="07 / open channel"
          title="Contact"
          lead="No contact form pretending to send mail. Pick a channel that works."
        />
        <div className="contact__grid">
          <ScrollReveal>
            <TerminalWindow title="contact.json">
              <p className="prompt-line"><span className="prompt">$</span> jq . contact.json</p>
              <div className="contact__line">
                <span>GitHub</span>
                <a href={profile.github} target="_blank" rel="noreferrer noopener">
                  @{profile.handle} <ArrowUpRight size={12} style={{ verticalAlign: -2 }} aria-hidden="true" />
                </a>
              </div>
              <div className="contact__line">
                <span>Email</span>
                <span className="placeholder" title="Placeholder — add your email in src/lib/data.ts">
                  PLACEHOLDER_EMAIL
                </span>
              </div>
              <div className="contact__line">
                <span>LinkedIn</span>
                <span className="placeholder" title="Placeholder — add your LinkedIn URL in src/lib/data.ts">
                  PLACEHOLDER_LINKEDIN
                </span>
              </div>
              <div className="contact__line">
                <span>Location</span>
                <span>{profile.location}</span>
              </div>
              <p className="contact__note">
                Two placeholders remain: email and LinkedIn. Replace them in <code className="mono">src/lib/data.ts</code> and they will appear here and in the command palette.
              </p>
            </TerminalWindow>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div style={{ display: "grid", gap: 16, height: "100%" }}>
              <div className="terminal" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "var(--s-4)" }}>
                <p className="mono" style={{ fontSize: 11, color: "var(--faint)", marginBottom: 12 }}>// channel</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--text)" }}>
                  <span className="pulse-dot" style={{ marginRight: 10 }} aria-hidden="true" /> get in touch
                </p>
                <p style={{ marginTop: 12, color: "var(--muted)", fontSize: 14, maxWidth: "42ch" }}>
                  For vulnerability research, AI-driven security tooling or CTF collaboration, the GitHub profile below is the live channel until the other links are filled in.
                </p>
                <a className="btn btn--primary" style={{ alignSelf: "flex-start", marginTop: 24 }} href={profile.github} target="_blank" rel="noreferrer noopener">
                  <Github size={15} aria-hidden="true" /> Open GitHub
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
