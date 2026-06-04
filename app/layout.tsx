import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./client-layout"
import { ThemeProvider } from "@/contexts/ThemeContext"

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes" />
      </head>
      <body className={`${inter.variable} font-sans bg-[#f8fafc]`}>
        <ThemeProvider><ClientLayout>{children}</ClientLayout></ThemeProvider>
      </body>
    </html>
  )
}