"use client"

import { Button } from "@/components/ui/button"
import { Mic, MicOff, Hand, Crown, Users, Settings, UserPlus } from "lucide-react"
import { useApp } from "../context/AppContext"
import { useState } from "react"

export function StageChannelArea() {
  const { servers, selectedServerId, selectedChannelId, stageParticipants } = useApp()
  const [hasRequestedToSpeak, setHasRequestedToSpeak] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const currentServer = servers.find((s) => s.id === selectedServerId)
  const currentChannel = currentServer?.categories
    .flatMap((cat) => cat.channels)
    .find((ch) => ch.id === selectedChannelId)

  const speakers = stageParticipants.filter((p) => p.role === "speaker")
  const moderators = stageParticipants.filter((p) => p.role === "moderator")
  const listeners = stageParticipants.filter((p) => p.role === "listener")
  const requestsToSpeak = listeners.filter((p) => p.requestedToSpeak)

  if (!currentChannel) return null

  return (
    <div className="flex-1 flex flex-col bg-gray-800">
      {/* Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <Mic className="w-6 h-6" />
          <span className="font-semibold">{currentChannel.name}</span>
          {currentChannel.description && <span className="text-sm text-gray-400">— {currentChannel.description}</span>}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <UserPlus className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Stage Content */}
      <div className="flex-1 flex">
        {/* Main Stage Area */}
        <div className="flex-1 p-6">
          {/* Stage Topic */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">Welcome to {currentChannel.name}</h2>
            <p className="text-gray-400">{currentChannel.description || "Join the conversation on stage!"}</p>
          </div>

          {/* Speakers Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Crown className="w-5 h-5 text-yellow-500" />
              <h3 className="font-semibold">Speakers ({speakers.length + moderators.length})</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Moderators */}
              {moderators.map((participant) => (
                <div
                  key={participant.id}
                  className="flex flex-col items-center p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg"
                >
                  <div className="relative mb-2">
                    <img
                      src={participant.avatar || "/placeholder.svg"}
                      alt={participant.username}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Crown className="w-3 h-3 text-black" />
                    </div>
                    {participant.isMuted && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                        <MicOff className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium">{participant.username}</span>
                  <span className="text-xs text-yellow-400">Moderator</span>
                </div>
              ))}

              {/* Speakers */}
              {speakers.map((participant) => (
                <div
                  key={participant.id}
                  className="flex flex-col items-center p-4 bg-green-900/20 border border-green-500/30 rounded-lg"
                >
                  <div className="relative mb-2">
                    <img
                      src={participant.avatar || "/placeholder.svg"}
                      alt={participant.username}
                      className="w-16 h-16 rounded-full"
                    />
                    {participant.isMuted && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                        <MicOff className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium">{participant.username}</span>
                  <span className="text-xs text-green-400">Speaker</span>
                </div>
              ))}
            </div>
          </div>

          {/* Listeners Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-5 h-5 text-gray-400" />
              <h3 className="font-semibold">Audience ({listeners.length})</h3>
            </div>

            <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
              {listeners.map((participant) => (
                <div key={participant.id} className="flex flex-col items-center">
                  <div className="relative">
                    <img
                      src={participant.avatar || "/placeholder.svg"}
                      alt={participant.username}
                      className="w-10 h-10 rounded-full"
                    />
                    {participant.requestedToSpeak && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <Hand className="w-2 h-2" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 mt-1 truncate w-full text-center">{participant.username}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stage Controls Sidebar */}
        <div className="w-64 bg-gray-900 border-l border-gray-700 p-4">
          <h3 className="font-semibold mb-4">Stage Controls</h3>

          <div className="space-y-3 mb-6">
            <Button
              variant="ghost"
              className={`w-full justify-start ${isMuted ? "text-red-400 bg-red-400/20" : "text-gray-300"}`}
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
              {isMuted ? "Unmute" : "Mute"}
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start ${hasRequestedToSpeak ? "text-blue-400 bg-blue-400/20" : "text-gray-300"}`}
              onClick={() => setHasRequestedToSpeak(!hasRequestedToSpeak)}
            >
              <Hand className="w-4 h-4 mr-2" />
              {hasRequestedToSpeak ? "Cancel Request" : "Request to Speak"}
            </Button>
          </div>

          {/* Requests to Speak */}
          {requestsToSpeak.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">REQUESTS TO SPEAK ({requestsToSpeak.length})</h4>
              <div className="space-y-2">
                {requestsToSpeak.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                    <div className="flex items-center space-x-2">
                      <img
                        src={participant.avatar || "/placeholder.svg"}
                        alt={participant.username}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm">{participant.username}</span>
                    </div>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost" className="text-green-400 hover:text-green-300 p-1">
                        ✓
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 p-1">
                        ✕
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stage Info */}
          <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-2">STAGE INFO</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <div>Speakers: {speakers.length + moderators.length}</div>
              <div>Audience: {listeners.length}</div>
              <div>Total: {stageParticipants.length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
