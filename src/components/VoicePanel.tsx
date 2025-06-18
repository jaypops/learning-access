"use client"

import { Button } from "@/components/ui/button"
import { PhoneOff, Mic, MicOff, Video, VideoOff, Settings } from "lucide-react"
import { useApp } from "../context/AppContext"
import { useState } from "react"

export function VoicePanel() {
  const { setIsVoiceConnected } = useApp()
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(false)

  return (
    <div className="h-16 bg-gray-900 border-t border-gray-700 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-green-400">Voice Connected</span>
        </div>
        <span className="text-sm text-gray-400">General Voice</span>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className={`w-8 h-8 ${isMuted ? "text-red-400 bg-red-400/20" : "text-gray-400 hover:text-white"}`}
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={`w-8 h-8 ${isVideoOn ? "text-green-400" : "text-gray-400 hover:text-white"}`}
          onClick={() => setIsVideoOn(!isVideoOn)}
        >
          {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
        </Button>

        <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-white">
          <Settings className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-red-400 hover:text-red-300 hover:bg-red-400/20"
          onClick={() => setIsVoiceConnected(false)}
        >
          <PhoneOff className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
