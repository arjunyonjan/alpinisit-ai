import {
  Activity,
  BookOpen,
  Bot,
  Braces,
  FileCode2,
  FolderTree,
  GitBranch,
  Globe,
  Layers3,
  Lock,
  Network,
  ShieldCheck,
  Terminal,
  Type,
  Zap,
} from "lucide-react"

const courseTopics = [
  {
    number: "1",
    title: "Async Await in Python",
    description:
      "Write non blocking code using Python async and await syntax so multiple API calls can run concurrently. This is critical for performant LLM applications that make many network and database operations simultaneously.",
    color: "from-blue-500 to-cyan-400",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: Zap,
  },

  {
    number: "2",
    title: "Pydantic Models and Validation",
    description:
      "Define structured schemas with Python type hints and automatically validate parse and serialize data safely. This is the standard approach for making AI outputs and API responses reliable and type safe.",
    color: "from-green-500 to-emerald-400",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    icon: ShieldCheck,
  },

  {
    number: "3",
    title: "HTTPX Async HTTP Clients",
    description:
      "Use HTTPX as a modern async alternative to requests. Supports retries connection pooling timeout handling and scalable communication with AI APIs and external services.",
    color: "from-violet-500 to-purple-400",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    icon: Globe,
  },

  {
    number: "4",
    title: "Environment Management",
    description:
      "Store configuration and secrets inside env files and load them safely during runtime. This allows different settings between local development staging and production environments.",
    color: "from-cyan-500 to-sky-400",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    icon: FileCode2,
  },

  {
    number: "5",
    title: "Secret Management",
    description:
      "Avoid hardcoding API keys inside source code because secrets can leak through git history and public repositories. Learn runtime secret injection and repository auditing practices.",
    color: "from-orange-500 to-amber-400",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    icon: Lock,
  },

  {
    number: "6",
    title: "Modular Code Structure",
    description:
      "Organise AI applications into separated concerns such as clients chains tools models and utilities. This allows each component to be tested replaced and reused independently.",
    color: "from-emerald-500 to-green-400",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    icon: Layers3,
  },

  {
    number: "7",
    title: "Git Branching and PR Etiquette",
    description:
      "Use feature branches meaningful commits and clear pull request descriptions. These workflows improve collaboration code review speed and engineering consistency.",
    color: "from-purple-500 to-fuchsia-400",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    icon: GitBranch,
  },

  {
    number: "8",
    title: "README Writing Standards",
    description:
      "Create high quality project documentation including architecture summaries setup instructions usage examples environment references and onboarding information.",
    color: "from-indigo-500 to-blue-400",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    icon: BookOpen,
  },

  {
    number: "9",
    title: "Env Example and Gitignore",
    description:
      "Use env example files to document required variables without exposing secrets. Configure gitignore properly to avoid committing caches credentials and build artefacts.",
    color: "from-pink-500 to-rose-400",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    icon: Braces,
  },

  {
    number: "10",
    title: "AI Project Folder Structure",
    description:
      "Adopt scalable folder layouts for source code tests prompts scripts and datasets. Consistent project structure reduces onboarding friction and improves maintainability.",
    color: "from-lime-500 to-green-400",
    iconBg: "bg-lime-100",
    iconColor: "text-lime-600",
    icon: FolderTree,
  },

  {
    number: "11",
    title: "Virtual Environments",
    description:
      "Isolate project dependencies using uv or venv so packages do not conflict across projects. This improves reproducibility portability and deployment stability.",
    color: "from-amber-500 to-yellow-400",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    icon: Terminal,
  },

  {
    number: "12",
    title: "Type Hints and Docstrings",
    description:
      "Annotate parameters return types and function intent using Python typing and docstrings. This improves editor tooling readability debugging and AI coding assistant support.",
    color: "from-sky-500 to-blue-400",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    icon: Type,
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] px-6 py-10">

      <div className="mx-auto max-w-7xl">

        <div className="mb-10 rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="mb-4 inline-flex items-center gap-3 rounded-full bg-black px-5 py-2 text-sm font-semibold text-white">

                <Bot className="h-5 w-5" />

                <span>
                  Alpinist Studio Nepal
                </span>

              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                Week 1 Python for AI Engineering
              </h1>

              <p className="mt-3 max-w-3xl text-lg leading-8 text-gray-600">
                Engineering hygiene and production foundations for scalable AI systems.
              </p>

            </div>

            <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-xl">

              <Network className="h-14 w-14" />

            </div>

          </div>

        </div>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {courseTopics.map((topic) => {
            const Icon = topic.icon

            return (
              <div
                key={topic.number}
                className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="mb-6 flex items-start justify-between">

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${topic.color} text-2xl font-bold text-white shadow-lg`}
                  >
                    {topic.number}
                  </div>

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${topic.iconBg} ${topic.iconColor}`}
                  >
                    <Icon className="h-9 w-9" />
                  </div>

                </div>

                <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
                  {topic.title}
                </h2>

                <p className="text-[15px] leading-8 text-gray-600">
                  {topic.description}
                </p>

              </div>
            )
          })}

        </section>

        <div className="mt-10 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-center gap-3 text-center">

            <Activity className="h-6 w-6 text-blue-600" />

            <p className="text-lg font-medium text-gray-700">
              Build clean secure scalable production ready AI engineering systems.
            </p>

          </div>

        </div>

      </div>

    </main>
  )
}
