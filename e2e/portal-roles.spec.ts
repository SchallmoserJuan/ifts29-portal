import {expect, test} from '@playwright/test'
import fs from 'fs'

import {AUTH_FILES} from './constants'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function authStateExists(file: string): boolean {
  return fs.existsSync(file)
}

// ---------------------------------------------------------------------------
// Portal — student
// ---------------------------------------------------------------------------

test.describe('Portal — student', () => {
  test.beforeEach(async ({page}) => {
    if (!authStateExists(AUTH_FILES.student)) {
      test.skip()
      return
    }
    await page.context().storageState({path: AUTH_FILES.student})
  })

  test('puede acceder a /portal/biblioteca', async ({page}) => {
    await page.goto('/portal/biblioteca')
    await expect(page).toHaveURL(/\/portal\/biblioteca/)
    await expect(page).not.toHaveURL(/\/login/)
  })

  test('ve la card de Biblioteca en el portal', async ({page}) => {
    await page.goto('/portal')
    await expect(page.getByRole('heading', {name: 'Biblioteca'})).toBeVisible()
  })

  test('NO ve la card de Gestión de contenido', async ({page}) => {
    await page.goto('/portal')
    await expect(page.getByRole('heading', {name: 'Gestion de contenido'})).not.toBeVisible()
  })

  test('NO ve la card de Administración', async ({page}) => {
    await page.goto('/portal')
    await expect(page.getByRole('heading', {name: 'Administracion'})).not.toBeVisible()
  })
})

// ---------------------------------------------------------------------------
// Portal — teacher
// ---------------------------------------------------------------------------

test.describe('Portal — teacher', () => {
  test.beforeEach(async ({page}) => {
    if (!authStateExists(AUTH_FILES.teacher)) {
      test.skip()
      return
    }
    await page.context().storageState({path: AUTH_FILES.teacher})
  })

  test('puede acceder a /portal', async ({page}) => {
    await page.goto('/portal')
    await expect(page).toHaveURL(/\/portal/)
    await expect(page).not.toHaveURL(/\/login/)
  })

  test('ve la card de Biblioteca', async ({page}) => {
    await page.goto('/portal')
    await expect(page.getByRole('heading', {name: 'Biblioteca'})).toBeVisible()
  })

  test('ve la card de Gestión de contenido', async ({page}) => {
    await page.goto('/portal')
    await expect(page.getByRole('heading', {name: 'Gestion de contenido'})).toBeVisible()
  })

  test('NO ve la card de Administración', async ({page}) => {
    await page.goto('/portal')
    await expect(page.getByRole('heading', {name: 'Administracion'})).not.toBeVisible()
  })
})

// ---------------------------------------------------------------------------
// Portal — admin
// ---------------------------------------------------------------------------

test.describe('Portal — admin', () => {
  test.beforeEach(async ({page}) => {
    if (!authStateExists(AUTH_FILES.admin)) {
      test.skip()
      return
    }
    await page.context().storageState({path: AUTH_FILES.admin})
  })

  test('puede acceder a /portal', async ({page}) => {
    await page.goto('/portal')
    await expect(page).toHaveURL(/\/portal/)
    await expect(page).not.toHaveURL(/\/login/)
  })

  test('ve la card de Biblioteca', async ({page}) => {
    await page.goto('/portal')
    await expect(page.getByRole('heading', {name: 'Biblioteca'})).toBeVisible()
  })

  test('ve la card de Gestión de contenido', async ({page}) => {
    await page.goto('/portal')
    await expect(page.getByRole('heading', {name: 'Gestion de contenido'})).toBeVisible()
  })

  test('ve la card de Administración', async ({page}) => {
    await page.goto('/portal')
    await expect(page.getByRole('heading', {name: 'Administracion'})).toBeVisible()
  })

  test('el portal muestra el nombre del usuario autenticado', async ({page}) => {
    await page.goto('/portal')
    await expect(page.getByRole('heading', {name: /Bienvenido/})).toBeVisible()
  })
})
