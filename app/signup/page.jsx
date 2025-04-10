"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { AlertCircle, Mail, Lock, Wallet, Upload, User, Check, ChevronRight, ChevronLeft, Plus } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { checkIsLoggedIn } from "@/lib/auth"
import { setFullLoginState } from "@/lib/auth"

export default function SignupPage() {
  const router = useRouter()
  const isInitialMount = useRef(true)
  const [mounted, setMounted] = useState(false)

  // Multi-step form state
  const [step, setStep] = useState(1) // 1: Personal Info, 2: Wallet, 3: Skills & Interests

  // Form fields
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [selectedSkills, setSelectedSkills] = useState([])
  const [selectedInterests, setSelectedInterests] = useState([])
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [customSkill, setCustomSkill] = useState("")
  const [customInterest, setCustomInterest] = useState("")

  // UI states
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [previewUrl, setPreviewUrl] = useState(null)

  // MetaMask connection states
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [profilePic, setProfilePic] = useState(null)

  // Available skills and interests
  const availableSkills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Blockchain",
    "Solidity",
    "UI/UX Design",
    "Digital Marketing",
    "Content Writing",
    "Data Science",
  ]

  const availableInterests = [
    "Web Development",
    "Mobile Development",
    "Blockchain",
    "Design",
    "Marketing",
    "Writing",
    "Data Science",
    "AI/ML",
    "DevOps",
    "Game Development",
  ]

  // Safe initialization
  useEffect(() => {
    setMounted(true)

    // Check if user is already logged in - only on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false

      if (checkIsLoggedIn()) {
        router.push("/dashboard")
      }
    }

    // Check if MetaMask is installed
    if (typeof window !== "undefined" && window.ethereum) {
      setIsMetaMaskInstalled(window.ethereum.isMetaMask)
    }
  }, [router])

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0

    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    setPasswordStrength(strength)
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    checkPasswordStrength(newPassword)
  }

  const toggleSkill = (skill) => {
    setSelectedSkills((prevSkills) => {
      if (prevSkills.includes(skill)) {
        return prevSkills.filter((s) => s !== skill) // Remove if already selected
      } else {
        if (prevSkills.length < 5) {
          return [...prevSkills, skill] // Add if below limit
        } else {
          setError("You can only select up to 5 skills.")
          return prevSkills
        }
      }
    })
  }

  const toggleInterest = (interest) => {
    setSelectedInterests((prevInterests) => {
      if (prevInterests.includes(interest)) {
        return prevInterests.filter((i) => i !== interest) // Remove if already selected
      } else {
        if (prevInterests.length < 5) {
          return [...prevInterests, interest] // Add if below limit
        } else {
          setError("You can only select up to 5 interests.")
          return prevInterests
        }
      }
    })
  }

  const addCustomSkill = () => {
    if (customSkill && !selectedSkills.includes(customSkill)) {
      if (selectedSkills.length < 5) {
        setSelectedSkills([...selectedSkills, customSkill])
        setCustomSkill("") // Clear input
      } else {
        setError("You can only select up to 5 skills")
      }
    }
  }

  const addCustomInterest = () => {
    if (customInterest && !selectedInterests.includes(customInterest)) {
      if (selectedInterests.length < 5) {
        setSelectedInterests([...selectedInterests, customInterest])
        setCustomInterest("") // Clear input
      } else {
        setError("You can only select up to 5 interests")
      }
    }
  }

  const connectWallet = async () => {
    if (!isMetaMaskInstalled) {
      window.open("https://metamask.io/download/", "_blank")
      return
    }

    try {
      setIsConnecting(true)
      setError("")

      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

      if (accounts.length === 0) {
        throw new Error("No accounts found")
      }

      setWalletAddress(accounts[0])
      setWalletConnected(true)

      // Listen for account changes
      window.ethereum.on("accountsChanged", (newAccounts) => {
        if (newAccounts.length === 0) {
          setWalletAddress("")
          setWalletConnected(false)
        } else {
          setWalletAddress(newAccounts[0])
        }
      })
    } catch (err) {
      if (err.code === 4001) {
        // User rejected the request
        setError("You rejected the connection request")
      } else {
        setError("Failed to connect wallet. Please try again.")
        console.error(err)
      }
    } finally {
      setIsConnecting(false)
    }
  }

  const validateStep = (currentStep) => {
    setError("")

    if (currentStep === 1) {
      if (!fullName) {
        setError("Please enter your full name")
        return false
      }
      if (!email) {
        setError("Please enter your email")
        return false
      }
      if (!password) {
        setError("Please enter a password")
        return false
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match")
        return false
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters long")
        return false
      }
      return true
    }

    if (currentStep === 2) {
      if (!walletConnected) {
        setError("Please connect your wallet to continue")
        return false
      }
      return true
    }

    if (currentStep === 3) {
      if (selectedSkills.length === 0) {
        setError("Please select at least one skill you can teach")
        return false
      }
      if (selectedInterests.length === 0) {
        setError("Please select at least one interest you want to learn")
        return false
      }
      if (!agreeTerms) {
        setError("You must agree to the terms and conditions")
        return false
      }
      return true
    }

    return true
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  // Fix the profile picture upload functionality in the signup page
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Create a preview URL for the selected image
      const fileReader = new FileReader()
      fileReader.onload = () => {
        // Set preview URL for immediate display
        setPreviewUrl(fileReader.result)
        setProfilePic(file)
      }
      fileReader.readAsDataURL(file)
    }
  }

  // Update the handleSubmit function to use the new setFullLoginState function
  const handleSubmit = async (e) => {
    if (e) e.preventDefault()

    if (!validateStep(3)) {
      return
    }

    try {
      setIsLoading(true)
      setError("")

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate a mock auth token
      const mockToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

      // Create user object
      const user = {
        name: fullName,
        email,
        walletAddress,
        skills: selectedSkills,
        interests: selectedInterests,
        image: previewUrl || "/placeholder.svg?height=100&width=100",
        initials: fullName
          .split(" ")
          .map((n) => n[0])
          .join(""),
        createdAt: new Date().toISOString(),
      }

      // Use the new function to set all auth data at once
      setFullLoginState(user, mockToken)

      // Store profile image separately if needed
      if (previewUrl && typeof window !== "undefined") {
        localStorage.setItem("userProfileImage", previewUrl)
      }

      // Use a longer timeout to ensure localStorage operations complete
      // and use window.location for a full page reload instead of router
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 500)
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Personal Information"
      case 2:
        return "Connect Wallet"
      case 3:
        return "Skills & Interests"
      default:
        return "Create Account"
    }
  }

  const getProgressPercentage = () => {
    return (step / 3) * 100
  }

  // Don't render until client-side hydration is complete
  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 cyber-grid z-0"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-pink-600/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-blue-600/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-gradient-to-bl from-purple-600/10 to-transparent rounded-full blur-3xl"></div>

        {/* Floating particles */}
        <div className="particle w-1 h-1 top-[10%] left-[20%] opacity-30"></div>
        <div className="particle w-2 h-2 top-[30%] left-[80%] opacity-20"></div>
        <div className="particle w-1 h-1 top-[70%] left-[10%] opacity-30"></div>
        <div className="particle w-2 h-2 top-[40%] left-[60%] opacity-20"></div>
        <div className="particle w-1 h-1 top-[80%] left-[30%] opacity-30"></div>
      </div>

      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center justify-center group">
            <div className="bg-gradient-to-r from-blue-600 to-pink-600 w-10 h-10 rounded-lg mr-2 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300"></div>
            <span className="text-2xl font-bold gradient-text-blue-pink group-hover:neon-text-blue transition-all duration-300">
              SkillTrade
            </span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white neon-text-blue">Create your account</h2>
          <p className="mt-2 text-sm text-gray-400">Join our community of learners and teachers</p>
        </div>

        <div className="cyber-card">
          <div className="cyber-card-content">
            <CardHeader className="border-b border-gray-800/50 pb-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white neon-text-blue">{getStepTitle()}</h3>
                  <div className="text-sm text-gray-400">Step {step} of 3</div>
                </div>

                <div className="w-full cyber-progress">
                  <div className="cyber-progress-bar" style={{ width: `${getProgressPercentage()}%` }}></div>
                </div>

                <div className="flex justify-between">
                  <div className={`flex items-center space-x-2 ${step >= 1 ? "text-blue-400" : "text-gray-600"}`}>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 1 ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white" : "bg-gray-800 text-gray-600"}`}
                    >
                      {step > 1 ? <Check className="h-3 w-3" /> : "1"}
                    </div>
                    <span className="text-xs">Account</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${step >= 2 ? "text-blue-400" : "text-gray-600"}`}>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 2 ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white" : "bg-gray-800 text-gray-600"}`}
                    >
                      {step > 2 ? <Check className="h-3 w-3" /> : "2"}
                    </div>
                    <span className="text-xs">Wallet</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${step >= 3 ? "text-blue-400" : "text-gray-600"}`}>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 3 ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white" : "bg-gray-800 text-gray-600"}`}
                    >
                      {step > 3 ? <Check className="h-3 w-3" /> : "3"}
                    </div>
                    <span className="text-xs">Skills</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              {error && (
                <Alert variant="destructive" className="mb-4 bg-red-900/50 border-red-800 text-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-gray-300">
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="fullName"
                          placeholder="John Doe"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="pl-10 cyber-input rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-10 cyber-input rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-300">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={handlePasswordChange}
                          required
                          className="pl-10 cyber-input rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full ${
                              passwordStrength >= level
                                ? level <= 2
                                  ? "bg-orange-500"
                                  : "bg-green-500"
                                : "bg-gray-800"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Password strength:{" "}
                        {passwordStrength === 0
                          ? "Very weak"
                          : passwordStrength === 1
                            ? "Weak"
                            : passwordStrength === 2
                              ? "Medium"
                              : passwordStrength === 3
                                ? "Strong"
                                : "Very strong"}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-gray-300">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="pl-10 cyber-input rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-600/20 to-purple-600/20 border border-pink-500/30 mb-4">
                        <Wallet className="h-8 w-8 text-pink-400" />
                      </div>
                      <h3 className="text-lg font-medium text-white mb-2 neon-text-pink">Connect Your Wallet</h3>
                      <p className="text-sm text-gray-400 mb-4">
                        Your wallet is required for token transactions on the platform.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/50">
                      <p className="text-sm text-gray-400">
                        <span className="text-pink-400 font-medium">Important:</span> Connecting your wallet is
                        mandatory to use SkillTrade. This allows you to:
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-gray-400">
                        <li className="flex items-start">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-3 w-3 text-blue-400" />
                          </div>
                          <span>Pay for skills with tokens</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-3 w-3 text-blue-400" />
                          </div>
                          <span>Receive tokens when teaching others</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-3 w-3 text-blue-400" />
                          </div>
                          <span>Secure your identity on the platform</span>
                        </li>
                      </ul>
                    </div>

                    {walletConnected ? (
                      <div className="p-4 rounded-lg border border-green-900/50 bg-green-900/20">
                        <div className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-green-400">Wallet Connected</p>
                            <p className="text-xs text-green-500/80">
                              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        className="w-full cyber-button rounded-md overflow-hidden group"
                        onClick={connectWallet}
                        disabled={isConnecting}
                      >
                        {isConnecting ? (
                          <span className="flex items-center">
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
                            Connecting...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Wallet className="mr-2 h-4 w-4" />
                            {isMetaMaskInstalled ? "Connect MetaMask" : "Install MetaMask"}
                          </span>
                        )}
                      </Button>
                    )}
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-gray-300">Skills You Can Teach (max 5)</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {availableSkills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className={`cursor-pointer cyber-badge transition-all duration-200 ${
                                selectedSkills.includes(skill)
                                  ? "bg-blue-500 text-white border-blue-700 shadow-md" // Selected color
                                  : "bg-gray-700 text-gray-300 border-gray-500" // Default color
                              }`}
                              onClick={() => toggleSkill(skill)}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        {/* Custom skill input */}
                        <div className="mt-3 flex space-x-2">
                          <Input
                            placeholder="Add custom skill..."
                            value={customSkill}
                            onChange={(e) => setCustomSkill(e.target.value)}
                            className="cyber-input"
                          />
                          <Button
                            type="button"
                            onClick={addCustomSkill}
                            disabled={!customSkill || selectedSkills.length >= 5}
                            className="cyber-button"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Selected skills display */}
                        {selectedSkills.length > 0 && (
                          <div className="mt-3">
                            <Label className="text-gray-300">Selected Skills</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {selectedSkills.map((skill, index) => (
                                <Badge
                                  key={index}
                                  className="bg-blue-500 text-white border-blue-700 shadow-md flex items-center gap-1 px-3 py-1.5 text-sm whitespace-normal"
                                >
                                  {skill}
                                  <button
                                    className="ml-1 hover:text-red-200 transition-colors"
                                    onClick={() => setSelectedSkills(selectedSkills.filter((s) => s !== skill))}
                                  >
                                    ×
                                  </button>
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-300">Interests You Want to Learn (max 5)</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {availableInterests.map((interest) => (
                            <Badge
                              key={interest}
                              variant="outline"
                              className={`cursor-pointer cyber-badge transition-all duration-200 ${
                                selectedInterests.includes(interest)
                                  ? "bg-pink-500 text-white border-pink-700 shadow-md" // Selected color
                                  : "bg-gray-700 text-gray-300 border-gray-500" // Default color
                              }`}
                              onClick={() => toggleInterest(interest)}
                            >
                              {interest}
                            </Badge>
                          ))}
                        </div>

                        {/* Custom interest input */}
                        <div className="mt-3 flex space-x-2">
                          <Input
                            placeholder="Add custom interest..."
                            value={customInterest}
                            onChange={(e) => setCustomInterest(e.target.value)}
                            className="cyber-input"
                          />
                          <Button
                            type="button"
                            onClick={addCustomInterest}
                            disabled={!customInterest || selectedInterests.length >= 5}
                            className="cyber-button"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Selected interests display */}
                        {selectedInterests.length > 0 && (
                          <div className="mt-3">
                            <Label className="text-gray-300">Selected Interests</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {selectedInterests.map((interest, index) => (
                                <Badge
                                  key={index}
                                  className="bg-pink-500 text-white border-pink-700 shadow-md flex items-center gap-1 px-3 py-1.5 text-sm whitespace-normal"
                                >
                                  {interest}
                                  <button
                                    className="ml-1 hover:text-red-200 transition-colors"
                                    onClick={() =>
                                      setSelectedInterests(selectedInterests.filter((i) => i !== interest))
                                    }
                                  >
                                    ×
                                  </button>
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="profile-picture" className="text-gray-300">
                          Profile Picture
                        </Label>
                        <div className="cyber-upload p-6 text-center cursor-pointer relative">
                          <input
                            type="file"
                            id="profile-picture"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                          {previewUrl ? (
                            <div className="relative w-24 h-24 mx-auto mb-2 rounded-full overflow-hidden border-2 border-blue-500/30">
                              <img
                                src={previewUrl || "/placeholder.svg"}
                                alt="Profile preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <Upload className="h-8 w-8 mx-auto text-gray-500 mb-2" />
                          )}
                          <p className="text-sm text-gray-500">
                            {previewUrl ? "Change profile picture" : "Drag and drop an image, or"}{" "}
                            <span className="text-blue-400 font-medium">browse</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={agreeTerms}
                          onCheckedChange={setAgreeTerms}
                          className="cyber-checkbox"
                        />
                        <label htmlFor="terms" className="text-sm font-medium leading-none text-gray-400">
                          I agree to the{" "}
                          <Link href="/terms" className="text-blue-400 hover:text-blue-300 relative inline-block group">
                            terms of service
                            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy"
                            className="text-blue-400 hover:text-blue-300 relative inline-block group"
                          >
                            privacy policy
                            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                          </Link>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="cyber-button rounded-md group"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                      Back
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  {step < 3 ? (
                    <Button type="button" onClick={handleNext} className="cyber-button rounded-md group">
                      Next
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="cyber-button rounded-md"
                    >
                      {isLoading ? (
                        <span className="flex items-center">
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
                          Creating account...
                        </span>
                      ) : (
                        <span>Create Account</span>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 border-t border-gray-800/50 pt-5">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-800"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-[#0a0a14] px-2 text-gray-500">Or sign up with</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" className="cyber-button rounded-md">
                  <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.0003 2C6.47731 2 2.00031 6.477 2.00031 12C2.00031 16.991 5.65731 21.128 10.4383 21.879V14.89H7.89831V12H10.4383V9.797C10.4383 7.291 11.9323 5.907 14.2153 5.907C15.3103 5.907 16.4543 6.102 16.4543 6.102V8.562H15.1923C13.9503 8.562 13.5623 9.333 13.5623 10.124V12H16.3363L15.8933 14.89H13.5623V21.879C18.3433 21.129 22.0003 16.99 22.0003 12C22.0003 6.477 17.5233 2 12.0003 2Z" />
                  </svg>
                </Button>
                <Button variant="outline" className="cyber-button rounded-md">
                  <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.258 1.33c-0.958 0.425-1.983 0.708-3.058 0.842 1.1-0.658 1.942-1.7 2.342-2.942-1.033 0.608-2.167 1.042-3.375 1.275-0.975-1.033-2.358-1.675-3.883-1.675-2.942 0-5.325 2.383-5.325 5.325 0 0.417 0.042 0.825 0.133 1.217-4.433-0.225-8.358-2.35-10.992-5.575-0.458 0.792-0.725 1.7-0.725 2.675 0 1.85 0.942 3.483 2.367 4.433-0.875-0.025-1.692-0.267-2.408-0.667v0.067c0 2.583 1.833 4.733 4.275 5.225-0.45 0.125-0.917 0.183-1.4 0.183-0.342 0-0.675-0.033-1-0.092 0.675 2.117 2.642 3.658 4.967 3.7-1.817 1.425-4.117 2.275-6.617 2.275-0.433 0-0.85-0.025-1.267-0.075 2.35 1.5 5.15 2.383 8.15 2.383 9.775 0 15.125-8.1 15.125-15.125 0-0.233-0.008-0.458-0.017-0.683 1.042-0.75 1.942-1.692 2.65-2.767z" />
                  </svg>
                </Button>
                <Button variant="outline" className="cyber-button rounded-md">
                  <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.521 21.278 9.521 21.016C9.521 20.782 9.512 20.082 9.508 19.212C6.726 19.859 6.139 17.777 6.139 17.777C5.685 16.598 5.029 16.296 5.029 16.296C4.132 15.65 5.097 15.663 5.097 15.663C6.094 15.734 6.628 16.714 6.628 16.714C7.521 18.256 8.97 17.825 9.539 17.573C9.631 16.928 9.889 16.497 10.175 16.252C7.954 16.004 5.62 15.151 5.62 11.388C5.62 10.257 6.01 9.334 6.649 8.613C6.545 8.364 6.203 7.355 6.747 6.02C6.747 6.02 7.587 5.756 9.497 7.009C10.295 6.791 11.15 6.682 12 6.678C12.85 6.682 13.705 6.791 14.504 7.009C16.413 5.756 17.251 6.02 17.251 6.02C17.797 7.355 17.455 8.364 17.351 8.613C17.991 9.334 18.379 10.257 18.379 11.388C18.379 15.161 16.041 16.001 13.813 16.244C14.172 16.547 14.496 17.149 14.496 18.069C14.496 19.385 14.483 20.692 14.483 21.016C14.483 21.28 14.663 21.586 15.173 21.487C19.138 20.161 22 16.416 22 12C22 6.477 17.523 2 12 2Z" />
                  </svg>
                </Button>
              </div>
            </CardFooter>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300 relative inline-block group">
            Sign in
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </p>
      </div>
    </div>
  )
}

