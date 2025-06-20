"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Hash,
  Volume2,
  ChevronDown,
  ChevronRight,
  Plus,
  Settings,
  Mic,
  Users,
  MessageSquare,
  ImageIcon,
  Lock,
} from "lucide-react"
import { useApp } from "../context/AppContext"
import { DirectMessagesList } from "./DirectMessagesList"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function ChannelSidebar() {
  const { currentView, selectedServerId, servers, selectedChannelId, setSelectedChannelId } = useApp()
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set())

  const toggleCategory = (categoryId: string) => {
    const newCollapsed = new Set(collapsedCategories)
    if (newCollapsed.has(categoryId)) {
      newCollapsed.delete(categoryId)
    } else {
      newCollapsed.add(categoryId)
    }
    setCollapsedCategories(newCollapsed)
  }

  const getChannelIcon = (type: string, name: string) => {
    // Custom icons based on channel name
    if (name.includes("giveaway")) return "🎁"
    if (name.includes("birthday")) return "🎂"
    if (name.includes("news") || name.includes("updates")) return "🔧"
    if (name.includes("suggestion")) return "💡"
    if (name.includes("gallery")) return "🖼️"
    if (name.includes("bug")) return "🐛"
    if (name.includes("lobby")) return "🎁"

    // Default icons by type
    switch (type) {
      case "text":
        return <Hash className="w-4 h-4" />
      case "voice":
        return <Volume2 className="w-4 h-4" />
      case "stage":
        return <Mic className="w-4 h-4" />
      case "forum":
        return <MessageSquare className="w-4 h-4" />
      case "media":
        return <ImageIcon className="w-4 h-4" />
      default:
        return <Hash className="w-4 h-4" />
    }
  }

  if (currentView === "friends") {
    return (
      <div className="w-60 bg-gray-700 flex flex-col h-full">
        <div className="h-12 px-4 flex items-center justify-between border-b border-gray-600 flex-shrink-0">
          <span className="font-semibold">Direct Messages</span>
          <Button variant="ghost" size="icon" className="w-4 h-4 text-gray-400 hover:text-white">
            <Plus className="w-3 h-3" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="px-2 py-2">
            <DirectMessagesList />
          </div>
        </div>
      </div>
    )
  }

  const currentServer = servers.find((s) => s.id === selectedServerId)

  if (!currentServer) return null

  return (
    <div className="w-60 bg-gray-700 flex flex-col h-full">
      {/* Server Header with Dropdown */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-gray-600 hover:bg-gray-600 cursor-pointer group flex-shrink-0">
        <span className="font-semibold truncate">{currentServer.name}</span>
        <div className="flex items-center space-x-1 flex-shrink-0">
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white" />
        </div>
      </div>

      {/* Categories and Channels - Scrollable */}
      <div className="flex-1 overflow-y-auto min-h-0 p-2">
        {currentServer.categories.map((category) => {
          const isCollapsed = collapsedCategories.has(category.id)

          return (
            <div key={category.id} className="mb-4">
              {/* Category Header */}
              <div
                className="flex items-center justify-between px-2 py-1 cursor-pointer hover:text-white group"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center space-x-1">
                  {isCollapsed ? (
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-3 h-3 text-gray-400" />
                  )}
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide group-hover:text-gray-300">
                    {category.name}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-4 h-4 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>

              {/* Channels */}
              {!isCollapsed && (
                <div className="space-y-0.5 ml-2">
                  {category.channels.map((channel) => {
                    const channelIcon = getChannelIcon(channel.type, channel.name)
                    const isRestricted = channel.name.includes("voice-chat") || Math.random() > 0.7 // Some channels are restricted
                    const unreadCount = Math.random() > 0.8 ? Math.floor(Math.random() * 10) + 1 : 0

                    return (
                      <Button
                        key={channel.id}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-gray-300 hover:text-white hover:bg-gray-600 px-2 py-1 h-8 group relative",
                          selectedChannelId === channel.id && "bg-gray-600 text-white",
                        )}
                        onClick={() => setSelectedChannelId(channel.id)}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center space-x-2 min-w-0">
                            {typeof channelIcon === "string" ? (
                              <span className="text-sm">{channelIcon}</span>
                            ) : (
                              channelIcon
                            )}
                            {isRestricted && <Lock className="w-3 h-3 text-gray-500" />}
                            <span className="truncate text-sm">{channel.name}</span>
                          </div>
                          <div className="flex items-center space-x-1 flex-shrink-0">
                            {unreadCount > 0 && (
                              <Badge variant="destructive" className="text-xs px-1.5 py-0.5 h-4 min-w-[16px]">
                                {unreadCount}
                              </Badge>
                            )}
                            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100">
                              {channel.type === "text" && (
                                <Button variant="ghost" size="icon" className="w-4 h-4 text-gray-400 hover:text-white">
                                  <Users className="w-3 h-3" />
                                </Button>
                              )}
                              <Button variant="ghost" size="icon" className="w-4 h-4 text-gray-400 hover:text-white">
                                <Settings className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Voice Status - Fixed at bottom */}
      <div className="border-t border-gray-600 p-2 flex-shrink-0">
        <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide font-semibold">Voice Channels</div>
        {currentServer.members
          .filter((member) => member.voiceChannelId)
          .slice(0, 3)
          .map((member) => {
            const voiceChannel = currentServer.categories
              .flatMap((cat) => cat.channels)
              .find((ch) => ch.id === member.voiceChannelId)

            return (
              <div key={member.id} className="flex items-center space-x-2 px-2 py-1 text-sm hover:bg-gray-600 rounded">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                <span className="text-gray-300 truncate">{member.username}</span>
                <span className="text-gray-500 truncate text-xs">in {voiceChannel?.name}</span>
              </div>
            )
          })}
      </div>
    </div>
  )
}
