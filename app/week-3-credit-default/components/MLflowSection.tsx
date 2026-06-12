"use client"

import { BarChart, Activity, AlertTriangle } from "lucide-react"

export default function MLflowSection() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-400 to-rose-600 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-rose-900/30">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight">MLflow Tracking</h2>
          <p className="text-sm text-slate-400">
            Experiment metrics logged to{" "}
            <a href="http://localhost:5000" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 decoration-indigo-200 hover:decoration-indigo-400 transition">
              localhost:5000
            </a>
          </p>
        </div>
      </div>

      <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-5 hover:translate-y-[-4px] hover:shadow-2xl transition-all duration-200">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-sky-900/30 to-sky-800/20 border border-sky-700/50 rounded-xl p-4 text-center">
            <div className="text-xs font-semibold text-sky-400 uppercase tracking-wide mb-1">Accuracy</div>
            <div className="text-2xl font-extrabold text-sky-300">81.37%</div>
            <div className="text-[10px] text-sky-400 mt-0.5">Looks good on paper</div>
          </div>
          <div className="bg-gradient-to-br from-violet-900/30 to-violet-800/20 border border-violet-700/50 rounded-xl p-4 text-center">
            <div className="text-xs font-semibold text-violet-400 uppercase tracking-wide mb-1">AUC</div>
            <div className="text-2xl font-extrabold text-violet-300">0.770</div>
            <div className="text-[10px] text-violet-400 mt-0.5">Better than random (0.5)</div>
          </div>
          <div className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 border border-amber-700/50 rounded-xl p-4 text-center">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wide mb-1">Recall</div>
            <div className="text-2xl font-extrabold text-amber-300">0.345</div>
            <div className="text-[10px] text-amber-400 mt-0.5">
              <AlertTriangle className="w-3 h-3 inline-block -mt-0.5 mr-0.5" />
              Only catches 34/100 defaults
            </div>
          </div>
        </div>

        <div className="mt-4 bg-amber-900/30 border border-amber-700/50 rounded-xl px-5 py-4 text-xs text-amber-200">
          <div className="flex items-start gap-3">
            <div className="w-0.5 h-24 bg-amber-500 rounded-full shrink-0 mt-0.5" />
            <div>
              <p>
                <span className="font-semibold text-amber-300">FucheAI:</span> Imagine a fire alarm that&apos;s quiet 81% of the time (good!), but only rings for 34 out of 100 real fires. The other 66 fires? Silence. That&apos;s our <span className="font-semibold">recall</span> problem — caused by <span className="font-semibold">class imbalance</span> (only 22% of people actually default).
              </p>
              <p className="mt-2">
                <span className="font-semibold text-amber-300">Next steps:</span> We&apos;ll try oversampling, class weights, and threshold tuning to wake up that alarm. For now, we know the problem and where to focus.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-400 bg-slate-700/50 rounded-lg px-4 py-2.5">
          <span className="w-2 h-2 rounded-full bg-rose-400" />
          All 3 runs logged with params (init, lr, dropout) + metrics (accuracy, auc, recall, precision, f1)
        </div>

        <div className="mt-3 bg-gradient-to-r from-slate-800/50 to-slate-700/30 border border-slate-700 rounded-xl px-5 py-4">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">How to run MLflow</div>
          <div className="grid md:grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-3">
              <div className="font-medium text-slate-200 mb-1">Configure tracking</div>
              <code className="block bg-slate-800 text-slate-200 rounded-md px-3 py-2 text-[10px] font-mono leading-relaxed">
                export MLFLOW_TRACKING_URI=sqlite:///mlflow.db<br />
                # or set in code:<br />
                mlflow.set_tracking_uri(&quot;sqlite:///mlflow.db&quot;)
              </code>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-3">
              <div className="font-medium text-slate-200 mb-1">Launch dashboard</div>
              <code className="block bg-slate-800 text-slate-200 rounded-md px-3 py-2 text-[10px] font-mono">
                mlflow ui --host 0.0.0.0 --port 5000
              </code>
              <div className="text-slate-400 mt-1.5">
                Opens MLflow UI →{" "}
                <a href="http://localhost:5000" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
                  http://localhost:5000
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
