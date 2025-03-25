"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, ChevronLeft, Calendar, Clock, FileText, Paperclip, Image, MoreVertical, Phone } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"

export default function ChatPage() {
  const router = useRouter()
  const params = useParams()
  const sessionId = params?.id
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const chatContainerRef = useRef(null)

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

  // Fetch session data
  useEffect(() => {
    if (sessionId) {
      // Mock session data - in a real app, you would fetch this from an API
      const mockSession = {
        id: Number.parseInt(sessionId),
        title: "Introduction to React Hooks",
        teacher: "Sarah Johnson",
        teacherImage: "/placeholder.svg?height=40&width=40",
        date: "2025-03-20T14:00:00",
        duration: 60,
        status: "confirmed",
        type: "learning",
        price: 50,
        description: "Learn the fundamentals of React Hooks and how to use them in your applications.",
        contractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      }
      setSession(mockSession)

      // Add mock messages
      setTimeout(() => {
        addMockMessages()
      }, 1000)
    }
  }, [sessionId, user])

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatMessages])

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: user?.name || "You",
        senderImage: user?.image || "/placeholder.svg?height=40&width=40",
        text: newMessage,
        timestamp: new Date().toISOString(),
        isYou: true,
      }
      setChatMessages([...chatMessages, message])
      setNewMessage("")

      // Simulate response after a delay
      setTimeout(() => {
        const response = {
          id: Date.now() + 1,
          sender: "Sarah Johnson",
          senderImage: "/placeholder.svg?height=40&width=40",
          text: "Thanks for your question! Let me explain that in more detail...",
          timestamp: new Date().toISOString(),
          isYou: false,
        }
        setChatMessages((prev) => [...prev, response])
      }, 3000)
    }
  }

  const addMockMessages = () => {
    const initialMessages = [
      {
        id: 1,
        sender: "Sarah Johnson",
        senderImage: "/placeholder.svg?height=40&width=40",
        text: "Hi there! I'm looking forward to our upcoming session on React Hooks. Do you have any specific topics you'd like me to focus on?",
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        isYou: false,
      },
      {
        id: 2,
        sender: user?.name || "You",
        senderImage: user?.image || "/placeholder.svg?height=40&width=40",
        text: "Hello! Yes, I'm particularly interested in useContext and useReducer. I find them a bit confusing.",
        timestamp: new Date(Date.now() - 82800000).toISOString(), // 23 hours ago
        isYou: true,
      },
      {
        id: 3,
        sender: "Sarah Johnson",
        senderImage: "/placeholder.svg?height=40&width=40",
        text: "Great! I'll make sure to cover those in detail. useContext and useReducer are powerful when used together for state management.",
        timestamp: new Date(Date.now() - 79200000).toISOString(), // 22 hours ago
        isYou: false,
      },
      {
        id: 4,
        sender: "Sarah Johnson",
        senderImage: "/placeholder.svg?height=40&width=40",
        text: "I've prepared some examples that should help clarify how they work. We'll go through them step by step during our session.",
        timestamp: new Date(Date.now() - 79100000).toISOString(), // 22 hours ago
        isYou: false,
      },
      {
        id: 5,
        sender: user?.name || "You",
        senderImage: user?.image || "/placeholder.svg?height=40&width=40",
        text: "That sounds perfect! I'm also curious about custom hooks. Is that something we'll cover?",
        timestamp: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
        isYou: true,
      },
      {
        id: 6,
        sender: "Sarah Johnson",
        senderImage: "/placeholder.svg?height=40&width=40",
        text: "Custom hooks are one of the most powerful features in React. We'll definitely cover how to create and use them effectively.",
        timestamp: new Date(Date.now() - 39600000).toISOString(), // 11 hours ago
        isYou: false,
      },
      {
        id: 7,
        sender: "Sarah Johnson",
        senderImage: "/placeholder.svg?height=40&width=40",
        text: "Just a reminder that our session is tomorrow at 2:00 PM. Looking forward to it!",
        timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        isYou: false,
      },
    ]
    setChatMessages(initialMessages)
  }

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Group messages by date
  const groupMessagesByDate = (messages) => {
    const groups = {}

    messages.forEach((message) => {
      const date = new Date(message.timestamp).toLocaleDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(message)
    })

    return Object.entries(groups).map(([date, messages]) => ({
      date,
      messages,
    }))
  }

  if (isLoading || !session) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const groupedMessages = groupMessagesByDate(chatMessages)

  return (
    <div className="container py-6">
      <div className="flex flex-col h-[calc(100vh-96px)] rounded-lg overflow-hidden border border-gray-800 bg-gray-900/50">
        {/* Chat header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="mr-2" asChild>
              <Link href={`/sessions/${sessionId}`}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </Button>
            <Avatar className="h-10 w-10 mr-3 cyber-avatar">
              <AvatarImage src={session.teacherImage} alt={session.teacher} />
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-pink-600 text-white">
                {session.teacher.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-medium text-white">{session.teacher}</h2>
              <div className="flex items-center text-xs text-gray-400">
                <Badge className="mr-2 bg-blue-900/30 text-blue-400 border-blue-700/30">Teacher</Badge>
                <span>{session.title}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link href={`/video-call/${sessionId}`}>
                <Phone className="h-5 w-5 text-blue-400" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreVertical className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </div>

        {/* Session info */}
        <div className="p-3 bg-gray-900/80 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-300">
            <Calendar className="h-4 w-4 text-blue-400 mr-1" />
            <span>{formatDate(session.date)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <Clock className="h-4 w-4 text-blue-400 mr-1" />
            <span>{session.duration} minutes</span>
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <FileText className="h-4 w-4 text-blue-400 mr-1" />
            <Link href={`/contracts/${sessionId}`} className="text-blue-400 hover:underline">
              View Contract
            </Link>
          </div>
        </div>

        {/* Chat messages */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-6">
          {groupedMessages.length > 0 ? (
            groupedMessages.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-3">
                <div className="flex justify-center">
                  <span className="text-xs text-gray-500 bg-gray-900/80 px-2 py-1 rounded-full">
                    {new Date(group.date).toLocaleDateString(undefined, {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {group.messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isYou ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] ${
                        message.isYou
                          ? "bg-blue-600/30 border-blue-700/30 rounded-tl-lg rounded-bl-lg rounded-tr-lg"
                          : "bg-gray-800/80 border-gray-700/30 rounded-tr-lg rounded-br-lg rounded-tl-lg"
                      } border p-3`}
                    >
                      <div className="flex items-center mb-1">
                        <Avatar className="h-6 w-6 mr-2 cyber-avatar">
                          <AvatarImage src={message.senderImage} alt={message.sender} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-pink-600 text-white text-xs">
                            {message.sender.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className={`text-sm ${message.isYou ? "text-blue-300" : "text-gray-300"}`}>
                          {message.sender}
                        </span>
                        <span className="text-xs text-gray-500 ml-auto">
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="text-sm text-white">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              No messages yet. Start the conversation!
            </div>
          )}
        </div>

        {/* Message input */}
        <div className="p-3 border-t border-gray-800">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Paperclip className="h-5 w-5 text-gray-400" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Image className="h-5 w-5 text-gray-400" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="cyber-input flex-1"
            />
            <Button size="icon" onClick={sendMessage} className="cyber-button rounded-full">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

