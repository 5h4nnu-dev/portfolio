"use client"

import { useEffect, useState } from "react"
import { Maximize2, Minimize2 } from "lucide-react"

const PHOTO_BASE = "/assets/profile"
const PHOTO_ALT =
  "Shannu, security engineer, in a dark room with a glowing code-symbol sign, holding a phone in front of his face"
const OPEN_MS = 900
const CLOSE_MS = 600

export default function PortraitViewer() {
  const [expanded, setExpanded] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  const toggle = () => {
    if (transitioning) return
    setTransitioning(true)
    setExpanded((value) => !value)
  }

  useEffect(() => {
    if (!transitioning) return
    const id = window.setTimeout(() => setTransitioning(false), expanded ? OPEN_MS : CLOSE_MS)
    return () => window.clearTimeout(id)
  }, [transitioning, expanded])

  if (!expanded) {
    return (
      <div className={`portrait-toggle${transitioning ? " is-closing" : ""}`}>
        <div className="portrait-mini">
          <div className="portrait-mini__bar">
            <span className="hero-portrait__dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="portrait-mini__title">profile.png</span>
            <button
              type="button"
              className="portrait-toggle-btn"
              onClick={toggle}
              aria-label="Maximize profile photo"
              aria-expanded={false}
            >
              <Maximize2 size={12} aria-hidden="true" />
            </button>
          </div>
          <div className="portrait-mini__body">
            <picture>
              <source
                type="image/webp"
                srcSet={`${PHOTO_BASE}/profile-avatar-96.webp 96w, ${PHOTO_BASE}/profile-avatar-256.webp 256w`}
                sizes="96px"
              />
              <img
                className="portrait-mini__img"
                src={`${PHOTO_BASE}/profile-avatar-256.webp`}
                alt={PHOTO_ALT}
                width={96}
                height={96}
                decoding="async"
              />
            </picture>
          </div>
          <span className="portrait-scanline" aria-hidden="true" />
          <span className="portrait-flash" aria-hidden="true" />
        </div>
      </div>
    )
  }

  return (
    <div className={`portrait-toggle${transitioning ? " is-opening" : ""}`}>
      <figure className="hero-portrait is-large">
        <div className="hero-portrait__bar">
          <span className="hero-portrait__dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="hero-portrait__title">shannu@portfolio: ~/profile.png</span>
          <button
            type="button"
            className="portrait-toggle-btn"
            onClick={toggle}
            aria-label="Minimize profile photo"
            aria-expanded
          >
            <Minimize2 size={13} aria-hidden="true" />
          </button>
        </div>
        <div className="hero-portrait__frame">
          <picture>
            <source
              type="image/webp"
              srcSet={`${PHOTO_BASE}/profile-hero-480.webp 480w, ${PHOTO_BASE}/profile-hero-800.webp 800w, ${PHOTO_BASE}/profile-hero-1000.webp 1000w`}
              sizes="(min-width: 1024px) 420px, 80vw"
            />
            <img
              className="hero-portrait__img"
              src={`${PHOTO_BASE}/profile-hero-800.jpg`}
              alt={PHOTO_ALT}
              width={800}
              height={1000}
              decoding="async"
            />
          </picture>
          <span className="hero-portrait__fade" aria-hidden="true" />
          <span className="hero-portrait__scan" aria-hidden="true" />
          <span className="portrait-scanline" aria-hidden="true" />
          <span className="portrait-flash" aria-hidden="true" />
        </div>
        <figcaption className="hero-portrait__badge"><i className="pulse-dot" aria-hidden="true" /> ONLINE</figcaption>
      </figure>
    </div>
  )
}
