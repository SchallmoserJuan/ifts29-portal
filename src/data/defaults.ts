import type { BecasPageData, CareerItem, CompanyItem, EventItem, InstitutionalContentData, NewsItem, ProjectItem, ScholarshipItem, SiteSettingsData } from '@/src/types/content'

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
    heroHeadline: 'Tecnicatura Superior en Desarrollo de Software',
    heroParagraph:
      'Una formación de excelencia pensada para quienes buscan dominar la creación de software con rigor academico y mirada profesional. Preparamos técnicos capaces de liderar proyectos, diseñar arquitecturas robustas y aportar valor real a la industria tecnológica.',
    introTitle: 'Formación técnica superior con proyección profesional',
    introDescription:
      'La Tecnicatura Superior en Desarrollo de Software del IFTS 29 integra conocimientos solidos en programación, analisis de sistemas y gestion de proyectos con una fuerte vinculación al mundo laboral. Nuestro enfoque combina la precisión del pensamiento logico con la creatividad necesaria para resolver problemas complejos en entornos reales.',
    introFocus:
      'El plan de estudios abarca desde los fundamentos de la programación hasta la arquitectura de software escalable, pasando por bases de datos, desarrollo web, cloud computing y metodologias agiles. Cada materia esta diseñada para construir competencias aplicables desde el primer dia.',
    introOutcome:
      'Al egresar, el técnico estara capacitado para participar en equipos de desarrollo de software, liderar proyectos tecnológicos, diseñar soluciones integrales y continuar su formación en carreras de grado con una base tecnica excepcional.',
    introIndustry:
      'La industria del software es uno de los sectores de mayor crecimiento en la region. La demanda de profesionales calificados supera ampliamente la oferta, generando oportunidades laborales de calidad, salarios competitivos y posibilidades de trabajo remoto con alcance global.',
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
    studyPlanTitle: 'Plan de Estudios',
    studyPlanSubtitle: 'Curricula académica',
    studyPlanDescription:
      'Un recorrido estructurado en tres años que combina fundamentos teoricos, practicas intensivas y proyectos integradores. La progresión esta diseñada para que cada cuatrimestre construya sobre el anterior, generando una formación coherente y aplicable.',
    studyPlanDurationLabel: '3 años de formación',
    studyPlanStructureLabel: 'Estructura por cuatrimestres',
    studyPlanFocusLabel: 'Enfoque progresivo del aprendizaje',
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
    outcomesTitle: 'Campos de desempeño',
    outcomesSubtitle:
      'La industria tecnológica ofrece múltiples vertientes de especialización para el egresado.',
    documentsTitle: 'Documentos Institucionales',
    documentsSubtitle: 'Material académico y normativo de referencia.',
    ctaTitle: 'Impulsá tu futuro en el mundo del software.',
    ctaSubtitle:
      'Una carrera de excelencia técnica, respaldada por una institución pública con trayectoria y visión de futuro.',
    ctaLabel: 'Solicitar información de ingreso',
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

export const defaultScholarships: ScholarshipItem[] = [
  {
    id: 'default-scholarship-1',
    title: 'Progresar',
    slug: 'progresar',
    summary:
      'Programa de Respaldo para Estudiantes de la República Argentina. Es un programa integral de Becas Educativas que acompaña al estudiante en todos los niveles de formación durante su trayectoria académica, a través de un incentivo económico y estímulo personal.',
    requirements: [
      { item: 'Ser estudiante argentino/a' },
      { item: 'Estar cursando en una institución de educación superior' },
      { item: 'Realizar el trámite directamente en el sitio oficial del Ministerio de Educación de la Nación' },
    ],
    externalLink: 'https://www.argentina.gob.ar/educacion/progresar',
    order: 1,
    status: 'published',
  },
  {
    id: 'default-scholarship-2',
    title: 'Becas para Estudios de Carreras Estratégicas de Educación Superior',
    slug: 'becas-para-estudios-de-carreras-estrategicas-de-educacion-superior',
    summary:
      'Beca creada a partir de la Ley N°6615, acompaña a estudiantes que eligen carreras estratégicas que forman profesionales en rubros donde existe una amplia demanda laboral en la Ciudad de Buenos Aires.',
    requirements: [
      { item: 'Ser estudiante ingresante o regular de una carrera estratégica' },
      { item: 'Instituto de gestión estatal o privada de CABA' },
      { item: 'Cumplir con los requisitos establecidos en la normativa vigente' },
    ],
    externalLink: 'https://buenosaires.gob.ar/educacion/estudiantes/beca-para-estudios-de-carreras-estrategicas-de-educacion-superior',
    order: 2,
    status: 'published',
  },
  {
    id: 'default-scholarship-3',
    title: 'Becas Estratégicas de Nivel Superior',
    slug: 'becas-estrategicas-de-nivel-superior',
    summary:
      'Beca de nivel superior que acompaña a estudiantes que eligen carreras estratégicas de formación docente y de formación técnico profesional para el desarrollo socioeconómico y productivo de la Ciudad de Buenos Aires.',
    requirements: [
      { item: 'Estar inscripto en una carrera estratégica de nivel superior' },
      { item: 'Institución reconocida de la Ciudad de Buenos Aires' },
      { item: 'Cumplir con los requisitos establecidos por el programa' },
    ],
    externalLink: 'https://buenosaires.gob.ar/educacion/estudiantes/beca-para-carreras-estrategicas-de-nivel-superior',
    order: 3,
    status: 'published',
  },
  {
    id: 'default-scholarship-4',
    title: 'Becas Manuel Belgrano',
    slug: 'becas-manuel-belgrano',
    summary:
      'Programa nacional de becas destinado a estudiantes de educación superior que promueve la finalización de estudios y la permanencia en la universidad, otorgado por el Ministerio de Educación de la Nación.',
    requirements: [
      { item: 'Ser estudiante de una institución de educación superior' },
      { item: 'Cumplir con los requisitos socioeconómicos del programa' },
      { item: 'Mantener regularidad académica' },
    ],
    externalLink: 'https://www.argentina.gob.ar/educacion/becas-manuel-belgrano',
    order: 4,
    status: 'published',
  },
]

export const defaultBecasPage: BecasPageData = {
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
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Cada beca tiene sus propios requisitos. En general, están destinadas a estudiantes argentinos que cursen educación superior en instituciones reconocidas. Consultá los detalles de cada programa en sus sitios oficiales.',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
    },
    {
      question: '¿Cuándo se abren las inscripciones?',
      answer: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Las fechas varían según el programa. Consultá la sección de fechas importantes o los sitios web oficiales de cada beca para conocer los cronogramas actualizados.',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
    },
    {
      question: '¿Cómo se realiza el trámite?',
      answer: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'La mayoría de los trámites se realizan de forma online a través de los portales oficiales de cada programa. Te recomendamos leer los requisitos específicos antes de iniciar la solicitud.',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
    },
    {
      question: '¿Puedo solicitar más de una beca a la vez?',
      answer: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Sí, podés postularte a múltiples programas siempre que cumplas con los requisitos de cada uno. Te sugerimos verificar las compatibilidades en los sitios oficiales.',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
    },
    {
      question: '¿El IFTS 29 otorga becas propias?',
      answer: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'No, el IFTS 29 informa sobre programas nacionales y provinciales. Te asesoramos para que conozcas las opciones disponibles y cómo acceder a ellas.',
                  type: 'text',
                },
              ],
            },
          ],
        },
      },
    },
  ],
  contactTitle: 'Consultá sobre Becas',
  contactText:
    '¿Tenés dudas sobre alguna beca o necesitás ayuda con el proceso de inscripción? Escribinos y te asesoramos.',
}

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
