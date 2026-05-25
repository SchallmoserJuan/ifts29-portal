/**
 * Script de seed para precargar becas y contenido de la página de becas.
 *
 * Uso:
 *   npx tsx --tsconfig tsconfig.json src/scripts/seed-becas.ts
 *
 * IMPORTANTE: Este script carga automaticamente .env.local via dotenv.
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

const scholarshipsData = [
  {
    title: 'Progresar',
    slug: 'progresar',
    status: 'published' as const,
    summary:
      'Programa de Respaldo para Estudiantes de la República Argentina. Es un programa integral de Becas Educativas que acompaña al estudiante en todos los niveles de formación durante su trayectoria académica, a través de un incentivo económico y estímulo personal.',
    requirements: [
      { item: 'Ser estudiante argentino/a' },
      { item: 'Estar cursando en una institución de educación superior' },
      { item: 'Realizar el trámite directamente en el sitio oficial del Ministerio de Educación de la Nación' },
    ],
    externalLink: 'https://www.argentina.gob.ar/educacion/progresar',
    order: 1,
  },
  {
    title: 'Becas para Estudios de Carreras Estratégicas de Educación Superior',
    slug: 'becas-para-estudios-de-carreras-estrategicas-de-educacion-superior',
    status: 'published' as const,
    summary:
      'Beca creada a partir de la Ley N°6615, acompaña a estudiantes que eligen carreras estratégicas que forman profesionales en rubros donde existe una amplia demanda laboral en la Ciudad de Buenos Aires.',
    requirements: [
      { item: 'Ser estudiante ingresante o regular de una carrera estratégica' },
      { item: 'Instituto de gestión estatal o privada de CABA' },
      { item: 'Cumplir con los requisitos establecidos en la normativa vigente' },
    ],
    externalLink: 'https://buenosaires.gob.ar/educacion/estudiantes/beca-para-estudios-de-carreras-estrategicas-de-educacion-superior',
    order: 2,
  },
  {
    title: 'Becas Estratégicas de Nivel Superior',
    slug: 'becas-estrategicas-de-nivel-superior',
    status: 'published' as const,
    summary:
      'Beca de nivel superior que acompaña a estudiantes que eligen carreras estratégicas de formación docente y de formación técnico profesional para el desarrollo socioeconómico y productivo de la Ciudad de Buenos Aires.',
    requirements: [
      { item: 'Estar inscripto en una carrera estratégica de nivel superior' },
      { item: 'Institución reconocida de la Ciudad de Buenos Aires' },
      { item: 'Cumplir con los requisitos establecidos por el programa' },
    ],
    externalLink: 'https://buenosaires.gob.ar/educacion/estudiantes/beca-para-carreras-estrategicas-de-nivel-superior',
    order: 3,
  },
  {
    title: 'Becas Manuel Belgrano',
    slug: 'becas-manuel-belgrano',
    status: 'published' as const,
    summary:
      'Programa nacional de becas destinado a estudiantes de educación superior que promueve la finalización de estudios y la permanencia en la universidad, otorgado por el Ministerio de Educación de la Nación.',
    requirements: [
      { item: 'Ser estudiante de una institución de educación superior' },
      { item: 'Cumplir con los requisitos socioeconómicos del programa' },
      { item: 'Mantener regularidad académica' },
    ],
    externalLink: 'https://www.argentina.gob.ar/educacion/becas-manuel-belgrano',
    order: 4,
  },
]

const becasPageData = {
  pageTitle: 'Becas y Programas de Apoyo',
  pageSubtitle: 'Información sobre becas disponibles para estudiantes del IFTS N° 29',
  scholarshipsTitle: 'Programas Disponibles',
  timelineTitle: 'Fechas Importantes',
  timelineItems: [
    {
      date: '15 de marzo',
      title: 'Apertura de inscripciones Beca Progresar',
      description: 'Inicio del periodo de postulación para el ciclo lectivo.',
    },
    {
      date: '30 de abril',
      title: 'Cierre de postulaciones Belgrano',
      description: 'Último día para presentar la documentación requerida.',
    },
    {
      date: '15 de junio',
      title: 'Publicación de resultados preliminares',
      description: 'Se publican las listas de beneficiarios provisionales.',
    },
  ],
  faqTitle: 'Preguntas Frecuentes',
  faqItems: [
    {
      question: '¿Quién puede solicitar las becas?',
      answer: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'Cada beca tiene sus propios requisitos. En general, están destinadas a estudiantes argentinos que cursen educación superior en instituciones reconocidas. Consultá los detalles de cada programa en sus sitios oficiales.',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: 'ltr' as const,
            },
          ],
          direction: 'ltr' as const,
        },
      },
    },
    {
      question: '¿Cuándo se abren las inscripciones?',
      answer: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'Las fechas varían según el programa. Consultá la sección de fechas importantes o los sitios web oficiales de cada beca para conocer los cronogramas actualizados.',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: 'ltr' as const,
            },
          ],
          direction: 'ltr' as const,
        },
      },
    },
    {
      question: '¿Cómo se realiza el trámite?',
      answer: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'La mayoría de los trámites se realizan de forma online a través de los portales oficiales de cada programa. Te recomendamos leer los requisitos específicos antes de iniciar la solicitud.',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: 'ltr' as const,
            },
          ],
          direction: 'ltr' as const,
        },
      },
    },
    {
      question: '¿Puedo solicitar más de una beca a la vez?',
      answer: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'Sí, podés postularte a múltiples programas siempre que cumplas con los requisitos de cada uno. Te sugerimos verificar las compatibilidades en los sitios oficiales.',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: 'ltr' as const,
            },
          ],
          direction: 'ltr' as const,
        },
      },
    },
    {
      question: '¿El IFTS 29 otorga becas propias?',
      answer: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'No, el IFTS 29 informa sobre programas nacionales y provinciales. Te asesoramos para que conozcas las opciones disponibles y cómo acceder a ellas.',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: 'ltr' as const,
            },
          ],
          direction: 'ltr' as const,
        },
      },
    },
  ],
  contactTitle: 'Consultá sobre Becas',
  contactText: '¿Tenés dudas sobre alguna beca o necesitás ayuda con el proceso de inscripción? Escribinos y te asesoramos.',
}

async function seedScholarships(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n[Seed] Becas...')

  for (const item of scholarshipsData) {
    const existing = await payload.find({
      collection: 'scholarships',
      limit: 1,
      where: { slug: { equals: item.slug } },
    })

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'scholarships',
        id: existing.docs[0].id,
        data: item,
      })
      console.log('   Beca actualizada:', item.title)
    } else {
      const created = await payload.create({
        collection: 'scholarships',
        data: item,
      })
      console.log('   Beca creada. ID:', created.id, '-', item.title)
    }
  }
}

async function seedBecasPage(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n[Seed] Página de Becas (global)...')

  try {
    await payload.updateGlobal({
      slug: 'becas-page',
      data: becasPageData,
    })
    console.log('   Página de becas actualizada.')
  } catch (err) {
    console.error('   Error al actualizar página de becas:', err)
  }
}

async function seed() {
  console.log('======================================')
  console.log('  SEED BECAS — IFTS 29 Portal')
  console.log('======================================')

  const payload = await getPayload({ config })

  await seedScholarships(payload)
  await seedBecasPage(payload)

  console.log('\n======================================')
  console.log('  SEED BECAS COMPLETADO')
  console.log('======================================')
}

seed()
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.error('\nError fatal en seed:', err)
    process.exit(1)
  })
