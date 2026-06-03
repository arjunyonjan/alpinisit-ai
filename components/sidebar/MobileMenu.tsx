"use client"

import { Menu, X } from "lucide-react"

export function MobileMenuButton({ onClick }: any) {
  return (
    <button onClick={onClick} className="fixed top-4 right-4 z-[100] flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-xl border border-gray-200 lg:hidden">
      <Menu className="h-6 w-6 text-gray-800" />
    </button>
  )
}

export function MobileDrawer({ open, onClose, children }: any) {
  if (!open) return null
  return (
    <>
      <div className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm lg:hidden" onClick={onClose} />
      <aside className="fixed inset-y-0 left-0 z-[100] flex w-72 flex-col bg-white shadow-2xl lg:hidden overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100">
          <X className="h-5 w-5 text-gray-600" />
        </button>
        {children}
      </aside>
    </>
  )
}