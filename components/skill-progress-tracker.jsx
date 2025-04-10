"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserData } from "@/lib/auth"
import { TrendingUp, Award, Clock, BookOpen, Target } from "lucide-react"

export default function SkillProgressTracker() {
  const [userData, setUserData] = useState(null)
  const [learningProgress, setLearningProgress] = useState([])
  const [teachingProgress, setTeachingProgress] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get user data
    const user = getUserData()
    if (user) {
      setUserData(user)

      // Generate mock learning progress based on user interests
      if (user.interests && user.interests.length > 0) {
        generateLearningProgress(user.interests)
      }

      // Generate mock teaching progress based on user skills
      if (user.skills && user.skills.length > 0) {
        generateTeachingProgress(user.skills)
      }
    }

    setIsLoading(false)
  }, [])

  const generateLearningProgress = (interests) => {
    // Mock data for learning progress
    const mockProgress = interests.map((interest, index) => {
      // Generate random progress between 10% and 90%
      const progress = Math.floor(Math.random() * 81) + 10

      // Generate random sessions completed between 1 and 10
      const sessionsCompleted = Math.floor(Math.random() * 10) + 1

      // Generate random total sessions between sessions completed and 15
      const totalSessions = sessionsCompleted + Math.floor(Math.random() * 6) + 1

      // Generate random hours spent between 1 and 30
      const hoursSpent = Math.floor(Math.random() * 30) + 1

      // Generate random next milestone
      const milestones = [
        "Complete basic concepts",
        "Finish intermediate exercises",
        "Build a simple project",
        "Master advanced techniques",
        "Teach a beginner session",
      ]
      const nextMilestone = milestones[Math.floor(Math.random() * milestones.length)]

      return {
        id: index + 1,
        skill: interest,
        progress,
        sessionsCompleted,
        totalSessions,
        hoursSpent,
        nextMilestone,
        level: progress < 30 ? "Beginner" : progress < 60 ? "Intermediate" : "Advanced",
      }
    })

    setLearningProgress(mockProgress)
  }

  const generateTeachingProgress = (skills) => {
    // Mock data for teaching progress
    const mockProgress = skills.map((skill, index) => {
      // Generate random students taught between 1 and 50
      const studentsTaught = Math.floor(Math.random() * 50) + 1

      // Generate random sessions taught between 1 and 20
      const sessionsTaught = Math.floor(Math.random() * 20) + 1

      // Generate random rating between 3.5 and 5.0
      const rating = (Math.random() * 1.5 + 3.5).toFixed(1)

      // Generate random tokens earned between 10 and 500
      const tokensEarned = Math.floor(Math.random() * 491) + 10

      // Generate random teaching level
      const teachingLevel = studentsTaught < 10 ? "Novice" : studentsTaught < 30 ? "Experienced" : "Expert"

      return {
        id: index + 1,
        skill,
        studentsTaught,
        sessionsTaught,
        rating,
        tokensEarned,
        teachingLevel,
      }
    })

    setTeachingProgress(mockProgress)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <TrendingUp className="h-5 w-5 text-purple-400 mr-2" />
          Skill Progress Tracker
        </CardTitle>
        <CardDescription className="text-gray-400">Track your learning and teaching progress</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="learning" className="space-y-4">
          <TabsList className="grid grid-cols-2 bg-gray-800">
            <TabsTrigger value="learning" className="data-[state=active]:bg-purple-900/50">
              Learning
            </TabsTrigger>
            <TabsTrigger value="teaching" className="data-[state=active]:bg-blue-900/50">
              Teaching
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learning" className="space-y-4">
            {learningProgress.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No learning progress to display</p>
            ) : (
              learningProgress.map((item) => (
                <div key={item.id} className="space-y-3 p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white">{item.skill}</h3>
                      <div className="flex items-center mt-1">
                        <Badge
                          className={`
                          ${
                            item.level === "Beginner"
                              ? "bg-blue-900/50 text-blue-400"
                              : item.level === "Intermediate"
                                ? "bg-yellow-900/50 text-yellow-400"
                                : "bg-green-900/50 text-green-400"
                          }
                        `}
                        >
                          {item.level}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-400">{item.progress}% complete</span>
                    </div>
                  </div>

                  <Progress
                    value={item.progress}
                    className="h-2 bg-gray-700"
                    indicatorClassName={`
                    ${item.progress < 30 ? "bg-blue-500" : item.progress < 60 ? "bg-yellow-500" : "bg-green-500"}
                  `}
                  />

                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-400">
                    <div className="flex flex-col items-center p-2 bg-gray-800 rounded-md">
                      <BookOpen className="h-4 w-4 mb-1 text-purple-400" />
                      <span>
                        {item.sessionsCompleted}/{item.totalSessions}
                      </span>
                      <span>Sessions</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-800 rounded-md">
                      <Clock className="h-4 w-4 mb-1 text-blue-400" />
                      <span>{item.hoursSpent}</span>
                      <span>Hours</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-800 rounded-md">
                      <Target className="h-4 w-4 mb-1 text-pink-400" />
                      <span>Next</span>
                      <span className="truncate w-full text-center" title={item.nextMilestone}>
                        {item.nextMilestone.length > 10
                          ? `${item.nextMilestone.substring(0, 10)}...`
                          : item.nextMilestone}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="teaching" className="space-y-4">
            {teachingProgress.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No teaching progress to display</p>
            ) : (
              teachingProgress.map((item) => (
                <div key={item.id} className="space-y-3 p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white">{item.skill}</h3>
                      <div className="flex items-center mt-1">
                        <Badge
                          className={`
                          ${
                            item.teachingLevel === "Novice"
                              ? "bg-blue-900/50 text-blue-400"
                              : item.teachingLevel === "Experienced"
                                ? "bg-purple-900/50 text-purple-400"
                                : "bg-pink-900/50 text-pink-400"
                          }
                        `}
                        >
                          {item.teachingLevel}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-yellow-400">{item.rating}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-400">
                    <div className="flex flex-col items-center p-2 bg-gray-800 rounded-md">
                      <Users className="h-4 w-4 mb-1 text-blue-400" />
                      <span>{item.studentsTaught}</span>
                      <span>Students</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-800 rounded-md">
                      <BookOpen className="h-4 w-4 mb-1 text-green-400" />
                      <span>{item.sessionsTaught}</span>
                      <span>Sessions</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-800 rounded-md">
                      <Award className="h-4 w-4 mb-1 text-purple-400" />
                      <span>{item.tokensEarned}</span>
                      <span>Tokens</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Import the missing icons
import { Star, Users } from "lucide-react"

