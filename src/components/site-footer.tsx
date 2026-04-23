import { SiteBrand } from '@/src/components/site-brand'
import { getSiteSettings } from '@/src/lib/content'

export async function SiteFooter() {
  const settings = await getSiteSettings()

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10">
        <SiteBrand dark />
        <div className="mt-8 border-t border-slate-300" />

        <div className="grid gap-10 py-10 md:grid-cols-4">
          <div className="space-y-3 text-sm text-slate-700">
            <p className="font-semibold text-slate-950">Instituto</p>
            <p>{settings.siteTitle}</p>
            <p>{settings.address}</p>
            <p>{settings.phone}</p>
          </div>
          <div className="space-y-3 text-sm text-slate-700">
            <p className="font-semibold text-slate-950">Explorar</p>
            <p>Institucional</p>
            <p>Carreras</p>
            <p>Noticias</p>
            <p>Biblioteca</p>
          </div>
          <div className="space-y-3 text-sm text-slate-700">
            <p className="font-semibold text-slate-950">Comunidad</p>
            <p>Ingreso</p>
            <p>Portal</p>
            <p>Documentacion</p>
            <p>Recursos</p>
          </div>
          <div className="space-y-3 text-sm text-slate-700">
            <p className="font-semibold text-slate-950">Contacto</p>
            <p>{settings.contactEmail}</p>
            <p>YouTube</p>
            <p>Instagram</p>
            <p>LinkedIn</p>
          </div>
        </div>

        <div className="border-t border-slate-300 pt-6 text-xs text-slate-500">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>{settings.siteTitle} @ 2026. All rights reserved.</p>
            <div className="flex gap-6">
              <span>Portal</span>
              <span>Campus</span>
              <span>Comunidad</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
