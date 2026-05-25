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
 *   - heroImage, floatingImage, studyPlanImage, introImage, methodologyImage (uploads)
 *   - professionalProfile, graduateProfile, methodology (richText)
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
  articulations: [
    {
      institution: 'Universidad Nacional de Quilmes (UNQ)',
      description: 'Licenciatura en Informática',
      link: '#',
    },
    {
      institution: 'Universidad Tecnológica Nacional (UTN)',
      description: 'Licenciatura en Sistemas de Información',
      link: '#',
    },
    {
      institution: 'Universidad Tecnológica Nacional (UTN)',
      description: 'Ingenieria en Computación',
      link: '#',
    },
  ],
  // Hero
  heroHeadline: 'Tecnicatura Superior en Desarrollo de Software',
  heroParagraph:
    'Una formación de excelencia pensada para quienes buscan dominar la creación de software con rigor academico y mirada profesional. Preparamos técnicos capaces de liderar proyectos, diseñar arquitecturas robustas y aportar valor real a la industria tecnológica.',
  // Introducción
  introTitle: 'Formación técnica superior con proyección profesional',
  introDescription:
    'La Tecnicatura Superior en Desarrollo de Software del IFTS 29 integra conocimientos solidos en programación, analisis de sistemas y gestion de proyectos con una fuerte vinculación al mundo laboral. Nuestro enfoque combina la precisión del pensamiento logico con la creatividad necesaria para resolver problemas complejos en entornos reales.',
  introFocus:
    'El plan de estudios abarca desde los fundamentos de la programación hasta la arquitectura de software escalable, pasando por bases de datos, desarrollo web, cloud computing y metodologias agiles. Cada materia esta diseñada para construir competencias aplicables desde el primer dia.',
  introOutcome:
    'Al egresar, el técnico estara capacitado para participar en equipos de desarrollo de software, liderar proyectos tecnológicos, diseñar soluciones integrales y continuar su formación en carreras de grado con una base tecnica excepcional.',
  introIndustry:
    'La industria del software es uno de los sectores de mayor crecimiento en la region. La demanda de profesionales calificados supera ampliamente la oferta, generando oportunidades laborales de calidad, salarios competitivos y posibilidades de trabajo remoto con alcance global.',
  // Perfil Profesional
  profileTitle: 'Perfil del Profesional',
  profileSubtitle: 'Un técnico formado para construir el futuro digital',
  profileBlocks: [
    {
      title: 'Arquitectura de Software',
      text: 'Capacidad para diseñar estructuras modulares, escalables y mantenibles. Comprensión profunda de patrones de diseño, principios SOLID y decisiones tecnicas que impactan en el negocio.',
    },
    {
      title: 'Backend y Frontend',
      text: 'Dominio integral del stack tecnológico moderno: desde la logica del servidor, APIs RESTful y bases de datos, hasta interfaces de usuario responsivas, accesibles y centradas en la experiencia.',
    },
    {
      title: 'Cloud y DevOps',
      text: 'Conocimientos en despliegue de aplicaciones en entornos cloud, contenedores, integración continua y monitoreo. Visión operativa que une desarrollo e infraestructura.',
    },
    {
      title: 'Metodologias Agiles',
      text: 'Trabajo en equipos multidisciplinarios bajo marcos como Scrum y Kanban. Capacidad de adaptación, iteración continua y entrega de valor en ciclos cortos.',
    },
    {
      title: 'Liderazgo y Trabajo en Equipo',
      text: 'Habilidades de comunicación tecnica, gestion de conflictos y coordinación de proyectos. Un profesional que aporta tanto codigo como visión estrategica al equipo.',
    },
    {
      title: 'Pensamiento Logico',
      text: 'Fundamento matematico y algoritmico solido que permite abordar problemas complejos con soluciones elegantes, eficientes y bien fundamentadas.',
    },
  ],
  profileQuote: '"El software no solo cambia sistemas, cambia la forma en que el mundo avanza."',
  // Plan de Estudios
  studyPlanTitle: 'Plan de Estudios',
  studyPlanSubtitle: 'Curricula académica',
  studyPlanDescription:
    'Un recorrido estructurado en tres años que combina fundamentos teoricos, practicas intensivas y proyectos integradores. La progresión esta diseñada para que cada cuatrimestre construya sobre el anterior, generando una formación coherente y aplicable.',
  studyPlanDurationLabel: '3 años de formación',
  studyPlanStructureLabel: 'Estructura por cuatrimestres',
  studyPlanFocusLabel: 'Enfoque progresivo del aprendizaje',
  // Metodología
  methodologyTitle: 'Experiencia Académica',
  methodologySubtitle: 'Metodología de formación',
  methodologyItems: [
    {
      title: 'Formación Práctica',
      text: 'Más del 60% de las horas curriculares se dedican a laboratorios, proyectos y resolución de problemas reales. Aprender haciendo es nuestra premisa.',
    },
    {
      title: 'Proyectos Reales',
      text: 'Los estudiantes trabajan en proyectos concretos que simulan contextos laborales reales, desde la especificación inicial hasta el despliegue en producción.',
    },
    {
      title: 'Trabajo Colaborativo',
      text: 'Fomentamos el trabajo en equipo mediante grupos de estudio, proyectos integradores y dinámicas de pair programming que reflejan la industria actual.',
    },
    {
      title: 'Enfoque Moderno',
      text: 'El plan de estudios se actualiza periodicamente para incorporar tecnologías emergentes, herramientas de la industria y buenas prácticas consolidadas a nivel global.',
    },
    {
      title: 'Aprendizaje Progresivo',
      text: 'Cada nivel introduce complejidad de manera gradual, permitiendo que el estudiante asimile conceptos fundamentales antes de abordar arquitecturas avanzadas.',
    },
    {
      title: 'Perfil Profesional',
      text: 'La formación combina bases técnicas sólidas con habilidades analíticas y de comunicación, preparando profesionales capaces de adaptarse a distintos entornos y desafíos tecnológicos.',
    },
  ],
  // Salidas laborales
  outcomesTitle: 'Campos de desempeño',
  outcomesSubtitle:
    'La industria tecnológica ofrece múltiples vertientes de especialización para el egresado.',
  // Documentos
  documentsTitle: 'Documentos Institucionales',
  documentsSubtitle: 'Material académico y normativo de referencia.',
  // CTA Final
  ctaTitle: 'Impulsá tu futuro en el mundo del software.',
  ctaSubtitle:
    'Una carrera de excelencia técnica, respaldada por una institución pública con trayectoria y visión de futuro.',
  ctaLabel: 'Solicitar información de ingreso',
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
  console.log('  - heroImage, floatingImage, studyPlanImage, introImage, methodologyImage (subir imagenes)')
  console.log('  - professionalProfile, graduateProfile, methodology (editar rich text)')
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
