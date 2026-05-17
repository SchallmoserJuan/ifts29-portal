import {cleanup, render, waitFor} from '@testing-library/react'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

vi.mock('next/navigation', () => ({
  useRouter: () => ({push: vi.fn(), refresh: vi.fn()}),
}))

import {AuthProvider, useAuth} from '@/src/context/auth-context'

const fetchMock = vi.fn()

beforeEach(() => {
  fetchMock.mockReset()
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

function TestConsumer() {
  const {user, isLoading, logout} = useAuth()
  return (
    <div>
      <span data-testid="loading">{String(isLoading)}</span>
      <span data-testid="user">{user ? user.email : 'null'}</span>
      <button onClick={logout} data-testid="logout">
        logout
      </button>
    </div>
  )
}

describe('AuthProvider', () => {
  it('starts with isLoading true before the fetch resolves', async () => {
    fetchMock.mockReturnValue(new Promise(() => {}))

    const {getByTestId} = render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    )

    expect(getByTestId('loading').textContent).toBe('true')
  })

  it('sets user and isLoading false when the fetch returns an authenticated user', async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({user: {id: 1, email: 'admin@ifts29.edu.ar', role: 'admin'}}), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      }),
    )

    const {getByTestId} = render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    )

    await waitFor(() => {
      expect(getByTestId('loading').textContent).toBe('false')
    })
    expect(getByTestId('user').textContent).toBe('admin@ifts29.edu.ar')
  })

  it('sets user to null and isLoading false when the fetch returns an unauthenticated response', async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({user: null}), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      }),
    )

    const {getByTestId} = render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    )

    await waitFor(() => {
      expect(getByTestId('loading').textContent).toBe('false')
    })
    expect(getByTestId('user').textContent).toBe('null')
  })

  it('clears user after logout is called', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({user: {id: 1, email: 'admin@ifts29.edu.ar', role: 'admin'}}), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      }),
    )

    fetchMock.mockResolvedValue(new Response(JSON.stringify({success: true}), {status: 200}))

    const {getByTestId} = render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    )

    await waitFor(() => {
      expect(getByTestId('user').textContent).toBe('admin@ifts29.edu.ar')
    })

    getByTestId('logout').click()

    await waitFor(() => {
      expect(getByTestId('user').textContent).toBe('null')
    })
  })
})
