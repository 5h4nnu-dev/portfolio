type SectionHeadingProps = {
  eyebrow: string
  title: string
  lead?: string
}

export default function SectionHeading({ eyebrow, title, lead }: SectionHeadingProps) {
  return (
    <header className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </header>
  )
}
