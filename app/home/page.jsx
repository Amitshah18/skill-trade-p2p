"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Calendar, ChevronRight, Clock, Search, Star, Wallet } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoggedInHomePage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch user data from localStorage
  useEffect(() => {
    const getUserFromStorage = () => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user")
        const userToken = localStorage.getItem("userToken")

        if (!userToken) {
          // Redirect to login if not authenticated
          router.push("/login")
          return null
        }

        if (storedUser) {
          try {
            return JSON.parse(storedUser)
          } catch (e) {
            console.error("Failed to parse user from localStorage", e)
          }
        }
      }
      return null
    }

    const userData = getUserFromStorage()
    if (userData) {
      setUser(userData)
    }
    setIsLoading(false)
  }, [router])

  // Mock recommended skills based on user interests
  const recommendedSkills = [
    {
      id: 1,
      title: "Advanced React Patterns",
      teacher: "Sarah Johnson",
      rating: 4.9,
      students: 245,
      price: 65,
      image: "/placeholder.svg?height=200&width=300",
      category: "Programming",
    },
    {
      id: 2,
      title: "Web3 Development Fundamentals",
      teacher: "Michael Chen",
      rating: 4.8,
      students: 189,
      price: 70,
      image: "/placeholder.svg?height=200&width=300",
      category: "Blockchain",
    },
    {
      id: 3,
      title: "Mobile App Design Principles",
      teacher: "Emma Wilson",
      rating: 4.7,
      students: 156,
      price: 55,
      image: "/placeholder.svg?height=200&width=300",
      category: "Design",
    },
  ]

  // Mock upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      title: "Introduction to React Hooks",
      teacher: "Sarah Johnson",
      date: "2025-03-20T14:00:00",
      duration: 60,
      status: "confirmed",
    },
    {
      id: 2,
      title: "Blockchain Fundamentals",
      teacher: "Michael Chen",
      date: "2025-03-22T10:00:00",
      duration: 90,
      status: "pending",
    },
  ]

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      {/* Welcome Hero Section */}
      <section className="w-full py-16 md:py-24 relative overflow-hidden">
        {/* Cyberpunk grid background */}
        <div className="absolute inset-0 cyber-grid z-0 opacity-30"></div>

        {/* Abstract background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="space-y-6 flex-1">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl neon-text-blue">
                Welcome back, <span className="neon-text-pink">{user?.name || "User"}</span>
              </h1>
              <p className="text-lg text-blue-100 max-w-[600px]">
                Continue your learning journey or share your knowledge with others. What would you like to do today?
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="cyber-button-enhanced rounded-md group" asChild>
                  <Link href="/explore">
                    Find Skills <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="cyber-button rounded-md border-white/30 backdrop-blur-sm hover:bg-white/10 text-white"
                  asChild
                >
                  <Link href="/teach">Teach Skills</Link>
                </Button>
              </div>
            </div>

            <div className="flex-1">
              <Card className="cyber-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="h-16 w-16 border-2 border-blue-500/30 cyber-avatar">
                      <AvatarImage
                        src={user?.image || "/placeholder.svg?height=64&width=64"}
                        alt={user?.name || "User"}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-pink-600 text-white text-xl">
                        {user?.initials || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-bold text-white">{user?.name || "User"}</h2>
                      <div className="flex items-center mt-1">
                        <Wallet className="h-4 w-4 text-blue-400 mr-1" />
                        <span className="text-blue-300">250 tokens available</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                      <h3 className="font-medium text-white mb-2">My Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {user?.skills?.map((skill, index) => (
                          <Badge key={index} className="bg-blue-600/20 text-blue-400 border-blue-700/30">
                            {skill}
                          </Badge>
                        )) || <p className="text-sm text-gray-400">No skills added yet</p>}
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                      <h3 className="font-medium text-white mb-2">My Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {user?.interests?.map((interest, index) => (
                          <Badge key={index} className="bg-pink-600/20 text-pink-400 border-pink-700/30">
                            {interest}
                          </Badge>
                        )) || <p className="text-sm text-gray-400">No interests added yet</p>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Sessions Section */}
      <section className="w-full py-12 bg-gray-900/30 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid z-0 opacity-20"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Upcoming Sessions</h2>
            <Button variant="outline" className="cyber-button" asChild>
              <Link href="/dashboard">View All</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map((session) => (
                <Card key={session.id} className="cyber-card overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div
                        className={`w-full md:w-2 ${session.status === "confirmed" ? "bg-green-500" : "bg-yellow-500"}`}
                      ></div>
                      <div className="p-4 flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <h3 className="text-lg font-medium text-white">{session.title}</h3>
                          <Badge
                            className={
                              session.status === "confirmed"
                                ? "bg-green-900/30 text-green-400 border-green-700/30"
                                : "bg-yellow-900/30 text-yellow-400 border-yellow-700/30"
                            }
                          >
                            {session.status === "confirmed" ? "Confirmed" : "Pending"}
                          </Badge>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-400 mb-3">
                          <div className="flex items-center mr-4">
                            <Calendar className="h-4 w-4 mr-1 text-blue-400" />
                            <span>{formatDate(session.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-blue-400" />
                            <span>{session.duration} minutes</span>
                          </div>
                        </div>
                        <Button size="sm" className="cyber-button">
                          Join Session
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-10">
                <Calendar className="h-12 w-12 mx-auto text-gray-600 mb-3" />
                <h3 className="text-lg font-medium text-white mb-1">No upcoming sessions</h3>
                <p className="text-sm text-gray-400 mb-4">Book a session to start learning or teaching.</p>
                <Button className="cyber-button-enhanced rounded-md" asChild>
                  <Link href="/explore">Find Skills</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Recommended Skills Section */}
      <section className="w-full py-16 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid z-0 opacity-30"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Recommended For You</h2>
              <p className="text-gray-400 mt-1">Based on your interests</p>
            </div>
            <Button variant="outline" className="cyber-button" asChild>
              <Link href="/explore">View All</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedSkills.map((skill) => (
              <Card key={skill.id} className="cyber-card overflow-hidden">
                <div className="relative h-40 w-full">
                  <img
                    src={skill.image || "/placeholder.svg"}
                    alt={skill.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <Badge className="absolute top-3 right-3 bg-blue-600/30 text-blue-300 border-blue-700/30">
                    {skill.category}
                  </Badge>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1 text-white">{skill.title}</h3>
                  <p className="text-sm text-blue-300 mb-2">by {skill.teacher}</p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-sm text-gray-300">
                        {skill.rating} ({skill.students} students)
                      </span>
                    </div>
                    <span className="font-medium text-white">{skill.price} tokens</span>
                  </div>

                  <Button className="w-full cyber-button-enhanced rounded-md text-white">Book Session</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="w-full py-12 bg-gray-900/30 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid z-0 opacity-20"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <h2 className="text-2xl font-bold text-white mb-8">Quick Actions</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="cyber-card hover:transform hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600/20 to-pink-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="font-medium text-white mb-2">Find Skills</h3>
                <p className="text-sm text-gray-400 mb-4">Discover new skills to learn from expert teachers</p>
                <Button className="w-full cyber-button" asChild>
                  <Link href="/explore">Explore</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="cyber-card hover:transform hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600/20 to-pink-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="font-medium text-white mb-2">Teach Skills</h3>
                <p className="text-sm text-gray-400 mb-4">Share your knowledge and earn tokens</p>
                <Button className="w-full cyber-button" asChild>
                  <Link href="/teach">Start Teaching</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="cyber-card hover:transform hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600/20 to-pink-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="font-medium text-white mb-2">My Sessions</h3>
                <p className="text-sm text-gray-400 mb-4">View and manage your upcoming sessions</p>
                <Button className="w-full cyber-button" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="cyber-card hover:transform hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600/20 to-pink-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
                  <Wallet className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="font-medium text-white mb-2">Wallet</h3>
                <p className="text-sm text-gray-400 mb-4">Manage your tokens and transactions</p>
                <Button className="w-full cyber-button" asChild>
                  <Link href="/wallet">View Wallet</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}

