"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Video, VideoOff, Phone, MessageSquare, Users, Share2, MoreVertical } from "lucide-react"
import { checkIsLoggedIn, getUserData, isSessionValid, updateLastActivity } from "@/lib/auth"

export default function VideoCall() {
  const params = useParams()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sessionData, setSessionData] = useState(null)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [sessionId, setSessionId] = useState(null)
  const localVideoRef = useRef(null)
  const remoteVideoRef = useRef(null)
  const isInitialMount = useRef(true)

  useEffect(() => {
    if(params?.id){
        setSessionId(params.id)
    }
    setMounted(true)
    
    // Check if user is logged in
    if (isInitialMount.current) {
      isInitialMount.current = false
      
      if (!checkIsLoggedIn() || !isSessionValid()) {
        window.location.href = '/login'
        return
      }
      
      // Mock session data
      const mockSession = {
        id: params.id,
        title: params.id === "1" ? "JavaScript Basics" : "React Hooks Deep Dive",
        teacher: params.id === "1" ? "Alex Johnson" : "Sarah Miller",
        date: params.id === "1" ? "2025-03-25T14:00:00" : "2025-03-27T10:30:00",
        status: params.id === "1" ? "confirmed" : "pending",
        participants: [
          {
            id: 1,
            name: "You",
            role: "student",
            image: "/placeholder.svg?height=100&width=100"
          },
          {
            id: 2,
            name: params.id === "1" ? "Alex Johnson" : "Sarah Miller",
            role: "teacher",
            image: "/placeholder.svg?height=100&width=100"
          }
        ]
      }
      
      setSessionData(mockSession)
      
      // Mock messages
      setMessages([
        {
          id: 1,
          sender: params.id === "1" ? "Alex Johnson" : "Sarah Miller",
          text: "Hi there! Ready to start our session?",
          time: "Just now"
        }
      ])
      
      // Simulate video setup
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then(stream => {
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream
            }
            
            // Simulate remote video with a delay
            setTimeout(() => {
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = stream
                setIsLoading(false)
              }
            }, 2000)
          })
          .catch(err => {
            console.error("Error accessing media devices:", err)
            setIsLoading(false)
            setIsVideoOn(false)
            setIsMicOn(false)
          })
      } else {
        console.error("getUserMedia not supported")
        setIsLoading(false)
        setIsVideoOn(false)
        setIsMicOn(false)
      }
    }
    
    // Update activity timestamp
    updateLastActivity()
    
    // Cleanup function
    return () => {
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        localVideoRef.current.srcObject.getTracks().forEach(track => track.stop())
      }
    }
  }, [params])
  
  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    
    const message = {
      id: messages.length + 1,
      sender: "You",
      text: newMessage,
      time: "Just now"
    }
    
    setMessages([...messages, message])
    setNewMessage("")
    
    // Simulate response
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        sender: sessionData?.participants[1].name,
        text: "Got it! Let's continue with our session.",
        time: "Just now"
      }
      setMessages(prev => [...prev, response])
    }, 1500)
  }
  
  const handleEndCall = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach(track => track.stop())
    }
    router.push('/dashboard')
  }
  
  // Don't render until client-side hydration is complete
  if (!mounted) {
    return null
  }
  
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
      {/* Video call header */}
      <div className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">{sessionData?.title}</h1>
            <span className="ml-4 px-2 py-1 text-xs rounded-full bg-green-900 text-green-400">Live</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400 hover:text-white hover:bg-white/5"
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400 hover:text-white hover:bg-white/5"
            >
              <Users className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400 hover:text-white hover:bg-white/5"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400 hover:text-white hover:bg-white/5"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex">
        {/* Video area */}
        <div className={`flex-1 relative ${isChatOpen ? 'lg:mr-80' : ''}`}>
          {/* Main video (remote) */}
          <div className="w-full h-full bg-gray-900">
            <video 
              ref={remoteVideoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover"
              muted={!isVideoOn}
            ></video>
          </div>
          
          {/* Self video */}
          <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
            <video 
              ref={localVideoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover"
            ></video>
            {!isVideoOn && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-xl font-bold">
                  {getUserData()?.initials || "U"}
                </div>
              </div>
            )}
          </div>
          
          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-gray-900/80 px-6 py-3 rounded-full border border-gray-800">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`rounded-full ${isMicOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'}`}
              onClick={() => setIsMicOn(!isMicOn)}
            >
              {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`rounded-full ${isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'}`}
              onClick={() => setIsVideoOn(!isVideoOn)}
            >
              {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-red-600 hover:bg-red-700"
              onClick={handleEndCall}
            >
              <Phone className="h-5 w-5 transform rotate-135" />
            </Button>
          </div>
        </div>
        
        {/* Chat sidebar */}
        {isChatOpen && (
          <div className="w-full lg:w-80 h-full bg-gray-900 border-l border-gray-800 flex flex-col absolute lg:relative right-0 top-0 bottom-0 z-10">
            <div className="p-4 border-b border-gray-800">
              <h2 className="font-bold">Session Chat</h2>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div key={message.id} className={`flex ${message.sender === "You" ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${message.sender === "You" ? 'bg-purple-900/50 text-white' : 'bg-gray-800 text-gray-200'}`}>
                    <div className="flex items-center mb-1">
                      <span className="font-medium text-sm">{message.sender}</span>
                      <span className="text-xs text-gray-400 ml-2">{message.time}</span>
                    </div>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message input */}
            <div className="p-4 border-t border-gray-800">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  Send
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

