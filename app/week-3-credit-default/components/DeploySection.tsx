"use client"

import { Box, Zap, Layout, Layers, ServerIcon } from "lucide-react"

export default function DeploySection() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-300 to-slate-500 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-slate-900/30">
          <ServerIcon className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-400 tracking-tight">Deploy</h2>
          <p className="text-sm text-slate-400">FastAPI + Streamlit + Docker — after all experiments</p>
        </div>
        <div className="ml-auto">
          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">○ Pending</span>
        </div>
      </div>

      <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-5 hover:translate-y-[-4px] hover:shadow-2xl transition-all duration-200">
        <div className="grid md:grid-cols-5 gap-3 text-sm">
          <div className="flex items-center gap-3 bg-slate-700/50 rounded-xl px-4 py-3">
            <Box className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="text-slate-400">model.pth / scaler.pkl / config.json</span>
          </div>
          <div className="flex items-center gap-3 bg-sky-900/30 rounded-xl px-4 py-3 border border-sky-800/50">
            <Zap className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="text-sky-300 font-medium">app.py (FastAPI)</span>
            <span className="text-sky-400">POST /predict</span>
          </div>
          <div className="flex items-center gap-3 bg-emerald-900/30 rounded-xl px-4 py-3 border border-emerald-800/50">
            <Layout className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-emerald-300 font-medium">dashboard.py</span>
            <span className="text-emerald-400">Streamlit</span>
          </div>
          <div className="flex items-center gap-3 bg-slate-700/50 rounded-xl px-4 py-3">
            <Box className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="text-slate-400">Dockerfiles</span>
          </div>
          <div className="flex items-center gap-3 bg-indigo-900/30 rounded-xl px-4 py-3 border border-indigo-800/50">
            <Layers className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-indigo-300 font-medium">docker-compose.yml</span>
          </div>
        </div>
      </div>

      <div className="mt-3 bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#099cec">
              <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
            </svg>
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wide">Docker Commands</span>
          </div>
          <span className="text-[10px] text-slate-400">docker-compose.yml</span>
        </div>
        <pre className="text-[12px] leading-relaxed p-4 overflow-x-auto text-slate-200 font-mono">
          <span className="text-slate-400"># ── Build & run all services ──</span>
          <br /><span className="text-green-400">docker compose up --build</span>
          <br /><br /><span className="text-slate-400"># ── Run in detached mode ──</span>
          <br /><span className="text-green-400">docker compose up -d --build</span>
          <br /><br /><span className="text-slate-400"># ── Stop & remove containers ──</span>
          <br /><span className="text-green-400">docker compose down</span>
          <br /><br /><span className="text-slate-400"># ── Run individual services ──</span>
          <br /><span className="text-green-400">docker compose up fastapi -d</span>
          <br /><span className="text-green-400">docker compose up streamlit -d</span>
          <br /><br /><span className="text-slate-400"># ── View logs ──</span>
          <br /><span className="text-green-400">docker compose logs -f</span>
          <br /><br /><span className="text-slate-400"># ── Run without Docker (dev) ──</span>
          <br /><span className="text-yellow-400">uvicorn app:app --host 0.0.0.0 --port 8000 --reload</span>
          <br /><span className="text-yellow-400">streamlit run dashboard.py --server.port 8501</span>
        </pre>
      </div>
    </div>
  )
}
