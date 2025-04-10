"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Clock, Users, Coins } from "lucide-react"
import AuthCheckModal from "@/components/auth-check-modal"

export default function TeachPage() {
  const [skillTitle, setSkillTitle] = useState("")
  const [skillDescription, setSkillDescription] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setAuthModalOpen(true)
  }

  return (
    <main className="min-h-screen py-12 glossy-black-bg">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 gradient-text-blue-pink">Become a Teacher</h1>
          <p className="text-gray-400 mb-8">Share your skills and earn tokens by teaching others.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glossy-card">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-3 bg-gradient-to-br from-blue-600/20 to-pink-600/20 rounded-full mb-4 border border-blue-500/30">
                  <Upload className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="font-medium mb-1 text-white">Create a Skill Listing</h3>
                <p className="text-sm text-gray-400">Share what you can teach and set your price</p>
              </CardContent>
            </div>

            <div className="glossy-card">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-3 bg-gradient-to-br from-blue-600/20 to-pink-600/20 rounded-full mb-4 border border-blue-500/30">
                  <Clock className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="font-medium mb-1 text-white">Schedule Sessions</h3>
                <p className="text-sm text-gray-400">Set your availability and accept bookings</p>
              </CardContent>
            </div>

            <div className="glossy-card">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-3 bg-gradient-to-br from-blue-600/20 to-pink-600/20 rounded-full mb-4 border border-blue-500/30">
                  <Coins className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="font-medium mb-1 text-white">Earn Tokens</h3>
                <p className="text-sm text-gray-400">Get paid in tokens for your expertise</p>
              </CardContent>
            </div>
          </div>

          <div className="glossy-card">
            <CardHeader className="border-b border-gray-800/50 pb-5">
              <CardTitle className="text-white">Create a Skill Listing</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="skill-title" className="text-gray-300">
                    Skill Title
                  </Label>
                  <Input
                    id="skill-title"
                    placeholder="e.g., JavaScript Fundamentals"
                    value={skillTitle}
                    onChange={(e) => setSkillTitle(e.target.value)}
                    required
                    className="cyber-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skill-description" className="text-gray-300">
                    Description
                  </Label>
                  <Textarea
                    id="skill-description"
                    placeholder="Describe what you'll teach and your experience..."
                    value={skillDescription}
                    onChange={(e) => setSkillDescription(e.target.value)}
                    rows={5}
                    required
                    className="cyber-input"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-gray-300">
                      Category
                    </Label>
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger id="category" className="cyber-input">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="cyber-dropdown">
                        <SelectItem value="programming">Programming</SelectItem>
                        <SelectItem value="web3">Web3</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-gray-300">
                      Price (Tokens)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="e.g., 50"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      min="1"
                      required
                      className="cyber-input"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skill-image" className="text-gray-300">
                    Upload Image
                  </Label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center cyber-upload">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Drag and drop an image, or <span className="text-blue-400 font-medium">browse</span>
                    </p>
                    <input type="file" className="hidden" id="skill-image" />
                  </div>
                </div>

                <Button type="submit" className="w-full cyber-button-enhanced rounded-md text-white">
                  Create Skill Listing
                </Button>
              </form>
            </CardContent>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-white">Teacher Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-white">Build Your Reputation</h3>
                  <p className="text-sm text-gray-400">
                    Earn reviews and build a teaching portfolio to showcase your expertise.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Coins className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-white">Flexible Income</h3>
                  <p className="text-sm text-gray-400">Set your own rates and teach on your schedule to earn tokens.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthCheckModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} action="create a skill listing" />
    </main>
  )
}
