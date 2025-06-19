"use client"

import { Button } from "@/components/ui/button"
import { Volume2, Mic, MicOff, Video, VideoOff, Monitor, Settings, UserPlus, Phone, PhoneOff } from "lucide-react"
import { useApp } from "../context/AppContext"
import { useState } from "react"

export function VoiceChannelArea() {
  const { servers, selectedServerId, selectedChannelId, setIsVoiceConnected, setVoiceChannelId } = useApp()
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)

  const currentServer = servers.find((s) => s.id === selectedServerId)
  const currentChannel = currentServer?.categories
    .flatMap((cat) => cat.channels)
    .find((ch) => ch.id === selectedChannelId)

  const connectedMembers = currentServer?.members.filter((member) => member.voiceChannelId === selectedChannelId) || []

  const handleJoinVoice = () => {
    setIsVoiceConnected(true)
    setVoiceChannelId(selectedChannelId)
  }

  const handleLeaveVoice = () => {
    setIsVoiceConnected(false)
    setVoiceChannelId(null)
  }

  if (!currentChannel) return null

  return (
    <div className="flex-1 flex flex-col bg-gray-800">
      {/* Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <Volume2 className="w-6 h-6" />
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

      {/* Voice Channel Content */}
      <div className="flex-1 flex">
        {/* Main Voice Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-center mb-8">
            <Volume2 className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">{currentChannel.name}</h2>
            <p className="text-gray-400">
              {connectedMembers.length === 0
                ? "No one's here yet. Be the first to join!"
                : `${connectedMembers.length} member${connectedMembers.length > 1 ? "s" : ""} connected`}
            </p>
          </div>

          {/* Connected Members Grid */}
          {connectedMembers.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {connectedMembers.map((member) => (
                <div key={member.id} className="flex flex-col items-center p-4 bg-gray-700 rounded-lg">
                  <div className="relative mb-2">
                    <img
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.username}
                      className="w-16 h-16 rounded-full"
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-700 ${
                        member.status === "online"
                          ? "bg-green-500"
                          : member.status === "away"
                            ? "bg-yellow-500"
                            : member.status === "dnd"
                              ? "bg-red-500"
                              : "bg-gray-500"
                      }`}
                    />
                    {member.isMuted && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                        <MicOff className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium">{member.username}</span>
                  <div className="flex items-center space-x-1 mt-1">
                    {member.isVideoOn && <Video className="w-3 h-3 text-green-400" />}
                    {member.isScreenSharing && <Monitor className="w-3 h-3 text-blue-400" />}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Join/Leave Button */}
          <Button
            onClick={connectedMembers.some((m) => m.userId === "current-user") ? handleLeaveVoice : handleJoinVoice}
            className={`px-8 py-3 ${
              connectedMembers.some((m) => m.userId === "current-user")
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {connectedMembers.some((m) => m.userId === "current-user") ? (
              <>
                <PhoneOff className="w-4 h-4 mr-2" />
                Leave Voice
              </>
            ) : (
              <>
                <Phone className="w-4 h-4 mr-2" />
                Join Voice
              </>
            )}
          </Button>
        </div>

        {/* Voice Controls Sidebar */}
        {connectedMembers.some((m) => m.userId === "current-user") && (
          <div className="w-64 bg-gray-900 border-l border-gray-700 p-4">
            <h3 className="font-semibold mb-4">Voice Controls</h3>

            <div className="space-y-3">
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
                className={`w-full justify-start ${isVideoOn ? "text-green-400" : "text-gray-300"}`}
                onClick={() => setIsVideoOn(!isVideoOn)}
              >
                {isVideoOn ? <Video className="w-4 h-4 mr-2" /> : <VideoOff className="w-4 h-4 mr-2" />}
                {isVideoOn ? "Turn Off Camera" : "Turn On Camera"}
              </Button>

              <Button
                variant="ghost"
                className={`w-full justify-start ${isScreenSharing ? "text-blue-400" : "text-gray-300"}`}
                onClick={() => setIsScreenSharing(!isScreenSharing)}
              >
                <Monitor className="w-4 h-4 mr-2" />
                {isScreenSharing ? "Stop Sharing" : "Share Screen"}
              </Button>

              <Button variant="ghost" className="w-full justify-start text-gray-300">
                <Settings className="w-4 h-4 mr-2" />
                Voice Settings
              </Button>
            </div>

            {/* Voice Activity */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">VOICE ACTIVITY</h4>
              <div className="space-y-2">
                {connectedMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${member.isMuted ? "bg-red-500" : "bg-green-500"}`} />
                    <span className="text-gray-300">{member.username}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
