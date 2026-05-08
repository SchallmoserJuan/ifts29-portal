/**
 * Script de seed para precargar la carrera en cualquier base de datos.
 *
 * Uso:
 *   npm run seed:career
 *
 * IMPORTANTE: Este script carga automaticamente .env.local via dotenv.
 * Asegurate de que DATABASE_URL apunte a la base de datos correcta.
 *
 * El script verifica si ya existe una carrera con el slug correspondiente.
 * Si no existe, la crea con todos los datos estructurados.
 *
 * Campos que deben completarse manualmente desde el admin:
 *   - heroImage, floatingImage, studyPlanImage (uploads)
 *   - professionalProfile, graduateProfile, methodology (richText)
 *   - documents (relaciones a documentos)
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

const CAREER_SLUG = 'tecnicatura-superior-en-desarrollo-de-software'

const careerData = {
  name: 'Tecnicatura Superior en Desarrollo de Software',
  slug: CAREER_SLUG,
  status: 'published' as const,
  summary:
    'Formacion de excelencia orientada al desarrollo de software, arquitectura de sistemas, bases de datos y practicas profesionalizantes en el ecosistema tecnologico actual.',
  duration: '3 años',
  modality: 'A distancia',
  resolution: 'Res. M.E.N. N° 1234/2023',
  requirements: [
    { item: 'Titulo secundario completo' },
    { item: 'Documentacion de identidad vigente' },
    { item: 'Constancia de CUIL' },
  ],
  studyPlan: [
    { subject: 'Tecnicas de Programacion' },
    { subject: 'Administracion de Bases de Datos' },
    { subject: 'Elementos de Analisis Matematico' },
    { subject: 'Logica Computacional' },
    { subject: 'Desarrollo de Sistemas Orientado a Objetos' },
    { subject: 'Modelado y Diseno de Software' },
    { subject: 'Estadistica y Probabilidades para el Desarrollo de Software' },
    { subject: 'Ingles' },
    { subject: 'Aproximacion al campo profesional del Desarrollo de Software' },
    { subject: 'Desarrollo de Aplicaciones para Dispositivos' },
    { subject: 'Metodologia de Pruebas de Sistemas' },
    { subject: 'Tecnologias de la Informacion y Comunicacion' },
    { subject: 'Taller de Comunicacion' },
    { subject: 'Desarrollo de Sistemas de Informacion orientados a la gestion y apoyo a las decisiones' },
    { subject: 'Desarrollo de Sistemas Web (Back End)' },
    { subject: 'Desarrollo de Sistemas Web (Front End)' },
    { subject: 'Ingenieria de Software' },
    { subject: 'Desarrollo e implementacion de sistemas en la nube' },
    { subject: 'Programacion sobre Redes' },
    { subject: 'Seminario de Profundizacion y/o Actualizacion' },
    { subject: 'Gestion de Proyectos' },
    { subject: 'Trabajo, Tecnologia y Sociedad' },
    { subject: 'Proyecto Integrador' },
  ],
  outcomes: [
    {
      title: 'Desarrollo Frontend',
      description: 'Construccion de interfaces modernas con tecnologias web actuales.',
    },
    {
      title: 'Desarrollo Backend',
      description: 'Diseno e implementacion de APIs, servicios y logica de negocio.',
    },
    {
      title: 'QA y Testing',
      description: 'Aseguramiento de calidad y pruebas automatizadas de software.',
    },
    {
      title: 'Cloud Computing',
      description: 'Despliegue y gestion de aplicaciones en entornos cloud.',
    },
    {
      title: 'DevOps',
      description: 'Integracion continua, infraestructura como codigo y automatizacion.',
    },
    {
      title: 'Bases de Datos',
      description: 'Modelado, administracion y optimizacion de bases de datos relacionales y NoSQL.',
    },
    {
      title: 'Aplicaciones Moviles',
      description: 'Desarrollo de apps multiplataforma con enfoque en usabilidad.',
    },
    {
      title: 'Soporte Tecnologico',
      description: 'Asesoramiento tecnico y resolucion de incidentes en entornos productivos.',
    },
  ],
}

async function seed() {
  const payload = await getPayload({ config })

  console.log('Verificando si existe la carrera...')

  const existing = await payload.find({
    collection: 'careers',
    limit: 1,
    where: {
      slug: {
        equals: CAREER_SLUG,
      },
    },
  })

  if (existing.docs.length > 0) {
    console.log('La carrera ya existe. ID:', existing.docs[0].id)
    console.log('Actualizando datos estructurados...')

    await payload.update({
      collection: 'careers',
      id: existing.docs[0].id,
      data: careerData,
    })

    console.log('Carrera actualizada exitosamente.')
    return
  }

  console.log('Creando carrera...')

  const created = await payload.create({
    collection: 'careers',
    data: careerData,
  })

  console.log('Carrera creada exitosamente. ID:', created.id)
  console.log('')
  console.log('NOTA: Los siguientes campos deben completarse desde el panel de admin:')
  console.log('  - heroImage, floatingImage, studyPlanImage (subir imagenes)')
  console.log('  - professionalProfile, graduateProfile, methodology (editar rich text)')
  console.log('  - documents (relacionar documentos PDF desde la coleccion Documents)')
}

seed()
  .then(() => {
    console.log('Seed completado.')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Error en seed:', err)
    process.exit(1)
  })
