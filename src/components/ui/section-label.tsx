export function SectionLabel({
  number,
  label,
  light = false,
}: {
  number: string
  label: string
  light?: boolean
}) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.28em] ${light ? 'text-white/50' : 'text-slate-400'}`}
    >
      {number} <span className="mx-2">—</span> {label}
    </p>
  )
}
