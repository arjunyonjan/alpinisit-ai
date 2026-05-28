"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bot,
  Terminal,
  FileCode,
  FolderTree,
  Copy,
  Check,
  ChevronDown,
  Info,
  Play,
  TestTube,
  BookOpen,
  Zap,
  GitBranch,
  FileText,
  Settings,
  AlertTriangle,
  XCircle,
  Bug,
  Skull,
  ArrowRight,
  MessageSquare,
  Brain,
} from "lucide-react"

/* ──────────────────────────── Types ──────────────────────────── */

interface TreeNode {
  name: string
  type: "file" | "dir"
  children?: TreeNode[]
  active?: boolean
}

interface CommandItem {
  label: string
  command: string
  description: string
}

interface LoggingLevel {
  name: string
  emoji: string
  color: string
  bg: string
  desc: string
}

/* ──────────────────────────── Data ──────────────────────────── */

const projectTree: TreeNode = {
  name: "chatbot-project",
  type: "dir",
  children: [
    { name: "src", type: "dir", children: [
      { name: "chatbot", type: "dir", children: [
        { name: "__init__.py", type: "file", active: true },
        { name: "chat.py", type: "file", active: true },
      ]},
    ]},
    { name: "tests", type: "dir", children: [
      { name: "__init__.py", type: "file" },
      { name: "test_chat.py", type: "file", active: true },
    ]},
    { name: "main.py", type: "file", active: true },
    { name: "requirements.txt", type: "file" },
    { name: "pyproject.toml", type: "file", active: true },
    { name: "README.md", type: "file" },
    { name: "CHANGELOG.md", type: "file" },
    { name: "project.html", type: "file" },
  ],
}

const commands: CommandItem[] = [
  { label: "Train model", command: "python main.py train", description: "Run training pipeline" },
  { label: "Test model", command: "python main.py test", description: "Run evaluation suite" },
  { label: "UV module run", command: "uv run python -m chatbot.chat", description: "Run via UV package manager" },
  { label: "UV entry point", command: "uv run chatbot", description: "Run via pyproject [project.scripts] entry" },
]

const loggingLevels: LoggingLevel[] = [
  { name: "DEBUG", emoji: "🐛", color: "text-emerald-700", bg: "bg-emerald-100 border-emerald-300", desc: "Detailed diagnostic info — use during development only" },
  { name: "INFO", emoji: "🔵", color: "text-blue-700", bg: "bg-blue-100 border-blue-300", desc: "Confirmation that things are working as expected" },
  { name: "WARNING", emoji: "⚠️", color: "text-yellow-700", bg: "bg-yellow-100 border-yellow-300", desc: "Something unexpected but non-fatal — keep running" },
  { name: "ERROR", emoji: "🔴", color: "text-orange-700", bg: "bg-orange-100 border-orange-300", desc: "Serious problem — the operation failed" },
  { name: "CRITICAL", emoji: "💀", color: "text-red-700", bg: "bg-red-100 border-red-300", desc: "Fatal error — the program may stop entirely" },
]

const educationalCards: { title: string; icon: ReactNode; content: ReactNode }[] = [
  {
    title: 'What is `if __name__ == "__main__"`?',
    icon: <FileCode className="h-5 w-5" />,
    content: (
      <div className="space-y-3 text-sm text-slate-600">
        <p>
          This guard ensures the file can be <strong>both imported as a module</strong> and run
          as a standalone script. When Python executes a file directly, it sets
          <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">__name__</code> to
          <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">"__main__"</code>.
          When imported, it becomes the module name.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-xs border border-slate-200">
          <p><span className="text-purple-600">def</span> <span className="text-blue-600">main</span>():</p>
          <p className="ml-4"><span className="text-slate-400"># Entry-point logic here</span></p>
          <p className="ml-4"><span className="text-purple-600">pass</span></p>
          <p className="mt-2"><span className="text-purple-600">if</span> __name__ == <span className="text-green-600">"__main__"</span>:</p>
          <p className="ml-4">main()</p>
        </div>
        <p className="text-xs text-slate-500">💡 Without this guard, importing the file would immediately execute your script.</p>
      </div>
    ),
  },
  {
    title: "UV vs pip — What's the difference?",
    icon: <Zap className="h-5 w-5" />,
    content: (
      <div className="space-y-3 text-sm text-slate-600">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-2 pr-4 font-semibold">Feature</th>
              <th className="text-left py-2 pr-4 font-semibold">UV 🚀</th>
              <th className="text-left py-2 font-semibold">pip</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100"><td className="py-2 pr-4">Speed</td><td>10-100× faster</td><td>Standard</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 pr-4">Resolver</td><td>SAT-based, global</td><td>Backtracking</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 pr-4">Python mgmt</td><td>Built-in</td><td>External (pyenv)</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 pr-4">Scripts</td><td><code>uv run</code> entry points</td><td>Manual</td></tr>
            <tr><td className="py-2 pr-4">Lock files</td><td>First-class <code>uv.lock</code></td><td>pip-tools only</td></tr>
          </tbody>
        </table>
        <p className="text-xs text-slate-500">💡 UV is written in Rust — it replaces pip, pip-tools, and virtualenv.</p>
      </div>
    ),
  },
  {
    title: "src/ layout convention",
    icon: <FolderTree className="h-5 w-5" />,
    content: (
      <div className="space-y-3 text-sm text-slate-600">
        <p>
          The <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">src/</code> layout separates
          <strong>installable package code</strong> from project metadata. It prevents accidental imports of the
          working directory during testing.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-xs border border-slate-200 space-y-1">
          <p className="text-slate-400"># ❌ Flat layout — tests import local src, not installed package</p>
          <p>project/</p>
          <p className="ml-4">├── chatbot/</p>
          <p className="ml-4">└── tests/</p>
          <p className="mt-3 text-slate-400"># ✅ src/ layout — tests import the installed package</p>
          <p>project/</p>
          <p className="ml-4">├── src/</p>
          <p className="ml-8">└── chatbot/</p>
          <p className="ml-4">└── tests/</p>
        </div>
        <p className="text-xs text-slate-500">💡 Python packaging authorities (PyPA) recommend this as best practice.</p>
      </div>
    ),
  },
  {
    title: "Console entry points [project.scripts]",
    icon: <Terminal className="h-5 w-5" />,
    content: (
      <div className="space-y-3 text-sm text-slate-600">
        <p>
          In <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">pyproject.toml</code>, the
          <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">[project.scripts]</code> section
          creates CLI commands that call your functions.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-xs border border-slate-200">
          <p className="text-slate-400"># pyproject.toml</p>
          <p>[project.scripts]</p>
          <p className="text-blue-600">chatbot</p>
          <p className="ml-4">= chatbot.chat:<span className="text-green-600">main</span></p>
        </div>
        <p>After <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">pip install</code> or
          <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">uv sync</code>, running
          <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">chatbot</code> in your terminal
          calls <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">chatbot.chat.main()</code>.
        </p>
      </div>
    ),
  },
]

/* ──────────────────────────── Sub-components ──────────────────────────── */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 rounded-lg bg-slate-100 hover:bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied!" : "Copy"}
    </button>
  )
}

function TreeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 2)
  const isDir = node.type === "dir"

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: depth * 0.04 }}
        className={`flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer hover:bg-slate-100/80 transition-colors group`}
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
        onClick={() => isDir && setExpanded(!expanded)}
      >
        {isDir ? (
          <ChevronDown
            className={`h-4 w-4 text-slate-400 transition-transform shrink-0 ${expanded ? "" : "-rotate-90"}`}
          />
        ) : (
          <span className="w-4" />
        )}

        {isDir ? (
          <FolderTree className={`h-4 w-4 shrink-0 ${depth === 0 ? "text-indigo-500" : "text-slate-400"}`} />
        ) : (
          <FileText className={`h-4 w-4 shrink-0 ${node.active ? "text-indigo-500" : "text-slate-300"}`} />
        )}

        <span className={`text-sm ${isDir ? "font-semibold text-slate-700" : "text-slate-500"} font-mono truncate`}>
          {node.name}
        </span>

        {node.active && (
          <span className="h-2 w-2 rounded-full bg-indigo-500 pulse-glow shrink-0" />
        )}
      </motion.div>

      <AnimatePresence>
        {isDir && expanded && node.children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {node.children.map((child) => (
              <TreeItem key={child.name} node={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Tooltip({ children, text }: { children: ReactNode; text: string }) {
  const [show, setShow] = useState(false)
  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 text-white text-xs rounded-lg whitespace-nowrap z-50 tooltip-animate pointer-events-none"
          >
            {text}
            <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-slate-800 rotate-45" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

function SVGFlowGraph() {
  return (
    <svg viewBox="0 0 420 120" className="w-full" fill="none">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="420" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      <path d="M 60 60 L 160 60" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 3">
        <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1.5s" repeatCount="indefinite" />
      </path>
      <path d="M 240 60 L 340 60" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 3">
        <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1.5s" repeatCount="indefinite" />
      </path>

      <rect x="10" y="30" rx="12" width="100" height="60" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.5" />
      <text x="60" y="55" textAnchor="middle" className="fill-indigo-700 text-[11px] font-semibold" fontFamily="monospace">
        src/chatbot
      </text>
      <text x="60" y="72" textAnchor="middle" className="fill-indigo-500 text-[9px]" fontFamily="sans-serif">
        chat.py
      </text>

      <polygon points="155,55 165,60 155,65" fill="#6366f1" />

      <rect x="160" y="25" rx="12" width="80" height="70" fill="#faf5ff" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="200" y="52" textAnchor="middle" className="fill-violet-700 text-[11px] font-semibold" fontFamily="monospace">
        main.py
      </text>
      <text x="200" y="68" textAnchor="middle" className="fill-violet-500 text-[9px]" fontFamily="sans-serif">
        entry point
      </text>
      <circle cx="200" cy="38" r="3" fill="#8b5cf6">
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
      </circle>

      <polygon points="335,55 345,60 335,65" fill="#6366f1" />

      <rect x="340" y="30" rx="12" width="70" height="60" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
      <text x="375" y="55" textAnchor="middle" className="fill-emerald-700 text-[11px] font-semibold" fontFamily="monospace">
        tests
      </text>
      <text x="375" y="72" textAnchor="middle" className="fill-emerald-500 text-[9px]" fontFamily="sans-serif">
        test_chat.py
      </text>

      <text x="110" y="22" textAnchor="middle" className="fill-slate-400 text-[9px]" fontFamily="sans-serif">
        import
      </text>
      <text x="290" y="22" textAnchor="middle" className="fill-slate-400 text-[9px]" fontFamily="sans-serif">
        validate
      </text>
    </svg>
  )
}

function SVGDirectoryOrganigram() {
  return (
    <svg viewBox="0 0 500 280" className="w-full" fill="none">
      <defs>
        <linearGradient id="blobGrad1" x1="0" y1="0" x2="250" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f5f3ff" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="blobGrad2" x1="500" y1="0" x2="250" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ede9fe" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#eef2ff" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      <ellipse cx="120" cy="140" rx="180" ry="120" fill="url(#blobGrad1)" className="blob" />
      <ellipse cx="400" cy="150" rx="160" ry="130" fill="url(#blobGrad2)" className="blob blob-delay-2" />

      <rect x="175" y="8" rx="10" width="150" height="36" fill="#eef2ff" stroke="#6366f1" strokeWidth="2" />
      <text x="250" y="31" textAnchor="middle" className="fill-indigo-700 text-sm font-bold" fontFamily="monospace">
        chatbot-project
      </text>

      <line x1="250" y1="44" x2="250" y2="72" stroke="#c7d2fe" strokeWidth="2" />
      <line x1="100" y1="72" x2="400" y2="72" stroke="#c7d2fe" strokeWidth="2" />

      <line x1="100" y1="72" x2="100" y2="96" stroke="#c7d2fe" strokeWidth="2" />
      <rect x="40" y="96" rx="8" width="120" height="32" fill="#faf5ff" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="100" y="117" textAnchor="middle" className="fill-violet-700 text-[11px] font-semibold" fontFamily="monospace">
        src/
      </text>

      <line x1="100" y1="128" x2="100" y2="152" stroke="#ddd6fe" strokeWidth="1.5" />
      <rect x="30" y="152" rx="8" width="140" height="32" fill="#faf5ff" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="100" y="173" textAnchor="middle" className="fill-violet-600 text-[11px]" fontFamily="monospace">
        chatbot/
      </text>

      <line x1="100" y1="184" x2="100" y2="204" stroke="#e9d5ff" strokeWidth="1.5" />
      <line x1="40" y1="204" x2="160" y2="204" stroke="#e9d5ff" strokeWidth="1.5" />
      <line x1="40" y1="204" x2="40" y2="224" stroke="#e9d5ff" strokeWidth="1.5" />
      <line x1="160" y1="204" x2="160" y2="224" stroke="#e9d5ff" strokeWidth="1.5" />

      <rect x="5" y="224" rx="6" width="70" height="28" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="40" y="243" textAnchor="middle" className="fill-slate-600 text-[10px]" fontFamily="monospace">
        __init__.py
      </text>
      <rect x="125" y="224" rx="6" width="70" height="28" fill="#eef2ff" stroke="#6366f1" strokeWidth="1" />
      <text x="160" y="243" textAnchor="middle" className="fill-indigo-600 text-[10px] font-semibold" fontFamily="monospace">
        chat.py
      </text>
      <circle cx="190" cy="238" r="3" fill="#6366f1">
        <animate attributeName="r" values="3;4.5;3" dur="2s" repeatCount="indefinite" />
      </circle>

      <line x1="250" y1="72" x2="250" y2="96" stroke="#c7d2fe" strokeWidth="2" />
      <rect x="190" y="96" rx="8" width="120" height="32" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
      <text x="250" y="117" textAnchor="middle" className="fill-emerald-700 text-[11px] font-semibold" fontFamily="monospace">
        tests/
      </text>

      <line x1="250" y1="128" x2="250" y2="152" stroke="#bbf7d0" strokeWidth="1.5" />
      <rect x="200" y="152" rx="6" width="100" height="28" fill="#eef2ff" stroke="#6366f1" strokeWidth="1" />
      <text x="250" y="171" textAnchor="middle" className="fill-indigo-600 text-[10px] font-semibold" fontFamily="monospace">
        test_chat.py
      </text>
      <circle cx="295" cy="166" r="3" fill="#6366f1">
        <animate attributeName="r" values="3;4.5;3" dur="2s" repeatCount="indefinite" />
      </circle>

      <line x1="400" y1="72" x2="400" y2="96" stroke="#c7d2fe" strokeWidth="2" />
      <rect x="340" y="96" rx="8" width="120" height="32" fill="#fff7ed" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="117" textAnchor="middle" className="fill-amber-700 text-[11px] font-semibold" fontFamily="monospace">
        config files
      </text>

      <line x1="400" y1="128" x2="400" y2="152" stroke="#fed7aa" strokeWidth="1.5" />
      <line x1="330" y1="152" x2="470" y2="152" stroke="#fed7aa" strokeWidth="1.5" />
      <line x1="330" y1="152" x2="330" y2="176" stroke="#fed7aa" strokeWidth="1.5" />
      <line x1="400" y1="152" x2="400" y2="176" stroke="#fed7aa" strokeWidth="1.5" />
      <line x1="470" y1="152" x2="470" y2="176" stroke="#fed7aa" strokeWidth="1.5" />

      <rect x="290" y="176" rx="6" width="80" height="28" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="330" y="195" textAnchor="middle" className="fill-slate-600 text-[10px]" fontFamily="monospace">
        main.py
      </text>
      <circle cx="365" cy="190" r="3" fill="#6366f1">
        <animate attributeName="r" values="3;4.5;3" dur="2s" repeatCount="indefinite" />
      </circle>

      <rect x="365" y="176" rx="6" width="70" height="28" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="400" y="195" textAnchor="middle" className="fill-slate-600 text-[10px]" fontFamily="monospace">
        pyproject
      </text>
      <circle cx="430" cy="190" r="3" fill="#6366f1">
        <animate attributeName="r" values="3;4.5;3" dur="2s" repeatCount="indefinite" />
      </circle>

      <rect x="440" y="176" rx="6" width="70" height="28" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="475" y="195" textAnchor="middle" className="fill-slate-600 text-[10px]" fontFamily="monospace">
        README.md
      </text>
    </svg>
  )
}

function SVGTalkFlow() {
  return (
    <svg viewBox="0 0 320 100" className="w-full" fill="none">
      <defs>
        <linearGradient id="talkGrad" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      <rect x="10" y="25" rx="20" width="70" height="50" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.5" />
      <text x="45" y="55" textAnchor="middle" className="fill-indigo-700 text-sm font-semibold" fontFamily="sans-serif">
        Hello
      </text>

      <path d="M 80 50 L 130 50" stroke="url(#talkGrad)" strokeWidth="2" strokeDasharray="4 3">
        <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1s" repeatCount="indefinite" />
      </path>
      <polygon points="126,46 134,50 126,54" fill="#6366f1" />

      <rect x="130" y="25" rx="20" width="60" height="50" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="160" y="55" textAnchor="middle" className="fill-violet-700 text-sm font-semibold" fontFamily="sans-serif">
        Hi
      </text>

      <path d="M 190 50 L 230 50" stroke="url(#talkGrad)" strokeWidth="2" strokeDasharray="4 3">
        <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1s" repeatCount="indefinite" />
      </path>
      <polygon points="226,46 234,50 226,54" fill="#8b5cf6" />

      <rect x="230" y="25" rx="20" width="80" height="50" fill="#faf5ff" stroke="#a78bfa" strokeWidth="1.5" />
      <text x="270" y="55" textAnchor="middle" className="fill-purple-700 text-sm font-semibold" fontFamily="sans-serif">
        Sasswot
      </text>

      <text x="105" y="22" textAnchor="middle" className="fill-slate-400 text-[9px]" fontFamily="sans-serif">
        NLP
      </text>
      <text x="210" y="22" textAnchor="middle" className="fill-slate-400 text-[9px]" fontFamily="sans-serif">
        respond
      </text>
    </svg>
  )
}

/* ──────────────────────────── Cursor Glow ──────────────────────────── */

function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setActive(true)
    }
    const handleLeave = () => setActive(false)
    window.addEventListener("mousemove", handleMove)
    document.addEventListener("mouseleave", handleLeave)
    return () => {
      window.removeEventListener("mousemove", handleMove)
      document.removeEventListener("mouseleave", handleLeave)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 hidden lg:block"
      style={{
        background: active
          ? `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(99,102,241,0.06), transparent 60%)`
          : "none",
        transition: "background 0.3s ease",
      }}
    />
  )
}

/* ──────────────────────────── Main Page ──────────────────────────── */

export default function ChatbotStructurePage() {
  const [trainMode, setTrainMode] = useState<"train" | "test">("train")
  const [expandedEdu, setExpandedEdu] = useState<number | null>(0)
  const [expandedLogging, setExpandedLogging] = useState<Set<number>>(new Set())

  const toggleLogging = (i: number) => {
    setExpandedLogging((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] relative overflow-hidden">
      {/* ── Animated blob background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-200/30 to-violet-200/20 blur-3xl blob" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-200/20 to-pink-100/20 blur-3xl blob blob-delay-1" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-200/20 to-indigo-100/10 blur-3xl blob blob-delay-2" />
      </div>

      {/* ── Custom cursor glow (desktop) ── */}
      <CursorGlow />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 space-y-12">

        {/* ═══ HERO ═══ */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-indigo-200/50 mb-6"
          >
            <Brain className="w-4 h-4" />
            AI CRASH COURSE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent mb-3"
          >
            Chatbot Project Dashboard
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-500 max-w-xl mx-auto"
          >
            Interactive guide to building a Python chatbot — from structure to CLI to logging
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6"
          >
            <SVGTalkFlow />
          </motion.div>
        </section>

        {/* ═══ STRUCTURE + FLOW ═══ */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Project Tree */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <FolderTree className="h-5 w-5 text-indigo-500" />
              <h2 className="text-lg font-bold text-slate-800">Project Structure</h2>
            </div>
            <div className="bg-slate-50/80 rounded-xl border border-slate-200 p-2 max-h-96 overflow-y-auto">
              <TreeItem node={projectTree} />
            </div>
            <p className="mt-3 text-xs text-slate-400 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-indigo-500 inline-block" />
              Active components pulse with animation
            </p>
          </motion.section>

          {/* Organigram + Flow */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <GitBranch className="h-5 w-5 text-indigo-500" />
              <h2 className="text-lg font-bold text-slate-800">Module Flow</h2>
            </div>
            <SVGFlowGraph />

            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="h-5 w-5 text-violet-500" />
                <h2 className="text-lg font-bold text-slate-800">Conversation Graph</h2>
              </div>
              <SVGTalkFlow />
            </div>
          </motion.section>
        </div>

        {/* ═══ COMMAND PALETTE ═══ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <Terminal className="h-5 w-5 text-indigo-500" />
              <h2 className="text-lg font-bold text-slate-800">Command Palette</h2>
            </div>

            {/* Train/Test Toggle */}
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${trainMode === "train" ? "text-indigo-600" : "text-slate-400"}`}>
                Train
              </span>
              <button
                onClick={() => setTrainMode(trainMode === "train" ? "test" : "train")}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                  trainMode === "train" ? "bg-indigo-500" : "bg-violet-500"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                    trainMode === "test" ? "translate-x-6" : ""
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${trainMode === "test" ? "text-violet-600" : "text-slate-400"}`}>
                Test
              </span>
              <Tooltip text={trainMode === "train" ? "Training mode" : "Testing mode"}>
                <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                  trainMode === "train" ? "bg-indigo-100 text-indigo-700" : "bg-violet-100 text-violet-700"
                }`}>
                  {trainMode === "train" ? "🚀" : "🧪"} {trainMode.toUpperCase()}
                </span>
              </Tooltip>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {commands.map((cmd, i) => (
              <motion.div
                key={cmd.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="bg-slate-50 rounded-xl border border-slate-200 p-4 hover:border-indigo-200 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-700">{cmd.label}</span>
                  <CopyButton text={cmd.command} />
                </div>
                <code className="block bg-white rounded-lg border border-slate-200 px-3 py-2 text-sm font-mono text-indigo-600 group-hover:border-indigo-300 transition-colors break-all">
                  $ {cmd.command}
                </code>
                <p className="mt-2 text-xs text-slate-400">{cmd.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Script mapping */}
          <div className="mt-5 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl border border-indigo-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="h-4 w-4 text-indigo-500" />
              <span className="text-sm font-semibold text-indigo-700">Script Mapping</span>
            </div>
            <code className="text-xs font-mono text-slate-600">
              [project.scripts] <span className="text-indigo-600 font-semibold">chatbot</span> = chatbot.chat.<span className="text-green-600 font-semibold">main</span>
            </code>
          </div>
        </motion.section>

        {/* ═══ LOGGING LEVELS ═══ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-indigo-500" />
              <h2 className="text-lg font-bold text-slate-800">Logging Levels</h2>
              <span className="text-xs text-slate-400">Python logging module</span>
            </div>
            <div className="flex items-center gap-1.5">
              {loggingLevels.map((level, i) => (
                <button
                  key={level.name}
                  onClick={() => toggleLogging(i)}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold border transition-all cursor-pointer ${
                    level.bg
                  } ${level.color} ${
                    expandedLogging.has(i) ? "ring-2 ring-offset-1 ring-indigo-300 scale-105" : "hover:scale-105"
                  }`}
                >
                  {level.emoji} {level.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick reference table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 pr-4 font-semibold text-slate-600">Level</th>
                  <th className="text-left py-3 pr-4 font-semibold text-slate-600">When to Use</th>
                  <th className="text-left py-3 font-semibold text-slate-600">Severity</th>
                </tr>
              </thead>
              <tbody>
                {loggingLevels.map((level, i) => {
                  const severity = i < 2 ? "Low" : i === 2 ? "Medium" : i === 3 ? "High" : "Critical"
                  const sevColor = i < 2 ? "bg-emerald-100 text-emerald-700" : i === 2 ? "bg-yellow-100 text-yellow-700" : i === 3 ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"
                  return (
                    <tr key={level.name} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 pr-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${level.bg} ${level.color}`}>
                          {level.emoji} {level.name}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-slate-600">{level.desc}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${sevColor}`}>
                          {severity}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Expanded details */}
          <AnimatePresence>
            {loggingLevels.map((level, i) =>
              expandedLogging.has(i) ? (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${level.bg} ${level.color}`}>
                        {level.emoji} {level.name}
                      </span>
                      <span className="text-sm font-semibold text-slate-700">— Details</span>
                    </div>
                    <div className="text-sm text-slate-600 space-y-2">
                      <p><strong>Use case:</strong> {level.desc}</p>
                      {level.name === "DEBUG" && (
                        <p className="font-mono text-xs bg-white rounded-lg p-3 border border-slate-200">
                          logging.debug(f&quot;Variable x = {'{'}x{'}'}, config = {'{'}config{'}'}&quot;)
                        </p>
                      )}
                      {level.name === "INFO" && (
                        <p className="font-mono text-xs bg-white rounded-lg p-3 border border-slate-200">
                          logging.info(&quot;Model training started with 1000 samples&quot;)
                        </p>
                      )}
                      {level.name === "WARNING" && (
                        <p className="font-mono text-xs bg-white rounded-lg p-3 border border-slate-200">
                          logging.warning(&quot;GPU memory usage above 90% — consider batch size reduction&quot;)
                        </p>
                      )}
                      {level.name === "ERROR" && (
                        <p className="font-mono text-xs bg-white rounded-lg p-3 border border-slate-200">
                          logging.error(&quot;Failed to connect to database: timeout after 30s&quot;)
                        </p>
                      )}
                      {level.name === "CRITICAL" && (
                        <p className="font-mono text-xs bg-white rounded-lg p-3 border border-slate-200">
                          logging.critical(&quot;Out of memory — shutting down gracefully&quot;)
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </motion.section>

        {/* ═══ EDUCATIONAL CARDS ═══ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm p-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <Brain className="h-5 w-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-slate-800">Educational Cards</h2>
            <span className="text-xs text-slate-400">Click to expand</span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {educationalCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.08 }}
              >
                <button
                  onClick={() => setExpandedEdu(expandedEdu === i ? null : i)}
                  className={`w-full text-left bg-slate-50 rounded-xl border p-4 transition-all hover:shadow-md ${
                    expandedEdu === i ? "border-indigo-300 bg-indigo-50/40 shadow-md" : "border-slate-200 hover:border-indigo-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-500">{card.icon}</span>
                      <span className="text-sm font-semibold text-slate-700">{card.title}</span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                        expandedEdu === i ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {expandedEdu === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-2 bg-white rounded-xl border border-slate-200 p-4 shadow-sm overflow-hidden"
                    >
                      {card.content}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══ QUICK START ═══ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl border border-indigo-200 shadow-sm p-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <Play className="h-5 w-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-indigo-800">Quick Start Guide</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: "1", title: "Clone & Setup", desc: "Create project structure with src/ layout", icon: <FolderTree className="h-5 w-5" /> },
              { step: "2", title: "Install deps", desc: "Run `uv sync` to install packages", icon: <Zap className="h-5 w-5" /> },
              { step: "3", title: "Configure entry", desc: "Set up [project.scripts] in pyproject.toml", icon: <Settings className="h-5 w-5" /> },
              { step: "4", title: "Run & test", desc: "Execute `uv run chatbot` or `python main.py train`", icon: <TestTube className="h-5 w-5" /> },
            ].map((item, i) => (
              <div key={item.step} className="bg-white rounded-xl border border-indigo-100 p-4 text-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3 shadow-md">
                  {item.step}
                </div>
                <div className="text-indigo-500 flex justify-center mb-2">{item.icon}</div>
                <h3 className="font-semibold text-slate-800 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ═══ FOOTER ═══ */}
        <footer className="text-center py-8 border-t border-slate-200">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-md mb-3">
            <Brain className="h-3.5 w-3.5" />
            AI Crash Course — Logging Levels Recorded
          </div>
          <p className="text-xs text-slate-400">
            Built with Next.js, Tailwind CSS, Framer Motion & Lucide Icons
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-slate-300">
            <span className="text-xs">Graph</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-xs">Hello → Hi → Sasswot</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-xs">Chatbot</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-xs text-indigo-400 font-semibold">- new</span>
          </div>
        </footer>
      </div>
    </main>
  )
}
