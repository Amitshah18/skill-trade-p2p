"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CalendarIcon, Check, ChevronLeft, Star, Wallet } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { format } from "date-fns"

export default function BookSessionPage() {
  const router = useRouter()
  const params = useParams()
  const skillId = params?.id
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [skill, setSkill] = useState(null)
  const [date, setDate] = useState(null)
  const [time, setTime] = useState("")
  const [duration, setDuration] = useState("60")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1) // 1: Select date/time, 2: Confirm details, 3: Success

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

  // Fetch skill data
  useEffect(() => {
    if (skillId) {
      // Mock skill data - in a real app, you would fetch this from an API
      const mockSkill = {
        id: Number.parseInt(skillId),
        title: "Advanced React Patterns",
        teacher: "Sarah Johnson",
        teacherImage: "/placeholder.svg?height=100&width=100",
        rating: 4.9,
        students: 245,
        price: 65,
        image: "/placeholder.svg?height=300&width=500",
        category: "Programming",
        description:
          "Learn advanced React patterns including compound components, render props, higher-order components, and hooks. This session will help you write more maintainable and reusable React code.",
        teacherBio:
          "Sarah is a senior frontend developer with 8 years of experience building React applications. She has worked at several tech companies and now teaches React best practices to developers worldwide.",
        availableTimes: ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"],
      }
      setSkill(mockSkill)
    }
  }, [skillId])

  const handleSubmit = async () => {
    // Validate inputs
    if (!date) {
      setError("Please select a date")
      return
    }
    if (!time) {
      setError("Please select a time")
      return
    }

    setError("")
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Move to confirmation step
      setStep(2)
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const confirmBooking = async () => {
    setError("")
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Move to success step
      setStep(3)
      setSuccess("Your session has been booked successfully!")
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format date for display
  const formatDate = (date) => {
    if (!date) return ""
    return format(date, "EEEE, MMMM do, yyyy")
  }

  if (isLoading || !skill) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/explore">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Explore
        </Link>
      </Button>

      {error && (
        <Alert variant="destructive" className="mb-6 bg-red-900/20 border-red-700/30 text-red-400">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 bg-green-900/20 border-green-700/30 text-green-400">
          <Check className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Skill Info */}
        <div className="md:col-span-1">
          <Card className="cyber-card overflow-hidden">
            <div className="relative h-48 w-full">
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
              <h2 className="text-xl font-bold text-white mb-2">{skill.title}</h2>
              <div className="flex items-center mb-3">
                <Avatar className="h-8 w-8 mr-2 cyber-avatar">
                  <AvatarImage src={skill.teacherImage} alt={skill.teacher} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-pink-600 text-white text-xs">
                    {skill.teacher.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-blue-300">by {skill.teacher}</span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="text-sm text-gray-300">
                    {skill.rating} ({skill.students} students)
                  </span>
                </div>
                <span className="font-medium text-white">{skill.price} tokens</span>
              </div>

              <p className="text-sm text-gray-300 mb-4">{skill.description}</p>

              <div className="p-3 rounded-lg border border-gray-800 bg-gray-900/50 mb-4">
                <h3 className="text-sm font-medium text-white mb-2">About the Teacher</h3>
                <p className="text-xs text-gray-400">{skill.teacherBio}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Form */}
        <div className="md:col-span-2">
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-xl text-white">
                {step === 1 ? "Book a Session" : step === 2 ? "Confirm Booking" : "Booking Confirmed"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Select Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal cyber-input ${
                              !date && "text-gray-500"
                            }`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? formatDate(date) : "Select a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 cyber-dropdown" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Select Time</Label>
                      <Select value={time} onValueChange={setTime}>
                        <SelectTrigger className="cyber-input">
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent className="cyber-dropdown">
                          {skill.availableTimes.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Session Duration</Label>
                    <RadioGroup
                      defaultValue="60"
                      value={duration}
                      onValueChange={setDuration}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="30" id="duration-30" />
                        <Label htmlFor="duration-30" className="text-gray-300">
                          30 minutes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="60" id="duration-60" />
                        <Label htmlFor="duration-60" className="text-gray-300">
                          60 minutes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="90" id="duration-90" />
                        <Label htmlFor="duration-90" className="text-gray-300">
                          90 minutes
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-300">
                      Message to Teacher (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Let the teacher know what you'd like to learn or any questions you have"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="cyber-input min-h-[100px]"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/50">
                    <h3 className="text-lg font-medium text-white mb-3">Booking Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Skill</p>
                        <p className="text-base text-white">{skill.title}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Teacher</p>
                        <p className="text-base text-white">{skill.teacher}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Date</p>
                        <p className="text-base text-white">{formatDate(date)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Time</p>
                        <p className="text-base text-white">{time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Duration</p>
                        <p className="text-base text-white">{duration} minutes</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Price</p>
                        <p className="text-base text-white">{skill.price} tokens</p>
                      </div>
                    </div>

                    {message && (
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Your Message</p>
                        <p className="text-sm text-white bg-gray-800/50 p-3 rounded-md">{message}</p>
                      </div>
                    )}
                  </div>

                  <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-medium text-white">Payment Summary</h3>
                      <div className="flex items-center">
                        <Wallet className="h-4 w-4 text-blue-400 mr-1" />
                        <span className="text-sm text-blue-300">Your balance: 250 tokens</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Session fee</span>
                        <span className="text-white">{skill.price} tokens</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Platform fee</span>
                        <span className="text-white">5 tokens</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-800">
                        <span className="font-medium text-white">Total</span>
                        <span className="font-medium text-white">{skill.price + 5} tokens</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400">
                      By confirming this booking, you agree to our terms of service and the creation of a smart contract
                      between you and the teacher. Tokens will be held in escrow until the session is completed.
                    </p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-green-900/30 border border-green-700/30 flex items-center justify-center">
                    <Check className="h-8 w-8 text-green-400" />
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Booking Confirmed!</h3>
                    <p className="text-gray-400 mb-4">
                      Your session with {skill.teacher} has been scheduled for {formatDate(date)} at {time}.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/50 text-left mb-4">
                    <div className="flex items-center mb-3">
                      <Calendar className="h-5 w-5 text-blue-400 mr-2" />
                      <h4 className="text-lg font-medium text-white">Session Details</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Date & Time</p>
                        <p className="text-base text-white">
                          {formatDate(date)} at {time}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Duration</p>
                        <p className="text-base text-white">{duration} minutes</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Teacher</p>
                        <p className="text-base text-white">{skill.teacher}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Skill</p>
                        <p className="text-base text-white">{skill.title}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <p className="text-gray-400">
                      A smart contract has been created for this session. You can view the details in your contracts
                      section.
                    </p>
                    <p className="text-gray-400">
                      You can chat with your teacher before the session to discuss any specific topics you'd like to
                      cover.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {step === 1 ? (
                <>
                  <Button variant="outline" className="cyber-button" asChild>
                    <Link href="/explore">Cancel</Link>
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !date || !time}
                    className="cyber-button-enhanced"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Continue to Confirm"
                    )}
                  </Button>
                </>
              ) : step === 2 ? (
                <>
                  <Button variant="outline" className="cyber-button" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={confirmBooking} disabled={isSubmitting} className="cyber-button-enhanced">
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Confirm & Pay"
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="cyber-button" asChild>
                    <Link href="/sessions">View All Sessions</Link>
                  </Button>
                  <Button className="cyber-button-enhanced" asChild>
                    <Link href={`/chat/${skillId}`}>Chat with Teacher</Link>
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
