"use client"
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
} from "lucide-react"

const lowLevelSkills = [
  {
    name: "Install Python and set up your editor",
    subskills: [
      "Download Python 3.11+ from python.org or use pyenv",
      "Verify installation with python --version in terminal",
      "Install VS Code or your preferred code editor",
      "Add Python and Pylance extensions to VS Code",
      "Configure your editor to use Python 3.11+ interpreter",
      "Test with a simple print(hello) script",
    ],
  },
  {
    name: "Create your project folder structure",
    subskills: [
      "Make a new folder named ai-chatbot-system",
      "Inside it create src tests prompts and scripts folders",
      "Add a README.md file with a project title",
      "Create a .gitignore file for Python projects",
      "Create an empty .env file for secrets later",
      "Create a pyproject.toml file for project metadata",
    ],
  },
  {
    name: "Set up a virtual environment with uv",
    subskills: [
      "Install uv with pip install uv or brew install uv",
      "Run uv venv inside your project to create a virtual env",
      "Activate the env with source .venv/bin/activate on Mac/Linux",
      "Or .venv/Scripts/activate on Windows",
      "Verify with which python to see the venv path",
      "Run uv pip install to add your first package",
    ],
  },
  {
    name: "Configure logging for your project",
    subskills: [
      "Import the built-in logging module in Python",
      "Create a setup_logging function in src/utils/logger.py",
      "Set log level to INFO for development",
      "Add format with timestamp level and message",
      "Test by logging info from your main script",
      "Learn the difference between debug info warning and error levels",
    ],
  },
  {
    name: "Create a configuration loader",
    subskills: [
      "Install python-dotenv with uv add python-dotenv",
      "Create a src/config/loader.py file",
      "Write a function that reads values from os.environ",
      "Add defaults so the app works without an .env file",
      "Create a .env.example showing what keys are needed",
      "Never commit the real .env file to git",
    ],
  },
  {
    name: "Define your first API route structure",
    subskills: [
      "Install FastAPI with uv add fastapi uvicorn",
      "Create src/api/routes.py with a simple GET endpoint",
      "Return a JSON response with a hello message",
      "Run the server with uvicorn and test in your browser",
      "Learn what a route handler does",
      "Add a second route that returns the current time",
    ],
  },
  {
    name: "Set up an async HTTP client",
    subskills: [
      "Install httpx with uv add httpx",
      "Create src/clients/http_client.py",
      "Write an async function that fetches a public API",
      "Use async with httpx.AsyncClient for connection pooling",
      "Add a 10 second timeout to your request",
      "Print the response status code and body",
    ],
  },
  {
    name: "Add error handling and retries",
    subskills: [
      "Wrap API calls in try/except blocks",
      "Catch httpx.HTTPError for network failures",
      "Add a simple retry loop with 3 attempts",
      "Add a 2 second sleep between retries",
      "Log each retry attempt so you can debug",
      "Return a meaningful error message on failure",
    ],
  },
  {
    name: "Initialize git and make your first commit",
    subskills: [
      "Run git init in your project root",
      "Run git add . to stage all files",
      "Run git commit -m with a clear message",
      "Check git log to see your commit history",
      "Create a .github/ folder for future workflows",
      "Learn what staging committing and branching mean",
    ],
  },
  {
    name: "Run local testing and verify setup",
    subskills: [
      "Create a tests/ folder with a test_main.py file",
      "Install pytest with uv add --dev pytest",
      "Write a simple test that checks 1 + 1 equals 2",
      "Run pytest and see it pass in green",
      "Add a test for your config loader defaults",
      "Run uv run pytest to test inside the virtual env",
    ],
  },
]

const midLevelSkills = [
  {
    name: "Separate services from providers",
    subskills: [
      "Create src/services/ and src/providers/ folders",
      "Move HTTP client code into a provider file",
      "Create a service that uses the provider",
      "Understand that services contain business logic",
      "Understand that providers handle external API calls",
      "Write a service method that calls the provider",
    ],
  },
  {
    name: "Build reusable response schemas with Pydantic",
    subskills: [
      "Install pydantic with uv add pydantic",
      "Create src/schemas/responses.py",
      "Define a ChatResponse model with message and status fields",
      "Use the model to validate API responses",
      "Add type hints for all fields in your model",
      "Test that invalid data raises a ValidationError",
    ],
  },
  {
    name: "Design async task workflows",
    subskills: [
      "Learn what asyncio.create_task does",
      "Write two async functions that simulate work",
      "Run both concurrently with asyncio.gather",
      "Measure how much faster concurrent vs sequential is",
      "Add a task timeout with asyncio.wait_for",
      "Handle the case when one task fails and another succeeds",
    ],
  },
  {
    name: "Create a unified request and response format",
    subskills: [
      "Define a ChatRequest schema with prompt and model fields",
      "Define a ChatResponse schema with answer and tokens_used",
      "Use the same schemas across all providers",
      "Add optional fields with default values",
      "Validate incoming requests before processing",
      "Document what each field means in a docstring",
    ],
  },
  {
    name: "Implement a retry system with exponential backoff",
    subskills: [
      "Create a retry decorator or utility function",
      "Start with a 1 second delay between retries",
      "Double the delay after each failed attempt",
      "Set a maximum retry count of 3",
      "Add jitter so retries do not all happen at once",
      "Log each retry with the delay time and attempt number",
    ],
  },
  {
    name: "Build a streaming response pipeline",
    subskills: [
      "Learn what async generators are in Python",
      "Create a function that yields chunks of text",
      "Use yield in an async function for streaming",
      "Connect it to an LLM streaming API endpoint",
      "Print each chunk as it arrives in real time",
      "Handle the case when the stream disconnects early",
    ],
  },
  {
    name: "Add structured input validation",
    subskills: [
      "Use Pydantic validators with the validator decorator",
      "Check that prompt is not empty or too long",
      "Validate that model name is in an allowed list",
      "Return clear error messages for each validation failure",
      "Add field descriptions for auto-generated docs",
      "Write tests that confirm validation catches bad input",
    ],
  },
  {
    name: "Centralize configuration management",
    subskills: [
      "Create a src/config/settings.py with a Settings class",
      "Use pydantic.BaseSettings to load from environment",
      "Define all config keys in one place",
      "Add type hints and defaults for every setting",
      "Create different configs for dev staging and prod",
      "Validate that all required keys are present at startup",
    ],
  },
  {
    name: "Build observability with structured logging",
    subskills: [
      "Log in JSON format instead of plain text",
      "Include request_id timestamp and level in every log",
      "Log the duration of each API call",
      "Add metrics for success rate and error count",
      "Create a health check endpoint that returns system status",
      "Learn what an observability dashboard shows",
    ],
  },
  {
    name: "Prepare a scalable project architecture",
    subskills: [
      "Draw a diagram of how services connect",
      "Document which modules depend on which",
      "Ensure no circular dependencies between modules",
      "Create an architecture decision record ADR file",
      "Review folder structure and rename if needed",
      "Write a CONTRIBUTING.md for future team members",
    ],
  },
]

const highLevelSkills = [
  {
    name: "Multi-provider AI orchestration",
    subskills: [
      "Understand what a provider abstraction pattern is",
      "Create a base AIProvider interface class",
      "Implement GroqProvider that inherits from AIProvider",
      "Implement OllamaProvider that also inherits from AIProvider",
      "Write a router that picks which provider to use",
      "Test that switching providers gives the same response format",
    ],
  },
  {
    name: "Production AI system architecture",
    subskills: [
      "Design the full system with API gateway services and providers",
      "Add a message queue for async task processing",
      "Plan database schema for storing conversations",
      "Add rate limiting to protect against abuse",
      "Design a caching layer for common queries",
      "Document the complete architecture diagram",
    ],
  },
  {
    name: "Scalable async infrastructure",
    subskills: [
      "Learn about connection pooling for HTTP clients",
      "Implement a worker pool for concurrent tasks",
      "Use asyncio.Semaphore to limit parallel requests",
      "Add request queuing for when the system is overloaded",
      "Monitor queue depth and alert when it grows too large",
      "Load test with 100 concurrent requests using a test script",
    ],
  },
  {
    name: "Real-time streaming systems",
    subskills: [
      "Implement Server-Sent Events SSE for browser streaming",
      "Handle partial stream reconstruction on disconnect",
      "Add heartbeats to detect dead connections",
      "Buffer and batch stream chunks for efficiency",
      "Measure time to first token and total stream duration",
      "Add a progress indicator for long streams",
    ],
  },
  {
    name: "Fault-tolerant AI pipelines",
    subskills: [
      "Implement circuit breaker pattern for failing providers",
      "Add automatic failover to a backup provider",
      "Create a dead letter queue for failed requests",
      "Design graceful degradation when all providers are down",
      "Add health checks for each external dependency",
      "Write a post-mortem template for production incidents",
    ],
  },
  {
    name: "Distributed observability systems",
    subskills: [
      "Add distributed tracing with unique request IDs",
      "Export metrics to Prometheus or a similar system",
      "Create dashboards for latency error rate and throughput",
      "Set up alerts for error rate above a threshold",
      "Implement log aggregation with structured formatting",
      "Build a runbook for common production issues",
    ],
  },
  {
    name: "Structured AI data contracts",
    subskills: [
      "Define strict JSON schemas for all API inputs and outputs",
      "Add schema versioning for backward compatibility",
      "Implement schema validation at API boundaries",
      "Create migration scripts for schema changes",
      "Document all data contracts in a shared location",
      "Add contract tests that verify provider compliance",
    ],
  },
  {
    name: "Runtime provider switching",
    subskills: [
      "Build a provider registry that tracks available providers",
      "Implement health checks to detect provider outages",
      "Add automatic switching based on latency or error rate",
      "Create a manual override for forcing a specific provider",
      "Log every provider switch with the reason",
      "Test switching under load with a simulation script",
    ],
  },
  {
    name: "Production deployment planning",
    subskills: [
      "Write a Dockerfile for containerizing the application",
      "Create docker-compose for local full-stack testing",
      "Set up CI/CD pipeline with GitHub Actions",
      "Add automated tests to the pipeline before deploying",
      "Plan blue-green or rolling deployment strategy",
      "Create a rollback plan for when deployments fail",
    ],
  },
  {
    name: "Enterprise AI engineering workflows",
    subskills: [
      "Implement access control and API key management",
      "Add audit logging for compliance requirements",
      "Set up code review standards and PR templates",
      "Create onboarding documentation for new engineers",
      "Establish SLA targets for latency and availability",
      "Build a feedback loop for continuous improvement",
    ],
  },
]

function buildSearchContext(pageHeading: string, skill: string, subskill: string) {
  return `AI Engineering Training > ${pageHeading} - ${skill} - ${subskill} - beginner friendly short and concise`;
}

function SkillLinks({ context }: { context: string }) {
  return (
    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
      <a href={`https://chatgpt.com/?q=${encodeURIComponent(context)}`} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition" title="Ask ChatGPT">
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="ChatGPT" className="w-5 h-5" />
      </a>
      <a href={`https://www.google.com/search?udm=50&q=${encodeURIComponent(context)}`} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition" title="Search with Google AI">
        <img src="https://cdn.simpleicons.org/googlegemini/4285F4" alt="Gemini" className="w-5 h-5" />
      </a>
      <a href={`https://chat.deepseek.com/search?q=${encodeURIComponent(context)}`} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition" title="Ask DeepSeek">
        <img src="https://cdn.simpleicons.org/deepseek/5661F6" alt="DeepSeek" className="w-5 h-5" />
      </a>
    </div>
  );
}

function SectionCard({ title, description, skills, icon: Icon, color }: {
  title: string;
  description: string;
  skills: { name: string; subskills: string[] }[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const toggleItem = (idx: number) => {
    setOpenItems(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const pageHeading = "System Architecture and Project Scaffold";

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
        {skills.map((item, idx) => (
          <div key={item.name} className="rounded-2xl border border-gray-100 bg-[#fcfcfc]">
            <div
              className="flex items-center justify-between px-3 py-3 cursor-pointer hover:bg-blue-50/40"
              onClick={() => toggleItem(idx)}
            >
              <div className="flex items-center gap-3">
                <ChevronRight className={`mt-0.5 h-5 w-5 text-blue-600 transition-transform ${openItems.includes(idx) ? "rotate-90" : ""}`} />
                <p className="text-sm leading-6 text-gray-700">{item.name}</p>
              </div>
              <SkillLinks context={buildSearchContext(pageHeading, title + " - " + item.name, "overview")} />
            </div>
            {openItems.includes(idx) && (
              <div className="px-3 pb-4 pl-10 space-y-2 border-t border-gray-100 mt-1">
                {item.subskills.map((sub: string, i: number) => {
                  const context = buildSearchContext(pageHeading, title + " - " + item.name, sub);
                  return (
                    <div key={i} className="flex items-center justify-between text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2 hover:bg-white hover:shadow-sm transition">
                      <span className="flex items-center gap-2">
                        <span className="text-cyan-500">▹</span>
                        {sub}
                      </span>
                      <SkillLinks context={context} />
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
          <SectionCard
            title="Low Level"
            description="Foundational engineering setup and local development."
            skills={lowLevelSkills}
            icon={Wrench}
            color="bg-gradient-to-br from-blue-500 to-cyan-500"
          />
          <SectionCard
            title="Mid Level"
            description="Reusable architecture and scalable engineering patterns."
            skills={midLevelSkills}
            icon={Layers3}
            color="bg-gradient-to-br from-violet-500 to-purple-500"
          />
          <SectionCard
            title="High Level"
            description="Enterprise grade AI systems and production infrastructure."
            skills={highLevelSkills}
            icon={BrainCircuit}
            color="bg-gradient-to-br from-emerald-500 to-green-500"
          />
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
  );
}
