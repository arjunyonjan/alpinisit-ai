// ============================================================
// LOW LEVEL SKILLS (10) + their 10 subskills each
// ============================================================

export const lowLevelSkills = [
  {
    name: "Setup uv project",
    subskills: [
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
  },
  {
    name: "Create folder structure",
    subskills: [
      "src/ for package code, tests/ for unit tests",
      "scripts/ for utility scripts",
      "prompts/ for LLM prompt templates",
      "config/ for YAML/JSON settings",
      "data/ for sample inputs/outputs",
      "notebooks/ for exploration",
      ".github/workflows/ for CI/CD",
      "docs/ for architecture and API docs",
      "logs/ for runtime logs (gitignored)",
      "local/ for dev-only scripts (gitignored)"
    ]
  },
  {
    name: "Configure env files",
    subskills: [
      ".env.example with dummy values (committed)",
      ".env for local secrets (gitignored)",
      ".env.test for test environment",
      ".env.production for deployment",
      "Use python-dotenv to load automatically",
      "Prefix variables with APP_ for namespacing",
      "Validate required vars on startup",
      "Load different files per ENVIRONMENT var",
      "Use pydantic-settings for type casting",
      "Never commit real secrets"
    ]
  },
  {
    name: "Setup logging",
    subskills: [
      "Use loguru for simpler API",
      "Rotate logs daily with retention policy",
      "JSON format for structured logging",
      "Log to both console and file",
      "Add request ID to every log line",
      "Set levels via env var (LOG_LEVEL)",
      "Capture exceptions with full traceback",
      "Log token usage and latency per LLM call",
      "Redact sensitive keys in logs",
      "Send critical logs to Sentry/Webhook"
    ]
  },
  {
    name: "Create utility helpers",
    subskills: [
      "retry_async() decorator with exponential backoff",
      "timeit() context manager for performance",
      "safe_parse_json() for LLM malformed responses",
      "truncate_text() for token limit safety",
      "hash_string() for caching keys",
      "format_prompt() for template substitution",
      "extract_code_blocks() from markdown",
      "batch_iterator() for chunked processing",
      "slugify() for URL-friendly IDs",
      "unique_id() for request tracing"
    ]
  },
  {
    name: "Define API routes",
    subskills: [
      "Use /v1/chat/completions style",
      "Separate routes: /providers, /models, /completions, /stream",
      "Add health check at /health",
      "Readiness probe at /ready",
      "Metrics endpoint at /metrics",
      "Version endpoint at /version",
      "Document routes with OpenAPI/Swagger",
      "Use path params for resource-specific routes",
      "Implement rate limits per route group",
      "Prefix internal routes with /internal"
    ]
  },
  {
    name: "Setup provider clients",
    subskills: [
      "Abstract BaseLLMClient with generate()",
      "OpenAI client with async streaming",
      "Anthropic client with Claude-specific headers",
      "Groq client for fast inference",
      "Together.ai client for open models",
      "Ollama client for local models",
      "Azure OpenAI with endpoint suffix",
      "Google Gemini with vertex/studio",
      "Cohere client for embeddings",
      "Fallback client that chains providers"
    ]
  },
  {
    name: "Create config loader",
    subskills: [
      "Load from env first (override priority)",
      "Load from YAML second (defaults)",
      "Merge with code defaults",
      "Use pydantic.BaseSettings for validation",
      "Support nested config sections",
      "Hot reload config on file change (dev mode)",
      "Secret resolution from AWS Secrets Manager",
      "Config versioning for migrations",
      "Validate config on startup",
      "Expose config via get_settings() singleton"
    ]
  },
  {
    name: "Add error handlers",
    subskills: [
      "Catch httpx.TimeoutException → retry",
      "Catch RateLimitError → exponential backoff",
      "Catch AuthenticationError → alert + abort",
      "Catch ValidationError → return 400 with details",
      "Catch generic Exception → log + return 500",
      "Custom LLMProviderError with provider context",
      "ContextLengthExceededError → truncate",
      "MalformedResponseError → repair + warn",
      "CircuitBreakerOpenError → fallback provider",
      "MaxRetriesExceededError → dead letter queue"
    ]
  },
  {
    name: "Run local testing",
    subskills: [
      "pytest with pytest-asyncio for async tests",
      "Mock LLM responses with respx",
      "Use pytest-env for test env vars",
      "Fixture for test client with in-memory storage",
      "Snapshot testing for LLM prompts",
      "Load testing with locust or k6",
      "Coverage threshold 80% minimum",
      "Run tests in parallel with pytest-xdist",
      "Use pytest-cov for HTML reports",
      "Pre-commit hooks for lint + test"
    ]
  }
];

// ============================================================
// MID LEVEL SKILLS (10) + placeholder subskills
// ============================================================

export const midLevelSkills = [
  {
    name: "Separate services and providers",
    subskills: Array.from({ length: 10 }, (_, i) => `Subskill ${i+1} for Separate services and providers`)
  },
  {
    name: "Build reusable modules",
    subskills: Array.from({ length: 10 }, (_, i) => `Subskill ${i+1} for Build reusable modules`)
  },
  {
    name: "Design async workflows",
    subskills: Array.from({ length: 10 }, (_, i) => `Subskill ${i+1} for Design async workflows`)
  },
  {
    name: "Create unified schemas",
    subskills: Array.from({ length: 10 }, (_, i) => `Subskill ${i+1} for Create unified schemas`)
  },
  {
    name: "Add retry systems",
    subskills: Array.from({ length: 10 }, (_, i) => `Subskill ${i+1} for Add retry systems`)
  },
  {
    name: "Implement streaming architecture",
    subskills: Array.from({ length: 10 }, (_, i) => `Subskill ${i+1} for Implement streaming architecture`)
  },
  {
    name: "Add structured validation",
    subskills: Array.from({ length: 10 }, (_, i) => `Subskill ${i+1} for Add structured validation`)
  },
  {
    name: "Centralize configurations",
    subskills: Array.from({ length: 10 }, (_, i) => `Subskill ${i+1} for Centralize configurations`)
  },
  {
    name: "Build observability flows",
    subskills: Array.from({ length: 10 }, (_, i) => `Subskill ${i+1} for Build observability flows`)
  },
  {
    name: "Prepare scalable architecture",
    subskills: Array.from({ length: 10 }, (_, i) => `Subskill ${i+1} for Prepare scalable architecture`)
  }
];

// ============================================================
// HIGH LEVEL SKILLS (10) + placeholder subskills
// ============================================================

export const highLevelSkills = [
  {
    name: "Multi provider AI orchestration",
    subskills: Array.from({ length: 10 }, (_, i) => `Subskill ${i+1} for Multi provider AI orchestration`)
  },
  {
    name: "Production AI system architecture",
    subskills: Array.from({ length: 10 }, (_, i) => `Subskill ${i+1} for Production AI system architecture`)
  },
  {
    name: "Scalable async infrastructure",
    subskills: Array.from({ length: 10 }, (_, i) => `Subskill ${i+1} for Scalable async infrastructure`)
  },
  {
    name: "Real time streaming systems",
    subskills: Array.from({ length: 10 }, (_, i) => `Subskill ${i+1} for Real time streaming systems`)
  },
  {
    name: "Fault tolerant AI pipelines",
    subskills: Array.from({ length: 10 }, (_, i) => `Subskill ${i+1} for Fault tolerant AI pipelines`)
  },
  {
    name: "Distributed observability systems",
    subskills: Array.from({ length: 10 }, (_, i) => `Subskill ${i+1} for Distributed observability systems`)
  },
  {
    name: "Structured AI data contracts",
    subskills: Array.from({ length: 10 }, (_, i) => `Subskill ${i+1} for Structured AI data contracts`)
  },
  {
    name: "Runtime provider switching",
    subskills: Array.from({ length: 10 }, (_, i) => `Subskill ${i+1} for Runtime provider switching`)
  },
  {
    name: "Production deployment planning",
    subskills: Array.from({ length: 10 }, (_, i) => `Subskill ${i+1} for Production deployment planning`)
  },
  {
    name: "Enterprise AI engineering workflows",
    subskills: Array.from({ length: 10 }, (_, i) => `Subskill ${i+1} for Enterprise AI engineering workflows`)
  }
];