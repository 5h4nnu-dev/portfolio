"use client"

import { useMemo, useState } from "react"
import { ArrowUpRight, Search } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"
import ScrollReveal from "@/components/ui/ScrollReveal"
import Badge, { type BadgeTone } from "@/components/ui/Badge"
import { featuredProject, writeups, type Writeup } from "@/lib/data"

const difficultyTone: Record<Writeup["difficulty"], BadgeTone> = {
  "Very Easy": "green",
  Easy: "green",
  Medium: "amber",
  Hard: "red",
  Learning: "amber",
}

export default function Writeups() {
  const [query, setQuery] = useState("")
  const [tag, setTag] = useState<string | null>(null)

  const topTags = useMemo(() => {
    const counts = new Map<string, number>()
    writeups.forEach((w) => w.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)))
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 9).map(([name]) => name)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return writeups.filter((w) => {
      const matchesTag = !tag || w.tags.includes(tag)
      const matchesQuery =
        !q ||
        w.title.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q) ||
        w.tags.some((t) => t.toLowerCase().includes(q)) ||
        w.difficulty.toLowerCase().includes(q)
      return matchesTag && matchesQuery
    })
  }, [query, tag])

  return (
    <section id="writeups" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="03 / field notes"
          title="CTF writeups"
          lead="Forty documented boxes: what the surface looked like, where the crack was, and how the flag fell out. Search the archive here — the full texts live in CTF-Archive."
        />

        <ScrollReveal>
          <div className="filters">
            <label className="search">
              <Search size={15} aria-hidden="true" />
              <span className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                Search writeups
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="search rooms, techniques, difficulty..."
                aria-label="Search writeups"
              />
            </label>
            <div className="filter-tags" role="group" aria-label="Filter by tag">
              <button className="filter-tag" type="button" aria-pressed={tag === null} onClick={() => setTag(null)}>
                all
              </button>
              {topTags.map((t) => (
                <button
                  className="filter-tag"
                  key={t}
                  type="button"
                  aria-pressed={tag === t}
                  onClick={() => setTag(tag === t ? null : t)}
                >
                  {t.toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <p className="writeup-count" role="status">
            {filtered.length} / {writeups.length} writeups shown
          </p>

          {filtered.length === 0 ? (
            <p className="empty">No writeups match that filter. Try a different term.</p>
          ) : (
            <div className="writeup-grid">
              {filtered.map((w) => (
                <article className="writeup-card" key={w.id}>
                  <div className="writeup-card__head">
                    <h3>{w.title}</h3>
                    <Badge tone={difficultyTone[w.difficulty]}>{w.difficulty}</Badge>
                  </div>
                  <p>{w.description}</p>
                  <div className="writeup-card__tags">
                    {w.tags.slice(0, 3).map((t) => <span key={t}>{t.toLowerCase()}</span>)}
                  </div>
                  <div className="writeup-card__foot">
                    <span>CTF / walkthrough</span>
                    <span>{w.date.slice(0, 7)}</span>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div style={{ marginTop: 32 }}>
            <a className="link-arrow" href={featuredProject.repo} target="_blank" rel="noreferrer noopener">
              Open the full archive on GitHub <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
