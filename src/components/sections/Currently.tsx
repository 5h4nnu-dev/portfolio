import { ArrowUpRight } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"
import TerminalWindow from "@/components/ui/TerminalWindow"
import ScrollReveal from "@/components/ui/ScrollReveal"
import { profile, projects, writeupTopics } from "@/lib/data"

const learning = ["Malware Analysis", "Reverse Engineering", "Kubernetes", "Cloud Security", "AI Agents"]
const building = projects.filter((p) => p.status !== "Completed").map((p) => p.name)

export default function Currently() {
  return (
    <section id="currently" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="06 / mission log"
          title="Currently"
          lead="What is on the desk right now — the topics being studied and the systems being built."
        />
        <ScrollReveal>
          <TerminalWindow title="mission.log — live" copyText={`learning: ${learning.join(", ")}\nbuilding: ${building.join(", ")}`}>
            <p className="prompt-line"><span className="prompt">$</span> tail -f mission.log</p>
            <div className="mission">
              <div className="mission__col">
                <h3>// learning</h3>
                {learning.map((item) => (
                  <p className="mission__line" key={item}><span>→</span><span>{item}</span></p>
                ))}
                <p className="mission__line" style={{ borderBottom: 0 }}><span>→</span><span>{writeupTopics[4]} / {writeupTopics[5]}</span></p>
              </div>
              <div className="mission__col">
                <h3>// building</h3>
                {building.map((item) => (
                  <p className="mission__line" key={item}><span>→</span><span>{item}</span></p>
                ))}
                <p className="mission__line" style={{ borderBottom: 0 }}><span>→</span><span>CTF-Archive (ongoing)</span></p>
              </div>
            </div>
            <p style={{ marginTop: 24, paddingTop: 16, borderTop: "1px dashed var(--border-strong)", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>
              <span style={{ color: "var(--mint)" }}>goal:</span> Become a Security Engineer building autonomous AI systems.
            </p>
          </TerminalWindow>
          <div style={{ marginTop: 16 }}>
            <a className="link-arrow" href={profile.github} target="_blank" rel="noreferrer noopener">
              See what is shipping on GitHub <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
