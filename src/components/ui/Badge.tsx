import type { ReactNode } from "react"

export type BadgeTone = "mint" | "sky" | "purple" | "amber" | "red" | "green" | "neutral"

export default function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode
  tone?: BadgeTone
  className?: string
}) {
  return <span className={`badge ${tone === "neutral" ? "" : `badge--${tone}`} ${className}`}>{children}</span>
}
