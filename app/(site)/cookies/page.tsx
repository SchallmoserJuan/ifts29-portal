import type { Metadata } from 'next'
import { LegalPageShell } from '@/src/components/legal/LegalPageShell'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Información sobre el uso de cookies en el portal del IFTS N° 29.',
}

export default function CookiesPage() {
  return (
    <LegalPageShell
      title="Política de Cookies"
      description="Cómo usamos cookies y tecnologías similares en nuestro sitio web."
      lastUpdated="25 de mayo de 2026"
    >
      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que los sitios web guardan en tu dispositivo (computadora,
        tablet o teléfono) cuando los visitás. Permiten que el sitio recuerde tus acciones y preferencias
        durante un período de tiempo, para que no tengas que volver a introducirlas cada vez que regreses.
      </p>

      <h2>2. Cookies que utilizamos</h2>
      <p>
        El portal del IFTS N° 29 utiliza únicamente <strong>cookies técnicas y esenciales</strong>,
        necesarias para el funcionamiento correcto del sitio:
      </p>

      <table className="w-full text-sm my-6">
        <caption className="sr-only">Cookies utilizadas en el sitio</caption>
        <thead>
          <tr className="border-b border-slate-200">
            <th scope="col" className="text-left py-2 pr-4">Nombre / Tipo</th>
            <th scope="col" className="text-left py-2 pr-4">Finalidad</th>
            <th scope="col" className="text-left py-2">Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100">
            <td className="py-3 pr-4">Sesión (Next.js)</td>
            <td className="py-3 pr-4">Mantener la sesión de usuario activa</td>
            <td className="py-3">Sesión</td>
          </tr>
          <tr className="border-b border-slate-100">
            <td className="py-3 pr-4">Preferencias</td>
            <td className="py-3 pr-4">Recordar preferencias de navegación básicas</td>
            <td className="py-3">Persistente</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Cookies de terceros</h2>
      <p>
        Actualmente, nuestro sitio no utiliza cookies de terceros para publicidad, análisis de comportamiento
        ni seguimiento de usuarios. Si en el futuro incorporamos servicios que requieran cookies de terceros,
        actualizaremos esta política y solicitaremos tu consentimiento cuando corresponda.
      </p>

      <h2>4. Gestión de cookies</h2>
      <p>
        Podés controlar y/o eliminar las cookies según desees. Tené en cuenta que deshabilitar ciertas
        cookies puede afectar el funcionamiento del sitio, especialmente el inicio de sesión y el acceso
        a áreas privadas.
      </p>
      <p>
        Para gestionar las cookies en tu navegador, consultá las instrucciones oficiales de:
      </p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
        <li><a href="https://support.microsoft.com/es-es/microsoft-edge" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
      </ul>

      <h2>5. Cambios en esta política</h2>
      <p>
        Podemos actualizar esta política de cookies ocasionalmente. Te recomendamos revisar esta página
        periódicamente para mantenerte informado.
      </p>

      <h2>6. Contacto</h2>
      <p>
        Si tenés preguntas sobre el uso de cookies en nuestro sitio, escribinos a través de nuestro{' '}
        <a href="/contacto">formulario de contacto</a>.
      </p>
    </LegalPageShell>
  )
}
