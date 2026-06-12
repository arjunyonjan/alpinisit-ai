"use client"

import { FlaskConical, Code, ExternalLink } from "lucide-react"
import { experiments } from "../data/experiments"

interface ExperimentsSectionProps {
  onShowCode: (id: string) => void
  onShowStory: (id: string) => void
}

const askUrl = (q: string) =>
  `https://google.com/ai?q=Answer+in+layman+terms+with+examples+in+5+lines.+Explain+this+ML+experiment%3A+Project%3Dcredit+default+prediction.+${encodeURIComponent(q)}`

function AskButton({ query }: { query: string }) {
  return (
    <a
      href={askUrl(query)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-900/30 hover:shadow-lg hover:scale-105 transition-all duration-200 ring-1 ring-white/20 no-underline"
    >
      <ExternalLink className="w-3 h-3" />
      Ask
    </a>
  )
}

function StoryButton({ id }: { id: string }) {
  return (
    <span
      onClick={() => {
        const toggleEvent = new CustomEvent("open-story", { detail: id })
        window.dispatchEvent(toggleEvent)
      }}
      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-800 border border-slate-600 shadow-sm flex items-center justify-center cursor-pointer hover:bg-slate-700 hover:border-slate-500 hover:scale-110 transition-all"
      title="What's this?"
    >
      <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    </span>
  )
}

const storyMap: Record<string, string> = {
  default: "default-init",
  xavier: "xavier-init",
  he: "he-init",
  Adam: "adam",
  SGD: "sgd",
  RMSProp: "rmsprop",
  AdamW: "adamw",
  Dropout: "dropout",
  BatchNorm: "batchnorm",
  "Weight Decay": "weight-decay",
  "Early Stopping": "early-stopping",
  "Learning Rate": "learning-rate",
  "Batch Size": "batch-size",
  "Hidden Layers": "hidden-layers",
  "Grid Search": "grid-search",
}

function ResultCard({
  result,
  expIndex,
  storyKey,
}: {
  result: { name: string; value: string; auc: string; winner?: boolean }
  expIndex: number
  storyKey: string
}) {
  const cardBg =
    result.winner
      ? `bg-${["emerald", "amber", "rose", "slate"][expIndex]}-900/30 border-2 border-${["emerald", "amber", "rose", "slate"][expIndex]}-700/50`
      : "bg-slate-700/50 border border-slate-600"

  return (
    <div className={`rounded-xl px-4 py-3 relative ${cardBg}`}>
      <div className="flex items-center justify-between">
        <span className={`font-${result.winner ? "bold" : "medium"} text-${result.winner ? "emerald-200" : "slate-300"}`}>
          {result.name}
        </span>
        <span className={`text-${result.winner ? "emerald-300 font-bold" : "emerald-400"}`}>
          {result.value}
        </span>
      </div>
      <div className={`flex items-center justify-between text-xs text-${result.winner ? "emerald-400" : "slate-400"} mt-0.5`}>
        <span>{result.winner ? "AUC 0.770 ← best" : result.auc}</span>
      </div>
      <StoryButton id={storyKey} />
    </div>
  )
}

export default function ExperimentsSection({ onShowCode, onShowStory }: ExperimentsSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-violet-900/30">
          <FlaskConical className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight">Experiments</h2>
          <p className="text-sm text-slate-400">4 systematic comparisons to find the best model</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {experiments.map((exp, idx) => {
          const colorMap = ["emerald", "amber", "rose", "slate"]
          const c = colorMap[idx] || "slate"

          return (
            <div
              key={exp.id}
              className={`bg-slate-800/80 border-2 border-${exp.statusColor}-700/50 rounded-2xl p-6 hover:translate-y-[-4px] hover:shadow-2xl transition-all duration-200 relative`}
            >
              {exp.status !== "pending" && (
                <div
                  className={`absolute -top-3 -right-3 bg-${exp.statusColor === "rose" ? "rose-500" : exp.statusColor === "amber" ? "amber-600" : "emerald-600"} text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg`}
                >
                  {exp.statusLabel}
                </div>
              )}

              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl bg-${c}-900/40 text-${c}-300 flex items-center justify-center text-base font-bold border-2 border-${c}-700/50`}
                >
                  {exp.id}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-100">{exp.title}</h3>
                    <span
                      className={`text-xs bg-${c}-900/40 text-${c}-300 px-2.5 py-0.5 rounded-full font-medium`}
                    >
                      {exp.status === "complete" ? "done" : exp.status === "partial" ? "partial" : "next"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{exp.subtitle}</p>
                </div>
                {exp.winner && (
                  <div className="text-right text-xs">
                    <span className="text-slate-400">Winner</span>
                    <div className={`text-base font-bold text-${c}-300`}>{exp.winner}</div>
                    <div className={`text-${c}-400`}>{exp.winnerValue}</div>
                  </div>
                )}
              </div>

              {/* Ask + Code buttons */}
              <div className="flex justify-center -mt-1 mb-3 gap-2">
                <AskButton
                  query={`Exp+${idx+1}+of+4%3A+${encodeURIComponent(exp.title)}+${encodeURIComponent(exp.subtitle)}`}
                />
                <span
                  onClick={() => onShowCode(`exp${idx + 1}`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-gradient-to-r from-slate-500 to-slate-600 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer ring-1 ring-white/20"
                >
                  <Code className="w-3 h-3" />
                  Code
                </span>
              </div>

              {/* Results */}
              <div className="grid md:grid-cols-{exp.results.length <= 3 ? 3 : 4} gap-3 text-sm">
                {exp.results.map((r) => (
                  <div
                    key={r.name}
                    className={`${r.winner ? `bg-${c}-900/30 border-2 border-${c}-700/50` : "bg-slate-700/50 border border-slate-600"} rounded-xl px-4 py-3 relative`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-${r.winner ? "bold" : "medium"} text-${r.winner ? `${c}-200` : "slate-300"}`}>
                        {r.name}
                      </span>
                      <span className={`text-${r.winner ? `${c}-300 font-bold` : "emerald-400"}`}>{r.value}</span>
                    </div>
                    <div className={`flex items-center justify-between text-xs text-${r.winner ? `${c}-400` : "slate-400"} mt-0.5`}>
                      <span>{r.auc || r.value}</span>
                    </div>
                    <span
                      onClick={() => {
                        const event = new CustomEvent("open-story", { detail: storyMap[r.name] || "" })
                        window.dispatchEvent(event)
                      }}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-800 border border-slate-600 shadow-sm flex items-center justify-center cursor-pointer hover:bg-slate-700 hover:border-slate-500 hover:scale-110 transition-all"
                      title="What's this?"
                    >
                      <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                      </svg>
                    </span>
                  </div>
                ))}
              </div>

              {exp.designNote && (
                <div className="mt-3 bg-gradient-to-r from-amber-900/30 to-amber-800/20 border border-amber-700/50 rounded-xl px-5 py-4 text-amber-200">
                  <div className="flex items-start gap-3">
                    <div className="w-0.5 h-12 bg-amber-500 rounded-full shrink-0 mt-0.5" />
                    <div className="space-y-2 text-xs leading-relaxed">
                      <p><span className="font-semibold text-amber-300">Design:</span> {exp.designNote}</p>
                      <p><span className="font-semibold text-amber-300">Result:</span> {exp.resultNote}</p>
                      {exp.recallNote && (
                        <p className="mt-1.5 pt-1.5 border-t border-amber-700/40">
                          <span className="font-semibold text-amber-300">Recall alert:</span> {exp.recallNote}
                        </p>
                      )}
                      {exp.takeaway && (
                        <p className="mt-1.5 pt-1.5 border-t border-amber-700/40">
                          <span className="font-semibold text-amber-300">Takeaway:</span> {exp.takeaway}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <div className="bg-slate-700/50 rounded-xl px-4 py-2.5 text-slate-400 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500" /> Best model → save model.pth + scaler.pkl
        </div>
        <div className="bg-slate-700/50 rounded-xl px-4 py-2.5 text-slate-400 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500" /> Evaluate on test set (AUC, F1, confusion matrix)
        </div>
      </div>
    </div>
  )
}
