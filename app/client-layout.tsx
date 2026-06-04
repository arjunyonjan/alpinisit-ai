"use client"

import Sidebar from "@/components/sidebar/index"
import { MobileMenuButton } from "@/components/sidebar/MobileMenu"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 lg:ml-72">
        <MobileMenuButton onClick={() => {}} />
        {children}
      </div>
    </div>
  )
}