import Link from 'next/link'

export function SkipToContent() {
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[9999] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-[#072c57] focus:shadow-lg"
    >
      Saltar al contenido principal
    </Link>
  )
}
