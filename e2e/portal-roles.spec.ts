import {expect, test} from '@playwright/test'
import fs from 'fs'

import {AUTH_FILES} from './constants'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function loadAuthState(context: import('@playwright/test').BrowserContext, file: string): Promise<boolean> {
  if (!fs.existsSync(file)) return false
  const state = JSON.parse(fs.readFileSync(file, 'utf-8'))
  if (state.cookies?.length) await context.addCookies(state.cookies)
  return true
}

// ---------------------------------------------------------------------------
// Portal — student
// ---------------------------------------------------------------------------

test.describe('Portal — student', () => {
  test.beforeEach(async ({context}) => {
    const loaded = await loadAuthState(context, AUTH_FILES.student)
    if (!loaded) test.skip()
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
  test.beforeEach(async ({context}) => {
    const loaded = await loadAuthState(context, AUTH_FILES.teacher)
    if (!loaded) test.skip()
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
  test.beforeEach(async ({context}) => {
    const loaded = await loadAuthState(context, AUTH_FILES.admin)
    if (!loaded) test.skip()
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
