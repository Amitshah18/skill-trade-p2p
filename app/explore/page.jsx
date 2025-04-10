"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"
import { Search, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("")
  const [priceRange, setPriceRange] = useState([0, 100])

  // Mock data for skills
  const skills = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      teacher: "Alex Johnson",
      category: "Programming",
      price: 50,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Blockchain Development",
      teacher: "Maria Garcia",
      category: "Web3",
      price: 75,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      teacher: "David Kim",
      category: "Design",
      price: 60,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
    },
    {
      id: 4,
      title: "Smart Contract Development",
      teacher: "Sophia Chen",
      category: "Web3",
      price: 80,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
    },
    {
      id: 5,
      title: "React Advanced Patterns",
      teacher: "James Wilson",
      category: "Programming",
      price: 65,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
    },
    {
      id: 6,
      title: "NFT Creation Workshop",
      teacher: "Elena Martinez",
      category: "Web3",
      price: 70,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
    },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    // In a real app, this would filter the skills
    console.log("Searching for:", searchQuery, category, priceRange)
  }

  return (
    <main className="min-h-screen py-12 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="container px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Explore Skills</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-3">
            <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="What do you want to learn?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 cyber-input"
              />
              <Button
                type="submit"
                className="cyber-button bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" className="w-full cyber-button">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2 text-white">Categories</h3>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="cyber-input">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="cyber-dropdown">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="web3">Web3</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="font-medium mb-2 text-white">Price Range (Tokens)</h3>
              <Slider defaultValue={[0, 100]} max={100} step={1} onValueChange={setPriceRange} className="mb-2" />
              <div className="flex justify-between text-sm text-blue-300">
                <span>{priceRange[0]} Tokens</span>
                <span>{priceRange[1]} Tokens</span>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2 text-white">Rating</h3>
              <Select>
                <SelectTrigger className="cyber-input">
                  <SelectValue placeholder="Any rating" />
                </SelectTrigger>
                <SelectContent className="cyber-dropdown">
                  <SelectItem value="any">Any rating</SelectItem>
                  <SelectItem value="4.5">4.5 & up</SelectItem>
                  <SelectItem value="4.0">4.0 & up</SelectItem>
                  <SelectItem value="3.5">3.5 & up</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full cyber-button bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
              Apply Filters
            </Button>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div key={skill.id} className="cyber-card cyber-card-hover">
                <div className="cyber-card-content overflow-hidden">
                  <div className="relative h-40 w-full">
                    <Image src={skill.image || "/placeholder.svg"} alt={skill.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="cyber-badge bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border-blue-500/50 text-white">
                        {skill.category}
                      </Badge>
                      <div className="flex items-center bg-yellow-900/30 px-2 py-1 rounded-full border border-yellow-500/30">
                        <span className="text-sm font-medium text-yellow-400 mr-1">{skill.rating}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 text-yellow-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-1 text-white">{skill.title}</h3>
                    <p className="text-sm text-blue-300 mb-2">by {skill.teacher}</p>
                    <p className="font-medium text-white">
                      {skill.price} <span className="text-blue-300">Tokens</span>
                    </p>
                    <Button className="w-full mt-3 cyber-button bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
                      Book Session
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
