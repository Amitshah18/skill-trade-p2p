"use client"

import { useState, useEffect } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({ children }) {
  const [mounted, setMounted] = useState(false)

  // Only render once client-side hydration is complete
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen flex flex-col digital-circuit`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {/* Only render the navbar when mounted to prevent hydration mismatches */}
          {mounted && <Navbar />}
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
