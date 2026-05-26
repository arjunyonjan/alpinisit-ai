import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-6">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">404</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Page Not Found</h2>
        <p className="text-gray-600 mb-8">Sorry, we couldn't find the page you're looking for.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}