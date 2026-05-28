"use client"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Sidebar, { MobileMenuButton } from "@/components/sidebar"
import { useState } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Alpinist AI",
  description: "AI Engineering Training Platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-[#f8fafc]`}>
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        <MobileMenuButton onClick={() => setMenuOpen(true)} />
        <div className="lg:ml-72">
          {children}
        </div>
      </body>
    </html>
  )
}
