import type { Metadata } from 'next'
import { LegalPageShell } from '@/src/components/legal/LegalPageShell'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad y protección de datos personales del IFTS N° 29.',
}

export default function PrivacidadPage() {
  return (
    <LegalPageShell
      title="Política de Privacidad"
      description="Cómo protegemos tus datos personales y respetamos tu privacidad."
      lastUpdated="25 de mayo de 2026"
    >
      <h2>1. Marco legal</h2>
      <p>
        El IFTS N° 29 cumple con la <strong>Ley N° 25.326 de Protección de los Datos Personales</strong> y
        el <strong>Decreto N° 1.558/2001</strong> de la República Argentina. Esta normativa garantiza el
        derecho de las personas a conocer, actualizar, rectificar y suprimir la información que sobre
        ellas se encuentre registrada en bases de datos públicas o privadas.
      </p>

      <h2>2. Datos que recopilamos</h2>
      <p>Podemos recopilar los siguientes datos personales:</p>
      <ul>
        <li>Nombre y apellido</li>
        <li>Número de documento (DNI)</li>
        <li>Dirección de correo electrónico</li>
        <li>Número de teléfono</li>
        <li>Información académica y de inscripción</li>
      </ul>
      <p>
        Estos datos se solicitan exclusivamente para fines institucionales: gestión de inscripciones,
        comunicación académica, trámites administrativos y contacto con la comunidad educativa.
      </p>

      <h2>3. Finalidad del tratamiento</h2>
      <p>Los datos personales se utilizan para:</p>
      <ul>
        <li>Gestionar el proceso de inscripción y matriculación</li>
        <li>Mantener contacto con estudiantes, docentes y personal</li>
        <li>Enviar información académica y administrativa relevante</li>
        <li>Cumplir con obligaciones legales y normativas del sistema educativo</li>
        <li>Realizar estadísticas internas con fines de mejora institucional</li>
      </ul>

      <h2>4. Derechos de los titulares</h2>
      <p>
        De acuerdo con la Ley N° 25.326, toda persona tiene derecho a:
      </p>
      <ul>
        <li><strong>Acceso</strong>: conocer qué datos personales tenemos registrados</li>
        <li><strong>Rectificación</strong>: corregir datos inexactos o desactualizados</li>
        <li><strong>Supresión</strong>: solicitar la eliminación de sus datos cuando corresponda</li>
        <li><strong>Confidencialidad</strong>: que sus datos sean tratados de forma segura y confidencial</li>
      </ul>
      <p>
        Para ejercer estos derechos, podés contactarnos a través de la página de
        <a href="/contacto">contacto</a> o por correo electrónico indicando claramente tu solicitud.
      </p>

      <h2>5. Seguridad de la información</h2>
      <p>
        Implementamos medidas técnicas y organizativas para proteger tus datos personales contra
        accesos no autorizados, pérdida, alteración o divulgación. Solo el personal autorizado tiene
        acceso a la información personal, y lo hace bajo estricta confidencialidad.
      </p>

      <h2>6. Compartir información con terceros</h2>
      <p>
        El IFTS N° 29 no vende, alquila ni transfiere datos personales a terceros con fines comerciales.
        Podemos compartir información únicamente con autoridades educativas competentes cuando la ley
        así lo requiera.
      </p>

      <h2>7. Contacto</h2>
      <p>
        Si tenés preguntas sobre esta política de privacidad o deseás ejercer tus derechos, podés
        escribirnos a través de nuestro <a href="/contacto">formulario de contacto</a>.
      </p>
    </LegalPageShell>
  )
}
