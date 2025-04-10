"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SkillSearch() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    // In a real app, this would trigger the AI matching algorithm
    console.log("Searching for:", searchQuery)
  }

  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden">
      {/* Enhanced cyberpunk grid background */}
      <div className="absolute inset-0 cyber-grid-blocks z-0 opacity-40"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-pink-600/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-3 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl gradient-text-blue-pink">
              Find Your Perfect Skill Match
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-lg">
              Our AI will match you with the best teacher for your learning needs.
            </p>
          </div>

          <div className="w-full max-w-md space-y-2">
            <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="What do you want to learn?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 cyber-input rounded-full focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <Button type="submit" className="cyber-button-enhanced rounded-md group holographic">
                <Search className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                Search
              </Button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-4xl">
            {[
              { title: "Web Development", desc: "Learn to build modern websites and web applications" },
              { title: "Blockchain", desc: "Master the fundamentals of Web3 and blockchain technology" },
              { title: "Digital Marketing", desc: "Learn strategies to grow your online presence" },
            ].map((skill, index) => (
              <div key={index} className="cyber-card group cyber-card-hover neon-border">
                <div className="cyber-card-content p-6">
                  <h3 className="font-medium mb-2 text-white group-hover:neon-text-blue transition-all duration-300">
                    {skill.title}
                  </h3>
                  <p className="text-sm text-blue-300 group-hover:text-blue-200 transition-colors">{skill.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button variant="outline" className="cyber-button-enhanced rounded-md">
              View All Categories
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
