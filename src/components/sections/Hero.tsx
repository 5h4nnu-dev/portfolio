import { ArrowDownRight, BookOpen, FolderGit2 } from "lucide-react"
import TerminalTyping from "@/components/effects/TerminalTyping"
import TerminalWindow from "@/components/ui/TerminalWindow"
import ScrollReveal from "@/components/ui/ScrollReveal"
import { profile, stats } from "@/lib/data"

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="shell hero__grid">
        <ScrollReveal>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span className="status"><i className="pulse-dot" aria-hidden="true" /> ONLINE</span>
            <span className="mono" style={{ fontSize: 12, color: "var(--faint)" }}>
              {profile.location} · @{profile.handle}
            </span>
          </div>

          <h1 className="hero__title">
            {profile.name}<span>.</span>
          </h1>
          <p className="hero__role">
            <span style={{ color: "var(--faint)" }}>&gt; </span>
            <TerminalTyping phrases={profile.titles} />
          </p>
          <p className="hero__mission">{profile.mission}</p>

          <div className="hero__actions">
            <a className="btn btn--primary" href="#projects">
              <FolderGit2 size={15} aria-hidden="true" />
              View Projects
            </a>
            <a className="btn" href="https://github.com/5h4nnu-dev/CTF-Archive" target="_blank" rel="noreferrer noopener">
              <BookOpen size={15} aria-hidden="true" />
              Read Writeups
            </a>
          </div>

          <div className="stat-strip" aria-label="Archive statistics">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <strong className="stat__value">{s.value}</strong>
                <span className="stat__label">{s.label}</span>
                <span className="stat__hint">{s.hint}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <TerminalWindow title="boot.log" className="hero__aside" copyText={`whoami\n${profile.role}\n${profile.tagline}`}>
            <div className="hero__boot">
              <p className="dim">$ initializing shannu@portfolio ...</p>
              <p><span className="prompt">✓</span> <span className="ok">identity</span> &nbsp;{profile.name}</p>
              <p><span className="prompt">✓</span> <span className="ok">handle</span> &nbsp;&nbsp;{profile.handle}</p>
              <p><span className="prompt">✓</span> <span className="ok">role</span> &nbsp;&nbsp;&nbsp;{profile.role}</p>
              <p><span className="prompt">✓</span> <span className="ok">os</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Arch Linux</p>
              <p className="dim" style={{ marginTop: 14 }}>$ cat mission.txt</p>
              <p className="accent">&gt; {profile.mission}</p>
              <p className="dim" style={{ marginTop: 14 }}>$ <span style={{ color: "var(--text)" }}>echo \"{profile.tagline}\"</span></p>
              <p style={{ color: "var(--text-soft)" }}>{profile.tagline}</p>
              <p className="dim" style={{ marginTop: 10 }}>
                ready. <ArrowDownRight size={12} style={{ verticalAlign: -2 }} aria-hidden="true" /> scroll to explore
              </p>
            </div>
          </TerminalWindow>
        </ScrollReveal>
      </div>
    </section>
  )
}
