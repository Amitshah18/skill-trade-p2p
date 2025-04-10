"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Star, Users, Clock } from "lucide-react"
import AuthCheckModal from "./auth-check-modal"

export default function FeaturedSkills() {
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const featuredSkills = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      teacher: "Alex Johnson",
      category: "Programming",
      price: 50,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      students: 128,
      hours: 24,
    },
    {
      id: 2,
      title: "Blockchain Development",
      teacher: "Maria Garcia",
      category: "Web3",
      price: 75,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
      students: 96,
      hours: 36,
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      teacher: "David Kim",
      category: "Design",
      price: 60,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      students: 112,
      hours: 18,
    },
    {
      id: 4,
      title: "Smart Contract Development",
      teacher: "Sophia Chen",
      category: "Web3",
      price: 80,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
      students: 84,
      hours: 30,
    },
  ]

  const handleBookSession = () => {
    setAuthModalOpen(true)
  }

  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 cyber-grid z-0 opacity-30"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-bl from-blue-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-pink-600/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-8">
          <div className="space-y-3 text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl gradient-text-blue-pink">
              Featured Skills
            </h2>
            <p className="mx-auto text-gray-400 md:text-lg">
              Discover our most popular skill exchanges on the platform, taught by expert instructors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 w-full">
            {featuredSkills.map((skill) => (
              <div key={skill.id} className="glossy-card cyber-card-hover">
                <div className="cyber-card-content overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden group">
                    <Image
                      src={skill.image || "/placeholder.svg"}
                      alt={skill.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm">by {skill.teacher}</p>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="cyber-badge bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border-blue-500/50 text-white">
                        {skill.category}
                      </Badge>
                      <div className="flex items-center bg-yellow-900/30 px-2 py-1 rounded-full border border-yellow-500/30">
                        <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-xs font-medium text-yellow-400">{skill.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-lg mb-2 text-white">{skill.title}</h3>

                    <div className="flex flex-col space-y-1 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Users className="h-3.5 w-3.5 mr-2 text-blue-400" />
                        <span>{skill.students} students</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-2 text-blue-400" />
                        <span>{skill.hours} hours of content</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex justify-between items-center">
                    <p className="font-bold text-lg text-white">
                      {skill.price} <span className="text-sm font-normal text-gray-400">tokens</span>
                    </p>
                    <Button className="cyber-button-enhanced rounded-md text-white" onClick={handleBookSession}>
                      Book Session
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            className="mt-10 cyber-button rounded-md border-white/30 backdrop-blur-sm hover:bg-white/10 text-white"
            onClick={() => setAuthModalOpen(true)}
          >
            View All Skills
          </Button>
        </div>
      </div>

      <AuthCheckModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} action="book a session" />
    </section>
  )
}

