"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/sidebar/index"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed")
    if (saved === "true") setCollapsed(true)

    // Listen for changes from sidebar toggle
    const handleStorageChange = () => {
      const updated = localStorage.getItem("sidebar-collapsed") === "true"
      setCollapsed(updated)
    }
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const sidebarWidth = collapsed ? 80 : 288 // 20rem = 320px, 72rem? No: 72 = 288px for w-72
  const marginLeft = collapsed ? "ml-20" : "ml-72"

  return (
    <>
      <Sidebar />
      <div className={`${marginLeft} transition-all duration-300`}>
        {children}
      </div>
    </>
  )
}