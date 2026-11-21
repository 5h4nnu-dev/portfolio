import type { CSSProperties, ReactNode } from "react"
import CopyButton from "@/components/ui/CopyButton"

type TerminalWindowProps = {
  title: string
  children: ReactNode
  className?: string
  bodyClassName?: string
  copyText?: string
  style?: CSSProperties
}

/** Terminal chrome with traffic lights. Shared by every card-like block. */
export default function TerminalWindow({
  title,
  children,
  className = "",
  bodyClassName = "",
  copyText,
  style,
}: TerminalWindowProps) {
  return (
    <div className={`terminal ${className}`} style={style}>
      <div className="terminal__bar">
        <div className="terminal__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="terminal__title">{title}</span>
        {copyText && (
          <span className="terminal__copy">
            <CopyButton text={copyText} label="Copy" />
          </span>
        )}
      </div>
      <div className={`terminal__body ${bodyClassName}`}>{children}</div>
    </div>
  )
}
