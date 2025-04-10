import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="w-full py-24 md:py-32 lg:py-40 relative overflow-hidden">
      {/* Enhanced cyberpunk grid background */}
      <div className="absolute inset-0 cyber-grid-blocks z-0 opacity-40"></div>

      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl"></div>

        {/* Floating particles */}
        <div className="particle w-1 h-1 top-[10%] left-[20%] opacity-30"></div>
        <div className="particle w-2 h-2 top-[30%] left-[80%] opacity-20"></div>
        <div className="particle w-1 h-1 top-[70%] left-[10%] opacity-30"></div>
        <div className="particle w-2 h-2 top-[40%] left-[60%] opacity-20"></div>
        <div className="particle w-1 h-1 top-[80%] left-[30%] opacity-30"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm text-sm font-medium mb-2 border border-white/10 neon-border">
              Web3-Powered Skill Exchange
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl neon-text-blue">
              Share Skills, <span className="neon-text-pink">Earn Tokens</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-[600px]">
              A decentralized platform for peer-to-peer skill exchange. Teach what you know, learn what you don't, and
              get rewarded in the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="cyber-button-enhanced rounded-md group holographic" asChild>
                <Link href="/explore">
                  Explore Skills <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="cyber-button rounded-md border-white/30 backdrop-blur-sm hover:bg-white/10 text-white"
                asChild
              >
                <Link href="/teach">Become a Teacher</Link>
              </Button>
            </div>

            <div className="flex items-center space-x-4 text-sm mt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-800 overflow-hidden cyber-avatar">
                    <Image src={`/placeholder.svg?height=50&width=50&text=${i}`} alt="User" width={32} height={32} />
                  </div>
                ))}
              </div>
              <p className="text-blue-200">
                Join <span className="font-bold neon-text-blue">2,000+</span> users already learning
              </p>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg blur-3xl opacity-30"></div>
            <div className="relative glass-card border border-white/10 p-6 rounded-xl shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Web Development", price: "50", rating: "4.9" },
                  { title: "Blockchain", price: "75", rating: "4.8" },
                  { title: "UI/UX Design", price: "60", rating: "4.7" },
                  { title: "Smart Contracts", price: "80", rating: "4.9" },
                ].map((skill, i) => (
                  <div key={i} className="cyber-card cyber-card-hover">
                    <div className="cyber-card-content p-4">
                      <h3 className="font-medium text-white">{skill.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-blue-300">{skill.price} tokens</span>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          <span className="ml-1 text-sm text-blue-300">{skill.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-lg text-center border border-white/10 backdrop-blur-sm">
                <p className="text-white font-medium neon-text-blue">AI-powered skill matching</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
