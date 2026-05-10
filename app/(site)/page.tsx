import Link from 'next/link'
import Image from 'next/image'
import {PageShell} from '@/src/components/page-shell'
import {NewsCard} from '@/src/components/news-card'
import {getNewsList} from '@/src/lib/content'
import type {NewsItem} from '@/src/types/content'
import {HomeHero} from '@/src/components/home-hero'
export const revalidate = 60

const communityCards = [
  {
    title: 'Comunidad estudiantil',
    href: '#',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Aulas y encuentros',
    href: '#',
    image:
      'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Campus y actividades',
    href: '#',
    image:
      'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=900&q=80',
  },
]

const excellenceCards = [
  {
    title: 'Oferta academica',
    description: 'Explora carreras tecnicas con una presentacion mas clara y accesible.',
    href: '/careers',
    image:
      'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cta: 'Ver carreras',
  },
  {
    title: 'Biblioteca virtual',
    description: 'Access documents, guides and portal material based on your role and permissions.',
    href: '/portal/library',
    image:
      'https://images.unsplash.com/photo-1585066437529-9f6a2061652b?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cta: 'Abrir biblioteca',
  },
  {
    title: 'Informacion institucional',
    description:
      'Consulta historia, mision y vision del instituto desde una experiencia mas consistente.',
    href: '/institutional',
    image:
      'https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cta: 'Conocer mas',
  },
]

export default async function HomePage() {
  const news = await getNewsList()
  const latestNews = news.slice(0, 3) as NewsItem[]
  return (
    <PageShell>
      <HomeHero>
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/25 via-transparent to-slate-950/35" />

        {/* pt-24 compensa el header absolute que flota encima */}
        <div className="relative mx-auto flex min-h-[760px] w-full max-w-[1400px] flex-col px-4 pb-12 pt-24 sm:px-6 lg:px-10">
          <div className="mt-auto max-w-3xl pb-10">
            <p className="text-sm uppercase tracking-[0.34em] text-sky-100/80">
              Sitio institucional
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">IFTS N° 29</h1>
            <p className="mt-2 text-2xl text-slate-100 sm:text-3xl">
              Instituto de Formacion Tecnica N°29
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100/90">
              Una portada institucional con el lenguaje visual del nuevo boceto y acceso rapido a
              las secciones principales del sitio.
            </p>
          </div>

          <div className="rounded-[28px] bg-[#072c57] p-6 shadow-2xl shadow-slate-950/30 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-md">
                <p className="text-3xl leading-tight text-white">Busca nuestras opciones ahora.</p>
                <p className="mt-3 text-sm text-slate-200">Navega rapidamente por el portal.</p>
              </div>
              <div className="flex w-full max-w-3xl flex-col gap-3 sm:flex-row">
                <input
                  type="search"
                  placeholder="Buscar"
                  className="h-14 flex-1 rounded-md border border-white/15 bg-white px-5 text-base text-slate-900 outline-none ring-0 placeholder:text-slate-400"
                />
                <Link
                  href="#home-accesos"
                  className="inline-flex h-14 items-center justify-center rounded-md bg-[#28c2f3] px-8 text-base font-semibold text-[#072c57] transition hover:bg-[#52d0f7]"
                >
                  + Buscar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </HomeHero>

      <section className="bg-[#072c57] py-16 text-white sm:py-20">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-4 md:grid-cols-3">
            {communityCards.map((card) => (
              <Link key={card.title} href={card.href} className="block">
                <article className="group relative overflow-hidden rounded bg-slate-900 shadow-xl">
                  <div className="relative h-[480px] w-full overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                      unoptimized
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-8">
                      <h3 className="text-2xl font-semibold text-white relative inline-block">
                        {card.title}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2fd0ff] transition-all duration-500 group-hover:w-full"></span>
                      </h3>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="home-accesos" className="bg-[#dcecff] py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-4xl font-medium text-[#214ca0]">Excelencia IFTS</h2>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md border border-[#214ca0] px-6 py-3 text-sm font-medium text-[#214ca0]"
            >
              <span className="tag-underline">Ingresar al portal</span>
            </Link>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {excellenceCards.map((card) => (
              <article
                key={card.title}
                className="group overflow-hidden rounded bg-white/5 border border-white/10 transition-all duration-100 hover:border-[#2fd0ff]/50"
              >
                <Link href={card.href} className="flex flex-col h-full w-full">
                  {/* 1. Agrandar/Estirar: Aumentamos la altura a h-[420px] */}
                  <div className="relative h-[420px] w-full overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#072c57] via-transparent to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-8">
                      <h3 className="text-2xl font-semibold text-white relative inline-block">
                        {card.title}
                        {/* 2. Efecto underline de izquierda a derecha */}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2fd0ff] transition-all duration-500 group-hover:w-full"></span>
                      </h3>
                      <p className="mt-4 text-sm text-slate-200 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#072c57] py-16 text-white sm:py-20">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-4xl font-medium">Ultimas noticias</h2>
            <Link
              href="/noticias"
              className="inline-flex items-center justify-center rounded-md border border-[#28c2f3] px-6 py-3 text-sm font-medium text-[#28c2f3] transition hover:bg-[#28c2f3] hover:text-[#072c57]"
            >
              <span className="tag-underline">Ver noticias</span>
            </Link>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {latestNews.map((item) => (
              <NewsCard key={item.id} news={item} variant="dark" />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
