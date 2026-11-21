import { ArrowUp, Github } from "lucide-react"
import { profile } from "@/lib/data"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__top">
          <p className="footer__tagline"><b>&gt;</b> {profile.tagline}</p>
          <div style={{ display: "flex", gap: 8 }}>
            <a className="btn btn--sm" href={profile.github} target="_blank" rel="noreferrer noopener">
              <Github size={14} aria-hidden="true" /> GitHub
            </a>
            <a className="btn btn--sm" href="#hero">
              <ArrowUp size={14} aria-hidden="true" /> Back to top
            </a>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {profile.name} · {profile.location}</span>
          <span>Built with Next.js · Terminal-inspired, not terminal-shaped.</span>
        </div>
      </div>
    </footer>
  )
}
