import { cn } from '@/lib/utils'

interface TechBadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'accent' | 'dark'
  className?: string
}

export function TechBadge({ children, variant = 'default', className }: TechBadgeProps) {
  const variants = {
    default: 'bg-white text-[#1e3e8a] border-none',
    outline: 'bg-transparent text-slate-600 border border-slate-200 hover:border-slate-300',
    accent: 'bg-[#28c2f3]/15 text-[#072c57] border border-[#28c2f3]/25',
    dark: 'bg-white/10 text-white border border-white/20 backdrop-blur-sm',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-3 py-1 text-xs font-medium transition-colors',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
