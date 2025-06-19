"use client"

import { Button } from "@/components/ui/button"
import { useApp } from "../context/AppContext"
import { MessageCircle, Phone, MoreHorizontal, User } from "lucide-react"

interface FriendsListProps {
  activeTab: "all" | "online" | "pending"
  searchQuery: string
}

export function FriendsList({ activeTab, searchQuery }: FriendsListProps) {
  const { friends, setSelectedUserId, setCurrentView } = useApp()

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

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "Online"
      case "away":
        return "Idle"
      case "dnd":
        return "Dnd"
      default:
        return "Offline"
    }
  }

  const handleViewProfile = (friendId: string) => {
    setSelectedUserId(friendId)
    setCurrentView("profile")
  }

  // Filter friends based on active tab and search query
  const filteredFriends = friends.filter((friend) => {
    const matchesSearch =
      friend.username.toLowerCase().includes(searchQuery.toLowerCase()) || friend.discriminator.includes(searchQuery)

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "online" && friend.status === "online") ||
      (activeTab === "pending" && false) // No pending friends in mock data

    return matchesSearch && matchesTab
  })

  const onlineFriendsCount = friends.filter((f) => f.status === "online").length

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center space-x-2">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          {activeTab === "all" && `ALL FRIENDS — ${filteredFriends.length}`}
          {activeTab === "online" && `ONLINE — ${onlineFriendsCount}`}
          {activeTab === "pending" && "PENDING — 0"}
        </h3>
      </div>

      {/* Friends List */}
      <div className="space-y-2">
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between p-2 rounded hover:bg-gray-700/50 group cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {friend.avatar && friend.avatar !== "/placeholder.svg?height=32&width=32" ? (
                    <img
                      src={friend.avatar || "/placeholder.svg"}
                      alt={friend.username}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {friend.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  {/* Status indicator */}
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-gray-800 ${getStatusColor(friend.status)}`}
                  />
                </div>
                <div>
                  <div className="font-medium text-white">
                    {friend.username}
                    <span className="text-gray-400">#{friend.discriminator}</span>
                  </div>
                  <div className="text-xs text-gray-400">{getStatusText(friend.status)}</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-white">
                  <MessageCircle className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-white">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-gray-400 hover:text-white"
                  onClick={() => handleViewProfile(friend.id)}
                >
                  <User className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-white">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              {activeTab === "pending" ? "No pending friend requests" : "No friends found"}
            </div>
            {searchQuery && <div className="text-sm text-gray-500">Try adjusting your search terms</div>}
          </div>
        )}
      </div>
    </div>
  )
}
