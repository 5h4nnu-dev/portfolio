"use client"

import { useEffect, useState } from "react"

/** Cycles through phrases with a type / hold / delete loop. */
export default function TerminalTyping({ phrases, speed = 62 }: { phrases: readonly string[]; speed?: number }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(phrases[0] ?? "")
      return
    }
    const current = phrases[index] ?? ""
    if (!deleting && text === current) {
      const id = window.setTimeout(() => setDeleting(true), 1800)
      return () => window.clearTimeout(id)
    }
    if (deleting && text === "") {
      setDeleting(false)
      setIndex((i) => (i + 1) % phrases.length)
      return
    }
    const id = window.setTimeout(() => {
      setText(current.slice(0, text.length + (deleting ? -1 : 1)))
    }, deleting ? speed / 2 : speed)
    return () => window.clearTimeout(id)
  }, [text, deleting, index, phrases, speed])

  return (
    <span aria-label={phrases.join(", ")}>
      <span aria-hidden="true">{text}</span>
      <span className="cursor" aria-hidden="true" />
    </span>
  )
}
