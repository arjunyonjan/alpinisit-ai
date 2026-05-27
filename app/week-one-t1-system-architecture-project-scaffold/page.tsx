e client"
import React, { useState } from 'react';
import {
  Blocks,
  BrainCircuit,
  Building2,
  ChevronRight,
  Cpu,
  FolderTree,
  Layers3,
  Rocket,
  ShieldCheck,
  Wrench,
  Bot,
  Globe,
  Sparkles,
} from "lucide-react"

const uvSubskills = [
  "Install uv via pip or brew",
  "Initialize project with uv init",
  "Create virtual environment with uv venv",
  "Lock dependencies with uv lock",
  "Add dev dependencies via uv add --dev",
  "Configure Python version in pyproject.toml",
  "Set up uv run for script execution",
  "Integrate with CI using uv sync",
  "Cache dependencies in Docker layer",
  "Use uv tool install for global CLI tools"
]

const lowLevel = [
  "Setup uv project",
  "Create folder structure",
  "Configure env files",
  "Setup logging",
  "Create utility helpers",
  "Define API routes",
  "Setup provider clients",
  "Create config loader",
  "Add error handlers",
  "Run local testing",
]

const midLevel = [
  "Separate services and providers",
  "Build reusable modules",
  "Design async workflows",
  "Create unified schemas",
  "Add retry systems",
  "Implement streaming architecture",
  "Add structured validation",
  "Centralize configurations",
  "Build observability flows",
  "Prepare scalable architecture",
]

const highLevel = [
  "Multi provider AI orchestration",
  "Production AI system architecture",
  "Scalable async infrastructure",
  "Real time streaming systems",
  "Fault tolerant AI pipelines",
  "Distributed observability systems",
  "Structured AI data contracts",
  "Runtime provider switching",
  "Production deployment planning",
  "Enterprise AI engineering workflows",
]

function SectionCard({ title, description, items, icon: Icon, color }: any) {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const toggleItem = (idx: number) => {
    setOpenItems(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };
  return (
    <div className="group rounded-3xl border border-gray-200 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div className="mb-4 flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-3xl ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
          <p className="mt-1 text-gray-500">{description}</p>
        </div>
      </div>
      <div className="space-y-2">
                            {items.map((item: string, idx: number) => (
            <div key={item} className="rounded-2xl border border-gray-100 bg-[#fcfcfc]">
              <div className="flex items-center justify-between px-3 py-3 cursor-pointer hover:bg-blue-50/40" onClick={() => toggleItem(idx)}>
                <div className="flex items-center gap-3">
                  <ChevronRight className={`mt-0.5 h-5 w-5 text-blue-600 transition-transform ${openItems.includes(idx) ? "rotate-90" : ""}`} />
                  <p className="text-sm leading-6 text-gray-700">{item}</p>
                </div>
                {idx === 0 && title === "Low Level" && (
                  <div className="flex gap-2 mr-2" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={`https://chatgpt.com/?q=${encodeURIComponent("AI Engineering Training > System Architecture and Project Scaffold - " + item)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition"
                      title="Ask ChatGPT about this skill"
                    >
                      <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="ChatGPT" className="w-5 h-5" />
                    </a>
                    <a
                      href={`https://www.google.com/search?udm=50&q=${encodeURIComponent("AI Engineering Training > System Architecture and Project Scaffold - " + item)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition"
                      title="Search with Google AI"
                    >
                      <img src="https://cdn.simpleicons.org/googlegemini/4285F4" alt="Gemini" className="w-5 h-5" />
                    </a>
                    <a
                      href={`https://chat.deepseek.com/search?q=${encodeURIComponent("AI Engineering Training > System Architecture and Project Scaffold - " + item)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition"
                      title="Ask DeepSeek"
                    >
                      <img src="https://cdn.simpleicons.org/deepseek/5661F6" alt="DeepSeek" className="w-5 h-5" />
                    </a>
                  </div>
                )}
              </div>
              {openItems.includes(idx) && title === "Low Level" && idx === 0 && (
                <div className="px-3 pb-4 pl-10 space-y-2 border-t border-gray-100 mt-1">
                  {uvSubskills.map((sub: string, i: number) => {
                    const parentSkill = lowLevel[0];
                    const pageHeading = "System Architecture and Project Scaffold";
                    const fullContext = `AI Engineering Training > ${pageHeading} - ${parentSkill} - ${sub} - beginner friendly short and concise`;
                    return (
                      <div key={i} className="flex items-center justify-between text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2 hover:bg-white hover:shadow-sm transition">
                        <span className="flex items-center gap-2">
                          <span className="text-cyan-500">▹</span>
                          {sub}
                        </span>
                        <div className="flex gap-2">
                          <a
                            href={`https://chatgpt.com/?q=${encodeURIComponent(fullContext)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition"
                            title="Ask ChatGPT"
                          >
                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="ChatGPT" className="w-5 h-5" />
                          </a>
                          <a
                            href={`https://www.google.com/search?udm=50&q=${encodeURIComponent(fullContext)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition"
                            title="Search with Google AI"
                          >
                            <img src="https://cdn.simpleicons.org/googlegemini/4285F4" alt="Gemini" className="w-5 h-5" />
                          </a>
                          <a
                            href={`https://chat.deepseek.com/search?q=${encodeURIComponent(fullContext)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition"
                            title="Ask DeepSeek"
                          >
                            <img src="https://cdn.simpleicons.org/deepseek/5661F6" alt="DeepSeek" className="w-5 h-5" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default function T1Page() {
  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 overflow-hidden rounded-[40px] border border-gray-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <div className="relative p-7">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-100 blur-3xl" />
            <div className="relative z-10">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-blue-100 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-700">
                <Rocket className="h-4 w-4" />
                Week 1 — Task 1
              </div>
              <h1 className="max-w-5xl text-4xl font-black tracking-tight text-gray-900">System Architecture and Project Scaffold</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600">Learn how professional AI systems are structured from basic setup to scalable enterprise architecture using modular design async systems observability and production engineering practices.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <div className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700">AI Systems</div>
                <div className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700">Async Architecture</div>
                <div className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700">Observability</div>
                <div className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700">Production Engineering</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"><FolderTree className="mb-3 h-8 w-8 text-blue-600" /><h3 className="text-lg font-bold text-gray-900">Project Structure</h3><p className="mt-2 text-sm leading-6 text-gray-600">Organise scalable AI systems into reusable maintainable modules.</p></div>
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"><Cpu className="mb-3 h-8 w-8 text-violet-600" /><h3 className="text-lg font-bold text-gray-900">Async AI Systems</h3><p className="mt-2 text-sm leading-6 text-gray-600">Build concurrent AI workflows capable of handling real time loads.</p></div>
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"><ShieldCheck className="mb-3 h-8 w-8 text-emerald-600" /><h3 className="text-lg font-bold text-gray-900">Production Ready</h3><p className="mt-2 text-sm leading-6 text-gray-600">Add logging retries validation and scalable infrastructure planning.</p></div>
        </div>
        <div className="grid gap-5">
          <SectionCard title="Low Level" description="Foundational engineering setup and local development." items={lowLevel} icon={Wrench} color="bg-gradient-to-br from-blue-500 to-cyan-500" />
          <SectionCard title="Mid Level" description="Reusable architecture and scalable engineering patterns." items={midLevel} icon={Layers3} color="bg-gradient-to-br from-violet-500 to-purple-500" />
          <SectionCard title="High Level" description="Enterprise grade AI systems and production infrastructure." items={highLevel} icon={BrainCircuit} color="bg-gradient-to-br from-emerald-500 to-green-500" />
        </div>
        <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3"><Building2 className="h-6 w-6 text-blue-600" /><h3 className="text-2xl font-bold text-gray-900">AI Engineering Direction</h3></div>
              <p className="max-w-3xl leading-8 text-gray-600">Start with simple project scaffolding then evolve toward modular scalable observable enterprise AI systems incrementally.</p>
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg"><Blocks className="h-10 w-10" /></div>
          </div>
        </div>
      </div>
    </main>
  )
}