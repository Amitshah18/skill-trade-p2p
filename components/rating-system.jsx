"use client"

import { useState } from "react"
import { Star, MessageSquare, ThumbsUp, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function RatingSystem({ sessionId, teacherName, skillName, onSubmit }) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleRatingChange = (value) => {
    setRating(value)
  }

  const handleMouseEnter = (value) => {
    setHoveredRating(value)
  }

  const handleMouseLeave = () => {
    setHoveredRating(0)
  }

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Please select a rating")
      return
    }

    if (feedback.trim().length < 10) {
      setError("Please provide more detailed feedback (at least 10 characters)")
      return
    }

    setError("")
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Call the onSubmit callback if provided
      if (onSubmit) {
        onSubmit({ sessionId, rating, feedback })
      }

      setSubmitted(true)
    } catch (err) {
      setError("Failed to submit rating. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = () => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => handleRatingChange(value)}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
            className="focus:outline-none"
          >
            <Star
              className={`h-8 w-8 ${
                value <= (hoveredRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-500"
              } transition-colors`}
            />
          </button>
        ))}
      </div>
    )
  }

  if (submitted) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="pt-6 pb-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center">
              <ThumbsUp className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Thank You for Your Feedback!</h3>
            <p className="text-gray-400">
              Your rating and feedback help improve the SkillTrade community for everyone.
            </p>
            <div className="flex space-x-1 mt-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <Star
                  key={value}
                  className={`h-6 w-6 ${value <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Award className="h-5 w-5 text-purple-400 mr-2" />
          Rate Your Session
        </CardTitle>
        <CardDescription className="text-gray-400">
          How was your session with {teacherName} learning {skillName}?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-2">
          <p className="text-sm text-gray-400">Your rating</p>
          {renderStars()}
          <p className="text-sm text-gray-500">
            {rating === 1
              ? "Poor"
              : rating === 2
                ? "Fair"
                : rating === 3
                  ? "Good"
                  : rating === 4
                    ? "Very Good"
                    : rating === 5
                      ? "Excellent"
                      : "Select a rating"}
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="feedback" className="text-sm text-gray-400 flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            Your feedback
          </label>
          <Textarea
            id="feedback"
            placeholder="Share your experience and help others learn..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 min-h-[100px]"
          />
          <p className="text-xs text-gray-500">
            Your feedback will be shared with the teacher and may be displayed publicly.
          </p>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}
      </CardContent>
      <CardFooter className="border-t border-gray-800 pt-4">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </>
          ) : (
            "Submit Rating"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

