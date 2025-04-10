"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, Search, LogIn, UserPlus, Home, BookOpen, Briefcase, Info } from "lucide-react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import UserDropdown from "@/components/user-dropdown"
import NotificationDropdown from "@/components/notification-dropdown"
import { checkIsLoggedIn, getUserData, logout, isSessionValid, updateLastActivity } from "@/lib/auth"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  // Check if user is logged in based on URL path or localStorage
  useEffect(() => {
    setMounted(true)

    // Safe check for localStorage that won't cause render loops
    const checkAuthOnce = () => {
      if (typeof window !== "undefined") {
        try {
          const loginStatus = checkIsLoggedIn()
          const sessionValid = isSessionValid()

          if (loginStatus && sessionValid) {
            setIsLoggedIn(true)
            const userData = getUserData()
            if (userData) {
              setUser(userData)
              // Update last activity timestamp
              updateLastActivity()
            }
          } else if (loginStatus && !sessionValid) {
            // Session expired, log out
            logout()
            setIsLoggedIn(false)
            setUser(null)
          }
        } catch (error) {
          console.error("Auth check error:", error)
        }
      }
    }

    // Only run auth check once
    checkAuthOnce()
  }, []) // Empty dependency array ensures this only runs once

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 glass-nav ${
        isScrolled ? "backdrop-blur-xl shadow-lg shadow-black/20" : ""
      }`}
    >
      <div className="container flex h-16 items-center px-4 md:px-6 justify-between">
        <div className="flex items-center">
          <Link href={isLoggedIn ? "/home" : "/"} className="flex items-center mr-6 group">
            <div className="bg-gradient-to-r from-blue-600 to-pink-600 w-8 h-8 rounded-lg mr-2 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300"></div>
            <span className="text-xl font-bold gradient-text-blue-pink group-hover:neon-text-blue transition-all duration-300">
              SkillTrade
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href={isLoggedIn ? "/home" : "/"}
              className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md hover:bg-white/5 transition-colors relative group"
            >
              <span className="flex items-center">
                <Home className="w-4 h-4 mr-1.5 text-blue-400 group-hover:text-blue-300" />
                {isLoggedIn ? "Home" : "Home"}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/explore"
              className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md hover:bg-white/5 transition-colors relative group"
            >
              <span className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1.5 text-blue-400 group-hover:text-blue-300" />
                Explore
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/teach"
              className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md hover:bg-white/5 transition-colors relative group"
            >
              <span className="flex items-center">
                <Briefcase className="w-4 h-4 mr-1.5 text-blue-400 group-hover:text-blue-300" />
                Teach
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md hover:bg-white/5 transition-colors relative group"
            >
              <span className="flex items-center">
                <Info className="w-4 h-4 mr-1.5 text-blue-400 group-hover:text-blue-300" />
                About
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            {isLoggedIn && (
              <Link
                href="/contracts"
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md hover:bg-white/5 transition-colors relative group"
              >
                <span className="flex items-center">
                  <Info className="w-4 h-4 mr-1.5 text-blue-400 group-hover:text-blue-300" />
                  Contracts
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            )}
          </nav>
        </div>

        <div className="hidden md:flex items-center space-x-2 relative max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search for skills..."
              className="pl-10 pr-4 py-2 w-full cyber-input rounded-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {mounted && isLoggedIn && (
            <div className="flex items-center space-x-2">
              <NotificationDropdown />
              <UserDropdown />
            </div>
          )}

          {mounted && !isLoggedIn && (
            <>
              <Button
                variant="ghost"
                className="hidden md:flex items-center text-gray-300 hover:text-white hover:bg-white/5 relative group"
                asChild
              >
                <Link href="/login">
                  <LogIn className="h-4 w-4 mr-2 text-blue-400 group-hover:text-blue-300" />
                  Log In
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </Button>
              <Button className="hidden md:flex items-center cyber-button rounded-md" asChild>
                <Link href="/signup">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Link>
              </Button>
            </>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/5">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 cyber-dropdown">
              <DropdownMenuItem asChild className="hover:bg-white/5 focus:bg-white/5 cursor-pointer">
                <Link href={isLoggedIn ? "/home" : "/"} className="cursor-pointer">
                  {isLoggedIn ? "Home" : "Home"}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-white/5 focus:bg-white/5 cursor-pointer">
                <Link href="/explore" className="cursor-pointer">
                  Explore
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-white/5 focus:bg-white/5 cursor-pointer">
                <Link href="/teach" className="cursor-pointer">
                  Teach
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-white/5 focus:bg-white/5 cursor-pointer">
                <Link href="/about" className="cursor-pointer">
                  About
                </Link>
              </DropdownMenuItem>
              {!isLoggedIn ? (
                <>
                  <DropdownMenuItem asChild className="hover:bg-white/5 focus:bg-white/5 cursor-pointer">
                    <Link href="/login" className="cursor-pointer">
                      Log In
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-white/5 focus:bg-white/5 cursor-pointer">
                    <Link href="/signup" className="cursor-pointer">
                      Sign Up
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild className="hover:bg-white/5 focus:bg-white/5 cursor-pointer">
                    <Link href="/dashboard" className="cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-white/5 focus:bg-white/5 cursor-pointer">
                    <Link href="/profile" className="cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-white/5 focus:bg-white/5 cursor-pointer">
                    <Link href="/contracts" className="cursor-pointer">
                      Contracts
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-white/5 focus:bg-white/5 cursor-pointer">
                    <Link href="/notifications" className="cursor-pointer">
                      Notifications
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

