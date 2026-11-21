"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { profile, projects, skillGroups } from "@/lib/data"

type Line = { text: string; tone?: "mint" | "muted" | "accent" }

const responses: Record<string, Line[]> = {
  help: [
    { text: "available commands:", tone: "mint" },
    { text: "  help     whoami     projects     skills     contact     clear" },
    { text: "  press ` again to hide this terminal", tone: "muted" },
  ],
  whoami: [
    { text: `${profile.name} — ${profile.role}`, tone: "mint" },
    { text: profile.tagline },
    { text: `${profile.location} · ${profile.handle} · Arch Linux`, tone: "muted" },
  ],
  projects: [
    { text: "projects:", tone: "mint" },
    ...projects.map((p) => ({ text: `  • ${p.name} — ${p.description}` })),
    { text: "  • CTF-Archive — 40 CTF walkthroughs", tone: "accent" },
  ],
  skills: [
    { text: "skills:", tone: "mint" },
    ...skillGroups.map((g) => ({ text: `  [${g.label}] ${g.skills.map((s) => s.name).join(", ")}` })),
  ],
  contact: [
    { text: "contact:", tone: "mint" },
    { text: `  github  ${profile.github}` },
    { text: "  email   PLACEHOLDER_EMAIL", tone: "accent" },
    { text: "  linkedin PLACEHOLDER_LINKEDIN", tone: "accent" },
  ],
}

export default function MiniTerminal() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [lines, setLines] = useState<Line[]>([
    { text: "mini-sh v1.0 — type 'help' for commands", tone: "muted" },
  ])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return
      if (e.key === "`" || e.key === "~") {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("mini-terminal-toggle", { detail: open }))
    if (open) inputRef.current?.focus()
  }, [open])

  if (!open) return null

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const command = value.trim().toLowerCase()
    if (!command) return
    const echo: Line = { text: `> ${command}`, tone: "mint" }
    if (command === "clear") {
      setLines([])
    } else {
      setLines((prev) => [...prev, echo, ...(responses[command] ?? [{ text: `command not found: ${command}`, tone: "accent" }])])
    }
    setValue("")
  }

  return (
    <div className="mini-terminal terminal" role="dialog" aria-label="Mini terminal">
      <div className="terminal__bar">
        <div className="terminal__dots" aria-hidden="true"><span /><span /><span /></div>
        <span className="terminal__title">mini-sh</span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close mini terminal"
          style={{ marginLeft: "auto", background: "none", border: 0, color: "var(--faint)", cursor: "pointer" }}
        >
          <X size={14} />
        </button>
      </div>
      <div className="terminal__body mini-terminal__body" role="log" aria-live="polite">
        {lines.map((line, i) => (
          <p
            key={i}
            style={{
              color: line.tone === "mint" ? "var(--mint)" : line.tone === "accent" ? "var(--amber)" : "var(--text-soft)",
            }}
          >
            {line.text}
          </p>
        ))}
        <form className="mini-terminal__input" onSubmit={submit}>
          <span className="prompt">$</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Mini terminal command"
            placeholder="help"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  )
}
