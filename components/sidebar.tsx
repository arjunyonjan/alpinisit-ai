"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Bot, Cpu, Home, Layers3, BookOpen, Shield, Zap, BarChart, Globe, 
  FolderTree, Menu, X, Cloud, ChevronDown, ChevronRight, Brain, Target,
  ChevronUp
} from "lucide-react"
import { usePathname } from "next/navigation"

interface NavItem {
  name: string
  href: string
  icon: any
  children?: NavItem[]
}

const links: NavItem[] = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Deep Learning",
    href: "/deep-learning/weight-bias-activation",
    icon: Brain,
    children: [
      {
        name: "Weight, Bias & Activation",
        href: "/deep-learning/weight-bias-activation",
        icon: Target,
      },
    ],
  },
  {
    name: "Chatbot Project Structure",
    href: "/llmchat-project-structure",
    icon: FolderTree,
  },
  {
    name: "Ollama Cloud",
    href: "/ollama-cloud",
    icon: Cloud,
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

interface NavItemRendererProps {
  item: NavItem
  depth?: number
  pathname: string
  onClose?: () => void
}

function NavItemRenderer({ item, depth = 0, pathname, onClose }: NavItemRendererProps) {
  const [isOpen, setIsOpen] = useState(depth === 0)
  const Icon = item.icon
  const hasChildren = item.children && item.children.length > 0
  const isActive = pathname === item.href || (item.href.includes('#') && pathname === item.href.split('#')[0])
  const isChildActive = hasChildren && item.children?.some(child => 
    pathname === child.href || (child.href.includes('#') && pathname === child.href.split('#')[0])
  )

  const handleToggle = () => {
    if (hasChildren) setIsOpen(!isOpen)
  }

  return (
    <div>
      <div
        className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-200 ${
          isActive || isChildActive ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-100"
        } ${depth > 0 ? "ml-6" : ""}`}
      >
        <Link
          href={item.href}
          onClick={onClose}
          className="flex items-center gap-3 flex-1"
        >
          <Icon className="h-5 w-5" />
          <span className="font-medium text-sm">{item.name}</span>
        </Link>
        {hasChildren && (
          <button
            onClick={handleToggle}
            className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
            aria-label={isOpen ? "Collapse" : "Expand"}
          >
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        )}
      </div>
      {hasChildren && isOpen && (
        <div className="ml-2 mt-1 space-y-1">
          {item.children!.map((child) => (
            <NavItemRenderer
              key={child.href}
              item={child}
              depth={depth + 1}
              pathname={pathname}
              onClose={onClose}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 right-4 z-[100] flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-xl backdrop-blur-md border border-gray-200 lg:hidden active:scale-95 transition-transform"
      aria-label="Open menu"
    >
      <Menu className="h-6 w-6 text-gray-800" />
    </button>
  )
}

export default function Sidebar({ open = false, onClose }: { open?: boolean; onClose?: () => void }) {
  const pathname = usePathname()

  const navContent = (
    <>
      <div className="border-b border-gray-200 p-6">
        <div className="flex flex-col items-center gap-2">
          <img
            src="/alpinistlogo.png"
            alt="Alpinist AI Logo"
            className="h-10 w-full object-contain"
          />
          <h1 className="text-base font-bold text-gray-900">Alpinist AI</h1>
          <p className="text-xs text-gray-500">Training Platform</p>
          <p className="-mt-1 text-[10px] tracking-widest uppercase text-indigo-400 font-semibold">Nepal</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto pb-20">
        {links.map((link) => (
          <NavItemRenderer
            key={link.href}
            item={link}
            pathname={pathname}
            onClose={onClose}
          />
        ))}
      </nav>
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-gray-200 bg-white lg:flex lg:flex-col overflow-y-auto z-40">
        {navContent}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <aside className="fixed inset-y-0 left-0 z-[100] flex w-72 flex-col bg-white shadow-2xl lg:hidden overflow-y-auto">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
            {navContent}
          </aside>
        </>
      )}
    </>
  )
}