"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Briefcase,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  Users,
  Wallet,
  ChevronRight,
  Plus,
} from "lucide-react"

export default function DashboardPage() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    walletAddress: "0x1234...5678",
    balance: 125,
    skills: ["JavaScript", "React", "Node.js"],
    interests: ["Blockchain", "Solidity", "UI/UX Design"],
    profileImage: "/placeholder.svg?height=100&width=100",
  })

  const [upcomingSessions, setUpcomingSessions] = useState([
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
  ])

  const [teachingSessions, setTeachingSessions] = useState([
    {
      id: 3,
      title: "JavaScript Basics",
      student: "Emma Wilson",
      date: "2025-03-21T15:30:00",
      duration: 45,
      status: "confirmed",
    },
  ])

  const [contracts, setContracts] = useState([
    {
      id: 1,
      title: "React Hooks Training",
      with: "Sarah Johnson",
      date: "2025-03-20",
      status: "active",
      contractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    },
    {
      id: 2,
      title: "JavaScript Tutoring",
      with: "Emma Wilson",
      date: "2025-03-21",
      status: "pending",
      contractAddress: null,
    },
  ])

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <Card className="cyber-card md:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-600/30 mb-4 cyber-avatar">
                  <img
                    src={user.profileImage || "/placeholder.svg"}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
                <p className="text-sm text-gray-400 mb-4">{user.email}</p>

                <div className="w-full p-3 rounded-lg bg-gray-900/50 border border-gray-800 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Wallet</span>
                    <Badge variant="outline" className="bg-blue-900/30 border-blue-700/30 text-blue-400">
                      Connected
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 truncate max-w-[120px]">{user.walletAddress}</span>
                    <div className="flex items-center">
                      <Wallet className="h-4 w-4 text-blue-400 mr-1" />
                      <span className="text-sm font-medium text-white">{user.balance} SKT</span>
                    </div>
                  </div>
                </div>

                <div className="w-full space-y-3">
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-2">My Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill, index) => (
                        <Badge key={index} className="bg-blue-600/20 text-blue-400 border-blue-700/30">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-2">My Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.interests.map((interest, index) => (
                        <Badge key={index} className="bg-pink-600/20 text-pink-400 border-pink-700/30">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Dashboard Content */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white neon-text-blue">Dashboard</h1>
              <Button className="cyber-button rounded-md">
                <Wallet className="mr-2 h-4 w-4" />
                Buy Tokens
              </Button>
            </div>

            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="cyber-tabs mb-4">
                <TabsTrigger value="upcoming" className="data-[state=active]:cyber-tab-active">
                  Upcoming Sessions
                </TabsTrigger>
                <TabsTrigger value="teaching" className="data-[state=active]:cyber-tab-active">
                  Teaching
                </TabsTrigger>
                <TabsTrigger value="contracts" className="data-[state=active]:cyber-tab-active">
                  Contracts
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
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
                                <Users className="h-4 w-4 mr-1 text-blue-400" />
                                <span>Teacher: {session.teacher}</span>
                              </div>
                              <div className="flex items-center mr-4">
                                <Calendar className="h-4 w-4 mr-1 text-blue-400" />
                                <span>{formatDate(session.date)}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-blue-400" />
                                <span>{session.duration} minutes</span>
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" size="sm" className="cyber-button-outline">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                              <Button size="sm" className="cyber-button">
                                Join Session
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <BookOpen className="h-12 w-12 mx-auto text-gray-600 mb-3" />
                    <h3 className="text-lg font-medium text-white mb-1">No upcoming sessions</h3>
                    <p className="text-sm text-gray-400 mb-4">You don't have any learning sessions scheduled.</p>
                    <Button className="cyber-button rounded-md">
                      <Plus className="h-4 w-4 mr-1" />
                      Book a Session
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="teaching" className="space-y-4">
                {teachingSessions.length > 0 ? (
                  teachingSessions.map((session) => (
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
                                <Users className="h-4 w-4 mr-1 text-pink-400" />
                                <span>Student: {session.student}</span>
                              </div>
                              <div className="flex items-center mr-4">
                                <Calendar className="h-4 w-4 mr-1 text-pink-400" />
                                <span>{formatDate(session.date)}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-pink-400" />
                                <span>{session.duration} minutes</span>
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" size="sm" className="cyber-button-outline">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                              <Button size="sm" className="cyber-button">
                                Start Session
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <Briefcase className="h-12 w-12 mx-auto text-gray-600 mb-3" />
                    <h3 className="text-lg font-medium text-white mb-1">No teaching sessions</h3>
                    <p className="text-sm text-gray-400 mb-4">You don't have any teaching sessions scheduled.</p>
                    <Button className="cyber-button rounded-md">
                      <Plus className="h-4 w-4 mr-1" />
                      Offer Your Skills
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="contracts" className="space-y-4">
                {contracts.length > 0 ? (
                  contracts.map((contract) => (
                    <Card key={contract.id} className="cyber-card overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div
                            className={`w-full md:w-2 ${contract.status === "active" ? "bg-blue-500" : "bg-yellow-500"}`}
                          ></div>
                          <div className="p-4 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                              <h3 className="text-lg font-medium text-white">{contract.title}</h3>
                              <Badge
                                className={
                                  contract.status === "active"
                                    ? "bg-blue-900/30 text-blue-400 border-blue-700/30"
                                    : "bg-yellow-900/30 text-yellow-400 border-yellow-700/30"
                                }
                              >
                                {contract.status === "active" ? "Active" : "Pending"}
                              </Badge>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-400 mb-3">
                              <div className="flex items-center mr-4">
                                <Users className="h-4 w-4 mr-1 text-blue-400" />
                                <span>With: {contract.with}</span>
                              </div>
                              <div className="flex items-center mr-4">
                                <Calendar className="h-4 w-4 mr-1 text-blue-400" />
                                <span>Created: {contract.date}</span>
                              </div>
                              {contract.contractAddress && (
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-1 text-blue-400" />
                                  <span className="truncate max-w-[150px]">
                                    {contract.contractAddress.slice(0, 6)}...{contract.contractAddress.slice(-4)}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex justify-end space-x-2">
                              {contract.status === "pending" ? (
                                <Button size="sm" className="cyber-button">
                                  Generate Contract
                                  <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                              ) : (
                                <Button size="sm" className="cyber-button">
                                  View Contract
                                  <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <FileText className="h-12 w-12 mx-auto text-gray-600 mb-3" />
                    <h3 className="text-lg font-medium text-white mb-1">No contracts</h3>
                    <p className="text-sm text-gray-400 mb-4">You don't have any active or pending contracts.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

