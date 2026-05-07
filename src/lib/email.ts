const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY || ''
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY || ''
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || ''
const EMAILJS_TEMPLATE_ID_REPLY = process.env.EMAILJS_TEMPLATE_ID_REPLY || ''
const EMAILJS_TEMPLATE_ID_NOTIFICATION = process.env.EMAILJS_TEMPLATE_ID_NOTIFICATION || ''

interface ContactData {
  nombre: string
  email: string
  asunto: string
  mensaje: string
}

function formatDate(): string {
  const now = new Date()
  return now.toLocaleString('es-AR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

async function sendEmailJS(templateId: string, templateParams: Record<string, string>) {
  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: templateId,
      user_id: EMAILJS_PUBLIC_KEY,
      accessToken: EMAILJS_PRIVATE_KEY,
      template_params: templateParams,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error)
  }

  const text = await response.text()
  return text === 'OK' ? { success: true } : JSON.parse(text)
}

export async function sendReplyEmail(
  toEmail: string,
  contact: ContactData,
  replyText: string
) {
  const templateParams = {
    to_email: toEmail,
    to_name: contact.nombre,
    subject: `Re: ${contact.asunto} - IFTS 29`,
    original_message: contact.mensaje,
    reply_message: replyText,
    time: formatDate(),
    from_name: 'IFTS 29',
    reply_to: 'noreply@ifts29.edu.ar',
  }

  try {
    const result = await sendEmailJS(EMAILJS_TEMPLATE_ID_REPLY, templateParams)
    console.log('Email sent successfully:', result)
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

export async function sendNewContactNotification(contact: ContactData) {
  const templateParams = {
    name: contact.nombre,
    email: contact.email,
    subject: `Nuevo contacto: ${contact.asunto}`,
    message: contact.mensaje,
    time: formatDate(),
  }

  try {
    const result = await sendEmailJS(EMAILJS_TEMPLATE_ID_NOTIFICATION, templateParams)
    console.log('Notification email sent:', result)
    return true
  } catch (error) {
    console.error('Error sending notification email:', error)
    return false
  }
}