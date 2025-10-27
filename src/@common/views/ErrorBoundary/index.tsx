import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError)
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-red-300 text-red-900 p-6">
          <h1 className="text-4xl font-bold mb-4">¡Algo salió mal!</h1>
          <p className="text-lg mb-6">
            Ocurrió un error inesperado. Por favor, intenta recargar la página.
          </p>
          <pre className="bg-white text-red-700 p-4 rounded-2xl shadow max-w-xl w-full overflow-auto">
            {this.state.error?.message}
          </pre>
        </div>
      )

    return this.props.children
  }
}
