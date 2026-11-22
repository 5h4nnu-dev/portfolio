"use client"

import { useState } from "react"
import { Power } from "lucide-react"

const PHOTO_BASE = "/assets/profile"
const PHOTO_ALT =
  "Shannu, security engineer, in a dark room with a glowing code-symbol sign, holding a phone in front of his face"

export default function PortraitViewer() {
  const [revealed, setRevealed] = useState(false)

  if (!revealed) {
    return (
      <div className="portrait-avatar-wrap">
        <button
          type="button"
          className="portrait-avatar"
          aria-label="Start up profile photo"
          onClick={() => setRevealed(true)}
        >
          <picture>
            <source
              type="image/webp"
              srcSet={`${PHOTO_BASE}/profile-avatar-96.webp 96w, ${PHOTO_BASE}/profile-avatar-256.webp 256w`}
              sizes="96px"
            />
            <img
              className="portrait-avatar__img"
              src={`${PHOTO_BASE}/profile-avatar-256.webp`}
              alt=""
              width={96}
              height={96}
              decoding="async"
            />
          </picture>
          <span className="portrait-avatar__status" aria-hidden="true"><i className="pulse-dot" /> ONLINE</span>
        </button>
        <span className="portrait-avatar__hint" aria-hidden="true"><Power size={12} /> click to start</span>
      </div>
    )
  }

  return (
    <figure className="hero-portrait is-revealed">
      <span className="portrait-boot-line" aria-hidden="true" />
      <span className="portrait-boot-flash" aria-hidden="true" />
      <div className="hero-portrait__bar">
        <span className="hero-portrait__dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="hero-portrait__title">shannu@portfolio: ~/profile.png</span>
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
      </div>
      <figcaption className="hero-portrait__badge"><i className="pulse-dot" aria-hidden="true" /> ONLINE</figcaption>
    </figure>
  )
}
