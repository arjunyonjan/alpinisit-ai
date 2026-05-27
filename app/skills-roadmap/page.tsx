"use client";
import { useState } from "react";
import { ChevronDown, ChevronRight, Circle } from "lucide-react";

const fullSkillsData = {
  low: {
    title: "Low Level — Foundational Engineering",
    skills: [
      { name: "Setup uv project", subskills: ["Install uv via pip or brew", "Initialize project with 'uv init'", "Create virtual environment with 'uv venv'", "Lock dependencies with 'uv lock'", "Add dev dependencies via 'uv add --dev'", "Configure Python version in pyproject.toml", "Set up 'uv run' for script execution", "Integrate with CI using 'uv sync'", "Cache dependencies in Docker layer", "Use 'uv tool install' for global CLI tools"] },
      { name: "Create folder structure", subskills: ["src/ for package code, tests/ for unit tests", "scripts/ for utility scripts", "prompts/ for LLM prompt templates", "config/ for YAML/JSON settings", "data/ for sample inputs/outputs", "notebooks/ for exploration", ".github/workflows/ for CI/CD", "docs/ for architecture and API docs", "logs/ for runtime logs (gitignored)", "local/ for dev-only scripts (gitignored)"] },
      { name: "Configure env files", subskills: [".env.example with dummy values (committed)", ".env for local secrets (gitignored)", ".env.test for test environment", ".env.production for deployment", "Use python-dotenv to load automatically", "Prefix variables with APP_ for namespacing", "Validate required vars on startup", "Load different files per ENVIRONMENT var", "Use pydantic-settings for type casting", "Never commit real secrets"] },
      { name: "Setup logging", subskills: ["Use loguru for simpler API", "Rotate logs daily with retention policy", "JSON format for structured logging", "Log to both console and file", "Add request ID to every log line", "Set levels via env var (LOG_LEVEL)", "Capture exceptions with full traceback", "Log token usage and latency per LLM call", "Redact sensitive keys in logs", "Send critical logs to Sentry/Webhook"] },
      { name: "Create utility helpers", subskills: ["retry_async() decorator with exponential backoff", "timeit() context manager for performance", "safe_parse_json() for LLM malformed responses", "truncate_text() for token limit safety", "hash_string() for caching keys", "format_prompt() for template substitution", "extract_code_blocks() from markdown", "batch_iterator() for chunked processing", "slugify() for URL-friendly IDs", "unique_id() for request tracing"] },
      { name: "Define API routes", subskills: ["Use /v1/chat/completions style", "Separate routes: /providers, /models, /completions, /stream", "Add health check at /health", "Readiness probe at /ready", "Metrics endpoint at /metrics", "Version endpoint at /version", "Document routes with OpenAPI/Swagger", "Use path params for resource-specific routes", "Implement rate limits per route group", "Prefix internal routes with /internal"] },
      { name: "Setup provider clients", subskills: ["Abstract BaseLLMClient with generate()", "OpenAI client with async streaming", "Anthropic client with Claude-specific headers", "Groq client for fast inference", "Together.ai client for open models", "Ollama client for local models", "Azure OpenAI with endpoint suffix", "Google Gemini with vertex/studio", "Cohere client for embeddings", "Fallback client that chains providers"] },
      { name: "Create config loader", subskills: ["Load from env first (override priority)", "Load from YAML second (defaults)", "Merge with code defaults", "Use pydantic.BaseSettings for validation", "Support nested config sections", "Hot reload config on file change (dev mode)", "Secret resolution from AWS Secrets Manager", "Config versioning for migrations", "Validate config on startup", "Expose config via get_settings() singleton"] },
      { name: "Add error handlers", subskills: ["Catch httpx.TimeoutException → retry", "Catch RateLimitError → exponential backoff", "Catch AuthenticationError → alert + abort", "Catch ValidationError → return 400 with details", "Catch generic Exception → log + return 500", "Custom LLMProviderError with provider context", "ContextLengthExceededError → truncate", "MalformedResponseError → repair + warn", "CircuitBreakerOpenError → fallback provider", "MaxRetriesExceededError → dead letter queue"] },
      { name: "Run local testing", subskills: ["pytest with pytest-asyncio for async tests", "Mock LLM responses with respx", "Use pytest-env for test env vars", "Fixture for test client with in-memory storage", "Snapshot testing for LLM prompts", "Load testing with locust or k6", "Coverage threshold 80% minimum", "Run tests in parallel with pytest-xdist", "Use pytest-cov for HTML reports", "Pre-commit hooks for lint + test"] }
    ]
  },
  mid: {
    title: "Mid Level — Scalable Architecture",
    skills: [
      { name: "Separate services and providers", subskills: ["Business logic isolated from API/UI", "Each provider in its own module", "Service layer calls providers", "Dependency injection for testing", "Clear interface boundaries", "No direct HTTP in services", "Services return domain objects", "Providers handle raw responses", "Middleware for cross-cutting concerns", "DTOs between layers"] },
      { name: "Build reusable modules", subskills: ["Each module has own API, models, tests", "Modules expose __init__.py facade", "Internal functions prefixed with _", "Module-level logging", "Configuration injected from parent", "Modules can be disabled via flag", "Versioned module APIs", "Plugins for optional modules", "Shared types in common/ module", "Circular import protection"] },
      { name: "Design async workflows", subskills: ["Use asyncio.gather for parallel LLM calls", "Semaphores for concurrency limits", "Task timeouts with asyncio.wait_for", "Background tasks with create_task", "Graceful shutdown of pending tasks", "Async queue for producer-consumer", "Rate-limit with async semaphore", "Retry with async decorator", "Chain async steps with await", "Monitor pending tasks with all_tasks()"] },
      { name: "Create unified schemas", subskills: ["Base LLMRequest with provider-agnostic fields", "Base LLMResponse with token usage", "Validation with Pydantic after every provider", "Standard error schema for all APIs", "Versioned schemas with Field(deprecated=...)", "Serialization to JSON for logging", "Deserialization from raw provider responses", "Schema evolution with model_construct", "OpenAPI generation from schemas", "Runtime type checking with isinstance"] },
      { name: "Add retry systems", subskills: ["tenacity retry decorator on async functions", "Exponential backoff (1s, 2s, 4s)", "Jitter to avoid thundering herd", "Retry only on specific exceptions", "Max retries configurable per operation", "Circuit breaker after N failures", "Half-open state for recovery", "Retry with different provider", "Log each retry attempt with reason", "Metrics on retry count"] },
      { name: "Implement streaming architecture", subskills: ["Generator functions yielding chunks", "SSE (Server-Sent Events) for frontend", "Stream to WebSocket for bidirectional", "Buffer accumulation for partial JSON", "Stream timeout after idle period", "Cancel stream on client disconnect", "Forward stream from provider without buffering", "Chunk size limiting for memory", "Stream to multiple subscribers", "Fallback to non-stream on error"] },
      { name: "Add structured validation", subskills: ["Validate input before any processing", "Validate output from provider", "JSON Schema enforcement with jsonschema", "Custom validators in Pydantic", "Reject malformed responses early", "Auto-repair common malformations", "Validation error -> user-friendly message", "Validation metrics per endpoint", "Skip validation in high-throughput paths", "Validation rules versioned"] },
      { name: "Centralize configurations", subskills: ["Single config.yaml + env overrides", "pydantic-settings for type safety", "Nested config sections (e.g., providers.openai)", "Config reload on SIGHUP", "Validate config at startup, fail fast", "Expose config via /config endpoint (protected)", "Config version in response headers", "Secrets referenced but not logged", "Default config for local dev", "Config for A/B experiments"] },
      { name: "Build observability flows", subskills: ["Request ID generated on ingress", "Trace propagated to provider calls", "Log structured with request ID", "Metrics for latency, tokens, errors", "OpenTelemetry spans for each step", "Export to Jaeger/Tempo", "Dashboard for token usage per provider", "Alert on high error rate", "Slow request detection", "Cost estimation per request"] },
      { name: "Prepare scalable architecture", subskills: ["Stateless services (no local cache)", "Session store in Redis", "Rate limiting using Redis sliding window", "Queue for long tasks (Redis / RabbitMQ)", "Database for audit logs only", "Separate read and write endpoints", "Horizontal scaling with load balancer", "Health checks for graceful draining", "Zero-downtime deployment", "Canary releases for new versions"] }
    ]
  },
  high: {
    title: "High Level — Enterprise AI Engineering",
    skills: [
      { name: "Multi provider AI orchestration", subskills: ["Route to best model per task type", "Provider registry with priority", "Weighted round-robin for load", "Latency-aware routing", "Cost-aware routing (per-token price)", "Fallback chain on failure", "A/B testing between providers", "Provider isolation for tenants", "Real-time provider health checks", "Configurable routing rules via API"] },
      { name: "Production AI system architecture", subskills: ["Load balancer in front of API pods", "API gateway for auth / rate limiting", "Cache layer for identical prompts", "Message queue for async tasks", "Database for audit + metadata", "Object storage for large prompts", "CDN for static model outputs", "Separate training vs inference infra", "Multi-region active-active", "Disaster recovery plan with RTO < 1h"] },
      { name: "Scalable async infrastructure", subskills: ["Kafka / RabbitMQ for event-driven pipeline", "Consumer groups for parallelism", "Dead letter queue for failed tasks", "Idempotent consumers (process once)", "Backpressure with queue size limits", "Auto-scaling consumers on queue depth", "Async jobs with celery + Redis", "Job status via /jobs/{id} endpoint", "Retry failed jobs with backoff", "Job timeout + cancellation"] },
      { name: "Real time streaming systems", subskills: ["WebSocket connection per user", "STTP (Server-To-Token) authentication", "Reconnection with backoff", "Stream recovery from last chunk", "Buffer for offline users (optional)", "Multi-tenant stream isolation", "Broadcast to multiple clients", "Stream compression for mobile", "Throttle stream to avoid overwhelm", "Monitor active streams per user"] },
      { name: "Fault tolerant AI pipelines", subskills: ["Retry with exponential backoff", "Circuit breaker per provider", "Fallback to secondary provider", "Retry with different prompt", "Partial response on error (best-effort)", "Checkpoint pipeline stages", "Dead letter queue for final failures", "Alert on repeated failures", "Auto scale on error rate", "Chaos testing for pipeline"] },
      { name: "Distributed observability systems", subskills: ["OpenTelemetry collector in sidecar", "Traces across API → Provider → DB", "Logs with correlation ID", "Metrics with Prometheus (latency, error, tokens)", "Grafana dashboards per team", "Alertmanager for SLI breaches", "Distributed tracing with Jaeger", "Log aggregation with Loki", "Cost breakdown per customer / feature", "SLO dashboards (99.9% uptime)"] },
      { name: "Structured AI data contracts", subskills: ["Define contract in Protobuf / JSON Schema", "Contract version in request header", "Schema registry for validation", "Breaking change detection in CI", "Backward-compatible evolution", "Generate client SDK from contract", "Mock providers from contract", "Contract testing for each provider", "Validate responses at edge gateway", "Contract metrics (version adoption)"] },
      { name: "Runtime provider switching", subskills: ["Provider selected per request (not global)", "Switch via X-Provider header", "Feature flag for gradual rollout", "Provider config hot reload", "Dry run mode for new provider", "Shadow traffic to compare responses", "A/B testing with random split", "Provider per user / tenant", "Fallback if provider fails", "Log switching decisions"] },
      { name: "Production deployment planning", subskills: ["Blue-green deployments for zero downtime", "Canary releases (5% → 50% → 100%)", "Feature flags for progressive rollouts", "Rollback in < 1 minute", "Pre-deployment smoke tests", "Post-deployment canary checks", "Database migrations before code deploy", "Schema backward compatibility", "Secrets rotation on deploy", "Deploy with Terraform / CloudFormation"] },
      { name: "Enterprise AI engineering workflows", subskills: ["GitHub Actions CI (lint, test, build)", "Security scanning (SAST, secrets, dependencies)", "Artifact versioning with tags", "Staging environment for integration tests", "Load testing before production deploy", "Approval gates for production", "Runbook for common failures", "On-call rotation with PagerDuty", "Post-mortem with action items", "SLO error budget tracking"] }
    ]
  }
};

function SkillSection({ data, defaultOpen = false }: { data: any; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-4 border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition">
        <span>{data.title}</span>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {open && (
        <div className="border-t border-gray-100 divide-y divide-gray-50">
          {data.skills.map((skill: any, idx: number) => {
            const [subOpen, setSubOpen] = useState(false);
            return (
              <div key={idx}>
                <button onClick={() => setSubOpen(!subOpen)} className="w-full flex items-center gap-2 px-5 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                  {subOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  {skill.name}
                </button>
                {subOpen && (
                  <div className="bg-gray-50 px-5 py-4 pl-10">
                    <div className="grid gap-2">
                      {skill.subskills.map((sub: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <Circle size={12} className="mt-0.5 shrink-0 text-gray-400" />
                          <span>{sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function SkillsRoadmapPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">AI Engineering Skills Roadmap</h1>
          <p className="text-gray-500 mt-2">Low‑level foundations → scalable architecture → enterprise AI systems</p>
        </div>
        <SkillSection data={fullSkillsData.low} defaultOpen={true} />
        <SkillSection data={fullSkillsData.mid} />
        <SkillSection data={fullSkillsData.high} />
      </div>
    </div>
  );
}
