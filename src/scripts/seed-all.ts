/**
 * Seed completo del sitio IFTS 29
 *
 * Carga todos los datos iniciales en la base de datos:
 *   - Carrera (careers)
 *   - Noticias (news)
 *   - Eventos (events)
 *   - Proyectos (projects)
 *   - Empresas (companies)
 *   - Contenido institucional (institutional-content)
 *   - Configuracion del sitio (site-settings)
 *
 * Uso:
 *   npm run seed:all
 *
 * IMPORTANTE: Este script carga automaticamente .env.local via dotenv.
 * Asegurate de que DATABASE_URL apunte a la base de datos correcta.
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import { scholarshipsData, becasPageData } from './seed-becas'

const CAREER_SLUG = 'tecnicatura-superior-en-desarrollo-de-software'

// ============================================================
// DATOS: CARRERA
// ============================================================
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
    { title: 'Desarrollo Frontend', description: 'Construccion de interfaces modernas con tecnologias web actuales.' },
    { title: 'Desarrollo Backend', description: 'Diseno e implementacion de APIs, servicios y logica de negocio.' },
    { title: 'QA y Testing', description: 'Aseguramiento de calidad y pruebas automatizadas de software.' },
    { title: 'Cloud Computing', description: 'Despliegue y gestion de aplicaciones en entornos cloud.' },
    { title: 'DevOps', description: 'Integracion continua, infraestructura como codigo y automatizacion.' },
    { title: 'Bases de Datos', description: 'Modelado, administracion y optimizacion de bases de datos relacionales y NoSQL.' },
    { title: 'Aplicaciones Moviles', description: 'Desarrollo de apps multiplataforma con enfoque en usabilidad.' },
    { title: 'Soporte Tecnologico', description: 'Asesoramiento tecnico y resolucion de incidentes en entornos productivos.' },
  ],
}

// ============================================================
// DATOS: NOTICIAS
// ============================================================
const newsData = [
  {
    title: 'Bienvenidos al nuevo portal del IFTS 29',
    status: 'published' as const,
    category: 'institutional' as const,
    summary: 'El sitio centraliza informacion institucional, carreras, novedades y acceso a recursos para la comunidad.',
    publishedAt: '2026-04-22T00:00:00.000Z',
    featured: true,
    tags: 'Institucion;Portal;Novedades',
  },
  {
    title: 'Comienza la organizacion de la biblioteca virtual',
    status: 'published' as const,
    category: 'academic' as const,
    summary: 'La nueva estructura del portal prepara un espacio privado para alumnos con material academico.',
    publishedAt: '2026-04-22T00:00:00.000Z',
    featured: false,
    tags: 'Biblioteca;Recursos;Academico',
  },
  {
    title: 'Nueva jornada de matriculacion para el ciclo 2026',
    status: 'published' as const,
    category: 'events' as const,
    summary: 'El instituto abre el periodo de inscripcion para nuevos estudiantes con una jornada de orientacion.',
    publishedAt: '2026-04-20T00:00:00.000Z',
    featured: false,
    tags: 'Inscripcion;Eventos;Ciclo 2026',
  },
  {
    title: 'Convenio con empresas de tecnologia del distrito',
    status: 'published' as const,
    category: 'institutional' as const,
    summary: 'Firmamos acuerdos con empresas locales para practicas profesionalizantes de nuestros estudiantes.',
    publishedAt: '2026-04-18T00:00:00.000Z',
    featured: false,
    tags: 'Convenios;Empresas;Practicas',
  },
]

// ============================================================
// DATOS: EVENTOS
// ============================================================
const eventsData = [
  {
    title: 'Jornada de Puertas Abiertas',
    status: 'published' as const,
    date: '2026-05-15T09:00:00.000Z',
    description: 'Ven a conocer nuestras instalaciones, metodologias de enseñanza y conversa con docentes y estudiantes.',
    location: 'presencial' as const,
    address: 'Av. Rivadavia 4200, CABA',
    link: 'https://ifts29.edu.ar/inscripcion',
  },
  {
    title: 'Charla: Introduccion al Desarrollo Web',
    status: 'published' as const,
    date: '2026-05-20T18:00:00.000Z',
    description: 'Una introduccion al mundo del desarrollo web con tecnologias actuales. Especial para quienes inician en la programacion.',
    location: 'virtual' as const,
    link: 'https://meet.google.com/abc-defg-hij',
  },
  {
    title: 'Inscripcion Ciclo 2026 - Segundo Llamado',
    status: 'published' as const,
    date: '2026-06-01T08:00:00.000Z',
    description: 'Segundo llamado para la inscripcion al ciclo lectivo 2026. Horarios de 8:00 a 18:00hs.',
    location: 'presencial' as const,
    address: 'Av. Rivadavia 4200, CABA',
  },
  {
    title: 'Workshop: Base de Datos con SQL',
    status: 'published' as const,
    date: '2026-06-10T14:00:00.000Z',
    description: 'Workshop practico sobre bases de datos relacionales y lenguaje SQL. Para estudiantes de tecnicatura.',
    location: 'hibrido' as const,
    address: 'Av. Rivadavia 4200, CABA',
  },
]

// ============================================================
// DATOS: PROYECTOS
// ============================================================
const projectsData = [
  {
    title: 'LibroVault',
    status: 'published' as const,
    category: 'desarrollo' as const,
    summary: 'Sistema web completo para la gestión de préstamos, reservas e inventario de la biblioteca del IFTS 29. Incluye panel de administración, notificaciones por email y reportes automatizados.',
    publishedAt: '2026-05-20T00:00:00.000Z',
    tags: 'React;Node.js;PostgreSQL;Tailwind',
    githubUrl: 'https://github.com/ifts29/librovault',
    demoUrl: 'https://librovault.vercel.app',
  },
  {
    title: 'DataViz CABA',
    status: 'published' as const,
    category: 'datos' as const,
    summary: 'Plataforma de visualización interactiva de datos abiertos de la Ciudad de Buenos Aires. Permite explorar estadísticas de transporte, educación y salud con gráficos dinámicos y mapas.',
    publishedAt: '2026-04-15T00:00:00.000Z',
    tags: 'Python;D3.js;Pandas;Mapbox',
    githubUrl: 'https://github.com/ifts29/dataviz-caba',
    demoUrl: 'https://dataviz-caba.vercel.app',
  },
  {
    title: 'TrackBus',
    status: 'published' as const,
    category: 'desarrollo' as const,
    summary: 'Aplicación web progresiva para el seguimiento en tiempo real de colectivos de Buenos Aires. Integra la API de transporte público y muestra tiempos de llegada estimados por parada.',
    publishedAt: '2026-03-10T00:00:00.000Z',
    tags: 'React;PWA;API REST;Geolocalización',
    githubUrl: 'https://github.com/ifts29/trackbus',
    demoUrl: 'https://trackbus-demo.vercel.app',
  },
  {
    title: 'CloudMonitor',
    status: 'published' as const,
    category: 'infraestructura' as const,
    summary: 'Herramienta de monitoreo de infraestructura cloud que permite supervisar servidores, contenedores y bases de datos en tiempo real con alertas configurables y dashboards personalizables.',
    publishedAt: '2026-06-01T00:00:00.000Z',
    tags: 'Docker;Prometheus;Grafana;AWS',
    githubUrl: 'https://github.com/ifts29/cloudmonitor',
    demoUrl: 'https://cloudmonitor.vercel.app',
  },
]

// Estudiantes de ejemplo para asociar a proyectos
const studentUsers = [
  {
    email: 'maria.gonzalez@example.com',
    password: 'student123',
    dni: '40123456',
    firstName: 'María',
    lastName: 'González',
    role: 'student' as const,
    status: 'approved' as const,
  },
  {
    email: 'lucas.martinez@example.com',
    password: 'student123',
    dni: '41234567',
    firstName: 'Lucas',
    lastName: 'Martínez',
    role: 'student' as const,
    status: 'approved' as const,
  },
  {
    email: 'camila.rodriguez@example.com',
    password: 'student123',
    dni: '42345678',
    firstName: 'Camila',
    lastName: 'Rodríguez',
    role: 'student' as const,
    status: 'approved' as const,
  },
  {
    email: 'julian.fernandez@example.com',
    password: 'student123',
    dni: '43456789',
    firstName: 'Julián',
    lastName: 'Fernández',
    role: 'student' as const,
    status: 'approved' as const,
  },
]

// ============================================================
// DATOS: EMPRESAS
// ============================================================
const companiesData = [
  {
    name: 'TechCorp Argentina',
    status: 'active' as const,
    description: 'Empresa lider en desarrollo de software empresarial con mas de 15 anos en el mercado.',
    practicesArea: 'Desarrollo Web y Mobile',
    website: 'https://techcorp.com.ar',
    contactEmail: 'rrhh@techcorp.com.ar',
  },
  {
    name: 'DataSystems SA',
    status: 'active' as const,
    description: 'Compania especializada en soluciones de Big Data e inteligencia empresarial.',
    practicesArea: 'Analisis de Datos y Machine Learning',
    website: 'https://datasystems.com.ar',
    contactEmail: 'empleo@datasystems.com.ar',
  },
  {
    name: 'CloudNet Solutions',
    status: 'active' as const,
    description: 'Proveedor de servicios de infraestructura cloud y ciberseguridad.',
    practicesArea: 'Infraestructura y Cloud',
    website: 'https://cloudnet.com.ar',
    contactEmail: 'practicas@cloudnet.com.ar',
  },
  {
    name: 'Innovatech Labs',
    status: 'active' as const,
    description: 'Startup de tecnologia enfocada en soluciones innovadoras para el sector salud.',
    practicesArea: 'Desarrollo Full Stack',
    website: 'https://innovatechlabs.com.ar',
    contactEmail: 'talento@innovatechlabs.com.ar',
  },
]

// ============================================================
// DATOS: CONTENIDO INSTITUCIONAL (Global)
// ============================================================
const institutionalData = {
  mission: 'Formar tecnicos con base practica, mirada profesional y fuerte vinculacion con el ecosistema tecnologico.',
  vision: 'Consolidar una presencia digital clara, moderna y autogestionable para toda la comunidad educativa.',
  history: {
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
              text: 'El IFTS 29 busca proyectar su identidad academica con una experiencia digital alineada a su perfil tecnico.',
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
  authorities: [
    { name: 'Equipo Directivo IFTS 29', role: 'Conduccion institucional' },
    { name: 'Coordinacion Academica', role: 'Gestion de oferta y contenidos' },
  ],
  milestones: [
    {year: '2019', text: 'Fundacion del instituto con la primera cohorte de estudiantes'},
    {year: '2021', text: 'Expansion de la oferta academica y nueva sede equipada'},
    {year: '2024', text: 'Reconocimiento por excelencia en formacion tecnica a distancia'},
  ],
}

// ============================================================
// DATOS: CONFIGURACION DEL SITIO (Global)
// ============================================================
const siteSettingsData = {
  siteTitle: 'Portal IFTS 29',
  tagline: 'Una plataforma institucional para centralizar carreras, noticias y recursos academicos del IFTS 29.',
  contactEmail: 'info@ifts29.edu.ar',
  address: 'Ciudad Autonoma de Buenos Aires',
  phone: '(011) 0000-0000',
}


// ============================================================
// DATOS: ADMIN DE EJEMPLO
// ============================================================
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@ifts29.edu.ar'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin1234'
const adminData = {
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD,
  dni: '12345678',
  firstName: 'Administrador',
  lastName: 'IFTS 29',
  role: 'admin' as const,
  status: 'approved' as const,
}

// ============================================================
// HELPERS
// ============================================================
async function seedAdmin(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n[0/10] Seed de Admin...')

  const existing = await payload.find({
    collection: 'users',
    limit: 1,
    where: { email: { equals: adminData.email } },
  })

  if (existing.docs.length > 0) {
    console.log('   Admin ya existe. Email:', adminData.email)
    console.log('   Para acceder al panel de admin: /admin')
    console.log('   Email:', adminData.email)
    console.log('   Password:', ADMIN_PASSWORD)
  } else {
    const created = await payload.create({
      collection: 'users',
      data: adminData,
    })
    console.log('   Admin creado. ID:', created.id)
    console.log('   Email:', adminData.email)
    console.log('   Password:', ADMIN_PASSWORD)
    console.log('   IMPORTANTE: Cambia esta contrasena en produccion.')
  }
}

async function seedCareer(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n[1/10] Seed de Carrera...')


  const existing = await payload.find({
    collection: 'careers',
    limit: 1,
    where: { slug: { equals: CAREER_SLUG } },
  })

  if (existing.docs.length > 0) {
    await payload.update({
      collection: 'careers',
      id: existing.docs[0].id,
      data: careerData,
    })
    console.log('   Carrera actualizada. ID:', existing.docs[0].id)
  } else {
    const created = await payload.create({
      collection: 'careers',
      data: careerData,
    })
    console.log('   Carrera creada. ID:', created.id)
  }
}

async function seedNews(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n[2/10] Seed de Noticias...')

  for (const item of newsData) {
    const existing = await payload.find({
      collection: 'news',
      limit: 1,
      where: { slug: { equals: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') } },
    })

    if (existing.docs.length > 0) {
      console.log('   Noticia ya existe:', item.title)
    } else {
      const created = await payload.create({
        collection: 'news',
        data: item,
      })
      console.log('   Noticia creada. ID:', created.id, '-', item.title)
    }
  }
}

async function seedEvents(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n[3/10] Seed de Eventos...')

  for (const item of eventsData) {
    const existing = await payload.find({
      collection: 'events',
      limit: 1,
      where: { slug: { equals: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') } },
    })

    if (existing.docs.length > 0) {
      console.log('   Evento ya existe:', item.title)
    } else {
      const created = await payload.create({
        collection: 'events',
        data: item,
      })
      console.log('   Evento creado. ID:', created.id, '-', item.title)
    }
  }
}

async function seedStudentUsers(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n[Seed] Estudiantes de ejemplo...')

  const createdStudents: Record<string, string | number> = {}

  for (const student of studentUsers) {
    const existing = await payload.find({
      collection: 'users',
      limit: 1,
      where: { email: { equals: student.email } },
    })

    if (existing.docs.length > 0) {
      createdStudents[student.email] = existing.docs[0].id
      console.log('   Estudiante ya existe:', student.email)
    } else {
      const created = await payload.create({
        collection: 'users',
        data: student,
      })
      createdStudents[student.email] = created.id
      console.log('   Estudiante creado. ID:', created.id, '-', student.email)
    }
  }

  return createdStudents
}

async function seedProjects(payload: Awaited<ReturnType<typeof getPayload>>, studentIds: Record<string, string | number>) {
  console.log('\n[4/10] Seed de Proyectos...')

  // Borrar proyectos existentes para evitar duplicados con datos viejos
  const existingProjects = await payload.find({collection: 'projects', limit: 100})
  for (const doc of existingProjects.docs) {
    await payload.delete({collection: 'projects', id: doc.id})
    console.log('   Proyecto eliminado:', doc.title)
  }

  const projectStudentMap: Record<string, string> = {
    'LibroVault': 'maria.gonzalez@example.com',
    'DataViz CABA': 'lucas.martinez@example.com',
    'TrackBus': 'camila.rodriguez@example.com',
    'CloudMonitor': 'julian.fernandez@example.com',
  }

  for (const item of projectsData) {
    const existing = await payload.find({
      collection: 'projects',
      limit: 1,
      where: { slug: { equals: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') } },
    })

    const studentEmail = projectStudentMap[item.title]
    const studentId = studentEmail ? studentIds[studentEmail] : undefined

    const projectData = {
      ...item,
      ...(studentId ? { student: studentId } : {}),
    }

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'projects',
        id: existing.docs[0].id,
        data: projectData,
      })
      console.log('   Proyecto actualizado:', item.title)
    } else {
      const created = await payload.create({
        collection: 'projects',
        data: projectData,
      })
      console.log('   Proyecto creado. ID:', created.id, '-', item.title)
    }
  }
}

async function seedCompanies(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n[5/10] Seed de Empresas...')

  for (const item of companiesData) {
    const existing = await payload.find({
      collection: 'companies',
      limit: 1,
      where: { name: { equals: item.name } },
    })

    if (existing.docs.length > 0) {
      console.log('   Empresa ya existe:', item.name)
    } else {
      const created = await payload.create({
        collection: 'companies',
        data: item,
      })
      console.log('   Empresa creada. ID:', created.id, '-', item.name)
    }
  }
}

async function seedInstitutional(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n[6/10] Seed de Contenido Institucional...')

  try {
    await payload.updateGlobal({
      slug: 'institutional-content',
      data: institutionalData,
    })
    console.log('   Contenido institucional actualizado.')
  } catch (err) {
    console.error('   Error al actualizar contenido institucional:', err)
  }
}

async function seedSiteSettings(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n[7/10] Seed de Configuracion del Sitio...')

  try {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: siteSettingsData,
    })
    console.log('   Configuracion del sitio actualizada.')
  } catch (err) {
    console.error('   Error al actualizar configuracion:', err)
  }
}

async function seedScholarships(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\n[8/10] Seed de Becas...')

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
  console.log('\n[9/10] Seed de Página de Becas...')

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

// ============================================================
// MAIN
// ============================================================
async function seed() {
  console.log('======================================')
  console.log('  SEED COMPLETO — IFTS 29 Portal')
  console.log('======================================')
  console.log('Conectando a:', process.env.DATABASE_URL || '(fallback local)')

  const payload = await getPayload({ config })

  await seedAdmin(payload)
  await seedCareer(payload)
  await seedNews(payload)
  await seedEvents(payload)
  const studentIds = await seedStudentUsers(payload)
  await seedProjects(payload, studentIds)
  await seedCompanies(payload)
  await seedInstitutional(payload)
  await seedSiteSettings(payload)
  await seedScholarships(payload)
  await seedBecasPage(payload)

  console.log('\n======================================')
  console.log('  SEED COMPLETADO EXITOSAMENTE')
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
