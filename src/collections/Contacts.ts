import type { CollectionConfig } from 'payload'

interface ContactData {
  nombre: string
  email: string
  asunto: string
  mensaje: string
  status: string
  reply?: string | null
  repliedAt?: string | null
  repliedBy?: string | null
}

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  admin: {
    useAsTitle: 'asunto',
    defaultColumns: ['nombre', 'email', 'status', 'createdAt'],
    listSearchableFields: ['nombre', 'email'],
    description: 'Consultas recibidas a través del formulario de contacto del portal.',
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === 'update' && doc.status === 'replied' && doc.reply) {
          const contactData: ContactData = {
            nombre: doc.nombre as string,
            email: doc.email as string,
            asunto: doc.asunto as string,
            mensaje: doc.mensaje as string,
            status: doc.status as string,
            reply: doc.reply,
          }

          const { sendReplyEmail } = await import('@/src/lib/email')
          await sendReplyEmail(doc.email as string, contactData, doc.reply as string)
        }
      },
    ],
  },
  fields: [
    {
      name: 'nombre',
      label: 'Nombre completo',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Correo electrónico',
      type: 'text',
      required: true,
    },
    {
      name: 'asunto',
      label: 'Asunto',
      type: 'text',
      required: true,
    },
    {
      name: 'mensaje',
      label: 'Mensaje',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      label: 'Estado',
      type: 'select',
      defaultValue: 'new',
      required: true,
      options: [
        { label: 'Nuevo', value: 'new' },
        { label: 'Leído', value: 'read' },
        { label: 'Respondiendo', value: 'responding' },
        { label: 'Respondido', value: 'replied' },
        { label: 'Cerrado', value: 'closed' },
      ],
      admin: {
        description: 'Estado actual de la consulta. "Respondiendo" indica que alguien está trabajando en la respuesta.',
      },
    },
    {
      name: 'respondingBy',
      label: 'Respondido por',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      admin: {
        readOnly: true,
        description: 'Usuario que actualmente está respondiendo esta consulta.',
      },
    },
    {
      name: 'respondingAt',
      label: 'Fecha de inicio de respuesta',
      type: 'date',
      required: false,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'reply',
      label: 'Respuesta',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Escribe aquí la respuesta que se enviará al contacto.',
      },
    },
    {
      name: 'repliedAt',
      label: 'Fecha de respuesta',
      type: 'date',
      required: false,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'repliedBy',
      label: 'Respondido por',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      admin: {
        readOnly: true,
      },
    },
  ],
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: ({ req }) => req.user?.role === 'admin',
  },
}