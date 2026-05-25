import { ReactNode } from "react"

interface WeekCardProps {
  number: string
  title: string
  description: string
  icon: ReactNode
  color: string
}

export default function WeekCard({
  number,
  title,
  description,
  icon,
  color,
}: WeekCardProps) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-5 flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white ${color}`}
        >
          {number}
        </div>

        <div className="rounded-2xl bg-gray-50 p-3 text-gray-700">
          {icon}
        </div>
      </div>

      <h2 className="mb-3 text-xl font-bold tracking-tight text-gray-900">
        {title}
      </h2>

      <p className="text-sm leading-7 text-gray-600">
        {description}
      </p>
    </div>
  )
}
