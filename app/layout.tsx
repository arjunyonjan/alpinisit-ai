import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/sidebar"

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
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-[#f8fafc]`}>
        <Sidebar />
        <div className="lg:ml-72">
          {children}
        </div>
      </body>
    </html>
  )
}
