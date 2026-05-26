"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-6">
      <div className="text-center max-w-md">
        <div className="text-7xl mb-6">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">{error.message || "An unexpected error occurred"}</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  )
}