"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, BookOpenIcon, MessageSquareIcon, TrendingUpIcon, VideoIcon, SearchIcon } from "lucide-react"
import { checkIsLoggedIn, getUserData, logout, isSessionValid, updateLastActivity } from "@/lib/auth"

export default function Dashboard() {
  const router = useRouter()
  const isInitialMount = useRef(true)
  const [mounted, setMounted] = useState(false)
  const [userData, setUserData] = useState(null)
  const [upcomingSessions, setUpcomingSessions] = useState([])
  const [recentMessages, setRecentMessages] = useState([])
  const [recommendedSkills, setRecommendedSkills] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setMounted(true)

    // Check if user is logged in - only on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false

      const checkAuth = () => {
        // Check both login status and session validity
        const loggedIn = checkIsLoggedIn()
        const sessionValid = isSessionValid()

        if (!loggedIn || !sessionValid) {
          // Clear any stale data and redirect to login
          logout()
          // Use window.location for a full page reload
          window.location.href = "/login"
          return false
        }

        // Get user data
        const user = getUserData()
        if (user) {
          setUserData(user)
          // Update last activity timestamp
          updateLastActivity()
          return true
        } else {
          // If we have isLoggedIn=true but no user data, something's wrong
          logout()
          window.location.href = "/login"
          return false
        }
      }

      // Only proceed with loading data if auth check passes
      const authValid = checkAuth()
      if (!authValid) return

      // Mock data for dashboard - only set if auth is valid
      setUpcomingSessions([
        {
          id: 1,
          title: "JavaScript Basics",
          teacher: "Alex Johnson",
          date: "2025-03-25T14:00:00",
          status: "confirmed",
        },
        {
          id: 2,
          title: "React Hooks Deep Dive",
          teacher: "Sarah Miller",
          date: "2025-03-27T10:30:00",
          status: "pending",
        },
      ])

      setRecentMessages([
        { id: 1, from: "Alex Johnson", message: "Looking forward to our session!", time: "2 hours ago", unread: true },
        { id: 2, from: "Support Team", message: "Your account has been verified", time: "1 day ago", unread: false },
      ])

      setRecommendedSkills([
        { id: 1, name: "Python Programming", popularity: "High", matchScore: 95 },
        { id: 2, name: "UI/UX Design", popularity: "Medium", matchScore: 88 },
        { id: 3, name: "Data Analysis", popularity: "High", matchScore: 82 },
      ])

      setIsLoading(false)
    }
  }, [])

  // Function to get user's first name
  const getFirstName = () => {
    if (!userData || !userData.name) return ""
    return userData.name.split(" ")[0]
  }

  // Function to format date
  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Handle navigation without causing auth loops
  const handleNavigation = (path) => {
    // Update activity timestamp before navigation
    updateLastActivity()
    router.push(path)
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
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="flex items-center mb-8">
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

        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search for skills, teachers, or topics..."
            className="w-full bg-gray-900 border border-gray-700 rounded-full py-3 px-6 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <SearchIcon className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Upcoming Sessions */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center mb-4">
              <CalendarIcon className="text-purple-500 mr-2" />
              <h2 className="text-xl font-bold">Upcoming Sessions</h2>
            </div>

            {upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{session.title}</h3>
                        <p className="text-sm text-gray-400">with {session.teacher}</p>
                        <p className="text-sm text-gray-400 mt-1">{formatDate(session.date)}</p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          session.status === "confirmed"
                            ? "bg-green-900 text-green-400"
                            : "bg-yellow-900 text-yellow-400"
                        }`}
                      >
                        {session.status === "confirmed" ? "Confirmed" : "Pending"}
                      </span>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button
                        onClick={() => handleNavigation(`/video-call/${session.id}`)}
                        className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white text-sm px-3 py-1.5 rounded-md transition duration-300"
                      >
                        <VideoIcon className="w-4 h-4 mr-1" />
                        Join
                      </button>
                      <button
                        onClick={() => handleNavigation(`/chat/${session.id}`)}
                        className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white text-sm px-3 py-1.5 rounded-md transition duration-300"
                      >
                        <MessageSquareIcon className="w-4 h-4 mr-1" />
                        Chat
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming sessions</p>
            )}

            <button
              onClick={() => handleNavigation("/sessions")}
              className="w-full mt-4 text-center text-sm text-purple-400 hover:text-purple-300"
            >
              View all sessions
            </button>
          </div>

          {/* Recent Messages */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center mb-4">
              <MessageSquareIcon className="text-purple-500 mr-2" />
              <h2 className="text-xl font-bold">Recent Messages</h2>
            </div>

            {recentMessages.length > 0 ? (
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="flex items-start p-3 rounded-lg hover:bg-gray-800 transition duration-150 cursor-pointer"
                    onClick={() => handleNavigation(`/messages/${msg.id}`)}
                  >
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                        {msg.from.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{msg.from}</p>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-sm text-gray-400 truncate">{msg.message}</p>
                    </div>
                    {msg.unread && <span className="w-2 h-2 bg-purple-500 rounded-full"></span>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent messages</p>
            )}

            <button
              onClick={() => handleNavigation("/messages")}
              className="w-full mt-4 text-center text-sm text-purple-400 hover:text-purple-300"
            >
              View all messages
            </button>
          </div>

          {/* Recommended Skills */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center mb-4">
              <TrendingUpIcon className="text-purple-500 mr-2" />
              <h2 className="text-xl font-bold">Recommended for You</h2>
            </div>

            {recommendedSkills.length > 0 ? (
              <div className="space-y-3">
                {recommendedSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-750 transition duration-150"
                    onClick={() => handleNavigation(`/skill/${skill.id}`)}
                  >
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{skill.name}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-900 text-purple-400">
                        {skill.matchScore}% Match
                      </span>
                    </div>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-gray-400 mr-2">Popularity:</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          skill.popularity === "High"
                            ? "bg-green-900 text-green-400"
                            : skill.popularity === "Medium"
                              ? "bg-yellow-900 text-yellow-400"
                              : "bg-blue-900 text-blue-400"
                        }`}
                      >
                        {skill.popularity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recommendations yet</p>
            )}

            <button
              onClick={() => handleNavigation("/explore")}
              className="w-full mt-4 text-center text-sm text-purple-400 hover:text-purple-300"
            >
              Explore more skills
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => handleNavigation("/explore")}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl p-4 flex flex-col items-center justify-center transition duration-300"
          >
            <SearchIcon className="w-6 h-6 mb-2" />
            <span>Find Skills</span>
          </button>

          <button
            onClick={() => handleNavigation("/teach")}
            className="bg-gray-800 hover:bg-gray-700 text-white rounded-xl p-4 flex flex-col items-center justify-center transition duration-300"
          >
            <BookOpenIcon className="w-6 h-6 mb-2" />
            <span>Teach a Skill</span>
          </button>

          <button
            onClick={() => handleNavigation("/sessions")}
            className="bg-gray-800 hover:bg-gray-700 text-white rounded-xl p-4 flex flex-col items-center justify-center transition duration-300"
          >
            <CalendarIcon className="w-6 h-6 mb-2" />
            <span>My Sessions</span>
          </button>

          <button
            onClick={() => handleNavigation("/wallet")}
            className="bg-gray-800 hover:bg-gray-700 text-white rounded-xl p-4 flex flex-col items-center justify-center transition duration-300"
          >
            <svg
              className="w-6 h-6 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <span>My Wallet</span>
          </button>
        </div>
      </div>
    </div>
  )
}
