"use client"

import Link from "next/link"
import { Bot, Home, Layers3 } from "lucide-react"
import { usePathname } from "next/navigation"

const links = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },

  {
    name: "Week 1 — AI Systems & Engineering Setup",
    href: "/week-one-ai-systems-setup",
    icon: Layers3,
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-gray-200 bg-white lg:flex lg:flex-col">

      <div className="border-b border-gray-200 p-6">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg">

            <Bot className="h-7 w-7" />

          </div>

          <div>

            <h1 className="text-lg font-bold text-gray-900">
              Alpinist AI
            </h1>

            <p className="text-sm text-gray-500">
              Training Platform
            </p>

          </div>

        </div>

      </div>

      <nav className="flex-1 space-y-2 p-4">

        {links.map((link) => {
          const Icon = link.icon

          const active = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 rounded-2xl px-4 py-4 transition-all duration-200 ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >

              <Icon className="h-5 w-5" />

              <span className="font-medium">
                {link.name}
              </span>

            </Link>
          )
        })}

      </nav>

    </aside>
  )
}
