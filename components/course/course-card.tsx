interface CourseCardProps {
  number: string
  title: string
  description: string
  color: string
}

export default function CourseCard({
  number,
  title,
  description,
  color,
}: CourseCardProps) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="mb-4 flex items-center gap-3">

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white ${color}`}
        >
          {number}
        </div>

        <h2 className="text-lg font-bold text-gray-900">
          {title}
        </h2>

      </div>

      <p className="text-sm leading-7 text-gray-600 whitespace-pre-line">
        {description}
      </p>

    </div>
  )
}
