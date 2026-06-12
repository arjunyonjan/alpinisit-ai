"use client"

import { Folder, FileText, Settings, Archive, Box } from "lucide-react"

export default function SavedFiles() {
  return (
    <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-6 hover:translate-y-[-4px] hover:shadow-2xl transition-all duration-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-900/30">
          <Archive className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight">Saved Files</h2>
          <p className="text-sm text-slate-400">Project deliverables and artifacts</p>
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-6 text-sm">
        <div>
          <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wide mb-3">docs/</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              markdowns/
            </div>
            <div className="flex items-center gap-2.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              htmls/
            </div>
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold text-sky-400 uppercase tracking-wide mb-3">models/</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              model.pth
            </div>
            <div className="flex items-center gap-2.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              scaler.pkl
            </div>
            <div className="flex items-center gap-2.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              model_config.json
            </div>
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wide mb-3">root/</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              training.ipynb
            </div>
            <div className="flex items-center gap-2.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              app.py
            </div>
            <div className="flex items-center gap-2.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              dashboard.py
            </div>
            <div className="flex items-center gap-2.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              docker-compose.yml
            </div>
            <div className="flex items-center gap-2.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              requirements.txt
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
