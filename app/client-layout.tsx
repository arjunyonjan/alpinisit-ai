"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/sidebar/index"
import { Menu, X } from "lucide-react"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed")
    if (saved === "true") setCollapsed(true)
  }, [])

  const marginLeft = collapsed ? "lg:ml-20" : "lg:ml-72"

  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white rounded-lg p-2 shadow-md border border-gray-200"
      >
        <Menu size={20} />
      </button>

      {/* Mobile sidebar drawer */}
      {mobileOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-72 bg-white shadow-xl z-50 lg:hidden overflow-y-auto">
            <button 
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-lg hover:bg-gray-100"
            >
              <X size={20} />
            </button>
            <Sidebar isMobile={true} onClose={() => setMobileOpen(false)} />
          </div>
        </>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className={`${marginLeft} transition-all duration-300 w-full`}>
        {children}
      </div>
    </>
  )
}