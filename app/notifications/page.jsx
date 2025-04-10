"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, Check, Clock, FileText, User } from "lucide-react"
import Link from "next/link"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isMarkingAll, setIsMarkingAll] = useState(false)

  // Mock notifications data
  useEffect(() => {
    // In a real app, you would fetch notifications from an API
    const mockNotifications = [
      {
        id: 1,
        type: "session_booked",
        title: "New Session Booked",
        message: "Sarah Johnson booked a JavaScript Fundamentals session",
        time: "10 minutes ago",
        date: "March 18, 2025",
        read: false,
        link: "/dashboard",
      },
      {
        id: 2,
        type: "contract_created",
        title: "Contract Generated",
        message: "Smart contract for Blockchain Development has been created",
        time: "2 hours ago",
        date: "March 18, 2025",
        read: false,
        link: "/contracts",
      },
      {
        id: 3,
        type: "session_reminder",
        title: "Upcoming Session",
        message: "Your React Hooks session starts in 1 hour",
        time: "3 hours ago",
        date: "March 18, 2025",
        read: true,
        link: "/dashboard",
      },
      {
        id: 4,
        type: "payment_received",
        title: "Payment Received",
        message: "You received 50 tokens for your JavaScript session",
        time: "1 day ago",
        date: "March 17, 2025",
        read: true,
        link: "/wallet",
      },
      {
        id: 5,
        type: "new_review",
        title: "New Review",
        message: "Sarah Johnson left a 5-star review for your JavaScript session",
        time: "2 days ago",
        date: "March 16, 2025",
        read: true,
        link: "/profile",
      },
      {
        id: 6,
        type: "contract_executed",
        title: "Contract Executed",
        message: "Smart contract for React Hooks Training has been executed",
        time: "3 days ago",
        date: "March 15, 2025",
        read: true,
        link: "/contracts",
      },
    ]

    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter((n) => !n.read).length)
  }, [])

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = async () => {
    setIsMarkingAll(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
    setUnreadCount(0)
    setIsMarkingAll(false)
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "session_booked":
        return <Calendar className="h-5 w-5 text-blue-400" />
      case "contract_created":
      case "contract_executed":
        return <FileText className="h-5 w-5 text-pink-400" />
      case "session_reminder":
        return <Clock className="h-5 w-5 text-yellow-400" />
      case "payment_received":
        return <User className="h-5 w-5 text-green-400" />
      case "new_review":
        return <User className="h-5 w-5 text-purple-400" />
      default:
        return <Bell className="h-5 w-5 text-blue-400" />
    }
  }

  // Group notifications by date
  const groupedNotifications = notifications.reduce((groups, notification) => {
    const date = notification.date
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(notification)
    return groups
  }, {})

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white neon-text-blue">Notifications</h1>

        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} disabled={isMarkingAll} className="cyber-button">
            {isMarkingAll ? (
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
                Marking all as read...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Mark all as read
              </>
            )}
          </Button>
        )}
      </div>

      <Card className="cyber-card">
        <CardContent className="p-6">
          {Object.keys(groupedNotifications).length > 0 ? (
            Object.entries(groupedNotifications).map(([date, dateNotifications]) => (
              <div key={date} className="mb-8 last:mb-0">
                <h3 className="text-sm font-medium text-gray-400 mb-4">{date}</h3>

                <div className="space-y-4">
                  {dateNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`
                        p-4 rounded-lg border border-gray-800 transition-colors
                        ${!notification.read ? "bg-blue-900/10" : "bg-gray-900/30"}
                      `}
                    >
                      <Link
                        href={notification.link}
                        className="flex items-start"
                        onClick={() => !notification.read && markAsRead(notification.id)}
                      >
                        <div className="flex-shrink-0 mr-4 mt-0.5">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              <p className="text-base font-medium text-white">{notification.title}</p>
                              {!notification.read && (
                                <Badge className="ml-2 bg-blue-500/20 text-blue-400 border-blue-700/30 text-xs">
                                  New
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 ml-2">{notification.time}</p>
                          </div>
                          <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center">
              <Bell className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No notifications</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                You don't have any notifications yet. They will appear here when you receive session bookings, contract
                updates, or messages.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
