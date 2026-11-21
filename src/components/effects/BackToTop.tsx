"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [shifted, setShifted] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    const onTerminal = (e: Event) => setShifted(Boolean((e as CustomEvent<boolean>).detail))
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("mini-terminal-toggle", onTerminal)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("mini-terminal-toggle", onTerminal)
    }
  }, [])

  return (
    <button
      type="button"
      className={`to-top ${shifted ? "to-top--shifted" : ""}`}
      data-visible={visible && !shifted}
      aria-label="Back to top"
      tabIndex={visible && !shifted ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp size={17} aria-hidden="true" />
    </button>
  )
}
