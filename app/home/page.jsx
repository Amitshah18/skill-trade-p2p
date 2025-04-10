"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { checkIsLoggedIn, getUserData, isSessionValid, updateLastActivity } from "@/lib/auth"
import SkillMatching from "@/components/skill-matching"
import SkillProgressTracker from "@/components/skill-progress-tracker"
import { BookOpen, Calendar, MessageSquare, Wallet, Search, TrendingUp, Award, Users } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const isInitialMount = useRef(true)
  const [mounted, setMounted] = useState(false)
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    tokensBalance: 0,
    upcomingSessions: 0,
    unreadMessages: 0,
    completedSessions: 0,
  })

  useEffect(() => {
    setMounted(true)

    // Check if user is logged in - only on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false

      // Check both login status and session validity
      if (!checkIsLoggedIn() || !isSessionValid()) {
        router.push("/login")
        return
      }

      // Get user data
      const user = getUserData()
      if (user) {
        setUserData(user)
        // Update last activity timestamp
        updateLastActivity()

        // Generate mock stats
        setStats({
          tokensBalance: Math.floor(Math.random() * 500) + 50,
          upcomingSessions: Math.floor(Math.random() * 5) + 1,
          unreadMessages: Math.floor(Math.random() * 10),
          completedSessions: Math.floor(Math.random() * 20) + 5,
        })
      } else {
        router.push("/login")
        return
      }
    }

    setIsLoading(false)
  }, [router])

  // Function to get user's first name
  const getFirstName = () => {
    if (!userData || !userData.name) return ""
    return userData.name.split(" ")[0]
  }

  // Don't render until client-side hydration is complete
  if (!mounted) {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-xl font-bold text-white">
              {userData?.initials || "U"}
            </div>
            <div className="ml-4">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                Welcome back, {getFirstName()}!
              </h1>
              <p className="text-gray-400">Ready to continue your skill trading journey?</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={() => router.push("/explore")}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              <Search className="mr-2 h-4 w-4" />
              Find Skills
            </Button>
            <Button
              onClick={() => router.push("/teach")}
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Teach a Skill
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center mb-2">
                <Wallet className="h-5 w-5 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">{stats.tokensBalance}</div>
              <p className="text-sm text-gray-400">Token Balance</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center mb-2">
                <Calendar className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">{stats.upcomingSessions}</div>
              <p className="text-sm text-gray-400">Upcoming Sessions</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-pink-900/30 flex items-center justify-center mb-2">
                <MessageSquare className="h-5 w-5 text-pink-400" />
              </div>
              <div className="text-2xl font-bold text-white">{stats.unreadMessages}</div>
              <p className="text-sm text-gray-400">Unread Messages</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center mb-2">
                <Award className="h-5 w-5 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">{stats.completedSessions}</div>
              <p className="text-sm text-gray-400">Completed Sessions</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="matches" className="space-y-6">
          <TabsList className="bg-gray-900 border-b border-gray-800 p-0 h-auto w-full justify-start">
            <TabsTrigger
              value="matches"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-500 data-[state=active]:shadow-none rounded-none px-4 py-3"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Skill Matches
            </TabsTrigger>
            <TabsTrigger
              value="progress"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-500 data-[state=active]:shadow-none rounded-none px-4 py-3"
            >
              <Users className="h-4 w-4 mr-2" />
              My Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="mt-6">
            <SkillMatching />
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            <SkillProgressTracker />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
