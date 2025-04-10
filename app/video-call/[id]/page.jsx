"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Peer from "peerjs"
import { io } from "socket.io-client"
import {
  Mic, MicOff, Video, VideoOff, Phone,
  MessageSquare, Users, Share2, MoreVertical
} from "lucide-react"
import { checkIsLoggedIn, getUserData, isSessionValid, updateLastActivity } from "@/lib/auth"

export default function VideoCall() {
  const router = useRouter()
  const params = useParams()
  const sessionId = params?.id
  const userId = getUserData()?.id || Math.floor(Math.random() * 10000).toString()

  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sessionData, setSessionData] = useState(null)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")

  const localVideoRef = useRef(null)
  const remoteVideoRef = useRef(null)
  const isInitialMount = useRef(true)

  useEffect(() => {
    setMounted(true)

    const peer = new Peer(userId, {
      host: "localhost",
      port: 5000,
      path: "/peerjs",
    })

    peer.on("open", (id) => {
      console.log("PeerJS ID:", id)
    })

    if (isInitialMount.current) {
      isInitialMount.current = false

      if (!checkIsLoggedIn() || !isSessionValid()) {
        window.location.href = "/login"
        return
      }

      const mockSession = {
        id: sessionId,
        title: sessionId === "1" ? "JavaScript Basics" : "React Hooks Deep Dive",
        teacher: sessionId === "1" ? "Alex Johnson" : "Sarah Miller",
        date: sessionId === "1" ? "2025-03-25T14:00:00" : "2025-03-27T10:30:00",
        status: sessionId === "1" ? "confirmed" : "pending",
        participants: [
          { id: 1, name: "You", role: "student", image: "/placeholder.svg" },
          { id: 2, name: sessionId === "1" ? "Alex Johnson" : "Sarah Miller", role: "teacher", image: "/placeholder.svg" },
        ],
      }

      setSessionData(mockSession)

      setMessages([
        {
          id: 1,
          sender: mockSession.participants[1].name,
          text: "Hi there! Ready to start our session?",
          time: "Just now",
        },
      ])

      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream
          }

          setTimeout(() => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = stream
              setIsLoading(false)
            }
          }, 2000)
        })
        .catch((err) => {
          console.error("Error accessing media devices:", err)
          setIsLoading(false)
          setIsVideoOn(false)
          setIsMicOn(false)
        })

      updateLastActivity()
    }

    return () => {
      if (localVideoRef.current?.srcObject) {
        localVideoRef.current.srcObject.getTracks().forEach((track) => track.stop())
      }
    }
  }, [sessionId])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      sender: "You",
      text: newMessage,
      time: "Just now",
    }

    setMessages([...messages, message])
    setNewMessage("")

    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        sender: sessionData?.participants[1].name,
        text: "Got it! Let's continue with our session.",
        time: "Just now",
      }
      setMessages((prev) => [...prev, response])
    }, 1500)
  }

  const handleEndCall = () => {
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach((track) => track.stop())
    }
    router.push("/dashboard")
  }

  if (!mounted) return null

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white">Connecting to your session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Video Container */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
        <video ref={localVideoRef} autoPlay muted className="rounded-xl w-full h-full object-cover border border-purple-500" />
        <video ref={remoteVideoRef} autoPlay className="rounded-xl w-full h-full object-cover border border-purple-500" />
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-6 py-4 bg-zinc-900 border-t border-zinc-700">
        <Button onClick={() => setIsMicOn(!isMicOn)} variant="outline" className="rounded-full p-3">
          {isMicOn ? <Mic className="text-green-400" /> : <MicOff className="text-red-500" />}
        </Button>
        <Button onClick={() => setIsVideoOn(!isVideoOn)} variant="outline" className="rounded-full p-3">
          {isVideoOn ? <Video className="text-green-400" /> : <VideoOff className="text-red-500" />}
        </Button>
        <Button onClick={handleEndCall} variant="destructive" className="rounded-full p-3">
          <Phone />
        </Button>
        <Button onClick={() => setIsChatOpen(!isChatOpen)} variant="outline" className="rounded-full p-3">
          <MessageSquare />
        </Button>
        <Button variant="outline" className="rounded-full p-3">
          <Users />
        </Button>
        <Button variant="outline" className="rounded-full p-3">
          <Share2 />
        </Button>
        <Button variant="outline" className="rounded-full p-3">
          <MoreVertical />
        </Button>
      </div>

      {/* Chat Panel */}
      {isChatOpen && (
        <div className="absolute bottom-20 right-4 w-80 bg-zinc-800 rounded-xl shadow-xl border border-zinc-700 flex flex-col overflow-hidden">
          <div className="p-4 font-semibold text-lg border-b border-zinc-700">Chat</div>
          <div className="flex-1 p-3 overflow-y-auto max-h-60 space-y-2">
            {messages.map((msg) => (
              <div key={msg.id} className={`p-2 rounded-lg ${msg.sender === "You" ? "bg-purple-600 self-end ml-auto" : "bg-zinc-700 text-left"}`}>
                <div className="text-sm font-semibold">{msg.sender}</div>
                <div>{msg.text}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="flex p-3 border-t border-zinc-700">
            <input
              type="text"
              className="flex-1 p-2 rounded-lg bg-zinc-900 text-white border border-zinc-600 outline-none"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button type="submit" className="ml-2">Send</Button>
          </form>
        </div>
      )}
    </div>
  )
}
