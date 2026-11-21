"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowRight, CornerDownLeft, Search } from "lucide-react"
import { commandLinks } from "@/lib/data"

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return commandLinks.filter((c) => !q || c.label.toLowerCase().includes(q))
  }, [query])

  useEffect(() => setActive(0), [query])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === "Escape") setOpen(false)
    }
    const onOpen = () => setOpen(true)
    window.addEventListener("keydown", onKey)
    window.addEventListener("open-command-palette", onOpen)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("open-command-palette", onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setQuery("")
      const id = window.setTimeout(() => inputRef.current?.focus(), 0)
      return () => window.clearTimeout(id)
    }
  }, [open])

  const go = (href: string) => {
    setOpen(false)
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    } else {
      window.open(href, "_blank", "noopener,noreferrer")
    }
  }

  if (!open) return null

  return (
    <div
      className="overlay"
      role="presentation"
      onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
    >
      <div className="palette" role="dialog" aria-modal="true" aria-label="Command palette">
        <div style={{ display: "flex", alignItems: "center", gap: 10, paddingLeft: 16, borderBottom: "1px solid var(--border)" }}>
          <Search size={16} aria-hidden="true" color="var(--faint)" />
          <input
            ref={inputRef}
            className="palette__input"
            style={{ paddingLeft: 0, borderBottom: 0 }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault()
                setActive((i) => Math.min(i + 1, results.length - 1))
              } else if (e.key === "ArrowUp") {
                e.preventDefault()
                setActive((i) => Math.max(i - 1, 0))
              } else if (e.key === "Enter" && results[active]) {
                e.preventDefault()
                go(results[active].href)
              }
            }}
            placeholder="Jump to a section or open a link..."
            aria-label="Search commands"
            aria-activedescendant={results[active] ? `cmd-${active}` : undefined}
          />
        </div>
        <div className="palette__list" role="listbox" aria-label="Commands">
          {results.length === 0 && <p className="empty" style={{ margin: 8 }}>No matches.</p>}
          {results.map((c, i) => (
            <button
              type="button"
              role="option"
              aria-selected={i === active}
              id={`cmd-${i}`}
              key={c.label}
              className="palette__item"
              data-active={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => go(c.href)}
            >
              <ArrowRight size={13} aria-hidden="true" />
              {c.label}
              <small>{c.kind === "section" ? "jump" : "link"}</small>
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16, padding: "10px 16px", borderTop: "1px solid var(--border)", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--faint)" }}>
          <span><CornerDownLeft size={11} style={{ verticalAlign: -2 }} /> enter to select</span>
          <span>esc to close</span>
        </div>
      </div>
    </div>
  )
}
