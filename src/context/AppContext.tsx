"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Server {
  id: string
  name: string
  icon?: string
  channels: Channel[]
}

interface Channel {
  id: string
  name: string
  type: "text" | "voice"
  serverId: string
}

interface Friend {
  id: string
  username: string
  discriminator: string
  status: "online" | "offline" | "away" | "dnd"
  avatar?: string
}

interface DirectMessage {
  id: string
  participants: string[]
  lastMessage?: string
  lastMessageTime?: Date
}

interface AppContextType {
  currentView: "login" | "signup" | "friends" | "dm" | "server"
  setCurrentView: (view: "login" | "signup" | "friends" | "dm" | "server") => void
  selectedServerId: string | null
  setSelectedServerId: (id: string | null) => void
  selectedChannelId: string | null
  setSelectedChannelId: (id: string | null) => void
  selectedDmId: string | null
  setSelectedDmId: (id: string | null) => void
  servers: Server[]
  friends: Friend[]
  directMessages: DirectMessage[]
  isVoiceConnected: boolean
  setIsVoiceConnected: (connected: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<"login" | "signup" | "friends" | "dm" | "server">("login")
  const [selectedServerId, setSelectedServerId] = useState<string | null>(null)
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null)
  const [selectedDmId, setSelectedDmId] = useState<string | null>(null)
  const [isVoiceConnected, setIsVoiceConnected] = useState(false)

  const servers: Server[] = [
    {
      id: "1",
      name: "General Server",
      icon: "/placeholder.svg?height=48&width=48",
      channels: [
        { id: "1", name: "general", type: "text", serverId: "1" },
        { id: "2", name: "random", type: "text", serverId: "1" },
        { id: "3", name: "General Voice", type: "voice", serverId: "1" },
      ],
    },
    {
      id: "2",
      name: "Gaming Hub",
      icon: "/placeholder.svg?height=48&width=48",
      channels: [
        { id: "4", name: "gaming-chat", type: "text", serverId: "2" },
        { id: "5", name: "Voice Lounge", type: "voice", serverId: "2" },
      ],
    },
  ]

  const friends: Friend[] = [
    {
      id: "1",
      username: "Alice",
      discriminator: "1234",
      status: "online",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    { id: "2", username: "Bob", discriminator: "5678", status: "away", avatar: "/placeholder.svg?height=32&width=32" },
    {
      id: "3",
      username: "Charlie",
      discriminator: "9012",
      status: "offline",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const directMessages: DirectMessage[] = [
    { id: "1", participants: ["1"], lastMessage: "Hey there!", lastMessageTime: new Date() },
    { id: "2", participants: ["2"], lastMessage: "See you later", lastMessageTime: new Date(Date.now() - 3600000) },
  ]

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedServerId,
        setSelectedServerId,
        selectedChannelId,
        setSelectedChannelId,
        selectedDmId,
        setSelectedDmId,
        servers,
        friends,
        directMessages,
        isVoiceConnected,
        setIsVoiceConnected,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
