export const courseTopics = [
  {
    number: "1",
    title: "Async Await in Python",
    description:
      "Write non blocking code using Python async and await syntax so multiple API calls can run concurrently. This is critical for performant LLM applications that make many network and database operations simultaneously.",
    color: "bg-blue-500",
  },

  {
    number: "2",
    title: "Pydantic Models and Validation",
    description:
      "Define structured schemas with Python type hints and automatically validate parse and serialize data safely. This is the standard approach for making AI outputs and API responses reliable and type safe.",
    color: "bg-green-500",
  },

  {
    number: "3",
    title: "HTTPX Async HTTP Clients",
    description:
      "Use HTTPX as a modern async alternative to requests. Supports retries connection pooling timeout handling and scalable communication with AI APIs and external services.",
    color: "bg-violet-500",
  },

  {
    number: "4",
    title: "Environment Management",
    description:
      "Store configuration and secrets inside env files and load them safely during runtime. This allows different settings between local development staging and production environments.",
    color: "bg-cyan-500",
  },

  {
    number: "5",
    title: "Secret Management",
    description:
      "Avoid hardcoding API keys inside source code because secrets can leak through git history and public repositories. Learn runtime secret injection and repository auditing practices.",
    color: "bg-orange-500",
  },

  {
    number: "6",
    title: "Modular Code Structure",
    description:
      "Organise AI applications into separated concerns such as clients chains tools models and utilities. This allows each component to be tested replaced and reused independently.",
    color: "bg-emerald-500",
  },

  {
    number: "7",
    title: "Git Branching and PR Etiquette",
    description:
      "Use feature branches meaningful commits and clear pull request descriptions. These workflows improve collaboration code review speed and engineering consistency.",
    color: "bg-purple-500",
  },

  {
    number: "8",
    title: "README Writing Standards",
    description:
      "Create high quality project documentation including architecture summaries setup instructions usage examples environment references and onboarding information.",
    color: "bg-indigo-500",
  },

  {
    number: "9",
    title: "Env Example and Gitignore",
    description:
      "Use env example files to document required variables without exposing secrets. Configure gitignore properly to avoid committing caches credentials and build artefacts.",
    color: "bg-pink-500",
  },

  {
    number: "10",
    title: "AI Project Folder Structure",
    description:
      "Adopt scalable folder layouts for source code tests prompts scripts and datasets. Consistent project structure reduces onboarding friction and improves maintainability.",
    color: "bg-lime-500",
  },

  {
    number: "11",
    title: "Virtual Environments",
    description:
      "Isolate project dependencies using uv or venv so packages do not conflict across projects. This improves reproducibility portability and deployment stability.",
    color: "bg-amber-500",
  },

  {
    number: "12",
    title: "Type Hints and Docstrings",
    description:
      "Annotate parameters return types and function intent using Python typing and docstrings. This improves editor tooling readability debugging and AI coding assistant support.",
    color: "bg-sky-500",
  },
]
