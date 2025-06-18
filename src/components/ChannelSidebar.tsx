"use client"

import { Button } from "@/components/ui/button"
import { Hash, Volume2, UserPlus, ChevronDown, Plus } from "lucide-react"
import { useApp } from "../context/AppContext"
import { DirectMessagesList } from "./DirectMessagesList"
import { cn } from "@/lib/utils"

export function ChannelSidebar() {
  const { currentView, selectedServerId, servers, selectedChannelId, setSelectedChannelId } = useApp()

  if (currentView === "friends") {
    return (
      <div className="w-60 bg-gray-700 flex flex-col">
        {/* Header */}
        <div className="h-12 px-4 flex items-center justify-between border-b border-gray-600">
          <span className="font-semibold">Friends</span>
        </div>

        {/* Friends Navigation */}
        <div className="p-2 space-y-1">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-600">
            Online
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-600">
            All
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-600">
            Pending
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-600">
            Blocked
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-green-400 hover:text-green-300 hover:bg-gray-600"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Friend
          </Button>
        </div>

        {/* Direct Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-2 py-2">
            <div className="flex items-center justify-between px-2 py-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Direct Messages</span>
              <Button variant="ghost" size="icon" className="w-4 h-4 text-gray-400 hover:text-white">
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            <DirectMessagesList />
          </div>
        </div>
      </div>
    )
  }

  const currentServer = servers.find((s) => s.id === selectedServerId)

  if (!currentServer) return null

  return (
    <div className="w-60 bg-gray-700 flex flex-col">
      {/* Server Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-gray-600 hover:bg-gray-600 cursor-pointer">
        <span className="font-semibold">{currentServer.name}</span>
        <ChevronDown className="w-4 h-4" />
      </div>

      {/* Boost Server Banner */}
      <div className="p-2">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded p-2 text-xs">
          <div className="font-semibold">Boost this server!</div>
          <div className="text-gray-200">2 boosts away from Level 1!</div>
        </div>
      </div>

      {/* Channels */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Text Channels</span>
            <Button variant="ghost" size="icon" className="w-4 h-4 text-gray-400 hover:text-white">
              <Plus className="w-3 h-3" />
            </Button>
          </div>

          {currentServer.channels
            .filter((channel) => channel.type === "text")
            .map((channel) => (
              <Button
                key={channel.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-gray-300 hover:text-white hover:bg-gray-600 px-2 py-1 h-8",
                  selectedChannelId === channel.id && "bg-gray-600 text-white",
                )}
                onClick={() => setSelectedChannelId(channel.id)}
              >
                <Hash className="w-4 h-4 mr-2" />
                {channel.name}
              </Button>
            ))}
        </div>

        <div className="space-y-1 mt-4">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Voice Channels</span>
            <Button variant="ghost" size="icon" className="w-4 h-4 text-gray-400 hover:text-white">
              <Plus className="w-3 h-3" />
            </Button>
          </div>

          {currentServer.channels
            .filter((channel) => channel.type === "voice")
            .map((channel) => (
              <Button
                key={channel.id}
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-600 px-2 py-1 h-8"
              >
                <Volume2 className="w-4 h-4 mr-2" />
                {channel.name}
              </Button>
            ))}
        </div>
      </div>
    </div>
  )
}
