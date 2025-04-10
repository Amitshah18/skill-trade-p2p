"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut, Wallet, MessageSquare, BookOpen } from "lucide-react"
import { getUserData, logout } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function UserDropdown() {
  const router = useRouter()
  const [user] = useState(getUserData())

  const handleLogout = () => {
    logout()
    window.location.href = "/login"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-[2px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black">
          <span className="sr-only">Open user menu</span>
          <Avatar className="h-full w-full rounded-full bg-black">
            <AvatarImage src={user?.image || "/placeholder.svg?height=40&width=40"} alt="User" />
            <AvatarFallback className="bg-black text-white">{user?.initials || "U"}</AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-black"></span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 cyber-dropdown" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-white">{user?.name || "User"}</p>
            <p className="text-xs leading-none text-gray-400">{user?.email || "user@example.com"}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="hover:bg-white/5 focus:bg-white/5 cursor-pointer"
            onClick={() => router.push("/profile")}
          >
            <User className="mr-2 h-4 w-4 text-blue-400" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:bg-white/5 focus:bg-white/5 cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            <BookOpen className="mr-2 h-4 w-4 text-blue-400" />
            <span>Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:bg-white/5 focus:bg-white/5 cursor-pointer"
            onClick={() => router.push("/messages")}
          >
            <MessageSquare className="mr-2 h-4 w-4 text-blue-400" />
            <span>Messages</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:bg-white/5 focus:bg-white/5 cursor-pointer"
            onClick={() => router.push("/wallet")}
          >
            <Wallet className="mr-2 h-4 w-4 text-blue-400" />
            <span>Wallet</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:bg-white/5 focus:bg-white/5 cursor-pointer"
            onClick={() => router.push("/settings")}
          >
            <Settings className="mr-2 h-4 w-4 text-blue-400" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:bg-white/5 focus:bg-white/5 cursor-pointer text-red-400 hover:text-red-300"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

