"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"
import TerminalWindow from "@/components/ui/TerminalWindow"
import ScrollReveal from "@/components/ui/ScrollReveal"
import Badge from "@/components/ui/Badge"
import { attackChain, featuredProjects, type FeaturedProject } from "@/lib/data"

const SWIPE_OUT_MS = 140
const SWIPE_IN_MS = 160

function TextFace({ project, index }: { project: FeaturedProject; index: number }) {
  return (
    <>
      <span className="eyebrow">Featured / {String(index + 1).padStart(3, "0")}</span>
      <h3 className="featured__name">{project.name}<span>.</span></h3>
      <p className="featured__summary">{project.summary}</p>
      <p className="featured__desc">{project.description}</p>

      <ul className="feature-list">
        {project.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <div className="featured__cta">
        <a className="btn btn--primary" href={project.repo} target="_blank" rel="noreferrer noopener">
          <Github size={15} aria-hidden="true" />
          View repository
          <ArrowUpRight size={13} aria-hidden="true" />
        </a>
        <a className="btn" href="#writeups">
          Browse the writeups
          <ExternalLink size={13} aria-hidden="true" />
        </a>
      </div>
    </>
  )
}

function TerminalFace({ project }: { project: FeaturedProject }) {
  return (
    <TerminalWindow title={project.terminalTitle} copyText={project.stack.join(" · ")}>
      <p className="prompt-line"><span className="prompt">$</span> cat package.json | grep stack</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
        {project.stack.map((tech) => (
          <Badge key={tech} tone="mint">{tech}</Badge>
        ))}
      </div>
      <p className="prompt-line"><span className="prompt">$</span> archive stats --summary</p>
      <div className="featured__metrics">
        {project.metrics.map((m) => (
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
        origin &nbsp;{project.repo}
      </p>
    </TerminalWindow>
  )
}

export default function Featured() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState<"prev" | "next">("next")
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle")
  const timer = useRef<number | null>(null)
  const project = featuredProjects[active]

  useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current)
  }, [])

  const goTo = (index: number, dir: "prev" | "next") => {
    if (index === active && phase === "idle") return
    if (timer.current !== null) window.clearTimeout(timer.current)
    setDirection(dir)

    // Reduced-motion users get an instant swap instead of the swipe.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setPhase("idle")
      setActive(index)
      return
    }

    setPhase("out")
    timer.current = window.setTimeout(() => {
      setActive(index)
      setPhase("in")
      timer.current = window.setTimeout(() => {
        setPhase("idle")
        timer.current = null
      }, SWIPE_IN_MS)
    }, SWIPE_OUT_MS)
  }

  const previous = () =>
    goTo((active - 1 + featuredProjects.length) % featuredProjects.length, "prev")

  const next = () => goTo((active + 1) % featuredProjects.length, "next")

  return (
    <section id="featured" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="02 / featured work"
          title="Flagship project"
          lead="One project, built end to end: an archive that turns every CTF box into a reusable lesson."
        />

        <div
          className="featured__slider"
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured projects"
          style={{
            "--swipe-in": direction === "prev" ? "-48px" : "48px",
            "--swipe-out": direction === "prev" ? "48px" : "-48px",
          } as React.CSSProperties}
        >
          <button
            type="button"
            className="featured__nav featured__nav--prev"
            onClick={previous}
            aria-label="Previous featured project"
            aria-controls="featured-panel"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>

          <div className="featured__grid" id="featured-panel">
            <ScrollReveal>
              <div className="featured__face" data-phase={phase}>
                <TextFace project={project} index={active} />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <div className="featured__face" data-phase={phase}>
                <TerminalFace project={project} />
              </div>
            </ScrollReveal>
          </div>

          <button
            type="button"
            className="featured__nav featured__nav--next"
            onClick={next}
            aria-label="Next featured project"
            aria-controls="featured-panel"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>

          <span
            className="sr-only"
            style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}
            aria-live="polite"
          >
            Showing {project.name}, featured project {active + 1} of {featuredProjects.length}
          </span>
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
