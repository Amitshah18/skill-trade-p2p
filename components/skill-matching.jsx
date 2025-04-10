"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { getUserData } from "@/lib/auth"
import { ArrowRight, Star, Users, Clock, Award } from "lucide-react"

export default function SkillMatching() {
  const [userData, setUserData] = useState(null)
  const [matches, setMatches] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get user data
    const user = getUserData()
    if (user) {
      setUserData(user)

      // Generate mock skill matches based on user interests
      if (user.interests && user.interests.length > 0) {
        generateMatches(user.interests)
      }
    }

    setIsLoading(false)
  }, [])

  const generateMatches = (interests) => {
    // Mock data for skill matches
    const mockTeachers = [
      { id: 1, name: "Alex Johnson", rating: 4.9, students: 124, experience: "5 years" },
      { id: 2, name: "Sarah Miller", rating: 4.7, students: 89, experience: "3 years" },
      { id: 3, name: "Michael Brown", rating: 4.8, students: 156, experience: "7 years" },
      { id: 4, name: "Emily Davis", rating: 4.6, students: 72, experience: "2 years" },
      { id: 5, name: "David Wilson", rating: 4.9, students: 203, experience: "6 years" },
    ]

    const mockSkills = [
      "JavaScript",
      "Python",
      "React",
      "Node.js",
      "UI/UX Design",
      "Data Science",
      "Blockchain",
      "Digital Marketing",
      "Content Writing",
      "Mobile Development",
      "Game Development",
      "DevOps",
      "AI/ML",
    ]

    // Generate matches based on user interests
    const generatedMatches = interests.map((interest, index) => {
      // Pick a random teacher
      const teacher = mockTeachers[Math.floor(Math.random() * mockTeachers.length)]

      // Find a related skill or use the interest itself
      let skill = interest
      if (mockSkills.includes(interest)) {
        // If the interest is in our skill list, use it directly
        skill = interest
      } else {
        // Otherwise pick a random skill
        skill = mockSkills[Math.floor(Math.random() * mockSkills.length)]
      }

      // Generate a random match score between 80 and 99
      const matchScore = Math.floor(Math.random() * 20) + 80

      return {
        id: index + 1,
        skill,
        teacher,
        matchScore,
        availableTimes: ["Mon 2-4pm", "Wed 10am-12pm", "Fri 3-5pm"],
        price: Math.floor(Math.random() * 30) + 10, // Random price between 10-40 tokens
      }
    })

    setMatches(generatedMatches)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Skill Matches</h2>
        <Button variant="outline" className="text-blue-400 border-blue-800 hover:bg-blue-900/20">
          View All Matches
        </Button>
      </div>

      {matches.length === 0 ? (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6 pb-6 text-center">
            <p className="text-gray-400">No skill matches found. Try updating your interests.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <Card
              key={match.id}
              className="bg-gray-900 border-gray-800 overflow-hidden hover:border-purple-800 transition-colors"
            >
              <div className="h-2 bg-gradient-to-r from-purple-600 to-blue-600"></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white">{match.skill}</CardTitle>
                    <CardDescription className="text-gray-400">with {match.teacher.name}</CardDescription>
                  </div>
                  <Badge className="bg-purple-900 text-purple-200">{match.matchScore}% Match</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-gray-400 space-x-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{match.teacher.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-blue-500 mr-1" />
                    <span>{match.teacher.students} students</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-green-500 mr-1" />
                    <span>{match.teacher.experience}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-1">Match Strength</p>
                  <div className="flex items-center space-x-2">
                    <Progress
                      value={match.matchScore}
                      className="h-2 bg-gray-800"
                      indicatorClassName="bg-gradient-to-r from-purple-600 to-blue-600"
                    />
                    <span className="text-xs text-gray-500">{match.matchScore}%</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-1">Available Times</p>
                  <div className="flex flex-wrap gap-2">
                    {match.availableTimes.map((time, i) => (
                      <Badge key={i} variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                        {time}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-800 pt-4 flex justify-between items-center">
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-purple-500 mr-1" />
                  <span className="text-purple-400 font-medium">{match.price} tokens</span>
                </div>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Book Session <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

