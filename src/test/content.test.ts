import {afterEach, describe, expect, it, vi} from 'vitest'

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

const mockFindGlobal = vi.fn()
const mockFind = vi.fn()

vi.mock('@/src/lib/payload', () => ({
  getPayloadClient: vi.fn(() =>
    Promise.resolve({
      findGlobal: mockFindGlobal,
      find: mockFind,
    }),
  ),
}))

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const makeDoc = <T>(overrides: Partial<T> = {}): T => overrides as T

const makeUser = (role: 'admin' | 'teacher' | 'student' = 'student') => ({
  id: 1,
  email: `${role}@ifts29.edu.ar`,
  role,
})

// ---------------------------------------------------------------------------
// getSiteSettings
// ---------------------------------------------------------------------------

describe('getSiteSettings', () => {
  afterEach(() => vi.clearAllMocks())

  it('retorna settings mergeados con defaults cuando payload responde OK', async () => {
    mockFindGlobal.mockResolvedValue({siteTitle: 'Custom Title', phone: '1234'})

    const {getSiteSettings} = await import('@/src/lib/content')
    const result = await getSiteSettings()

    expect(result.siteTitle).toBe('Custom Title')
    expect(result.phone).toBe('1234')
    expect(result.contactEmail).toBe('info@ifts29.edu.ar')
    expect(result.address).toBe('Ciudad Autonoma de Buenos Aires')
    expect(result.tagline).toBeDefined()
  })

  it('retorna defaults cuando payload falla', async () => {
    mockFindGlobal.mockRejectedValue(new Error('DB error'))

    const {getSiteSettings} = await import('@/src/lib/content')
    const result = await getSiteSettings()

    expect(result.siteTitle).toBe('Portal IFTS 29')
    expect(result.contactEmail).toBe('info@ifts29.edu.ar')
  })

  it('llama a findGlobal con slug site-settings', async () => {
    mockFindGlobal.mockResolvedValue({})

    const {getSiteSettings} = await import('@/src/lib/content')
    await getSiteSettings()

    expect(mockFindGlobal).toHaveBeenCalledWith({slug: 'site-settings'})
  })
})

// ---------------------------------------------------------------------------
// getInstitutionalContent
// ---------------------------------------------------------------------------

describe('getInstitutionalContent', () => {
  afterEach(() => vi.clearAllMocks())

  it('retorna contenido mergeado con defaults cuando payload responde OK', async () => {
    mockFindGlobal.mockResolvedValue({mission: 'Mision personalizada', authorities: []})

    const {getInstitutionalContent} = await import('@/src/lib/content')
    const result = await getInstitutionalContent()

    expect(result.mission).toBe('Mision personalizada')
    expect(result.vision).toBeDefined()
  })

  it('usa authorities del payload cuando existen', async () => {
    const payloadAuthorities = [{name: 'Nueva Autoridad', role: 'Rector'}]
    mockFindGlobal.mockResolvedValue({authorities: payloadAuthorities})

    const {getInstitutionalContent} = await import('@/src/lib/content')
    const result = await getInstitutionalContent()

    expect(result.authorities).toEqual(payloadAuthorities)
  })

  it('usa authorities default cuando payload devuelve array vacio', async () => {
    mockFindGlobal.mockResolvedValue({authorities: []})

    const {getInstitutionalContent} = await import('@/src/lib/content')
    const result = await getInstitutionalContent()

    expect(result.authorities).toHaveLength(2)
    expect(result.authorities[0].name).toBe('Equipo Directivo IFTS 29')
  })

  it('usa authorities default cuando payload no incluye authorities', async () => {
    mockFindGlobal.mockResolvedValue({mission: 'test'})

    const {getInstitutionalContent} = await import('@/src/lib/content')
    const result = await getInstitutionalContent()

    expect(result.authorities).toHaveLength(2)
  })

  it('retorna defaults cuando payload falla', async () => {
    mockFindGlobal.mockRejectedValue(new Error('DB error'))

    const {getInstitutionalContent} = await import('@/src/lib/content')
    const result = await getInstitutionalContent()

    expect(result.mission).toBeDefined()
    expect(result.authorities).toHaveLength(2)
  })
})

// ---------------------------------------------------------------------------
// getCareers
// ---------------------------------------------------------------------------

describe('getCareers', () => {
  afterEach(() => vi.clearAllMocks())

  it('retorna carreras cuando payload responde con docs', async () => {
    const docs = [{id: 1, name: 'Analista de Sistemas', slug: 'analista'}]
    mockFind.mockResolvedValue({docs, totalDocs: 1})

    const {getCareers} = await import('@/src/lib/content')
    const result = await getCareers()

    expect(result).toEqual(docs)
  })

  it('retorna defaults cuando payload devuelve array vacio', async () => {
    mockFind.mockResolvedValue({docs: [], totalDocs: 0})

    const {getCareers} = await import('@/src/lib/content')
    const result = await getCareers()

    expect(result).toHaveLength(1)
    expect(result[0].name).toContain('Tecnicatura Superior')
  })

  it('retorna defaults cuando payload falla', async () => {
    mockFind.mockRejectedValue(new Error('DB error'))

    const {getCareers} = await import('@/src/lib/content')
    const result = await getCareers()

    expect(result).toHaveLength(1)
  })

  it('llama a find con collection careers, sort name, limit 20', async () => {
    mockFind.mockResolvedValue({docs: [], totalDocs: 0})

    const {getCareers} = await import('@/src/lib/content')
    await getCareers()

    expect(mockFind).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'careers',
        sort: 'name',
        limit: 20,
        depth: 1,
      }),
    )
  })
})

// ---------------------------------------------------------------------------
// getCareerBySlug
// ---------------------------------------------------------------------------

describe('getCareerBySlug', () => {
  afterEach(() => vi.clearAllMocks())

  it('retorna la carrera cuando payload la encuentra', async () => {
    const career = {id: 1, name: 'Analista', slug: 'analista'}
    mockFind.mockResolvedValue({docs: [career]})

    const {getCareerBySlug} = await import('@/src/lib/content')
    const result = await getCareerBySlug('analista')

    expect(result).toEqual(career)
  })

  it('retorna null cuando payload no encuentra nada y no hay default match', async () => {
    mockFind.mockResolvedValue({docs: []})

    const {getCareerBySlug} = await import('@/src/lib/content')
    const result = await getCareerBySlug('slug-que-no-existe')

    expect(result).toBeNull()
  })

  it('busca en defaults como fallback cuando payload devuelve vacio', async () => {
    mockFind.mockResolvedValue({docs: []})

    const {getCareerBySlug} = await import('@/src/lib/content')
    const result = await getCareerBySlug('tecnicatura-superior-en-desarrollo-de-software')

    expect(result).not.toBeNull()
    expect(result!.name).toContain('Tecnicatura Superior')
  })

  it('busca en defaults como fallback cuando payload falla', async () => {
    mockFind.mockRejectedValue(new Error('DB error'))

    const {getCareerBySlug} = await import('@/src/lib/content')
    const result = await getCareerBySlug('tecnicatura-superior-en-desarrollo-de-software')

    expect(result).not.toBeNull()
    expect(result!.slug).toBe('tecnicatura-superior-en-desarrollo-de-software')
  })

  it('retorna null cuando payload falla y no hay match en defaults', async () => {
    mockFind.mockRejectedValue(new Error('DB error'))

    const {getCareerBySlug} = await import('@/src/lib/content')
    const result = await getCareerBySlug('no-existe')

    expect(result).toBeNull()
  })

  it('llama a find con el filtro de slug', async () => {
    mockFind.mockResolvedValue({docs: []})

    const {getCareerBySlug} = await import('@/src/lib/content')
    await getCareerBySlug('mi-slug')

    expect(mockFind).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'careers',
        limit: 1,
        where: {slug: {equals: 'mi-slug'}},
      }),
    )
  })
})

// ---------------------------------------------------------------------------
// getNewsList
// ---------------------------------------------------------------------------

describe('getNewsList', () => {
  afterEach(() => vi.clearAllMocks())

  it('retorna noticias cuando payload responde con docs', async () => {
    const docs = [{id: 1, title: 'Noticia 1', slug: 'noticia-1'}]
    mockFind.mockResolvedValue({docs, totalDocs: 1})

    const {getNewsList} = await import('@/src/lib/content')
    const result = await getNewsList()

    expect(result).toEqual(docs)
  })

  it('retorna defaults cuando payload devuelve vacio', async () => {
    mockFind.mockResolvedValue({docs: [], totalDocs: 0})

    const {getNewsList} = await import('@/src/lib/content')
    const result = await getNewsList()

    expect(result).toHaveLength(4)
    expect(result[0].title).toContain('Bienvenidos')
  })

  it('retorna defaults cuando payload falla', async () => {
    mockFind.mockRejectedValue(new Error('DB error'))

    const {getNewsList} = await import('@/src/lib/content')
    const result = await getNewsList()

    expect(result).toHaveLength(4)
  })

  it('ordena por -publishedAt', async () => {
    mockFind.mockResolvedValue({docs: [], totalDocs: 0})

    const {getNewsList} = await import('@/src/lib/content')
    await getNewsList()

    expect(mockFind).toHaveBeenCalledWith(
      expect.objectContaining({collection: 'news', sort: '-publishedAt'}),
    )
  })
})

// ---------------------------------------------------------------------------
// getNewsBySlug
// ---------------------------------------------------------------------------

describe('getNewsBySlug', () => {
  afterEach(() => vi.clearAllMocks())

  it('retorna la noticia cuando payload la encuentra', async () => {
    const news = {id: 1, title: 'Noticia', slug: 'noticia-1'}
    mockFind.mockResolvedValue({docs: [news]})

    const {getNewsBySlug} = await import('@/src/lib/content')
    const result = await getNewsBySlug('noticia-1')

    expect(result).toEqual(news)
  })

  it('retorna null cuando no hay match y defaults no contienen el slug', async () => {
    mockFind.mockResolvedValue({docs: []})

    const {getNewsBySlug} = await import('@/src/lib/content')
    const result = await getNewsBySlug('no-existe')

    expect(result).toBeNull()
  })

  it('busca en defaults como fallback cuando payload devuelve vacio', async () => {
    mockFind.mockResolvedValue({docs: []})

    const {getNewsBySlug} = await import('@/src/lib/content')
    const result = await getNewsBySlug('bienvenidos-al-nuevo-portal-del-ifts-29')

    expect(result).not.toBeNull()
    expect(result!.title).toContain('Bienvenidos')
  })

  it('busca en defaults como fallback cuando payload falla', async () => {
    mockFind.mockRejectedValue(new Error('DB error'))

    const {getNewsBySlug} = await import('@/src/lib/content')
    const result = await getNewsBySlug('bienvenidos-al-nuevo-portal-del-ifts-29')

    expect(result).not.toBeNull()
  })

  it('retorna null cuando payload falla y no hay match en defaults', async () => {
    mockFind.mockRejectedValue(new Error('DB error'))

    const {getNewsBySlug} = await import('@/src/lib/content')
    const result = await getNewsBySlug('no-existe')

    expect(result).toBeNull()
  })

  it('llama a find con filtro de slug', async () => {
    mockFind.mockResolvedValue({docs: []})

    const {getNewsBySlug} = await import('@/src/lib/content')
    await getNewsBySlug('mi-noticia')

    expect(mockFind).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'news',
        where: {slug: {equals: 'mi-noticia'}},
      }),
    )
  })
})

// ---------------------------------------------------------------------------
// getLibraryDocuments
// ---------------------------------------------------------------------------

describe('getLibraryDocuments', () => {
  afterEach(() => vi.clearAllMocks())

  it('retorna documentos cuando payload responde', async () => {
    const docs = [{id: 1, title: 'Doc 1', visibility: 'public'}]
    mockFind.mockResolvedValue({docs})

    const {getLibraryDocuments} = await import('@/src/lib/content')
    const result = await getLibraryDocuments(makeUser())

    expect(result).toEqual(docs)
  })

  it('retorna array vacio cuando payload devuelve docs vacio', async () => {
    mockFind.mockResolvedValue({docs: []})

    const {getLibraryDocuments} = await import('@/src/lib/content')
    const result = await getLibraryDocuments(makeUser())

    expect(result).toEqual([])
  })

  it('retorna array vacio cuando payload falla', async () => {
    mockFind.mockRejectedValue(new Error('DB error'))

    const {getLibraryDocuments} = await import('@/src/lib/content')
    const result = await getLibraryDocuments(makeUser())

    expect(result).toEqual([])
  })

  it('pasa el user a payload.find', async () => {
    const user = makeUser('admin')
    mockFind.mockResolvedValue({docs: []})

    const {getLibraryDocuments} = await import('@/src/lib/content')
    await getLibraryDocuments(user)

    expect(mockFind).toHaveBeenCalledWith(
      expect.objectContaining({collection: 'documents', user}),
    )
  })

  it('ordena por -updatedAt con limit 30', async () => {
    mockFind.mockResolvedValue({docs: []})

    const {getLibraryDocuments} = await import('@/src/lib/content')
    await getLibraryDocuments(makeUser())

    expect(mockFind).toHaveBeenCalledWith(
      expect.objectContaining({collection: 'documents', sort: '-updatedAt', limit: 30}),
    )
  })
})

// ---------------------------------------------------------------------------
// getEventsList
// ---------------------------------------------------------------------------

describe('getEventsList', () => {
  afterEach(() => vi.clearAllMocks())

  it('retorna eventos cuando payload responde con docs', async () => {
    const docs = [{id: 1, title: 'Evento 1', slug: 'evento-1', date: '2026-06-01'}]
    mockFind.mockResolvedValue({docs, totalDocs: 1})

    const {getEventsList} = await import('@/src/lib/content')
    const result = await getEventsList()

    expect(result).toEqual(docs)
  })

  it('retorna defaults cuando payload devuelve vacio', async () => {
    mockFind.mockResolvedValue({docs: [], totalDocs: 0})

    const {getEventsList} = await import('@/src/lib/content')
    const result = await getEventsList()

    expect(result).toHaveLength(4)
    expect(result[0].title).toContain('Puertas Abiertas')
  })

  it('retorna defaults cuando payload falla', async () => {
    mockFind.mockRejectedValue(new Error('DB error'))

    const {getEventsList} = await import('@/src/lib/content')
    const result = await getEventsList()

    expect(result).toHaveLength(4)
  })

  it('ordena por date con limit 10', async () => {
    mockFind.mockResolvedValue({docs: [], totalDocs: 0})

    const {getEventsList} = await import('@/src/lib/content')
    await getEventsList()

    expect(mockFind).toHaveBeenCalledWith(
      expect.objectContaining({collection: 'events', sort: 'date', limit: 10}),
    )
  })
})

// ---------------------------------------------------------------------------
// getProjectsList
// ---------------------------------------------------------------------------

describe('getProjectsList', () => {
  afterEach(() => vi.clearAllMocks())

  it('retorna proyectos cuando payload responde con docs', async () => {
    const docs = [{id: 1, title: 'Proyecto 1', slug: 'proyecto-1'}]
    mockFind.mockResolvedValue({docs, totalDocs: 1})

    const {getProjectsList} = await import('@/src/lib/content')
    const result = await getProjectsList()

    expect(result).toEqual(docs)
  })

  it('retorna defaults cuando payload devuelve vacio', async () => {
    mockFind.mockResolvedValue({docs: [], totalDocs: 0})

    const {getProjectsList} = await import('@/src/lib/content')
    const result = await getProjectsList()

    expect(result).toHaveLength(4)
  })

  it('retorna defaults cuando payload falla', async () => {
    mockFind.mockRejectedValue(new Error('DB error'))

    const {getProjectsList} = await import('@/src/lib/content')
    const result = await getProjectsList()

    expect(result).toHaveLength(4)
  })

  it('ordena por -publishedAt con limit 10', async () => {
    mockFind.mockResolvedValue({docs: [], totalDocs: 0})

    const {getProjectsList} = await import('@/src/lib/content')
    await getProjectsList()

    expect(mockFind).toHaveBeenCalledWith(
      expect.objectContaining({collection: 'projects', sort: '-publishedAt', limit: 10}),
    )
  })
})

// ---------------------------------------------------------------------------
// getCompaniesList
// ---------------------------------------------------------------------------

describe('getCompaniesList', () => {
  afterEach(() => vi.clearAllMocks())

  it('retorna empresas cuando payload responde con docs', async () => {
    const docs = [{id: 1, name: 'Empresa 1'}]
    mockFind.mockResolvedValue({docs, totalDocs: 1})

    const {getCompaniesList} = await import('@/src/lib/content')
    const result = await getCompaniesList()

    expect(result).toEqual(docs)
  })

  it('retorna defaults cuando payload devuelve vacio', async () => {
    mockFind.mockResolvedValue({docs: [], totalDocs: 0})

    const {getCompaniesList} = await import('@/src/lib/content')
    const result = await getCompaniesList()

    expect(result).toHaveLength(4)
    expect(result[0].name).toContain('TechCorp')
  })

  it('retorna defaults cuando payload falla', async () => {
    mockFind.mockRejectedValue(new Error('DB error'))

    const {getCompaniesList} = await import('@/src/lib/content')
    const result = await getCompaniesList()

    expect(result).toHaveLength(4)
  })

  it('ordena por name con limit 10', async () => {
    mockFind.mockResolvedValue({docs: [], totalDocs: 0})

    const {getCompaniesList} = await import('@/src/lib/content')
    await getCompaniesList()

    expect(mockFind).toHaveBeenCalledWith(
      expect.objectContaining({collection: 'companies', sort: 'name', limit: 10}),
    )
  })
})

// ---------------------------------------------------------------------------
// getPublicDocuments
// ---------------------------------------------------------------------------

describe('getPublicDocuments', () => {
  afterEach(() => vi.clearAllMocks())

  it('retorna documentos públicos cuando payload responde', async () => {
    const docs = [{id: 1, title: 'Documento Público', visibility: 'public'}]
    mockFind.mockResolvedValue({docs})

    const {getPublicDocuments} = await import('@/src/lib/content')
    const result = await getPublicDocuments()

    expect(result).toEqual(docs)
  })

  it('retorna array vacio cuando payload devuelve docs vacio', async () => {
    mockFind.mockResolvedValue({docs: []})

    const {getPublicDocuments} = await import('@/src/lib/content')
    const result = await getPublicDocuments()

    expect(result).toEqual([])
  })

  it('retorna array vacio cuando payload falla', async () => {
    mockFind.mockRejectedValue(new Error('DB error'))

    const {getPublicDocuments} = await import('@/src/lib/content')
    const result = await getPublicDocuments()

    expect(result).toEqual([])
  })

  it('filtra solo documentos con visibility public', async () => {
    mockFind.mockResolvedValue({docs: []})

    const {getPublicDocuments} = await import('@/src/lib/content')
    await getPublicDocuments()

    expect(mockFind).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'documents',
        where: {visibility: {equals: 'public'}},
        limit: 50,
        sort: '-updatedAt',
      }),
    )
  })
})

// ---------------------------------------------------------------------------
// getScholarships
// ---------------------------------------------------------------------------

describe('getScholarships', () => {
  afterEach(() => vi.clearAllMocks())

  it('retorna scholarships cuando payload responde con docs', async () => {
    const docs = [{id: 1, title: 'Progresar', slug: 'progresar'}]
    mockFind.mockResolvedValue({docs, totalDocs: 1})

    const {getScholarships} = await import('@/src/lib/content')
    const result = await getScholarships()

    expect(result).toEqual(docs)
  })

  it('retorna defaults cuando payload devuelve array vacio', async () => {
    mockFind.mockResolvedValue({docs: [], totalDocs: 0})

    const {getScholarships} = await import('@/src/lib/content')
    const result = await getScholarships()

    expect(result).toHaveLength(4)
    expect(result[0].title).toContain('Progresar')
  })

  it('retorna defaults cuando payload falla', async () => {
    mockFind.mockRejectedValue(new Error('DB error'))

    const {getScholarships} = await import('@/src/lib/content')
    const result = await getScholarships()

    expect(result).toHaveLength(4)
  })

  it('busca scholarships publicados ordenados por order', async () => {
    mockFind.mockResolvedValue({docs: [], totalDocs: 0})

    const {getScholarships} = await import('@/src/lib/content')
    await getScholarships()

    expect(mockFind).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'scholarships',
        limit: 20,
        sort: 'order',
        where: {status: {equals: 'published'}},
      }),
    )
  })
})

// ---------------------------------------------------------------------------
// getBecasPage
// ---------------------------------------------------------------------------

describe('getBecasPage', () => {
  afterEach(() => vi.clearAllMocks())

  it('retorna pagina mergeada con defaults cuando payload responde OK', async () => {
    mockFindGlobal.mockResolvedValue({pageTitle: 'Becas Personalizadas'})

    const {getBecasPage} = await import('@/src/lib/content')
    const result = await getBecasPage()

    expect(result.pageTitle).toBe('Becas Personalizadas')
    expect(result.timelineTitle).toBe('Fechas Importantes')
  })

  it('retorna defaults cuando payload falla', async () => {
    mockFindGlobal.mockRejectedValue(new Error('DB error'))

    const {getBecasPage} = await import('@/src/lib/content')
    const result = await getBecasPage()

    expect(result.pageTitle).toBe('Becas y Programas de Apoyo')
  })

  it('llama a findGlobal con slug becas-page', async () => {
    mockFindGlobal.mockResolvedValue({})

    const {getBecasPage} = await import('@/src/lib/content')
    await getBecasPage()

    expect(mockFindGlobal).toHaveBeenCalledWith({slug: 'becas-page'})
  })
})
