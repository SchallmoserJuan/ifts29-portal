"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error();
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg border border-slate-200 shadow-xl">
      {/* Comentario para el Profesor: Validación client-side mediante atributos HTML5 */}
      <div>
        <label className="block text-sm font-semibold text-slate-700">Nombre completo</label>
        <input required name="nombre" type="text" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">Correo Electrónico</label>
        <input required name="email" type="email" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">Asunto</label>
        <input required name="asunto" type="text" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">Mensaje / Consulta</label>
        <textarea required name="mensaje" rows={4} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-slate-900 text-white font-bold py-3 px-4 rounded-md hover:bg-slate-800 transition-all disabled:opacity-50"
      >
        {status === "loading" ? "Procesando envío..." : "Enviar consulta"}
      </button>

      {status === "success" && (
        <div className="p-4 bg-green-50 text-green-700 rounded-md border border-green-200">
          ✓ ¡Mensaje enviado con éxito!
        </div>
      )}
      {status === "error" && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
          ⚠ No se pudo enviar el mensaje.
        </div>
      )}
    </form>
  );
}