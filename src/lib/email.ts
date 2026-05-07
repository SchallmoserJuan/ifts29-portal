import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = 'IFTS 29 <noreply@ifts29.edu.ar>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@ifts29.edu.ar'

interface ContactData {
  nombre: string
  email: string
  asunto: string
  mensaje: string
}

export async function sendReplyEmail(
  toEmail: string,
  contact: ContactData,
  replyText: string
) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #072c57; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">IFTS N° 29</h1>
      </div>
      
      <div style="padding: 30px; background-color: #f7fbff;">
        <h2 style="color: #214ca0; margin-top: 0;">Respuesta a tu consulta</h2>
        
        <div style="background-color: white; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <p style="margin: 0 0 10px;"><strong>Asunto:</strong> ${contact.asunto}</p>
          <p style="margin: 0 0 10px;"><strong>Tu mensaje:</strong></p>
          <p style="background-color: #f0f7ff; padding: 15px; border-radius: 6px; margin: 0;">${contact.mensaje}</p>
        </div>
        
        <div style="background-color: white; border-radius: 8px; padding: 20px; border-left: 4px solid #28c2f3;">
          <p style="margin: 0 0 10px;"><strong>Respuesta del equipo del IFTS 29:</strong></p>
          <p style="margin: 0; line-height: 1.6;">${replyText.replace(/\n/g, '<br>')}</p>
        </div>
      </div>
      
      <div style="padding: 20px; text-align: center; color: #666; font-size: 12px;">
        <p style="margin: 0;">Este mensaje fue enviado desde el portal del IFTS N° 29.</p>
        <p style="margin: 10px 0 0;">No respondas directamente a este email, utiliza el sistema del portal.</p>
      </div>
    </div>
  `

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [toEmail],
      subject: `Re: ${contact.asunto} - IFTS 29`,
      html,
    })

    if (error) {
      console.error('Error sending email:', error)
      return false
    }

    return true
  } catch (err) {
    console.error('Exception sending email:', err)
    return false
  }
}

export async function sendNewContactNotification(contact: ContactData) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #072c57; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">IFTS N° 29 - Nuevo Contacto</h1>
      </div>
      
      <div style="padding: 30px; background-color: #f7fbff;">
        <div style="background-color: white; border-radius: 8px; padding: 20px;">
          <p style="margin: 0 0 10px;"><strong>Nombre:</strong> ${contact.nombre}</p>
          <p style="margin: 0 0 10px;"><strong>Email:</strong> ${contact.email}</p>
          <p style="margin: 0 0 10px;"><strong>Asunto:</strong> ${contact.asunto}</p>
          <p style="margin: 0 0 10px;"><strong>Mensaje:</strong></p>
          <p style="background-color: #f0f7ff; padding: 15px; border-radius: 6px; margin: 0;">${contact.mensaje}</p>
        </div>
      </div>
    </div>
  `

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      subject: `Nuevo contacto: ${contact.asunto}`,
      html,
    })

    if (error) {
      console.error('Error sending notification email:', error)
      return false
    }

    return true
  } catch (err) {
    console.error('Exception sending notification email:', err)
    return false
  }
}