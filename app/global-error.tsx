"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 to-red-700 px-6">
          <div className="text-center max-w-md">
            <div className="text-7xl mb-6">🔥</div>
            <h2 className="text-2xl font-bold text-white mb-3">Critical Application Error</h2>
            <p className="text-red-100 mb-6">Please try refreshing the page</p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-white text-red-700 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}