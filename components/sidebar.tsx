"use client"

import Link from "next/link"
import { Bot, Cpu, Home, Layers3, BookOpen, Shield, Zap, BarChart, Globe } from "lucide-react"
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
    children: [
      {
        name: "T1 — System Architecture",
        href: "/week-one-t1-system-architecture-project-scaffold",
        icon: Cpu,
      },
    ],
  },
  {
    name: "LLM Orientation Day 3 — Architecture Masterclass",
    href: "/llm-architecture-masterclass",
    icon: BookOpen,
    children: [
      {
        name: "01 — Tokenization",
        href: "/llm-architecture-masterclass#p1",
        icon: Zap,
      },
      {
        name: "02 — Tensor Batching",
        href: "/llm-architecture-masterclass#p2",
        icon: Layers3,
      },
      {
        name: "03 — Latent Space",
        href: "/llm-architecture-masterclass#p3",
        icon: Globe,
      },
      {
        name: "04 — Multi-Head Attention",
        href: "/llm-architecture-masterclass#p4",
        icon: Cpu,
      },
      {
        name: "05 — Self-Supervised Learning",
        href: "/llm-architecture-masterclass#p5",
        icon: Bot,
      },
      {
        name: "06 — Retrieval Systems (RAG)",
        href: "/llm-architecture-masterclass#p6",
        icon: Shield,
      },
      {
        name: "07 — Optimization & Deployment",
        href: "/llm-architecture-masterclass#p7",
        icon: BarChart,
      },
      {
        name: "08 — Security & Safety",
        href: "/llm-architecture-masterclass#p8",
        icon: Shield,
      },
      {
        name: "09 — Evaluation & Monitoring",
        href: "/llm-architecture-masterclass#p9",
        icon: BarChart,
      },
      {
        name: "10 — China vs US AI Race",
        href: "/llm-architecture-masterclass#p10",
        icon: Globe,
      },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-gray-200 bg-white lg:flex lg:flex-col overflow-y-auto">
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg">
            <Bot className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Alpinist AI</h1>
            <p className="text-sm text-gray-500">Training Platform</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {links.map((link) => {
          const Icon = link.icon
          const active = pathname === link.href || (link.children && pathname?.startsWith(link.href))
          return (
            <div key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-4 rounded-2xl px-4 py-4 transition-all duration-200 ${
                  active ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{link.name}</span>
              </Link>
              {link.children?.map((child) => {
                const ChildIcon = child.icon
                const isChildActive = pathname === child.href || (child.href.includes('#') && pathname === child.href.split('#')[0])
                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={`ml-8 mt-2 flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all hover:bg-gray-100 ${
                      isChildActive ? "bg-blue-50 text-blue-700" : "text-gray-500"
                    }`}
                  >
                    <ChildIcon className="h-4 w-4" />
                    <span>{child.name}</span>
                  </Link>
                )
              })}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}