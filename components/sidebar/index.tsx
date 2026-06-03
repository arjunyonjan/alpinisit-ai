"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { sidebarLinks } from "./data"
import NavItem from "./NavItem"
import { MobileMenuButton, MobileDrawer } from "./MobileMenu"

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const navContent = (
    <>
      <div className="border-b border-gray-200 p-6">
        <div className="flex flex-col items-center gap-2">
          <img src="/alpinistlogo.png" alt="Alpinist AI Logo" className="h-10 w-full object-contain" />
          <h1 className="text-base font-bold text-gray-900">Alpinist AI</h1>
          <p className="text-xs text-gray-500">Training Platform</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto pb-20">
        {sidebarLinks.map((link) => (
          <NavItem key={link.href} item={link} pathname={pathname} onClose={() => setMobileOpen(false)} />
        ))}
      </nav>
    </>
  )

  return (
    <>
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-gray-200 bg-white lg:flex lg:flex-col overflow-y-auto z-40">
        {navContent}
      </aside>
      <MobileMenuButton onClick={() => setMobileOpen(true)} />
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)}>
        {navContent}
      </MobileDrawer>
    </>
  )
}