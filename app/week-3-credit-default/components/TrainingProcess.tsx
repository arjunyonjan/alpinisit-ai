"use client"

import { Sparkles, Cpu, Zap, Database as DatabaseIcon, Layers, BarChart, Clock, Target, ArrowRight } from "lucide-react"

const askUrl = (q: string) =>
  `https://google.com/ai?q=Answer+in+layman+terms+with+examples+in+5+lines.+Explain+this+ML+training+step%3A+Project%3Dcredit+default+prediction.+${encodeURIComponent(q)}`

function AskButton({ query }: { query: string }) {
  return (
    <a
      href={askUrl(query)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-900/30 hover:shadow-lg hover:scale-105 transition-all duration-200 ring-1 ring-white/20 no-underline"
    >
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#4285F4">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
      </svg>
      Ask
      <ArrowRight className="w-2.5 h-2.5 ml-0.5 opacity-60" />
    </a>
  )
}

export default function TrainingProcess() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white flex items-center justify-center text-lg font-bold shadow-lg shadow-sky-900/30 ring-4 ring-sky-900/30">
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight">Training Process</h2>
          <p className="text-sm text-slate-400">How raw data becomes a trained model — step by step</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Step 1 */}
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 text-white flex items-center justify-center text-xl font-bold shadow-md shrink-0 hidden md:flex">
            <DatabaseIcon className="w-7 h-7" />
          </div>
          <div className="flex-1 bg-slate-800/80 border border-slate-700 rounded-2xl p-5 hover:translate-y-[-4px] hover:shadow-2xl transition-all duration-200">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-sky-900/30 text-sky-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <div className="font-bold text-slate-100 text-base">Data Preprocessing</div>
                <div className="text-xs text-slate-400">Raw CSV → clean tensors</div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div className="bg-sky-900/30 rounded-lg px-3 py-2 text-sky-300 border border-sky-800/50">
                <span className="font-semibold block text-sky-200">Drop ID</span>Column removed
              </div>
              <div className="bg-sky-900/30 rounded-lg px-3 py-2 text-sky-300 border border-sky-800/50">
                <span className="font-semibold block text-sky-200">StandardScaler</span>Fit train → transform all
              </div>
              <div className="bg-sky-900/30 rounded-lg px-3 py-2 text-sky-300 border border-sky-800/50">
                <span className="font-semibold block text-sky-200">Tensor convert</span>torch.float32
              </div>
              <div className="bg-sky-900/30 rounded-lg px-3 py-2 text-sky-300 border border-sky-800/50">
                <span className="font-semibold block text-sky-200">INPUT_SIZE</span>24 features
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <AskButton query="ML+preprocessing+Dropping+ID+column+why+fit+StandardScaler+only+on+train+convert+to+torch.float32" />
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-md shrink-0 hidden md:flex">
            <Layers className="w-7 h-7" />
          </div>
          <div className="flex-1 bg-slate-800/80 border border-slate-700 rounded-2xl p-5 hover:translate-y-[-4px] hover:shadow-2xl transition-all duration-200">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-indigo-900/30 text-indigo-400 flex items-center justify-center">
                <Cpu className="w-4 h-4" />
              </span>
              <div>
                <div className="font-bold text-slate-100 text-base">MLP Architecture</div>
                <div className="text-xs text-slate-400">23 → 128 → 64 → 32 → 1</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs flex-wrap">
              <span className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-indigo-300 font-mono">Input(23)</span>
              <span className="text-slate-500">→</span>
              <span className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-indigo-300">Linear 128</span>
              <span className="text-slate-400 text-[10px] font-medium">BN·ReLU·Drop0.2</span>
              <span className="text-slate-500">→</span>
              <span className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-indigo-300">Linear 64</span>
              <span className="text-slate-400 text-[10px] font-medium">BN·ReLU·Drop0.2</span>
              <span className="text-slate-500">→</span>
              <span className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-indigo-300">Linear 32</span>
              <span className="text-slate-400 text-[10px] font-medium">BN·ReLU·Drop0.2</span>
              <span className="text-slate-500">→</span>
              <span className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-indigo-300 font-mono">Linear(1)</span>
              <span className="text-slate-500">→</span>
              <span className="bg-violet-900/30 border border-violet-700/50 rounded-lg px-3 py-2 text-violet-300 font-semibold">Sigmoid</span>
            </div>
            <div className="mt-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">13,441</span> total parameters
            </div>
            <div className="flex justify-center mt-4">
              <AskButton query="MLP+architecture+23+features+3+hidden+layers+128+64+32+BN+ReLU+Dropout+why+3+hidden+layers" />
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-400 to-violet-600 text-white flex items-center justify-center text-xl font-bold shadow-md shrink-0 hidden md:flex">
            <Zap className="w-7 h-7" />
          </div>
          <div className="flex-1 bg-slate-800/80 border border-slate-700 rounded-2xl p-5 hover:translate-y-[-4px] hover:shadow-2xl transition-all duration-200">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-violet-900/30 text-violet-400 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </span>
              <div>
                <div className="font-bold text-slate-100 text-base">Training Loop</div>
                <div className="text-xs text-slate-400">100 epochs · early stopping · AUC tracking</div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-sky-900/30 to-sky-800/20 border border-sky-700/50 rounded-xl p-4">
                <div className="text-xs font-semibold text-sky-400 uppercase tracking-wide mb-2">Config</div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-sky-300">Max epochs</span><span className="font-semibold text-sky-200">100</span></div>
                  <div className="flex justify-between"><span className="text-sky-300">Batch size</span><span className="font-semibold text-sky-200">256</span></div>
                  <div className="flex justify-between"><span className="text-sky-300">Early stop</span><span className="font-semibold text-sky-200">patience=10</span></div>
                  <div className="flex justify-between"><span className="text-sky-300">Loss</span><span className="font-mono font-semibold text-sky-200">BCELoss</span></div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border border-emerald-700/50 rounded-xl p-4">
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-2">Each Epoch</div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-emerald-300"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Train → forward · backward · step</div>
                  <div className="flex items-center gap-2 text-emerald-300"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Validate → eval mode · no grad</div>
                  <div className="flex items-center gap-2 text-emerald-300"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Log: train loss · val loss · AUC</div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-violet-900/30 to-violet-800/20 border border-violet-700/50 rounded-xl p-4">
                <div className="text-xs font-semibold text-violet-400 uppercase tracking-wide mb-2">Output</div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-violet-300"><span className="w-1.5 h-1.5 rounded-full bg-violet-400" />Best model weights</div>
                  <div className="flex items-center gap-2 text-violet-300"><span className="w-1.5 h-1.5 rounded-full bg-violet-400" />Loss + AUC history</div>
                  <div className="flex items-center gap-2 text-violet-300"><span className="w-1.5 h-1.5 rounded-full bg-violet-400" />Logged to <span className="font-semibold text-indigo-300">MLflow</span></div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <AskButton query="training+loop+100+epochs+batch+256+early+stopping+patience+10+BCELoss+why+early+stopping+why+binary+cross+entropy" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
