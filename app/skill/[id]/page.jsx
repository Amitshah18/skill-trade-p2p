"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Clock, Users, BookOpen, Calendar, MessageSquare, ArrowLeft } from "lucide-react"
import { checkIsLoggedIn, isSessionValid, updateLastActivity } from "@/lib/auth"

export default function SkillPage({ params }) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [skillData, setSkillData] = useState(null)
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

      // Mock skill data
      const mockSkill = {
        id: params.id,
        name: params.id === "1" ? "Python Programming" : params.id === "2" ? "UI/UX Design" : "Data Analysis",
        description:
          "Learn the fundamentals and advanced concepts of this in-demand skill from experienced professionals.",
        rating: 4.8,
        reviews: 124,
        students: 1250,
        sessions: 45,
        matchScore: params.id === "1" ? 95 : params.id === "2" ? 88 : 82,
        popularity: params.id === "1" ? "High" : params.id === "2" ? "Medium" : "High",
        prerequisites: ["Basic computer knowledge", "Problem-solving skills"],
        topics: [
          "Introduction to the fundamentals",
          "Core concepts and principles",
          "Advanced techniques",
          "Real-world applications",
          "Best practices and optimization",
        ],
        teachers: [
          {
            id: 1,
            name: "Alex Johnson",
            title: "Senior Developer",
            rating: 4.9,
            students: 450,
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            id: 2,
            name: "Sarah Miller",
            title: "Lead Designer",
            rating: 4.7,
            students: 320,
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
        reviews: [
          {
            id: 1,
            user: "Michael T.",
            rating: 5,
            comment:
              "Excellent skill to learn. The teachers are very knowledgeable and the content is well-structured.",
            date: "2 weeks ago",
          },
          {
            id: 2,
            user: "Jessica L.",
            rating: 4,
            comment: "Very practical approach. I was able to apply what I learned immediately in my projects.",
            date: "1 month ago",
          },
        ],
      }

      setSkillData(mockSkill)
      setIsLoading(false)
    }

    // Update activity timestamp
    updateLastActivity()
  }, [params.id])

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
    <div className="min-h-screen bg-black text-white">
      {/* Hero section */}
      <div className="bg-gradient-to-b from-purple-900/30 to-black pt-8 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 text-gray-400 hover:text-white hover:bg-white/5"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                {skillData.name}
              </h1>
              <p className="mt-2 text-gray-400 max-w-2xl">{skillData.description}</p>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="font-medium">{skillData.rating}</span>
                  <span className="text-gray-400 ml-1">({skillData.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-500 mr-1" />
                  <span>{skillData.students} students</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-green-500 mr-1" />
                  <span>{skillData.sessions} active sessions</span>
                </div>
                <Badge className="bg-purple-900 text-purple-200 hover:bg-purple-800">
                  {skillData.matchScore}% Match
                </Badge>
                <Badge
                  className={`${
                    skillData.popularity === "High"
                      ? "bg-green-900 text-green-200 hover:bg-green-800"
                      : skillData.popularity === "Medium"
                        ? "bg-yellow-900 text-yellow-200 hover:bg-yellow-800"
                        : "bg-blue-900 text-blue-200 hover:bg-blue-800"
                  }`}
                >
                  {skillData.popularity} Popularity
                </Badge>
              </div>
            </div>

            <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-3">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <BookOpen className="h-4 w-4 mr-2" />
                Start Learning
              </Button>
              <Button variant="outline" className="border-gray-700 hover:bg-white/5">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Session
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="related">Related Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h2 className="text-xl font-bold mb-4">About this Skill</h2>
                  <p className="text-gray-300">
                    {skillData.name} is one of the most in-demand skills in today's job market. Whether you're looking
                    to advance your career or pursue personal projects, mastering this skill will open up numerous
                    opportunities.
                  </p>
                  <p className="text-gray-300 mt-4">
                    Our experienced teachers provide personalized guidance and hands-on practice to ensure you gain
                    practical expertise that you can apply immediately.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4">What You'll Learn</h2>
                  <ul className="space-y-2">
                    {skillData.topics.map((topic, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-purple-900 flex items-center justify-center text-xs mr-3 mt-0.5">
                          {index + 1}
                        </div>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4">Prerequisites</h2>
                  <ul className="space-y-2">
                    {skillData.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-gray-800 flex items-center justify-center mr-3 mt-0.5">
                          <svg
                            className="h-3 w-3 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>{prerequisite}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <h3 className="font-bold mb-4">Top Teachers</h3>
                  <div className="space-y-4">
                    {skillData.teachers.slice(0, 2).map((teacher) => (
                      <div key={teacher.id} className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={teacher.image} alt={teacher.name} />
                          <AvatarFallback className="bg-purple-900">{teacher.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{teacher.name}</p>
                          <p className="text-xs text-gray-400">{teacher.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full mt-4 text-purple-400 hover:text-purple-300 hover:bg-white/5"
                    onClick={() => document.querySelector('[data-value="teachers"]').click()}
                  >
                    View all teachers
                  </Button>
                </div>

                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <h3 className="font-bold mb-4">Get Started</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Ready to master {skillData.name}? Schedule a session with one of our expert teachers or join a group
                    class.
                  </p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule 1:1 Session
                  </Button>
                  <Button variant="outline" className="w-full border-gray-700 hover:bg-white/5">
                    <Users className="h-4 w-4 mr-2" />
                    Join Group Class
                  </Button>
                </div>

                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <h3 className="font-bold mb-4">Have Questions?</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Our teachers are happy to answer any questions you might have about this skill.
                  </p>
                  <Button variant="outline" className="w-full border-gray-700 hover:bg-white/5">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact a Teacher
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="teachers" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillData.teachers.map((teacher) => (
                <div key={teacher.id} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={teacher.image} alt={teacher.name} />
                      <AvatarFallback className="bg-purple-900">{teacher.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold">{teacher.name}</h3>
                      <p className="text-sm text-gray-400">{teacher.title}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{teacher.rating}</span>
                    </div>
                    <div className="text-sm text-gray-400">{teacher.students} students</div>
                  </div>

                  <p className="text-sm text-gray-300 mb-4">
                    Experienced {skillData.name} professional with a passion for teaching and helping others master this
                    valuable skill.
                  </p>

                  <div className="flex space-x-3">
                    <Button className="flex-1 bg-purple-600 hover:bg-purple-700">Book Session</Button>
                    <Button variant="outline" className="flex-1 border-gray-700 hover:bg-white/5">
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{skillData.rating}</h2>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(skillData.rating) ? "text-yellow-500" : "text-gray-600"}`}
                        />
                      ))}
                      <span className="ml-2 text-gray-400">({skillData.reviews} reviews)</span>
                    </div>
                  </div>

                  <Button className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700">Write a Review</Button>
                </div>
              </div>

              {skillData.reviews.map((review) => (
                <div key={review.id} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold">{review.user}</h3>
                      <p className="text-sm text-gray-400">{review.date}</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "text-yellow-500" : "text-gray-600"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="related" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Web Development", "Machine Learning", "Digital Marketing"].map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-purple-600 transition-colors cursor-pointer"
                >
                  <h3 className="font-bold mb-2">{skill}</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    A complementary skill that pairs well with {skillData.name}.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium">4.{6 + index}</span>
                    </div>
                    <Badge className="bg-blue-900 text-blue-200">High Demand</Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

