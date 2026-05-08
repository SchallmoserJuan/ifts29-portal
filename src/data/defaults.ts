import type { CareerItem, CompanyItem, EventItem, InstitutionalContentData, NewsItem, ProjectItem, SiteSettingsData } from '@/src/types/content'

export const defaultSettings: SiteSettingsData = {
  siteTitle: 'Portal IFTS 29',
  tagline:
    'Una plataforma institucional para centralizar carreras, noticias y recursos academicos del IFTS 29.',
  contactEmail: 'info@ifts29.edu.ar',
  address: 'Ciudad Autonoma de Buenos Aires',
  phone: '(011) 0000-0000',
}

export const defaultInstitutional: InstitutionalContentData = {
  mission:
    'Formar tecnicos con base practica, mirada profesional y fuerte vinculacion con el ecosistema tecnologico.',
  vision:
    'Consolidar una presencia digital clara, moderna y autogestionable para toda la comunidad educativa.',
  history:
    'El IFTS 29 busca proyectar su identidad academica con una experiencia digital alineada a su perfil tecnico.',
  authorities: [
    { name: 'Equipo Directivo IFTS 29', role: 'Conduccion institucional' },
    { name: 'Coordinacion Academica', role: 'Gestion de oferta y contenidos' },
  ],
}

export const defaultCareers: CareerItem[] = [
  {
    id: 'default-1',
    name: 'Tecnicatura Superior en Desarrollo de Software',
    slug: 'tecnicatura-superior-en-desarrollo-de-software',
    summary:
      'Formacion de excelencia orientada al desarrollo de software, arquitectura de sistemas, bases de datos y practicas profesionalizantes en el ecosistema tecnologico actual.',
    duration: '3 anos',
    modality: 'Presencial',
    resolution: 'Res. M.E.N. N° 1234/2023',
    requirements: [
      { item: 'Titulo secundario completo' },
      { item: 'Documentacion de identidad vigente' },
      { item: 'Constancia de CUIL' },
    ],
    studyPlan: [
      { subject: 'Tecnicas de Programacion' },
      { subject: 'Administracion de Bases de Datos' },
      { subject: 'Desarrollo de Sistemas Orientado a Objetos' },
      { subject: 'Desarrollo de Aplicaciones Web' },
      { subject: 'Ingenieria de Software' },
      { subject: 'Gestion de Proyectos' },
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
  },
]

export const defaultNews: NewsItem[] = [
  {
    id: 'default-news-1',
    title: 'Bienvenidos al nuevo portal del IFTS 29',
    slug: 'bienvenidos-al-nuevo-portal-del-ifts-29',
    summary:
      'El sitio centraliza informacion institucional, carreras, novedades y acceso a recursos para la comunidad.',
    category: 'institutional',
    publishedAt: '2026-04-22',
    featured: true,
    tags: 'Institucion;Portal;Novedades',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=80',
      alt: 'Campus IFTS 29',
    },
  },
  {
    id: 'default-news-2',
    title: 'Comienza la organizacion de la biblioteca virtual',
    slug: 'comienza-la-organizacion-de-la-biblioteca-virtual',
    summary:
      'La nueva estructura del portal prepara un espacio privado para alumnos con material academico.',
    category: 'academic',
    publishedAt: '2026-04-22',
    tags: 'Biblioteca;Recursos;Academico',
  },
  {
    id: 'default-news-3',
    title: 'Nueva jornada de matriculacion para el ciclo 2026',
    slug: 'nueva-jornada-de-matriculacion-2026',
    summary:
      'El instituto abre el periodo de inscripcion para nuevos estudiantes con una jornada de orientacion.',
    category: 'events',
    publishedAt: '2026-04-20',
    tags: 'Inscripcion;Eventos;Ciclo 2026',
  },
  {
    id: 'default-news-4',
    title: 'Convenio con empresas de tecnologia del distrito',
    slug: 'convenio-empresas-tecnologia',
    summary:
      'Firmamos acuerdos con empresas locales para prcticas profesionalizantes de nuestros estudiantes.',
    category: 'institutional',
    publishedAt: '2026-04-18',
    tags: 'Convenios;Empresas;Practicas',
  },
]

export const defaultEvents: EventItem[] = [
  {
    id: 'default-event-1',
    title: 'Jornada de Puertas Abiertas',
    slug: 'jornada-de-puertas-abiertas-2026',
    date: '2026-05-15T09:00:00.000Z',
    description: 'Ven a conocer nuestras instalaciones, metodologias de enseñanza y conversá con docentes y estudiantes.',
    location: 'presencial',
    address: 'Av. Rivadavia 4200, CABA',
    link: 'https://ifts29.edu.ar/inscripcion',
  },
  {
    id: 'default-event-2',
    title: 'Charla: Introduccion al Desarrollo Web',
    slug: 'charla-introduccion-desarrollo-web',
    date: '2026-05-20T18:00:00.000Z',
    description: 'Una introduccion al mundo del desarrollo web con tecnologias actuales. Especial para quienes inician en la programacion.',
    location: 'virtual',
    link: 'https://meet.google.com/abc-defg-hij',
  },
  {
    id: 'default-event-3',
    title: 'Inscripcion Ciclo 2026 - Segundo Llamado',
    slug: 'inscripcion-ciclo-2026-segundo-llamado',
    date: '2026-06-01T08:00:00.000Z',
    description: 'Segundo llamado para la inscripcion al ciclo lectivo 2026. Horarios de 8:00 a 18:00hs.',
    location: 'presencial',
    address: 'Av. Rivadavia 4200, CABA',
  },
  {
    id: 'default-event-4',
    title: 'Workshop: Base de Datos con SQL',
    slug: 'workshop-base-de-datos-sql',
    date: '2026-06-10T14:00:00.000Z',
    description: 'Workshop practico sobre bases de datos relacionales y lenguaje SQL. Para estudiantes de tecnicatura.',
    location: 'hibrido',
    address: 'Av. Rivadavia 4200, CABA',
  },
]

export const defaultProjects: ProjectItem[] = [
  {
    id: 'default-project-1',
    title: 'Sistema de Gestion de Biblioteca',
    slug: 'sistema-gestion-biblioteca',
    summary: 'Desarrollo de un sistema integral para la gestion de prestamos y inventario de la biblioteca institucional.',
    category: 'desarrollo',
    publishedAt: '2026-04-10',
    tags: 'Software;Gestion;Biblioteca',
    image: {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      alt: 'Sistema de biblioteca',
    },
  },
  {
    id: 'default-project-2',
    title: 'Analisis de Datos de Encuesta Socioeconomica',
    slug: 'analisis-datos-encuesta-socioeconomica',
    summary: 'Procesamiento y analisis de datos de una encuesta realizada a familias del distrito.',
    category: 'datos',
    publishedAt: '2026-03-25',
    tags: 'Datos;Analisis;Estadistica',
    image: {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      alt: 'Analisis de datos',
    },
  },
  {
    id: 'default-project-3',
    title: 'App Movil para Seguimiento de Rutas de Transporte',
    slug: 'app-movil-seguimiento-rutas',
    summary: 'Desarrollo de una aplicacion movil para el seguimiento en tiempo real de rutas de transporte público.',
    category: 'desarrollo',
    publishedAt: '2026-03-15',
    tags: 'Mobile;Transporte;GPS',
    image: {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      alt: 'App movil',
    },
  },
]

export const defaultCompanies: CompanyItem[] = [
  {
    id: 'default-company-1',
    name: 'TechCorp Argentina',
    description: 'Empresa lider en desarrollo de software empresarial con mas de 15 anos en el mercado.',
    practicesArea: 'Desarrollo Web y Mobile',
    website: 'https://techcorp.com.ar',
    contactEmail: 'rrhh@techcorp.com.ar',
  },
  {
    id: 'default-company-2',
    name: 'DataSystems SA',
    description: 'Compania especializada en soluciones deBig Data e inteligencia empresarial.',
    practicesArea: 'Analisis de Datos y Machine Learning',
    website: 'https://datasystems.com.ar',
    contactEmail: 'empleo@datasystems.com.ar',
  },
  {
    id: 'default-company-3',
    name: 'CloudNet Solutions',
    description: 'Proveedor de servicios de infraestructura cloud y ciberseguridad.',
    practicesArea: 'Infraestructura y Cloud',
    website: 'https://cloudnet.com.ar',
    contactEmail: 'practicas@cloudnet.com.ar',
  },
  {
    id: 'default-company-4',
    name: 'Innovatech Labs',
    description: 'Startup de tecnologia enfocada en soluciones innovadoras para el sector salud.',
    practicesArea: 'Desarrollo Full Stack',
    website: 'https://innovatechlabs.com.ar',
    contactEmail: 'talento@innovatechlabs.com.ar',
  },
]
