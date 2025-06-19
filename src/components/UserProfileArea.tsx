"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  User,
  MessageCircle,
  UserPlus,
  MoreHorizontal,
  Calendar,
  Shield,
  Crown,
  Zap,
  Bug,
  Gem,
  ExternalLink,
  Users,
  Clock,
  Settings,
  ArrowLeft,
  Phone,
  Video,
} from "lucide-react"
import { useApp } from "../context/AppContext"
import { useState } from "react"

export function UserProfileArea() {
  const { users, selectedUserId, servers, setCurrentView, setSelectedUserId } = useApp()
  const [activeTab, setActiveTab] = useState<"about" | "servers" | "connections">("about")

  const user = users.find((u) => u.id === selectedUserId)
  const mutualServers = servers.filter((server) => server.members.some((member) => member.userId === selectedUserId))

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-800 p-4">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">User not found</h2>
          <p className="text-gray-400">The user profile you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const getBadgeIcon = (badgeName: string) => {
    switch (badgeName) {
      case "Discord Staff":
        return <Shield className="w-4 h-4" />
      case "Partner":
        return <Crown className="w-4 h-4" />
      case "HypeSquad Events":
        return <Zap className="w-4 h-4" />
      case "Bug Hunter":
        return <Bug className="w-4 h-4" />
      case "Early Supporter":
        return <Gem className="w-4 h-4" />
      default:
        return <Shield className="w-4 h-4" />
    }
  }

  const getBadgeColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "bg-gradient-to-r from-yellow-400 to-orange-500"
      case "epic":
        return "bg-gradient-to-r from-purple-400 to-pink-500"
      case "rare":
        return "bg-gradient-to-r from-blue-400 to-cyan-500"
      default:
        return "bg-gray-600"
    }
  }

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

  const getConnectionIcon = (type: string) => {
    const iconClass = "w-5 h-5"
    switch (type) {
      case "github":
        return <div className={iconClass}>🐙</div>
      case "spotify":
        return <div className={iconClass}>🎵</div>
      case "twitch":
        return <div className={iconClass}>📺</div>
      case "youtube":
        return <div className={iconClass}>📹</div>
      case "steam":
        return <div className={iconClass}>🎮</div>
      case "xbox":
        return <div className={iconClass}>🎮</div>
      case "playstation":
        return <div className={iconClass}>🎮</div>
      default:
        return <ExternalLink className={iconClass} />
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
    <div className="flex-1 flex flex-col bg-gray-800 min-h-0 h-full">
      {/* Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center space-x-3 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white flex-shrink-0"
            onClick={() => {
              setSelectedUserId(null)
              setCurrentView("friends")
            }}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <User className="w-6 h-6 flex-shrink-0" />
          <span className="font-semibold hidden sm:block truncate">User Profile</span>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="flex-1 overflow-y-auto min-h-0 scroll-container">
        {/* Banner and Profile Section */}
        <div className="relative">
          {/* Banner */}
          <div
            className="h-24 sm:h-32 md:h-40 lg:h-48 bg-gradient-to-r from-purple-600 to-blue-600 relative"
            style={{
              backgroundImage: user.banner ? `url(${user.banner})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Profile Card */}
          <div className="relative px-4 pb-4">
            <Card className="bg-gray-900 border-gray-700 -mt-12 sm:-mt-16 relative z-10">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col space-y-4">
                  {/* Avatar and Basic Info */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 space-y-4 sm:space-y-0">
                    <div className="flex flex-col items-center sm:items-start">
                      <div className="relative -mt-8 sm:-mt-12 mb-3">
                        {user.avatar && user.avatar !== "/placeholder.svg" ? (
                          <img
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.username}
                            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border-4 border-gray-900"
                          />
                        ) : (
                          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-[#5865F2] rounded-full border-4 border-gray-900 flex items-center justify-center text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                            {user.username.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div
                          className={`absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full border-4 border-gray-900 ${getStatusColor(user.status)}`}
                        />
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 text-center sm:text-left min-w-0">
                      <div className="mb-3">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 break-words">
                          {user.username}
                          <span className="text-gray-400">#{user.discriminator}</span>
                        </h1>
                        {user.customStatus && (
                          <p className="text-gray-300 text-sm mb-2 break-words">
                            <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-2" />
                            {user.customStatus}
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                        <Button size="sm" className="bg-[#5865F2] hover:bg-[#4752C4] text-xs sm:text-sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          <span className="hidden xs:inline">Message</span>
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs sm:text-sm">
                          <Phone className="w-4 h-4 mr-2" />
                          <span className="hidden xs:inline">Call</span>
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs sm:text-sm">
                          <Video className="w-4 h-4 mr-2" />
                          <span className="hidden xs:inline">Video</span>
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs sm:text-sm">
                          <UserPlus className="w-4 h-4 mr-2" />
                          <span className="hidden sm:inline">Add Friend</span>
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Badges */}
                      {user.badges.length > 0 && (
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                          {user.badges.map((badge) => (
                            <div
                              key={badge.id}
                              className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium text-white ${getBadgeColor(badge.rarity)}`}
                              title={badge.description}
                            >
                              {getBadgeIcon(badge.name)}
                              <span className="hidden sm:inline">{badge.name}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Bio */}
                      {user.bio && (
                        <div className="mb-4">
                          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">About Me</h3>
                          <p className="text-gray-300 leading-relaxed text-sm break-words">{user.bio}</p>
                        </div>
                      )}

                      {/* Member Since */}
                      <div className="flex flex-col sm:flex-row sm:space-x-6 text-xs sm:text-sm text-gray-400 space-y-2 sm:space-y-0">
                        <div className="flex items-center justify-center sm:justify-start space-x-2">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">Discord member since {formatDate(user.createdAt)}</span>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start space-x-2">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">Joined server {formatDate(user.joinedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="px-4 mb-4">
          <div className="flex bg-gray-900 rounded-lg p-1 overflow-x-auto">
            <Button
              variant={activeTab === "about" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("about")}
              className="flex-1 text-xs sm:text-sm whitespace-nowrap"
            >
              About
            </Button>
            <Button
              variant={activeTab === "servers" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("servers")}
              className="flex-1 text-xs sm:text-sm whitespace-nowrap"
            >
              Servers ({mutualServers.length})
            </Button>
            <Button
              variant={activeTab === "connections" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("connections")}
              className="flex-1 text-xs sm:text-sm whitespace-nowrap"
            >
              Connections
            </Button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 pb-4">
          {activeTab === "about" && (
            <div className="space-y-4">
              {/* Detailed Badges */}
              {user.badges.length > 0 && (
                <Card className="bg-gray-900 border-gray-700">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Badges</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {user.badges.map((badge) => (
                        <div key={badge.id} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                          <div className={`p-2 rounded-full ${getBadgeColor(badge.rarity)} flex-shrink-0`}>
                            {getBadgeIcon(badge.name)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{badge.name}</div>
                            <div className="text-sm text-gray-400 break-words">{badge.description}</div>
                            <div className="text-xs text-gray-500">Earned {formatDate(badge.earnedAt)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* User Stats */}
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">User Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Status:</span>
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(user.status)}`} />
                          <span className="capitalize">{user.status}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-gray-400 flex-shrink-0">Joined Discord:</span>
                        <span className="text-right break-words">{formatDate(user.createdAt)}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Mutual Servers:</span>
                        <span>{mutualServers.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Connections:</span>
                        <span>{user.connections?.length || 0}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "servers" && (
            <div className="space-y-3">
              {mutualServers.length > 0 ? (
                mutualServers.map((server) => (
                  <Card key={server.id} className="bg-gray-900 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        {server.icon && server.icon !== "/placeholder.svg" ? (
                          <img
                            src={server.icon || "/placeholder.svg"}
                            alt={server.name}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#5865F2] rounded-full flex items-center justify-center text-white text-sm sm:text-base font-semibold flex-shrink-0">
                            {server.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{server.name}</h4>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-gray-400 space-y-1 sm:space-y-0">
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4 flex-shrink-0" />
                              <span>{server.memberCount.toLocaleString()} members</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">Created {formatDate(server.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="flex-shrink-0 text-xs sm:text-sm">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No mutual servers</h3>
                  <p className="text-gray-400">You don't share any servers with this user.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "connections" && (
            <div className="space-y-3">
              {user.connections && user.connections.length > 0 ? (
                user.connections.map((connection) => (
                  <Card key={connection.id} className="bg-gray-900 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gray-800 rounded-lg flex-shrink-0">
                          {getConnectionIcon(connection.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold capitalize truncate">{connection.type}</h4>
                            {connection.verified && (
                              <Badge variant="secondary" className="text-xs flex-shrink-0">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-400 truncate">{connection.name}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="flex-shrink-0">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <ExternalLink className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No connections</h3>
                  <p className="text-gray-400">This user hasn't connected any external accounts.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
