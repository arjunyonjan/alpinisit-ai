"use client"

import { Sparkles } from "lucide-react"

interface HeaderProps {
  minimalMode: boolean
}

export default function Header({ minimalMode }: HeaderProps) {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-indigo-900/40 border border-indigo-700/40 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
        <span className="text-sm font-semibold text-indigo-300 tracking-wide">
          <Sparkles className="w-4 h-4 inline-block -mt-0.5 mr-1" />
          Alpinist AI Training — Week 3
        </span>
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
      </div>

      <div className="flex items-start justify-between mt-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-[.2em]">Full Pipeline</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight">
            Credit Default — ML Pipeline — Experiments
          </h1>
          <h2 className="text-base text-slate-400 mt-1.5 font-medium">Project Flow</h2>
          <p className="text-slate-400 mt-2 text-[15px]">Credit default prediction — end-to-end lifecycle</p>
        </div>
        {!minimalMode && (
          <div className="hidden md:flex gap-2">
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-900/40 text-emerald-400 border border-emerald-700">✓ Setup done</span>
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-amber-900/40 text-amber-400 border border-amber-700">Exp 1 done</span>
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">○ Exp 2–4 next</span>
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">○ Deploy later</span>
          </div>
        )}
      </div>
    </div>
  )
}
