"use client"

import { Clock, FileText, Table, BarChart, Cpu, Layers } from "lucide-react"

const cells = [
  { icon: <FileText className="w-4 h-4" />, title: "Imports + Setup", sub: "torch, sklearn, mlflow, etc." },
  { icon: <Table className="w-4 h-4" />, title: "Load CSV", sub: "df.head(), shape (30k, 25)" },
  { icon: <BarChart className="w-4 h-4" />, title: "Target Distribution", sub: "78% non-default / 22% default" },
  { icon: <Cpu className="w-4 h-4" />, title: "Preprocessing", sub: "Load splits → drop ID → scale → tensors (23 features)" },
  { icon: <Layers className="w-4 h-4" />, title: "MLP Class", sub: "Configurable init, dropout, BN — 13,441 params" },
  { icon: <Clock className="w-4 h-4" />, title: "train_model()", sub: "Train/val loop + early stopping + AUC logging" },
]

export default function NotebookSection() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-amber-900/30">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight">Notebook</h2>
          <p className="text-sm text-slate-400">training.ipynb — cells and preprocessing</p>
        </div>
        <div className="ml-auto">
          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-amber-900/40 text-amber-300 border border-amber-700/50">In progress</span>
        </div>
      </div>

      <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-5 hover:translate-y-[-4px] hover:shadow-2xl transition-all duration-200 mb-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">6 Cells</span>
          <span className="w-px h-3 bg-slate-600" />
          <span className="text-xs text-slate-500">Imports through training loop</span>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {cells.map((cell, i) => (
            <div key={i} className="flex items-start gap-3 bg-slate-700/50 rounded-xl p-3.5 border border-slate-600">
              <span className="w-6 h-6 rounded-lg bg-slate-700 border border-slate-600 text-slate-400 flex items-center justify-center text-xs font-bold shrink-0">
                {i + 1}
              </span>
              <div>
                <div className="text-sm font-medium text-slate-200">{cell.title}</div>
                <div className="text-xs text-slate-400 mt-0.5">{cell.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
