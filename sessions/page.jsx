"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, ChevronRight, Clock, Video, MessageSquare, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SessionsPage() {
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
  }, [])

  // Mock upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      title: "Introduction to React Hooks",
      teacher: "Sarah Johnson",
      teacherImage: "/placeholder.svg?height=40&width=40",
      date: "2025-03-20T14:00:00",
      duration: 60,
      status: "confirmed",
      type: "learning",
      price: 50,
    },
    {
      id: 2,
      title: "Blockchain Fundamentals",
      teacher: "Michael Chen",
      teacherImage: "/placeholder.svg?height=40&width=40",
      date: "2025-03-22T10:00:00",
      duration: 90,
      status: "pending",
      type: "learning",
      price: 70,
    },
    {
      id: 3,
      title: "JavaScript Basics",
      student: "Emma Wilson",
      studentImage: "/placeholder.svg?height=40&width=40",
      date: "2025-03-25T15:30:00",
      duration: 60,
      status: "confirmed",
      type: "teaching",
      price: 45,
    },
  ]

  // Mock past sessions
  const pastSessions = [
    {
      id: 101,
      title: "Advanced CSS Techniques",
      teacher: "David Kim",
      teacherImage: "/placeholder.svg?height=40&width=40",
      date: "2025-03-10T11:00:00",
      duration: 75,
      status: "completed",
      type: "learning",
      price: 55,
      rating: 5,
    },
    {
      id: 102,
      title: "React Component Patterns",
      student: "Lisa Chen",
      studentImage: "/placeholder.svg?height=40&width=40",
      date: "2025-03-05T16:00:00",
      duration: 60,
      status: "completed",
      type: "teaching",
      price: 60,
      rating: 4,
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
    <div className="container py-10">
      <h1 className="text-2xl font-bold text-white neon-text-blue mb-6">My Sessions</h1>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="cyber-tabs mb-6">
          <TabsTrigger value="upcoming" className="data-[state=active]:cyber-tab-active">
            Upcoming Sessions
          </TabsTrigger>
          <TabsTrigger value="past" className="data-[state=active]:cyber-tab-active">
            Past Sessions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {upcomingSessions.length > 0 ? (
            upcomingSessions.map((session) => (
              <Card key={session.id} className="cyber-card overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div
                      className={`w-full md:w-2 ${
                        session.status === "confirmed"
                          ? "bg-green-500"
                          : session.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                    ></div>
                    <div className="p-4 flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Badge
                            className={`mr-2 ${
                              session.type === "teaching"
                                ? "bg-blue-900/30 text-blue-400 border-blue-700/30"
                                : "bg-pink-900/30 text-pink-400 border-pink-700/30"
                            }`}
                          >
                            {session.type === "teaching" ? "Teaching" : "Learning"}
                          </Badge>
                          <h3 className="text-lg font-medium text-white">{session.title}</h3>
                        </div>
                        <Badge
                          className={
                            session.status === "confirmed"
                              ? "bg-green-900/30 text-green-400 border-green-700/30"
                              : session.status === "pending"
                                ? "bg-yellow-900/30 text-yellow-400 border-yellow-700/30"
                                : "bg-blue-900/30 text-blue-400 border-blue-700/30"
                          }
                        >
                          {session.status === "confirmed"
                            ? "Confirmed"
                            : session.status === "pending"
                              ? "Pending"
                              : "Scheduled"}
                        </Badge>
                      </div>

                      <div className="flex items-center mb-3">
                        <Avatar className="h-8 w-8 mr-2 cyber-avatar">
                          <AvatarImage
                            src={session.type === "teaching" ? session.studentImage : session.teacherImage}
                            alt={session.type === "teaching" ? session.student : session.teacher}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-pink-600 text-white text-xs">
                            {session.type === "teaching" ? session.student?.charAt(0) : session.teacher?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-300">
                          {session.type === "teaching" ? `Student: ${session.student}` : `Teacher: ${session.teacher}`}
                        </span>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-400 mb-3">
                        <div className="flex items-center mr-4">
                          <Calendar className="h-4 w-4 mr-1 text-blue-400" />
                          <span>{formatDate(session.date)}</span>
                        </div>
                        <div className="flex items-center mr-4">
                          <Clock className="h-4 w-4 mr-1 text-blue-400" />
                          <span>{session.duration} minutes</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-blue-400">{session.price} tokens</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {session.status === "confirmed" && (
                          <Button size="sm" className="cyber-button-enhanced" asChild>
                            <Link href={`/video-call/${session.id}`}>
                              <Video className="h-4 w-4 mr-1" />
                              Join Call
                            </Link>
                          </Button>
                        )}
                        <Button size="sm" className="cyber-button" asChild>
                          <Link href={`/chat/${session.id}`}>
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Chat
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" className="cyber-button" asChild>
                          <Link href={`/sessions/${session.id}`}>
                            Details
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-10">
              <Calendar className="h-12 w-12 mx-auto text-gray-600 mb-3" />
              <h3 className="text-lg font-medium text-white mb-1">No upcoming sessions</h3>
              <p className="text-sm text-gray-400 mb-4">Book a session to start learning or teaching.</p>
              <Button className="cyber-button-enhanced rounded-md" asChild>
                <Link href="/explore">Find Skills</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          {pastSessions.length > 0 ? (
            pastSessions.map((session) => (
              <Card key={session.id} className="cyber-card overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div
                      className={`w-full md:w-2 ${session.type === "teaching" ? "bg-blue-500" : "bg-pink-500"}`}
                    ></div>
                    <div className="p-4 flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Badge
                            className={`mr-2 ${
                              session.type === "teaching"
                                ? "bg-blue-900/30 text-blue-400 border-blue-700/30"
                                : "bg-pink-900/30 text-pink-400 border-pink-700/30"
                            }`}
                          >
                            {session.type === "teaching" ? "Teaching" : "Learning"}
                          </Badge>
                          <h3 className="text-lg font-medium text-white">{session.title}</h3>
                        </div>
                        <Badge className="bg-gray-900/30 text-gray-400 border-gray-700/30">Completed</Badge>
                      </div>

                      <div className="flex items-center mb-3">
                        <Avatar className="h-8 w-8 mr-2 cyber-avatar">
                          <AvatarImage
                            src={session.type === "teaching" ? session.studentImage : session.teacherImage}
                            alt={session.type === "teaching" ? session.student : session.teacher}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-pink-600 text-white text-xs">
                            {session.type === "teaching" ? session.student?.charAt(0) : session.teacher?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-300">
                          {session.type === "teaching" ? `Student: ${session.student}` : `Teacher: ${session.teacher}`}
                        </span>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-400 mb-3">
                        <div className="flex items-center mr-4">
                          <Calendar className="h-4 w-4 mr-1 text-blue-400" />
                          <span>{formatDate(session.date)}</span>
                        </div>
                        <div className="flex items-center mr-4">
                          <Clock className="h-4 w-4 mr-1 text-blue-400" />
                          <span>{session.duration} minutes</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-blue-400">{session.price} tokens</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" className="cyber-button" asChild>
                          <Link href={`/sessions/${session.id}/recording`}>
                            <Video className="h-4 w-4 mr-1" />
                            View Recording
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" className="cyber-button" asChild>
                          <Link href={`/sessions/${session.id}`}>
                            Details
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-10">
              <User className="h-12 w-12 mx-auto text-gray-600 mb-3" />
              <h3 className="text-lg font-medium text-white mb-1">No past sessions</h3>
              <p className="text-sm text-gray-400 mb-4">
                Your session history will appear here after you complete sessions.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

