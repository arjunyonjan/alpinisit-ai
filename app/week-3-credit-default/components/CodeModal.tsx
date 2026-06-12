"use client"

import { useState, useEffect, useCallback } from "react"
import { stories } from "../data/stories"
import { codeSnippets } from "../data/codeSnippets"
import { X, ExternalLink } from "lucide-react"

type ModalState = {
  open: boolean
  type: "story" | "code"
  key: string
}

export default function CodeModal() {
  const [modal, setModal] = useState<ModalState>({ open: false, type: "story", key: "" })

  const openStory = useCallback((e: CustomEvent) => {
    const key = e.detail
    if (stories[key]) {
      setModal({ open: true, type: "story", key })
    }
  }, [])

  const openCode = useCallback((key: string) => {
    if (codeSnippets[key]) {
      setModal({ open: true, type: "code", key })
    }
  }, [])

  useEffect(() => {
    window.addEventListener("open-story", openStory as EventListener)
    window.addEventListener("open-code", (e: Event) => openCode((e as CustomEvent).detail) as unknown as void)
    return () => {
      window.removeEventListener("open-story", openStory as EventListener)
      window.removeEventListener("open-code", (e: Event) => openCode((e as CustomEvent).detail) as unknown as void)
    }
  }, [openStory, openCode])

  if (!modal.open) return null

  const close = () => setModal({ open: false, type: "story", key: "" })

  const isStory = modal.type === "story"
  const storyData = isStory ? stories[modal.key] : null
  const codeData = !isStory ? codeSnippets[modal.key] : null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15, 23, 42, 0.7)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
    >
      {isStory && storyData && (
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl border border-slate-200" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-200 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-slate-500" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-800">{storyData.title}</div>
                <div className="text-[10px] text-slate-500">{storyData.sub}</div>
              </div>
            </div>
            <span onClick={close} className="w-7 h-7 rounded-lg bg-slate-200 hover:bg-slate-300 flex items-center justify-center cursor-pointer transition-colors">
              <X className="w-4 h-4 text-slate-500" />
            </span>
          </div>
          <div className="p-5 overflow-y-auto text-sm leading-relaxed text-slate-700" style={{ maxHeight: "calc(85vh - 64px)" }}>
            <div dangerouslySetInnerHTML={{ __html: storyData.html }} />
          </div>
        </div>
      )}

      {!isStory && codeData && (
        <div className="bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl border border-slate-700/50" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between px-5 py-3 bg-slate-800/80 border-b border-slate-700/50 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-slate-300" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-200">{codeData.title}</div>
                <div className="text-[10px] text-slate-400">{codeData.sub}</div>
              </div>
            </div>
            <span onClick={close} className="w-7 h-7 rounded-lg bg-slate-700/50 hover:bg-slate-600 flex items-center justify-center cursor-pointer transition-colors">
              <X className="w-4 h-4 text-slate-400" />
            </span>
          </div>
          <div className="p-5 overflow-y-auto text-slate-200 font-mono text-sm leading-relaxed" style={{ maxHeight: "calc(85vh - 64px)" }}>
            <div dangerouslySetInnerHTML={{ __html: codeData.html }} />
          </div>
        </div>
      )}
    </div>
  )
}
