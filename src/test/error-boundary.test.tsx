import {cleanup, render, screen, waitFor} from '@testing-library/react'
import {afterEach, describe, expect, it, vi} from 'vitest'

import {ErrorBoundary} from '@/src/components/ui/error-boundary'

afterEach(() => {
  cleanup()
})

let throwOnRender = true

function Bomb() {
  if (throwOnRender) {
    throw new Error('💥')
  }
  return <p>recovered</p>
}

function Stable({children}: {children: ReactNode}) {
  return <>{children}</>
}

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <p>hello</p>
      </ErrorBoundary>,
    )

    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('shows default error fallback when a child throws', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    )

    expect(
      screen.getByText('Ocurrió un error al cargar esta sección.'),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Reintentar'})).toBeInTheDocument()

    spy.mockRestore()
  })

  it('shows custom fallback when provided', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary fallback={<div data-testid="custom">Custom error</div>}>
        <Bomb />
      </ErrorBoundary>,
    )

    expect(screen.getByTestId('custom')).toBeInTheDocument()
    expect(
      screen.queryByText('Ocurrió un error al cargar esta sección.'),
    ).not.toBeInTheDocument()

    spy.mockRestore()
  })

  it('resets error state when retry button is clicked and children no longer throw', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    throwOnRender = true

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    )

    expect(
      screen.getByText('Ocurrió un error al cargar esta sección.'),
    ).toBeInTheDocument()

    throwOnRender = false
    screen.getByRole('button', {name: 'Reintentar'}).click()

    await waitFor(() => {
      expect(screen.getByText('recovered')).toBeInTheDocument()
    })
    expect(
      screen.queryByText('Ocurrió un error al cargar esta sección.'),
    ).not.toBeInTheDocument()

    throwOnRender = true
    spy.mockRestore()
  })
})
