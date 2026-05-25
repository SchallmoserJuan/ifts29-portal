import type { Metadata } from 'next'
import { LegalPageShell } from '@/src/components/legal/LegalPageShell'

export const metadata: Metadata = {
  title: 'Accesibilidad',
  description: 'Compromiso del IFTS N° 29 con la accesibilidad web y la eliminación de barreras digitales.',
}

export default function AccesibilidadPage() {
  return (
    <LegalPageShell
      title="Accesibilidad Web"
      description="Nuestro compromiso con un portal accesible para toda la comunidad."
      lastUpdated="25 de mayo de 2026"
    >
      <h2>1. Compromiso institucional</h2>
      <p>
        El IFTS N° 29 se compromete a garantizar que su portal web sea accesible para todas las personas,
        incluyendo aquellas con discapacidades visuales, auditivas, motoras o cognitivas. Creemos que la
        educación debe ser inclusiva desde todos sus puntos de contacto digitales.
      </p>

      <h2>2. Estándares seguidos</h2>
      <p>
        Nuestro sitio web busca cumplir con los estándares del <strong>Web Content Accessibility Guidelines (WCAG) 2.1</strong>{' '}
        nivel AA, establecidos por el World Wide Web Consortium (W3C). Estas pautas internacionales definen
        cómo hacer el contenido web más accesible.
      </p>

      <h2>3. Características de accesibilidad implementadas</h2>
      <ul>
        <li><strong>Contraste de colores</strong>: combinaciones que cumplen con los ratios mínimos de contraste</li>
        <li><strong>Navegación por teclado</strong>: todos los elementos interactivos son operables sin mouse</li>
        <li><strong>Texto alternativo</strong>: imágenes relevantes incluyen descripciones para lectores de pantalla</li>
        <li><strong>Estructura semántica</strong>: uso correcto de encabezados, listas y landmarks HTML</li>
        <li><strong>Enfoque visible</strong>: indicadores claros del elemento seleccionado durante navegación con teclado</li>
        <li><strong>Tamaño de texto</strong>: diseño responsive que respeta las preferencias de tamaño de fuente del usuario</li>
      </ul>

      <h2>4. Limitaciones conocidas</h2>
      <p>
        Reconocemos que ciertos contenidos de terceros o documentos PDF externos pueden no cumplir
        completamente con los estándares de accesibilidad. Estamos trabajando para minimizar estas
        barreras y ofrecer alternativas accesibles cuando sea posible.
      </p>

      <h2>5. Cómo reportar problemas de accesibilidad</h2>
      <p>
        Si encontrás alguna barrera de accesibilidad que te impida usar nuestro sitio, por favor
        reportalo. Tu retroalimentación nos ayuda a mejorar:
      </p>
      <ul>
        <li>Usá nuestro <a href="/contacto">formulario de contacto</a></li>
        <li>Indicá la página y el problema específico que encontraste</li>
        <li>Si podés, describí el dispositivo, navegador y tecnología asistiva que usás</li>
      </ul>

      <h2>6. Recursos de accesibilidad</h2>
      <p>
        Si necesitás información en formatos alternativos (por ejemplo, texto ampliado, audio descriptivo
        o formato accesible), contactanos y haremos todo lo posible para proporcionártela.
      </p>
    </LegalPageShell>
  )
}
