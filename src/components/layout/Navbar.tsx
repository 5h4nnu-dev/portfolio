"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Command, Github, Menu, X } from "lucide-react"
import { navLinks, profile } from "@/lib/data"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("")
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    )
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <>
      <header className={`nav ${scrolled || open ? "nav--scrolled" : ""}`}>
        <div className="shell nav__inner">
          <a className="nav__logo" href="#hero" aria-label="Shannu — back to top">
            shannu<span>@</span>portfolio<span>:~</span><b>$</b>
          </a>

          <nav className="nav__links" aria-label="Main navigation">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="nav__link"
                aria-current={active === href ? "true" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <button
              type="button"
              className="nav__kbd"
              aria-label="Open command palette"
              onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            >
              <Command size={12} aria-hidden="true" /> K
            </button>
            <a
              className="btn btn--sm"
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Github size={14} aria-hidden="true" />
              GitHub
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="nav__toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="nav__mobile" id="mobile-menu" ref={menuRef}>
          <nav aria-label="Mobile navigation">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="nav__link"
                aria-current={active === href ? "true" : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
