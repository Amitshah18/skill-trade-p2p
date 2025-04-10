"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function NotificationDropdown() {
  const router = useRouter()
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "message",
      content: "New message from Alex Johnson",
      time: "2 hours ago",
      read: false,
      link: "/messages/1",
    },
    {
      id: 2,
      type: "session",
      content: "Your session with Sarah Miller is confirmed",
      time: "1 day ago",
      read: true,
      link: "/sessions",
    },
    {
      id: 3,
      type: "token",
      content: "You received 50 tokens from the platform",
      time: "3 days ago",
      read: true,
      link: "/wallet",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const getIcon = (type) => {
    switch (type) {
      case "message":
        return (
          <div className="h-8 w-8 rounded-full bg-blue-900/50 flex items-center justify-center">
            <svg
              className="h-4 w-4 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
        )
      case "session":
        return (
          <div className="h-8 w-8 rounded-full bg-green-900/50 flex items-center justify-center">
            <svg
              className="h-4 w-4 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )
      case "token":
        return (
          <div className="h-8 w-8 rounded-full bg-purple-900/50 flex items-center justify-center">
            <svg
              className="h-4 w-4 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center">
            <Bell className="h-4 w-4 text-gray-400" />
          </div>
        )
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white hover:bg-white/5">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 cyber-dropdown" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto px-2 py-1 text-xs text-blue-400 hover:text-blue-300 hover:bg-white/5"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          <DropdownMenuGroup>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`flex items-start p-3 space-x-3 hover:bg-white/5 focus:bg-white/5 cursor-pointer ${
                    !notification.read ? "bg-gray-800/50" : ""
                  }`}
                  onClick={() => {
                    markAsRead(notification.id)
                    router.push(notification.link)
                  }}
                >
                  {getIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!notification.read ? "font-medium text-white" : "text-gray-300"}`}>
                      {notification.content}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                  {!notification.read && <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0"></div>}
                </DropdownMenuItem>
              ))
            ) : (
              <div className="py-6 text-center text-gray-500">
                <p>No notifications</p>
              </div>
            )}
          </DropdownMenuGroup>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="justify-center text-center text-sm text-blue-400 hover:text-blue-300 hover:bg-white/5 cursor-pointer"
          onClick={() => router.push("/notifications")}
        >
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

