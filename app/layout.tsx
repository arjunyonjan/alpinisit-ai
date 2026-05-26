import type { Metadata } from "next"
import "./globals.css"
import Sidebar from "@/components/sidebar"

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

      <body className="bg-[#fafafa]">

        <Sidebar />

        <div className="lg:ml-72">
          {children}
        </div>

      </body>

    </html>
  )
}
