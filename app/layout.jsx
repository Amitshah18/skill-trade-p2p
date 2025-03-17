import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Skill Trade - Web3 Skill Sharing Platform",
  description: "A decentralized platform for peer-to-peer skill exchange",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} cyber-background min-h-screen overflow-auto`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {/* Animated particles */}
          <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="particle w-1 h-1 top-[10%] left-[20%] opacity-30"></div>
            <div className="particle w-2 h-2 top-[30%] left-[80%] opacity-20"></div>
            <div className="particle w-1 h-1 top-[70%] left-[10%] opacity-30"></div>
            <div className="particle w-2 h-2 top-[40%] left-[60%] opacity-20"></div>
            <div className="particle w-1 h-1 top-[80%] left-[30%] opacity-30"></div>
            <div className="particle w-1 h-1 top-[20%] left-[40%] opacity-20"></div>
            <div className="particle w-2 h-2 top-[60%] left-[70%] opacity-30"></div>
            <div className="particle w-1 h-1 top-[90%] left-[85%] opacity-20"></div>
            <div className="particle w-1 h-1 top-[15%] left-[75%] opacity-30"></div>
            <div className="particle w-2 h-2 top-[45%] left-[15%] opacity-20"></div>

            {/* Gradient orbs */}
            <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-pink-600/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-blue-600/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-gradient-to-bl from-purple-600/10 to-transparent rounded-full blur-3xl"></div>
          </div>

          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'