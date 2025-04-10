"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LogIn, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AuthCheckModal({ isOpen, onClose, action = "continue" }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  const handleClose = () => {
    setOpen(false)
    if (onClose) onClose()
  }

  const handleLogin = () => {
    router.push("/login")
  }

  const handleSignup = () => {
    router.push("/signup")
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="cyber-modal sm:max-w-md">
        <DialogHeader className="cyber-modal-header">
          <DialogTitle className="text-xl font-bold gradient-text-blue-pink">Authentication Required</DialogTitle>
          <DialogDescription className="text-gray-400 mt-2">
            You need to be logged in to {action}. Please log in or create an account to continue.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 py-4">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600/20 to-pink-600/20 border border-blue-500/30 flex items-center justify-center">
              <LogIn className="h-8 w-8 text-blue-400" />
            </div>
          </div>

          <p className="text-center text-gray-300">
            Join our community to access all features and start your learning journey.
          </p>
        </div>

        <DialogFooter className="cyber-modal-footer flex flex-col sm:flex-row gap-3">
          <Button className="cyber-button-enhanced rounded-md w-full sm:w-auto" onClick={handleLogin}>
            <LogIn className="mr-2 h-4 w-4" />
            Log In
          </Button>
          <Button
            variant="outline"
            className="cyber-button rounded-md w-full sm:w-auto border-white/30 backdrop-blur-sm hover:bg-white/10"
            onClick={handleSignup}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Sign Up
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

