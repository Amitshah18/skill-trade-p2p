// Create a new utility file for authentication

/**
 * Safe authentication utilities that prevent render loops
 */

// Check if user is logged in without causing re-renders
export function checkIsLoggedIn() {
    // Only run on client
    if (typeof window === "undefined") {
      return false
    }
  
    try {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
      // Also verify we have user data if logged in
      if (isLoggedIn) {
        const userData = localStorage.getItem("user")
        return !!userData // Return false if no user data
      }
      return isLoggedIn
    } catch (e) {
      console.error("Error checking login status:", e)
      return false
    }
  }
  
  // Get user data safely
  export function getUserData() {
    // Only run on client
    if (typeof window === "undefined") {
      return null
    }
  
    try {
      const userData = localStorage.getItem("user")
      return userData ? JSON.parse(userData) : null
    } catch (e) {
      console.error("Error getting user data:", e)
      return null
    }
  }
  
  // Set login state safely
  export function setLoginState(isLoggedIn, userData = null) {
    // Only run on client
    if (typeof window === "undefined") {
      return
    }
  
    try {
      if (isLoggedIn) {
        localStorage.setItem("isLoggedIn", "true")
        if (userData) {
          localStorage.setItem("user", JSON.stringify(userData))
        }
      } else {
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("user")
      }
    } catch (e) {
      console.error("Error setting login state:", e)
    }
  }
  
  // Log out safely
  export function logout() {
    // Only run on client
    if (typeof window === "undefined") {
      return
    }
  
    try {
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("user")
      localStorage.removeItem("userToken")
      localStorage.removeItem("userProfileImage")
  
      // Clear any other auth-related items
      localStorage.removeItem("authToken")
      localStorage.removeItem("lastActivity")
      localStorage.removeItem("sessionExpiry")
    } catch (e) {
      console.error("Error during logout:", e)
    }
  }
  
  // New function to set a session token with expiry
  export function setAuthSession(token) {
    if (typeof window === "undefined") {
      return
    }
  
    try {
      // Set the auth token
      localStorage.setItem("authToken", token)
  
      // Set last activity timestamp
      localStorage.setItem("lastActivity", Date.now().toString())
  
      // Set session expiry (24 hours from now)
      const expiryTime = Date.now() + 24 * 60 * 60 * 1000
      localStorage.setItem("sessionExpiry", expiryTime.toString())
    } catch (e) {
      console.error("Error setting auth session:", e)
    }
  }
  
  // Check if session is valid
  export function isSessionValid() {
    if (typeof window === "undefined") {
      return false
    }
  
    try {
      // First check if we have a token at all
      const token = localStorage.getItem("authToken")
      if (!token) return false
  
      // Then check expiry
      const expiry = localStorage.getItem("sessionExpiry")
      if (!expiry) return false
  
      // Check if session has expired
      return Number.parseInt(expiry) > Date.now()
    } catch (e) {
      console.error("Error checking session validity:", e)
      return false
    }
  }
  
  // Update last activity timestamp
  export function updateLastActivity() {
    if (typeof window === "undefined") {
      return
    }
  
    try {
      localStorage.setItem("lastActivity", Date.now().toString())
    } catch (e) {
      console.error("Error updating last activity:", e)
    }
  }
  
  // Add a new function to ensure all auth data is properly set
  export function setFullLoginState(userData, token) {
    if (typeof window === "undefined") {
      return
    }
  
    try {
      // Set all auth data in a single operation to prevent race conditions
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("user", JSON.stringify(userData))
      localStorage.setItem("authToken", token)
  
      // Set session expiry (24 hours from now)
      const expiryTime = Date.now() + 24 * 60 * 60 * 1000
      localStorage.setItem("sessionExpiry", expiryTime.toString())
      localStorage.setItem("lastActivity", Date.now().toString())
    } catch (e) {
      console.error("Error setting full login state:", e)
    }
  }
  
  