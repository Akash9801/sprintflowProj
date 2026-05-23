import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // In production, send to an error tracking service (Sentry, etc.)
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/dashboard'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface-50 flex items-center justify-center p-6">
          <div className="text-center max-w-sm">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-50 mb-5">
              <svg
                className="w-7 h-7 text-red-500"
                fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={1.8}
              >
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-lg font-bold text-surface-900 mb-2">Something went wrong</h1>
            <p className="text-sm text-surface-500 mb-6 leading-relaxed">
              An unexpected error occurred. Our team has been notified.
            </p>
            {this.state.error && (
              <pre className="text-left text-xs bg-surface-100 text-surface-600 rounded-xl p-3 mb-5 overflow-auto max-h-28">
                {this.state.error.message}
              </pre>
            )}
            <button onClick={this.handleReset} className="btn-primary justify-center">
              Back to Dashboard
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
