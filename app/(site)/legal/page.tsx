import type { Metadata } from 'next'
import { LegalPageShell } from '@/src/components/legal/LegalPageShell'

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description: 'Términos de uso y condiciones legales del portal del IFTS N° 29.',
}

export default function LegalPage() {
  return (
    <LegalPageShell
      title="Aviso Legal"
      description="Términos de uso y condiciones para el acceso y navegación de este sitio web."
      lastUpdated="25 de mayo de 2026"
    >
      <h2>1. Identificación del titular</h2>
      <p>
        Este sitio web es operado por el <strong>Instituto de Formación Técnica Superior N° 29 (IFTS 29)</strong>,
        institución de educación pública dependiente del Ministerio de Educación de la Ciudad Autónoma de
        Buenos Aires, República Argentina.
      </p>

      <h2>2. Objeto del sitio web</h2>
      <p>
        El portal del IFTS 29 tiene como finalidad proporcionar información institucional, académica y
        administrativa a la comunidad educativa, incluyendo estudiantes actuales y potenciales, docentes,
        personal y público en general.
      </p>

      <h2>3. Propiedad intelectual</h2>
      <p>
        Todo el contenido de este sitio web (textos, imágenes, logotipos, diseño, código fuente, etc.) es
        propiedad del IFTS 29 o se utiliza con autorización de sus respectivos titulares. Queda prohibida
        su reproducción, distribución, comunicación pública o transformación sin autorización expresa,
        salvo para uso personal y privado o cuando la ley lo permita expresamente.
      </p>

      <h2>4. Uso permitido</h2>
      <p>
        El usuario se compromete a utilizar este sitio web de manera lícita, respetando la legislación
        vigente y los derechos de terceros. Está prohibido:
      </p>
      <ul>
        <li>Realizar actividades ilícitas, fraudulentas o que puedan dañar la imagen del instituto</li>
        <li>Intentar acceder sin autorización a áreas restringidas del sitio</li>
        <li>Introducir virus, malware o cualquier código malicioso</li>
        <li>Recopilar datos de terceros sin su consentimiento</li>
        <li>Utilizar el sitio para enviar spam o comunicaciones no solicitadas</li>
      </ul>

      <h2>5. Enlaces a sitios externos</h2>
      <p>
        Este sitio puede contener enlaces a sitios web de terceros (por ejemplo, sitios de becas
        gubernamentales, plataformas educativas externas, etc.). El IFTS 29 no se hace responsable del
        contenido, políticas de privacidad ni prácticas de dichos sitios externos.
      </p>

      <h2>6. Limitación de responsabilidad</h2>
      <p>
        El IFTS 29 pone su máximo empeño en mantener la información del sitio actualizada y correcta,
        pero no garantiza la ausencia de errores, omisiones o interrupciones temporales en el servicio.
        El uso de la información contenida en este sitio es responsabilidad exclusiva del usuario.
      </p>
      <p>
        No nos hacemos responsables por daños directos o indirectos derivados del uso o imposibilidad
        de uso de este sitio web, salvo en casos de dolo o negligencia grave comprobada.
      </p>

      <h2>7. Modificaciones</h2>
      <p>
        El IFTS 29 se reserva el derecho de modificar, suspender o interrumpir, total o parcialmente,
        el acceso a este sitio web cuando lo considere necesario, sin necesidad de previo aviso.
      </p>

      <h2>8. Legislación aplicable y jurisdicción</h2>
      <p>
        Estas condiciones se rigen por la legislación de la República Argentina. Para cualquier controversia
        derivada del acceso o uso de este sitio web, las partes se someten a la jurisdicción de los
        tribunales competentes de la Ciudad Autónoma de Buenos Aires, con renuncia expresa a cualquier
        otro fuero o jurisdicción.
      </p>

      <h2>9. Contacto</h2>
      <p>
        Para cualquier consulta relacionada con este aviso legal, podés contactarnos a través de nuestra
        página de <a href="/contacto">contacto</a>.
      </p>
    </LegalPageShell>
  )
}
