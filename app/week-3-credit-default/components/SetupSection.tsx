"use client"

import { CheckCircle, Download, GitBranch, Target, Package, Settings, GitCommit } from "lucide-react"

const items = [
  { icon: <span className="material-symbols-outlined text-[16px]">description</span>, label: "Notebook setup", sub: "training.ipynb" },
  { icon: <Download className="w-4 h-4" />, label: "Download dataset from UCI", sub: "(30k × 25)" },
  { icon: <GitBranch className="w-4 h-4" />, label: "split_data.py →", sub: "train/val/test (60/20/20)" },
  { icon: <Target className="w-4 h-4" />, label: "Identify target", sub: "= default payment next month" },
  { icon: <Package className="w-4 h-4" />, label: "Install dependencies", sub: "(seaborn, etc.)" },
  { icon: <Settings className="w-4 h-4" />, label: "MLflow config", sub: "(~/.mlflow/config)" },
  { icon: <GitCommit className="w-4 h-4" />, label: "Git save", sub: "git add . && git commit -m \"initial\"" },
]

export default function SetupSection() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-emerald-900/30">
          <CheckCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight">Setup</h2>
          <p className="text-sm text-slate-400">Data acquisition, environment, and version control</p>
        </div>
        <div className="ml-auto">
          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-900/40 text-emerald-300 border border-emerald-700/50">✓ 7/7 complete</span>
        </div>
      </div>
      <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-5 hover:translate-y-[-4px] hover:shadow-2xl transition-all duration-200">
        <div className="grid md:grid-cols-4 gap-x-6 gap-y-3 text-sm">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-sky-900/30 text-sky-300 flex items-center justify-center text-sm">
                {item.icon}
              </span>
              <span className="text-slate-400">
                {item.label} <span className="text-slate-400 text-xs">{item.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
