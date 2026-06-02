'use client'

import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm font-medium text-red-800">
              Ocurrió un error al cargar esta sección.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-3 text-sm font-semibold text-red-600 underline hover:no-underline"
            >
              Reintentar
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}
