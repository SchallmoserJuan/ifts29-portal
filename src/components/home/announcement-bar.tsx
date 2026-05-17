import Link from 'next/link'
import { Calendar, Megaphone, FileText } from 'lucide-react'

const announcements = [
  {
    icon: Megaphone,
    text: 'Inscripciones abiertas — Ciclo Lectivo 2026',
    href: '/inscripciones',
  },
  {
    icon: FileText,
    text: 'Tecnicatura en Desarrollo de Software — Título oficial',
    href: '/carreras/tecnicatura-superior-en-desarrollo-de-software',
  },
  {
    icon: Calendar,
    text: 'Inicio de clases: 10 de marzo de 2026',
    href: '/institucional',
  },
]

export function AnnouncementBar() {
  return (
    <div className="border-b border-white/5 bg-[#072c57]">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-center gap-3 px-4 py-4 sm:flex-row sm:gap-6 sm:px-6 lg:px-10">
        {announcements.map((item) => (
          <Link
            key={item.text}
            href={item.href}
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-[#28c2f3]/40 hover:bg-white/10 hover:text-white"
          >
            <item.icon className="h-3.5 w-3.5 shrink-0 text-[#28c2f3]" />
            <span className="navbar-underline">{item.text}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
