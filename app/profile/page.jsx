"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, Check, Edit, Plus, Save, Star, Upload, User, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ProfilePage() {
  // User profile state
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Full-stack developer with 5 years of experience. Passionate about teaching web development and blockchain technologies.",
    location: "San Francisco, CA",
    joinDate: "March 2023",
    walletAddress: "0x1234...5678",
    profileImage: "/placeholder.svg?height=200&width=200",
    skills: ["JavaScript", "React", "Node.js", "Blockchain", "Solidity"],
    interests: ["Web3", "UI/UX Design", "Mobile Development"],
    rating: 4.8,
    reviewCount: 24,
    completedSessions: 36,
    tokens: 250,
  })

  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false)
  const [editedUser, setEditedUser] = useState({ ...user })
  const [newSkill, setNewSkill] = useState("")
  const [newInterest, setNewInterest] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  // Reviews state
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "John is an excellent teacher! He explained React concepts in a way that was easy to understand. Highly recommend his sessions.",
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "1 month ago",
      comment: "Great session on JavaScript fundamentals. John is patient and knowledgeable. Would book again.",
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2 months ago",
      comment:
        "I learned so much about Solidity in just one session. John has a talent for making complex topics accessible.",
    },
  ])

  // Session history state
  const [sessionHistory, setSessionHistory] = useState([
    {
      id: 1,
      title: "JavaScript Fundamentals",
      type: "teaching",
      with: "Emma Wilson",
      date: "March 15, 2025",
      duration: "60 minutes",
      tokens: 50,
      status: "completed",
    },
    {
      id: 2,
      title: "React Hooks Deep Dive",
      type: "teaching",
      with: "Sarah Johnson",
      date: "March 10, 2025",
      duration: "90 minutes",
      tokens: 75,
      status: "completed",
    },
    {
      id: 3,
      title: "Blockchain Basics",
      type: "learning",
      with: "Michael Chen",
      date: "March 5, 2025",
      duration: "60 minutes",
      tokens: -40,
      status: "completed",
    },
    {
      id: 4,
      title: "Smart Contract Development",
      type: "learning",
      with: "Sophia Chen",
      date: "February 28, 2025",
      duration: "120 minutes",
      tokens: -80,
      status: "completed",
    },
  ])

  // Handle file selection for profile image
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)

      // Create a preview URL
      const fileReader = new FileReader()
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result)
      }
      fileReader.readAsDataURL(file)
    }
  }

  // Handle adding a new skill
  const handleAddSkill = () => {
    if (newSkill && !editedUser.skills.includes(newSkill)) {
      if (editedUser.skills.length < 10) {
        setEditedUser({
          ...editedUser,
          skills: [...editedUser.skills, newSkill],
        })
        setNewSkill("")
      } else {
        setError("You can only add up to 10 skills")
      }
    }
  }

  // Handle removing a skill
  const handleRemoveSkill = (skill) => {
    setEditedUser({
      ...editedUser,
      skills: editedUser.skills.filter((s) => s !== skill),
    })
  }

  // Handle adding a new interest
  const handleAddInterest = () => {
    if (newInterest && !editedUser.interests.includes(newInterest)) {
      if (editedUser.interests.length < 10) {
        setEditedUser({
          ...editedUser,
          interests: [...editedUser.interests, newInterest],
        })
        setNewInterest("")
      } else {
        setError("You can only add up to 10 interests")
      }
    }
  }

  // Handle removing an interest
  const handleRemoveInterest = (interest) => {
    setEditedUser({
      ...editedUser,
      interests: editedUser.interests.filter((i) => i !== interest),
    })
  }

  // Handle input change for edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedUser({
      ...editedUser,
      [name]: value,
    })
  }

  // Handle save profile changes
  const handleSaveProfile = () => {
    setError("")

    // Validate inputs
    if (!editedUser.name.trim()) {
      setError("Name is required")
      return
    }

    if (!editedUser.email.trim()) {
      setError("Email is required")
      return
    }

    // Update user profile
    const updatedUser = {
      ...user,
      ...editedUser,
    }

    // If there's a new profile image
    if (previewUrl) {
      updatedUser.profileImage = previewUrl
    }

    setUser(updatedUser)
    setIsEditMode(false)
    setSuccess("Profile updated successfully!")

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccess("")
    }, 3000)

    // In a real app, you would save to backend here
    // For demo purposes, save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditedUser({ ...user })
    setPreviewUrl(null)
    setSelectedFile(null)
    setIsEditMode(false)
    setError("")
  }

  // Render star rating
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
        />
      ))
  }

  return (
    <div className="container py-10">
      {success && (
        <Alert className="mb-6 bg-green-900/20 border-green-700/30 text-green-400">
          <Check className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mb-6 bg-red-900/20 border-red-700/30 text-red-400">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-1 space-y-6">
          <Card className="cyber-card overflow-hidden">
            <div className="relative h-32 bg-gradient-to-r from-blue-600/30 to-pink-600/30">
              {isEditMode && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Button variant="ghost" className="text-white hover:bg-white/20">
                    <Upload className="h-5 w-5 mr-2" />
                    Change Cover
                  </Button>
                </div>
              )}
            </div>

            <CardContent className="pt-0">
              <div className="flex flex-col items-center -mt-16">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-gray-900 cyber-avatar">
                    <AvatarImage src={previewUrl || user.profileImage} alt={user.name} className="object-cover" />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-600 to-pink-600">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  {isEditMode && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                      <label htmlFor="profile-upload" className="cursor-pointer">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors">
                          <Upload className="h-5 w-5 text-white" />
                        </div>
                        <input
                          id="profile-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  )}
                </div>

                <div className="mt-4 text-center">
                  {isEditMode ? (
                    <Input
                      name="name"
                      value={editedUser.name}
                      onChange={handleInputChange}
                      className="cyber-input text-center text-xl font-bold mb-1"
                    />
                  ) : (
                    <h2 className="text-xl font-bold text-white">{user.name}</h2>
                  )}

                  <div className="flex items-center justify-center mt-1 space-x-1">
                    {renderStars(user.rating)}
                    <span className="text-sm text-gray-400 ml-1">({user.reviewCount})</span>
                  </div>

                  <p className="text-sm text-gray-400 mt-1">Member since {user.joinDate}</p>
                </div>

                <div className="w-full mt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Email</span>
                    {isEditMode ? (
                      <Input
                        name="email"
                        value={editedUser.email}
                        onChange={handleInputChange}
                        className="cyber-input w-2/3 text-right"
                      />
                    ) : (
                      <span className="text-sm text-white">{user.email}</span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Location</span>
                    {isEditMode ? (
                      <Input
                        name="location"
                        value={editedUser.location}
                        onChange={handleInputChange}
                        className="cyber-input w-2/3 text-right"
                      />
                    ) : (
                      <span className="text-sm text-white">{user.location}</span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Wallet</span>
                    <span className="text-sm text-white">{user.walletAddress}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Tokens</span>
                    <span className="text-sm font-medium text-blue-400">{user.tokens} SKT</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Sessions</span>
                    <span className="text-sm text-white">{user.completedSessions} completed</span>
                  </div>
                </div>

                <div className="w-full mt-6">
                  {isEditMode ? (
                    <div className="flex space-x-2">
                      <Button onClick={handleCancelEdit} variant="outline" className="flex-1 cyber-button">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile} className="flex-1 cyber-button-enhanced">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => setIsEditMode(true)} className="w-full cyber-button">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Interests Card */}
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-lg text-white">Skills & Interests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Skills I Teach</h3>

                {isEditMode && (
                  <div className="flex space-x-2 mb-3">
                    <Input
                      placeholder="Add a skill..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="cyber-input"
                    />
                    <Button onClick={handleAddSkill} disabled={!newSkill} className="cyber-button">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {(isEditMode ? editedUser.skills : user.skills).map((skill, index) => (
                    <Badge
                      key={index}
                      className={`
                        bg-blue-600/20 text-blue-400 border-blue-700/30
                        ${isEditMode ? "pr-1 flex items-center" : ""}
                      `}
                    >
                      {skill}
                      {isEditMode && (
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-1 hover:text-red-300 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Interests I'm Learning</h3>

                {isEditMode && (
                  <div className="flex space-x-2 mb-3">
                    <Input
                      placeholder="Add an interest..."
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      className="cyber-input"
                    />
                    <Button onClick={handleAddInterest} disabled={!newInterest} className="cyber-button">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {(isEditMode ? editedUser.interests : user.interests).map((interest, index) => (
                    <Badge
                      key={index}
                      className={`
                        bg-pink-600/20 text-pink-400 border-pink-700/30
                        ${isEditMode ? "pr-1 flex items-center" : ""}
                      `}
                    >
                      {interest}
                      {isEditMode && (
                        <button
                          onClick={() => handleRemoveInterest(interest)}
                          className="ml-1 hover:text-red-300 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-lg text-white">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditMode ? (
                <Textarea
                  name="bio"
                  value={editedUser.bio}
                  onChange={handleInputChange}
                  className="cyber-input min-h-[150px]"
                  placeholder="Tell others about yourself, your experience, and what you enjoy teaching..."
                />
              ) : (
                <p className="text-gray-300">{user.bio}</p>
              )}
            </CardContent>
          </Card>

          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="cyber-tabs mb-4">
              <TabsTrigger value="reviews" className="data-[state=active]:cyber-tab-active">
                Reviews ({reviews.length})
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:cyber-tab-active">
                Session History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reviews" className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <Card key={review.id} className="cyber-card">
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <Avatar className="h-10 w-10 mr-4 cyber-avatar">
                          <AvatarImage src={review.avatar} alt={review.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-pink-600">
                            {review.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-sm font-medium text-white">{review.name}</h4>
                              <div className="flex items-center mt-1">{renderStars(review.rating)}</div>
                            </div>
                            <span className="text-xs text-gray-500">{review.date}</span>
                          </div>

                          <p className="mt-2 text-sm text-gray-300">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-10">
                  <User className="h-12 w-12 mx-auto text-gray-600 mb-3" />
                  <h3 className="text-lg font-medium text-white mb-1">No reviews yet</h3>
                  <p className="text-sm text-gray-400">
                    Reviews will appear here after you complete teaching sessions.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {sessionHistory.length > 0 ? (
                sessionHistory.map((session) => (
                  <Card key={session.id} className="cyber-card overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div
                          className={`
                          w-full md:w-2 
                          ${session.type === "teaching" ? "bg-blue-500" : "bg-pink-500"}
                        `}
                        ></div>
                        <div className="p-4 flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h3 className="text-lg font-medium text-white">{session.title}</h3>
                            <Badge
                              className={`
                              ${
                                session.type === "teaching"
                                  ? "bg-blue-900/30 text-blue-400 border-blue-700/30"
                                  : "bg-pink-900/30 text-pink-400 border-pink-700/30"
                              }
                            `}
                            >
                              {session.type === "teaching" ? "Teaching" : "Learning"}
                            </Badge>
                          </div>

                          <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-400 mb-3">
                            <div className="flex items-center mr-4">
                              <User
                                className={`
                                h-4 w-4 mr-1 
                                ${session.type === "teaching" ? "text-blue-400" : "text-pink-400"}
                              `}
                              />
                              <span>
                                {session.type === "teaching" ? "Student: " : "Teacher: "}
                                {session.with}
                              </span>
                            </div>
                            <div className="flex items-center mr-4">
                              <span>
                                {session.date} • {session.duration}
                              </span>
                            </div>
                            <div
                              className={`
                              font-medium
                              ${session.tokens > 0 ? "text-green-400" : "text-pink-400"}
                            `}
                            >
                              {session.tokens > 0 ? "+" : ""}
                              {session.tokens} tokens
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-10">
                  <User className="h-12 w-12 mx-auto text-gray-600 mb-3" />
                  <h3 className="text-lg font-medium text-white mb-1">No sessions yet</h3>
                  <p className="text-sm text-gray-400">
                    Your session history will appear here after you complete sessions.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
