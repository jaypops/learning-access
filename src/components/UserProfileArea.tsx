"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, UserPlus, MoreHorizontal, Calendar, Users, ChevronRight, X } from "lucide-react"
import { useApp } from "../context/AppContext"

export function UserProfileArea() {
  const { selectedUserId, users, friends, setSelectedUserId, currentView, selectedDmId, directMessages } = useApp()

  // Show profile sidebar when viewing a DM or when a user is selected
  const shouldShow = (currentView === "dm" && selectedDmId) || selectedUserId

  if (!shouldShow) return null

  let targetUser = null

  if (selectedUserId) {
    targetUser = users.find((u) => u.id === selectedUserId)
  } else if (currentView === "dm" && selectedDmId) {
    const dm = directMessages.find((d) => d.id === selectedDmId)
    const friendId = dm?.participants.find((p) => p !== "current-user") // Assuming current user has a specific ID
    targetUser = friends.find((f) => f.id === friendId)
  }

  if (!targetUser) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "dnd":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="w-80 bg-gray-900 border-l border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="h-12 px-4 flex items-center justify-end border-b border-gray-700">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white"
          onClick={() => setSelectedUserId(null)}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Profile Content */}
      <div className="flex-1 overflow-y-auto">
        {/* User Avatar and Basic Info */}
        <div className="p-6 text-center">
          <div className="relative inline-block mb-4">
            {targetUser.avatar && targetUser.avatar !== "/placeholder.svg" ? (
              <img
                src={targetUser.avatar || "/placeholder.svg"}
                alt={targetUser.username}
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <div className="w-20 h-20 bg-[#5865F2] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {targetUser.username.charAt(0).toUpperCase()}
              </div>
            )}
            <div
              className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-gray-900 ${getStatusColor(targetUser.status)}`}
            />
          </div>

          <h2 className="text-xl font-bold text-white mb-1">{targetUser.username}</h2>
          <p className="text-gray-400 text-sm mb-4">
            {targetUser.discriminator ? `#${targetUser.discriminator}` : "kendrick3175"}
          </p>

          {/* Action Buttons */}
          <div className="flex space-x-2 mb-6">
            <Button size="sm" className="bg-[#5865F2] hover:bg-[#4752C4] flex-1">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Friend
            </Button>
            <Button size="sm" variant="ghost">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* About Me Section */}
        <div className="px-6 mb-6">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">About Me</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{targetUser.bio || "Crypto enthusiast and NFT lover"}</p>
        </div>

        {/* Member Since */}
        <div className="px-6 mb-6">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Member Since</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(targetUser.joinedAt || new Date("2022-06-13"))}</span>
          </div>
        </div>

        {/* Mutual Friends */}
        <div className="px-6 mb-6">
          <Button
            variant="ghost"
            className="w-full justify-between text-gray-300 hover:text-white hover:bg-gray-800 p-3 h-auto"
          >
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">Mutual Friends — 1</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* View Full Profile */}
        <div className="px-6 pb-6">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setSelectedUserId(targetUser.id)
              // This would navigate to full profile view
            }}
          >
            View Full Profile
          </Button>
        </div>
      </div>
    </div>
  )
}
