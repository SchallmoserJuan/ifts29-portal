import {describe, expect, it} from 'vitest'

import {slugField} from '@/src/fields/slug'

type HookArgs = {value?: unknown; data?: Record<string, unknown>}

function runBeforeValidate(field: ReturnType<typeof slugField>, args: HookArgs): unknown {
  const hook = (field as any).hooks.beforeValidate[0]
  return hook(args)
}

function runBeforeChange(field: ReturnType<typeof slugField>, args: HookArgs): unknown {
  const hook = (field as any).hooks.beforeChange[0]
  return hook(args)
}

describe('slugField', () => {
  describe('beforeValidate hook', () => {
    it('formats an explicit slug value', () => {
      const field = slugField()
      expect(runBeforeValidate(field, {value: 'Educación Superior', data: {}})).toBe(
        'educacion-superior',
      )
    })

    it('falls back to the source field when value is empty', () => {
      const field = slugField('title')
      expect(runBeforeValidate(field, {value: '', data: {title: 'Mi Artículo'}})).toBe(
        'mi-articulo',
      )
    })

    it('returns the original value when both value and source are empty', () => {
      const field = slugField()
      expect(runBeforeValidate(field, {value: '', data: {}})).toBe('')
    })

    it('uses a custom source field', () => {
      const field = slugField('nombre')
      expect(runBeforeValidate(field, {value: '', data: {nombre: 'Curso de Programación'}})).toBe(
        'curso-de-programacion',
      )
    })
  })

  describe('beforeChange hook', () => {
    it('formats an explicit slug value', () => {
      const field = slugField()
      expect(runBeforeChange(field, {value: 'Test Slug!', data: {}})).toBe('test-slug')
    })

    it('falls back to the source field when value is empty', () => {
      const field = slugField('title')
      expect(runBeforeChange(field, {value: '', data: {title: 'Nuevo Título'}})).toBe(
        'nuevo-titulo',
      )
    })

    it('returns the original value when both value and source are empty', () => {
      const field = slugField()
      expect(runBeforeChange(field, {value: '', data: {}})).toBe('')
    })
  })
})
