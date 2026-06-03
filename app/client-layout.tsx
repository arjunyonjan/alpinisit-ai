"use client"

import Sidebar from "@/components/sidebar/index"
import { MobileMenuButton } from "@/components/sidebar/MobileMenu"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="lg:ml-72">{children}</div>
    </>
  )
}