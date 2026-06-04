"use client"

import { useState, useEffect, createContext, useContext } from "react"
import Sidebar from "@/components/sidebar/index"
import { Menu, X } from "lucide-react"

type SidebarContextType = {
  collapsed: boolean
  toggleCollapse: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) throw new Error("useSidebar must be used within ClientLayout")
  return context
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [contentKey, setContentKey] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed")
    if (saved === "true") setCollapsed(true)
    
    const handleSidebarToggle = () => {
      const updated = localStorage.getItem("sidebar-collapsed") === "true"
      setCollapsed(updated)
      setContentKey(prev => prev + 1) // Force re-render of content
    }
    window.addEventListener("sidebar-toggle", handleSidebarToggle)
    return () => window.removeEventListener("sidebar-toggle", handleSidebarToggle)
  }, [])

  const toggleCollapse = () => {
    const newState = !collapsed
    setCollapsed(newState)
    localStorage.setItem("sidebar-collapsed", String(newState))
    window.dispatchEvent(new CustomEvent("sidebar-toggle"))
  }

  // Calculate margin based on collapsed state
  const marginClass = collapsed ? "lg:ml-20" : "lg:ml-72"

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapse }}>
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
        <Sidebar onToggle={toggleCollapse} />
      </div>

      {/* Content area - with proper width calculation */}
      <div 
        key={contentKey}
        className={`${marginClass} transition-all duration-300 w-[calc(100%-0px)] lg:w-auto overflow-x-hidden`}
      >
        <div className="max-w-full overflow-x-hidden">
          {children}
        </div>
      </div>
    </SidebarContext.Provider>
  )
}