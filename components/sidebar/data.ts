import { 
  Home, BookOpen, Brain, Zap, Cpu, Layers3, Shield, BarChart, Globe, 
  FolderTree, Cloud, Bot 
} from "lucide-react"

// Note: Children for Notes section are now fetched dynamically via API
// This static array serves as fallback and defines other sections
export const sidebarLinks = [
  { name: "Home", href: "/", icon: Home },
  { 
    name: "📝 Notes", 
    href: "/notes", 
    icon: BookOpen,
    dynamicChildren: true  // Flag to fetch from API at runtime
  },
  { name: "Deep Learning", href: "/deep-learning/weight-bias-activation", icon: Brain },
  { name: "Chatbot Structure", href: "/llmchat-project-structure", icon: FolderTree },
  { name: "Ollama Cloud", href: "/ollama-cloud", icon: Cloud },
  { 
    name: "Week 1 — AI Systems", 
    href: "/week-one-ai-systems-setup", 
    icon: Layers3,
    children: [
      { name: "T1 — System Architecture", href: "/week-one-t1-system-architecture-project-scaffold", icon: Cpu }
    ]
  },
  { 
    name: "LLM Masterclass", 
    href: "/llm-architecture-masterclass", 
    icon: BookOpen,
    children: [
      { name: "01 — Tokenization", href: "/llm-architecture-masterclass#p1", icon: Zap },
      { name: "02 — Tensor Batching", href: "/llm-architecture-masterclass#p2", icon: Layers3 },
      { name: "03 — Latent Space", href: "/llm-architecture-masterclass#p3", icon: Globe },
      { name: "04 — Attention", href: "/llm-architecture-masterclass#p4", icon: Cpu },
      { name: "05 — Self-Supervised", href: "/llm-architecture-masterclass#p5", icon: Bot },
      { name: "06 — RAG", href: "/llm-architecture-masterclass#p6", icon: Shield },
      { name: "07 — Optimization", href: "/llm-architecture-masterclass#p7", icon: BarChart },
      { name: "08 — Security", href: "/llm-architecture-masterclass#p8", icon: Shield },
      { name: "09 — Evaluation", href: "/llm-architecture-masterclass#p9", icon: BarChart },
      { name: "10 — China vs US", href: "/llm-architecture-masterclass#p10", icon: Globe }
    ]
  }
]