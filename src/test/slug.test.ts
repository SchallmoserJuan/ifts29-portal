import {describe, expect, it} from 'vitest'

import {formatSlug} from '@/src/lib/slug'

describe('formatSlug', () => {
  it('removes accent marks from characters', () => {
    expect(formatSlug('Educación Superior')).toBe('educacion-superior')
  })

  it('is idempotent — applying twice gives the same result', () => {
    const first = formatSlug('Título del Artículo')
    expect(formatSlug(first)).toBe(first)
  })

  it('returns empty string for empty input', () => {
    expect(formatSlug('')).toBe('')
  })

  it('replaces special characters with hyphens', () => {
    expect(formatSlug('hola & mundo! 2024')).toBe('hola-mundo-2024')
  })

  it('trims leading and trailing hyphens', () => {
    expect(formatSlug('  -hola mundo-  ')).toBe('hola-mundo')
  })

  it('collapses consecutive special chars into a single hyphen', () => {
    expect(formatSlug('foo   bar')).toBe('foo-bar')
  })

  it('lowercases all characters', () => {
    expect(formatSlug('HELLO WORLD')).toBe('hello-world')
  })
})
