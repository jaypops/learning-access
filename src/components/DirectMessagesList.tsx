"use client"

import { Button } from "@/components/ui/button"
import { useApp } from "../context/AppContext"
import { X } from "lucide-react"

export function DirectMessagesList() {
  const { directMessages, friends, selectedDmId, setSelectedDmId, setCurrentView } = useApp()

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (hours < 1) return "now"
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  return (
    <div className="space-y-1">
      {directMessages.map((dm) => {
        const friend = friends.find((f) => dm.participants.includes(f.id))
        if (!friend) return null

        return (
          <Button
            key={dm.id}
            variant="ghost"
            className={`w-full justify-start text-gray-300 hover:text-white hover:bg-gray-600 px-2 py-2 h-auto group ${
              selectedDmId === dm.id ? "bg-gray-600 text-white" : ""
            }`}
            onClick={() => {
              setSelectedDmId(dm.id)
              setCurrentView("dm")
            }}
          >
            <div className="flex items-center space-x-2 w-full">
              {friend.avatar && friend.avatar !== "/placeholder.svg" ? (
                <img
                  src={friend.avatar || "/placeholder.svg"}
                  alt={friend.username}
                  className="w-6 h-6 rounded-full flex-shrink-0"
                />
              ) : (
                <div className="w-6 h-6 bg-[#5865F2] rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                  {friend.username.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{friend.username}</div>
                {dm.lastMessage && <div className="text-xs text-gray-400 truncate">{dm.lastMessage}</div>}
              </div>
              {dm.lastMessageTime && (
                <div className="text-xs text-gray-500 flex-shrink-0">{formatTime(dm.lastMessageTime)}</div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="w-4 h-4 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  // Handle close DM
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </Button>
        )
      })}
    </div>
  )
}
