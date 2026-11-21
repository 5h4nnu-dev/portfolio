import Link from "next/link"
import TerminalWindow from "@/components/ui/TerminalWindow"

export default function NotFound() {
  return (
    <main className="shell" style={{ minHeight: "100svh", display: "grid", placeItems: "center", paddingBlock: 96 }}>
      <TerminalWindow title="404 — not found" style={{ width: "min(100%, 520px)" }}>
        <p className="prompt-line"><span className="prompt">$</span> curl ./that-page</p>
        <p style={{ color: "var(--red)" }}>404: no such file or directory</p>
        <p style={{ marginTop: 8, color: "var(--muted)" }}>
          The page you requested is not in this directory. Let&apos;s get you back to familiar ground.
        </p>
        <Link className="btn btn--primary" style={{ marginTop: 20 }} href="/">
          cd / &amp; return home
        </Link>
      </TerminalWindow>
    </main>
  )
}
