"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Video, Info, Paperclip, Send, Smile, ArrowLeft } from "lucide-react"
import { checkIsLoggedIn, isSessionValid, updateLastActivity } from "@/lib/auth"

export default function ChatPage({ params }) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [chatData, setChatData] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef(null)
  const isInitialMount = useRef(true)

  useEffect(() => {
    setMounted(true)

    // Check if user is logged in
    if (isInitialMount.current) {
      isInitialMount.current = false

      if (!checkIsLoggedIn() || !isSessionValid()) {
        window.location.href = "/login"
        return
      }

      // Mock chat data
      const mockChat = {
        id: params.id,
        title: params.id === "1" ? "JavaScript Basics" : "React Hooks Deep Dive",
        with: {
          id: 2,
          name: params.id === "1" ? "Alex Johnson" : "Sarah Miller",
          role: "teacher",
          image: "/placeholder.svg?height=100&width=100",
          status: "online",
        },
        lastActive: "Just now",
      }

      setChatData(mockChat)

      // Mock messages
      const mockMessages = [
        {
          id: 1,
          sender: "other",
          text: "Hi there! How can I help you with your JavaScript learning today?",
          time: "10:30 AM",
        },
        {
          id: 2,
          sender: "me",
          text: "I'm having trouble understanding closures. Could you explain them?",
          time: "10:32 AM",
        },
        {
          id: 3,
          sender: "other",
          text: "Closures are functions that remember the environment in which they were created. This means they can access variables from their parent function even after the parent function has finished executing.",
          time: "10:35 AM",
        },
        {
          id: 4,
          sender: "other",
          text: "Here's a simple example:\n\nfunction createCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2",
          time: "10:36 AM",
        },
        {
          id: 5,
          sender: "me",
          text: "That makes sense! So the inner function 'closes over' the count variable?",
          time: "10:38 AM",
        },
        {
          id: 6,
          sender: "other",
          text: "Exactly! The inner function 'closes over' the count variable, maintaining a reference to it even after createCounter() has finished executing. This is why closures are so powerful in JavaScript.",
          time: "10:40 AM",
        },
      ]

      setMessages(mockMessages)
      setIsLoading(false)
    }

    // Update activity timestamp
    updateLastActivity()
  }, [params.id])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      sender: "me",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate response
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        sender: "other",
        text: "That's a great question! Let me explain further...",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, response])
    }, 2000)
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
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Chat header */}
      <div className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 lg:hidden text-gray-400 hover:text-white hover:bg-white/5"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={chatData.with.image} alt={chatData.with.name} />
              <AvatarFallback className="bg-purple-900">{chatData.with.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold">{chatData.with.name}</h1>
              <p className="text-xs text-gray-400 flex items-center">
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-1 ${chatData.with.status === "online" ? "bg-green-500" : "bg-gray-500"}`}
                ></span>
                {chatData.with.status === "online" ? "Online" : "Offline"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-white/5"
              onClick={() => router.push(`/video-call/${params.id}`)}
            >
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5">
              <Info className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
              {message.sender !== "me" && (
                <Avatar className="h-8 w-8 mr-2 flex-shrink-0 self-end mb-1">
                  <AvatarImage src={chatData.with.image} alt={chatData.with.name} />
                  <AvatarFallback className="bg-purple-900">{chatData.with.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${message.sender === "me" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-200"}`}
              >
                <p className="whitespace-pre-wrap text-sm">{message.text}</p>
                <p className="text-xs mt-1 opacity-70 text-right">{message.time}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <div className="p-4 border-t border-gray-800 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-white/5"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-gray-800 border-gray-700 focus:ring-purple-500"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-white/5"
            >
              <Smile className="h-5 w-5" />
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

