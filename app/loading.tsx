export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fafafa]">

      <div className="flex flex-col items-center gap-5">

        <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />

        <div className="text-lg font-medium text-gray-700">
          Loading AI Engineering Content...
        </div>

      </div>

    </main>
  )
}
