"use client"

import { ThemeProvider } from "@/contexts/ThemeContext"
import Sidebar from "@/components/sidebar/index"
import { MobileMenuButton } from "@/components/sidebar/MobileMenu"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Sidebar />
      <MobileMenuButton onClick={() => {}} />
      <div className="lg:ml-72">{children}</div>
    </ThemeProvider>
  )
}