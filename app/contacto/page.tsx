// NOTA: No lleva "use client" para que PageShell pueda correr en el servidor

import { PageShell } from "@/src/components/page-shell"; // Importamos el layout base que ya incluye el Header y Footer
import { ContactForm } from "@/src/components/contact-form";

export default function ContactoPage() {
  return (
    <PageShell>
      <main className="max-w-3xl mx-auto py-20 px-6">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4 italic">Formulario de Contacto</h1>
          <p className="text-slate-600">
            Canal centralizado para consultas de aspirantes y alumnos del IFTS N° 29.
          </p>
        </header>

        {/* El formulario interactivo sí es un Client Component */}
        <ContactForm/>
      </main>
    </PageShell>
  );
}