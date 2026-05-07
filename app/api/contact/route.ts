// This path will receive the POST, validate that the data does not arrive empty and connect with the email service.-

// Acá es donde aplicamos el manejo de errores para que, si el servicio de mail se cae, el sitio no tire un error 500, sino que le avise al usuario que el mensaje no se pudo enviar, pero que el sitio sigue funcionando.-

import { NextResponse } from 'next/server';

/**
 * API ROUTE: /api/contact
 * Este archivo maneja la lógica de servidor para el procesamiento de mensajes.
 * Implementamos el método POST para recibir de forma segura los datos del formulario.
 */
export async function POST(request: Request) {
  try {
    // 1. Recepción de datos:
    // Convertimos el cuerpo de la petición (ReadableStream) a un objeto JSON usable.
    const body = await request.json();
    const { nombre, email, asunto, mensaje } = body;

    // 2. Validación Server-Side:
    // Aunque el frontend valida, el backend siempre debe verificar que los datos existan.
    // Si falta algún campo, devolvemos un error 400 (Bad Request).
    if (!nombre || !email || !asunto || !mensaje) {
      return NextResponse.json(
        { error: 'Validación fallida: Todos los campos son requeridos.' },
        { status: 400 }
      );
    }

    // 3. Simulación de Integración con Servicio de Email:
    // Aquí es donde se conectaría con servicios como Resend, SendGrid o Nodemailer.
    // Usamos variables de entorno (process.env) para mantener las credenciales seguras.
    console.log(`[MAIL SERVER] Nuevo mensaje de: ${nombre} <${email}>`);
    console.log(`[MAIL SERVER] Asunto: ${asunto}`);

    /** 
     * El manejo de error se gestiona mediante el bloque try/catch.
     * Si la conexión con el servicio de mail fallara, el flujo saltaría al catch
     * impidiendo que la aplicación colapse.
     */

    // 4. Respuesta de Éxito:
    // Retornamos un JSON con código 200 para avisar al frontend que la operación fue exitosa.
    return NextResponse.json(
      { message: '¡Consulta recibida con éxito!' },
      { status: 200 }
    );

  } catch (error) {
    // 5. Gestión de Errores Críticos:
    // Capturamos cualquier fallo inesperado y devolvemos un código 500.
    console.error('ERROR_CONTACT_API:', error);
    
    return NextResponse.json(
      { error: 'Lo sentimos, el servicio de mensajería no está disponible temporalmente.' },
      { status: 500 }
    );
  }
}