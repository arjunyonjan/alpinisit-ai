"use client"

import { useState } from "react"
import Header from "./components/Header"
import ToolsRibbon from "./components/ToolsRibbon"
import SetupSection from "./components/SetupSection"
import NotebookSection from "./components/NotebookSection"
import TrainingProcess from "./components/TrainingProcess"
import ExperimentsSection from "./components/ExperimentsSection"
import MLflowSection from "./components/MLflowSection"
import DeploySection from "./components/DeploySection"
import SavedFiles from "./components/SavedFiles"
import CodeModal from "./components/CodeModal"

export default function Week3CreditDefaultPage() {
  const [minimalMode, setMinimalMode] = useState(false)

  return (
    <main className="min-h-screen antialiased text-slate-500 bg-[#0b1120]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Mode Toggle Pill */}
        <div className="fixed top-6 right-6 z-50">
          <div
            onClick={() => setMinimalMode((m) => !m)}
            className="flex items-center gap-1.5 bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-full px-4 py-2 shadow-lg cursor-pointer hover:shadow-xl transition-all text-xs font-medium select-none ring-1 ring-white/5"
          >
            <span className={`font-semibold ${minimalMode ? "text-slate-500" : "text-indigo-400"}`}>
              {minimalMode ? "Minimal" : "Advanced"}
            </span>
            <span className="text-slate-400 mx-0.5">/</span>
            <span className={`${minimalMode ? "text-indigo-400 font-semibold" : "text-slate-400"}`}>
              {minimalMode ? "Advanced" : "Minimal"}
            </span>
          </div>
        </div>

        <Header minimalMode={minimalMode} />

        {!minimalMode && <ToolsRibbon />}

        <SetupSection />

        <NotebookSection />

        <TrainingProcess />

        <ExperimentsSection onShowCode={() => {}} onShowStory={() => {}} />

        <MLflowSection />

        <DeploySection />

        <SavedFiles />

        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-xs text-slate-500">
          <span className="text-slate-500 font-medium">Credit Default Prediction</span>
          <span className="mx-2">·</span>
          Full Project Flow
        </div>
      </div>

      <CodeModal />
    </main>
  )
}
