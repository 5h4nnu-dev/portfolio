import SectionHeading from "@/components/ui/SectionHeading"
import TerminalWindow from "@/components/ui/TerminalWindow"
import ScrollReveal from "@/components/ui/ScrollReveal"
import Badge from "@/components/ui/Badge"
import { profile, writeupTopics } from "@/lib/data"

const whoami = [
  ["Name", profile.name],
  ["Handle", profile.handle],
  ["Location", profile.location],
  ["Role", profile.role],
  ["Focus", "Autonomous vulnerability discovery & remediation"],
  ["OS", "Arch Linux"],
] as const

export default function About() {
  return (
    <section id="about" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="01 / whoami"
          title="About"
          lead="A security engineer who likes understanding systems deeply enough to break them — and then building the tools that fix them."
        />
        <div className="about__grid">
          <ScrollReveal>
            <TerminalWindow title="whoami — shannu@portfolio" copyText={whoami.map(([k, v]) => `${k}: ${v}`).join("\n")}>
              <p className="prompt-line"><span className="prompt">$</span> whoami --verbose</p>
              <dl className="kv">
                {whoami.map(([key, value]) => (
                  <div key={key} style={{ display: "contents" }}>
                    <dt>{key}</dt>
                    <dd><span>{value}</span></dd>
                  </div>
                ))}
              </dl>
              <div className="about__bio">
                <p>{profile.mission}</p>
                <p style={{ marginTop: 12 }}>
                  My work sits at the intersection of offensive security and AI: reconnaissance,
                  web and binary exploitation, privilege escalation, and building intelligent
                  systems that can find and understand vulnerabilities. I document the journey
                  as CTF walkthroughs so the next person has a map.
                </p>
                <div className="topic-list" aria-label="Writeup topics">
                  {writeupTopics.map((topic) => (
                    <Badge key={topic} tone="sky">{topic}</Badge>
                  ))}
                </div>
              </div>
            </TerminalWindow>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div style={{ display: "grid", gap: 16 }}>
              <TerminalWindow title="focus.md">
                <p className="prompt-line"><span className="prompt">$</span> cat focus.md</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 2.1, color: "var(--text-soft)" }}>
                  <span style={{ color: "var(--mint)" }}>role:</span> {profile.role}<br />
                  <span style={{ color: "var(--mint)" }}>mission:</span> find, understand, fix<br />
                  <span style={{ color: "var(--mint)" }}>learning:</span> malware analysis, reverse engineering,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kubernetes, cloud security, AI agents<br />
                  <span style={{ color: "var(--mint)" }}>goal:</span> autonomous security systems
                </p>
              </TerminalWindow>
              <div className="terminal" style={{ padding: 20 }}>
                <p className="mono" style={{ fontSize: 11, color: "var(--faint)", marginBottom: 8 }}>// current objective</p>
                <p style={{ fontSize: 15, color: "var(--text)" }}>Become a Security Engineer building autonomous AI systems.</p>
                <p style={{ marginTop: 12, color: "var(--muted)", fontSize: 13 }}>
                  Press <kbd className="badge">⌘ K</kbd> for the command palette or <kbd className="badge">`</kbd> for the mini terminal.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
