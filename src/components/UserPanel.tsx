"use client"

import { Button } from "@/components/ui/button"
import { Mic, MicOff, Headphones, Settings } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useApp } from "../context/AppContext"
import { useState } from "react"

export function UserPanel() {
  const { user } = useAuth()
  const { setShowSettings } = useApp()
  const [isMuted, setIsMuted] = useState(false)
  const [isDeafened, setIsDeafened] = useState(false)

  if (!user) return null

  return (
    <div className="h-14 bg-gray-900 px-2 flex items-center justify-between border-t border-gray-700">
      <div className="flex items-center space-x-2 flex-1 min-w-0">
        <div className="relative">
          <img src={user.avatar || "/placeholder.svg"} alt={user.username} className="w-8 h-8 rounded-full" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm truncate">{user.username}</div>
          <div className="text-xs text-gray-400">#{user.discriminator}</div>
        </div>
      </div>

      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          className={`w-8 h-8 ${isMuted ? "text-red-400 bg-red-400/20" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={`w-8 h-8 ${isDeafened ? "text-red-400 bg-red-400/20" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
          onClick={() => setIsDeafened(!isDeafened)}
        >
          <Headphones className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-gray-400 hover:text-white hover:bg-gray-700"
          onClick={() => setShowSettings(true)}
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
