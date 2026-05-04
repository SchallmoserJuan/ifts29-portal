import type { CareerItem, InstitutionalContentData, NewsItem, SiteSettingsData } from '@/src/types/content'

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
      'Formacion orientada al desarrollo web, bases de datos, analisis de sistemas y practicas profesionalizantes.',
    duration: '3 anos',
    modality: 'Presencial',
    requirements: [{ item: 'Titulo secundario completo' }, { item: 'Documentacion de ingreso vigente' }],
    studyPlan: [{ subject: 'Programacion' }, { subject: 'Base de Datos' }, { subject: 'Practicas Profesionalizantes' }],
  },
  {
    id: 'default-2',
    name: 'Tecnicatura Superior en Analisis de Sistemas',
    slug: 'tecnicatura-superior-en-analisis-de-sistemas',
    summary:
      'Trayecto con foco en relevamiento, modelado, documentacion y construccion de soluciones informaticas.',
    duration: '3 anos',
    modality: 'Presencial',
    requirements: [{ item: 'Titulo secundario completo' }],
    studyPlan: [{ subject: 'Analisis Funcional' }, { subject: 'Arquitectura' }, { subject: 'Gestion de Proyectos' }],
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
