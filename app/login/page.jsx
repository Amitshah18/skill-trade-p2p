"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { AlertCircle, Mail, Lock, Wallet, Check, ChevronRight } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  // Form states
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  // UI states
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState(1) // 1: Credentials, 2: Wallet Connection
  const [credentialsValid, setCredentialsValid] = useState(false)

  // MetaMask connection states
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)

  // Check if MetaMask is installed
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMetaMaskInstalled(!!window.ethereum && window.ethereum.isMetaMask)
    }
  }, [])

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    try {
      setIsLoading(true)
      setError("")

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, let's use a simple validation
      if (email === "demo@example.com" && password === "password") {
        setCredentialsValid(true)
        setStep(2) // Move to wallet connection step
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
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

      // Simulate verification
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect after successful connection
      router.push("/dashboard")
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

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center justify-center group">
            <div className="bg-gradient-to-r from-blue-600 to-pink-600 w-10 h-10 rounded-lg mr-2 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300"></div>
            <span className="text-2xl font-bold gradient-text-blue-pink group-hover:neon-text-blue transition-all duration-300">
              SkillTrade
            </span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white neon-text-blue">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-400">Sign in to your account to continue your learning journey</p>
        </div>

        <div className="cyber-card">
          <div className="cyber-card-content">
            <CardHeader className="border-b border-gray-800/50 pb-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">{step === 1 ? "Sign In" : "Connect Wallet"}</h3>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white" : "bg-gray-800 text-gray-500"}`}
                  >
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="w-8 border-t border-gray-700"></div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white" : "bg-gray-800 text-gray-500"}`}
                  >
                    <Wallet className="h-4 w-4" />
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

              {step === 1 ? (
                <form onSubmit={handleCredentialsSubmit} className="space-y-4">
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
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-gray-300">
                        Password
                      </Label>
                      <Link href="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10 cyber-input rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={setRememberMe}
                      className="cyber-checkbox"
                    />
                    <label htmlFor="remember" className="text-sm font-medium leading-none text-gray-400">
                      Remember me
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full cyber-button rounded-md overflow-hidden group"
                    disabled={isLoading}
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
                        Signing in...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Continue{" "}
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/50">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Credentials Verified</p>
                        <p className="text-xs text-gray-400">{email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-600/20 to-purple-600/20 border border-pink-500/30 mb-4">
                        <Wallet className="h-8 w-8 text-pink-400" />
                      </div>
                      <h3 className="text-lg font-medium text-white mb-2 neon-text-pink">Connect Your Wallet</h3>
                      <p className="text-sm text-gray-400 mb-4">
                        Connect your wallet to access your tokens and complete the sign-in process.
                      </p>
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
                </div>
              )}
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 border-t border-gray-800/50 pt-5">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-800"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-[#0a0a14] px-2 text-gray-500">Or continue with</span>
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
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-blue-400 hover:text-blue-300 relative inline-block group">
            Sign up
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </p>
      </div>
    </div>
  )
}

