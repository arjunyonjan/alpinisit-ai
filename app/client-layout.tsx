"use client"

import Sidebar, { MobileMenuButton } from "@/components/sidebar"
import { useState } from "react"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <MobileMenuButton onClick={() => setMenuOpen(true)} />
      <div className="lg:ml-72">{children}</div>
    </>
  )
}
