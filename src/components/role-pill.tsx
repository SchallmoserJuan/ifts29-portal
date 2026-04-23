import type { UserRole } from '@/src/types/app'

const labels: Record<UserRole, string> = {
  admin: 'Administrador',
  teacher: 'Profesor',
  student: 'Alumno',
}

export function RolePill({ role }: { role: UserRole }) {
  return (
    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-900">
      {labels[role]}
    </span>
  )
}
