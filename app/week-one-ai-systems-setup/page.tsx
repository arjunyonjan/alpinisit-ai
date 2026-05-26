import {
  Activity,
  Bot,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  FileCode2,
  Layers3,
  Network,
  ShieldCheck,
  Terminal,
  Workflow,
} from "lucide-react"

const topics = [
  "Role of an AI Engineer and end to end AI system lifecycle",
  "Python for building scalable AI applications",
  "Asynchronous programming for concurrent LLM workloads",
  "REST APIs and streaming APIs for real time AI applications",
  "Designing modular production ready AI architecture",
  "Environment setup and dependency management using uv",
  "HTTP client fundamentals using httpx",
  "Logging strategies for observability and debugging",
  "Configuration management using env variables",
  "Data validation using Pydantic schemas",
  "Tokenization fundamentals and LLM text processing",
  "Debugging workflows for AI applications and APIs",
]

const tasks = [
  {
    title: "T1 System Architecture and Project Scaffold",
    icon: Layers3,
    items: [
      "Design AI system architecture diagram",
      "Setup project structure using uv",
      "Configure env logging and config loader",
      "Define module boundaries",
    ],
  },

  {
    title: "T2 Multi Provider Async API Layer",
    icon: Network,
    items: [
      "Build async client using httpx",
      "Support Groq Gemini and Ollama",
      "Unified request and response schema",
      "Handle retries and timeouts",
    ],
  },

  {
    title: "T3 Streaming and Async Execution",
    icon: Activity,
    items: [
      "Implement streaming LLM responses",
      "Async token streaming pipeline",
      "Measure latency and token timing",
      "Handle partial stream failures",
    ],
  },

  {
    title: "T4 Structured Data and Validation",
    icon: ShieldCheck,
    items: [
      "Implement Pydantic schemas",
      "Validate outputs strictly",
      "Recover malformed JSON",
      "Enforce structured contracts",
    ],
  },

  {
    title: "T5 Observability and Debugging",
    icon: Cpu,
    items: [
      "Build structured logging system",
      "Add request tracing and metrics",
      "Simulate API failures",
      "Runtime provider switching",
    ],
  },
]

export default function WeekOnePage() {
  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-10">

      <div className="mx-auto max-w-7xl">

        <div className="mb-10 rounded-[32px] border border-gray-200 bg-white p-10 shadow-sm">

          <div className="mb-5 flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg">

              <Bot className="h-8 w-8" />

            </div>

            <div>

              <h1 className="text-5xl font-black tracking-tight text-gray-900">
                Week 1
              </h1>

              <p className="mt-1 text-xl text-blue-600">
                AI Systems and Engineering Setup
              </p>

            </div>

          </div>

          <p className="max-w-4xl text-lg leading-8 text-gray-600">
            Foundations for production ready AI engineering systems including
            async APIs architecture validation observability debugging and
            multi provider LLM integration.
          </p>

        </div>

        <div className="mb-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
              Planning
            </div>

            <div className="text-2xl font-bold text-gray-900">
              Monday
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
              Learning and Implementation
            </div>

            <div className="text-2xl font-bold text-gray-900">
              Tuesday to Thursday
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
              Preparation and Demo
            </div>

            <div className="text-2xl font-bold text-gray-900">
              Friday
            </div>
          </div>

        </div>

        <div className="mb-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

          <div className="mb-6 flex items-center gap-3">

            <BookIcon />

            <h2 className="text-3xl font-bold text-gray-900">
              Topics
            </h2>

          </div>

          <div className="grid gap-4 md:grid-cols-2">

            {topics.map((topic) => (
              <div
                key={topic}
                className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4"
              >

                <CheckCircle2 className="mt-1 h-5 w-5 text-blue-600" />

                <p className="text-gray-700">
                  {topic}
                </p>

              </div>
            ))}

          </div>

        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

          <div className="mb-8 flex items-center gap-3">

            <Workflow className="h-8 w-8 text-violet-600" />

            <h2 className="text-3xl font-bold text-gray-900">
              Team Tasks
            </h2>

          </div>

          <div className="grid gap-6 lg:grid-cols-2">

            {tasks.map((task) => {
              const Icon = task.icon

              return (
                <div
                  key={task.title}
                  className="rounded-3xl border border-gray-200 bg-[#fcfcfc] p-6"
                >

                  <div className="mb-5 flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">

                      <Icon className="h-7 w-7" />

                    </div>

                    <h3 className="text-2xl font-bold text-gray-900">
                      {task.title}
                    </h3>

                  </div>

                  <div className="space-y-3">

                    {task.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3"
                      >

                        <div className="mt-2 h-2 w-2 rounded-full bg-blue-600" />

                        <p className="text-gray-700">
                          {item}
                        </p>

                      </div>
                    ))}

                  </div>

                </div>
              )
            })}

          </div>

        </div>

      </div>

    </div></main>
  )
}

function BookIcon() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
      <FileCode2 className="h-6 w-6" />
    </div>
  )
}
