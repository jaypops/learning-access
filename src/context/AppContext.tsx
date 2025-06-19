"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type {
  Server,
  Channel,
  Friend,
  DirectMessage,
  Thread,
  ForumPost,
  StageParticipant,
  User,
  Badge,
  UserSettings,
  AuthorizedApp,
} from "../types"

interface AppContextType {
  currentView: "login" | "signup" | "friends" | "dm" | "server" | "profile"
  setCurrentView: (view: "login" | "signup" | "friends" | "dm" | "server" | "profile") => void
  selectedServerId: string | null
  setSelectedServerId: (id: string | null) => void
  selectedChannelId: string | null
  setSelectedChannelId: (id: string | null) => void
  selectedDmId: string | null
  setSelectedDmId: (id: string | null) => void
  selectedThreadId: string | null
  setSelectedThreadId: (id: string | null) => void
  selectedUserId: string | null
  setSelectedUserId: (id: string | null) => void
  servers: Server[]
  friends: Friend[]
  directMessages: DirectMessage[]
  isVoiceConnected: boolean
  setIsVoiceConnected: (connected: boolean) => void
  voiceChannelId: string | null
  setVoiceChannelId: (id: string | null) => void
  currentChannelType: Channel["type"] | null
  threads: Thread[]
  forumPosts: ForumPost[]
  stageParticipants: StageParticipant[]
  showEmojiPicker: boolean
  setShowEmojiPicker: (show: boolean) => void
  users: User[]
  showSettings: boolean
  setShowSettings: (show: boolean) => void
  userSettings: UserSettings
  setUserSettings: (settings: UserSettings) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<"login" | "signup" | "friends" | "dm" | "server" | "profile">("login")
  const [selectedServerId, setSelectedServerId] = useState<string | null>(null)
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null)
  const [selectedDmId, setSelectedDmId] = useState<string | null>(null)
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [isVoiceConnected, setIsVoiceConnected] = useState(false)
  const [voiceChannelId, setVoiceChannelId] = useState<string | null>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const badges: Badge[] = [
    {
      id: "1",
      name: "Discord Staff",
      description: "Discord Staff member",
      icon: "🛡️",
      rarity: "legendary",
      earnedAt: new Date("2020-01-01"),
    },
    {
      id: "2",
      name: "Partner",
      description: "Partnered Server Owner",
      icon: "🤝",
      rarity: "epic",
      earnedAt: new Date("2021-06-15"),
    },
    {
      id: "3",
      name: "HypeSquad Events",
      description: "HypeSquad Event Attendee",
      icon: "⚡",
      rarity: "rare",
      earnedAt: new Date("2022-03-20"),
    },
    {
      id: "4",
      name: "Bug Hunter",
      description: "Discord Bug Hunter",
      icon: "🐛",
      rarity: "rare",
      earnedAt: new Date("2021-11-10"),
    },
    {
      id: "5",
      name: "Early Supporter",
      description: "Early Nitro Supporter",
      icon: "💎",
      rarity: "epic",
      earnedAt: new Date("2019-05-01"),
    },
  ]

  const authorizedApps: AuthorizedApp[] = [
    {
      id: "1",
      name: "Spotify",
      description: "Listen along with friends and display your music activity",
      icon: "🎵",
      permissions: ["Read your currently playing track", "Control playback"],
      authorizedAt: new Date("2023-01-15"),
      lastUsed: new Date("2024-01-10"),
    },
    {
      id: "2",
      name: "GitHub",
      description: "Show your coding activity and repositories",
      icon: "🐙",
      permissions: ["Read repository information", "Display commit activity"],
      authorizedAt: new Date("2023-03-20"),
      lastUsed: new Date("2024-01-08"),
    },
    {
      id: "3",
      name: "Steam",
      description: "Display your gaming activity and achievements",
      icon: "🎮",
      permissions: ["Read game library", "Display currently playing games"],
      authorizedAt: new Date("2023-06-10"),
      lastUsed: new Date("2024-01-09"),
    },
  ]

  const [userSettings, setUserSettings] = useState<UserSettings>({
    // My Account
    username: "User",
    email: "user@example.com",
    phoneNumber: "+1 (555) 123-4567",
    twoFactorEnabled: true,

    // Privacy & Safety
    allowDirectMessages: "friends",
    allowFriendRequests: true,
    allowServerInvites: true,
    contentFilter: "friends_excluded",
    showActivity: true,

    // Voice & Video
    inputDevice: "Default - Microphone (Realtek Audio)",
    outputDevice: "Default - Speakers (Realtek Audio)",
    cameraDevice: "Default - Webcam (USB Camera)",
    inputVolume: 75,
    outputVolume: 80,
    inputSensitivity: 60,
    echoCancellation: true,
    noiseSuppression: true,
    automaticGainControl: true,

    // Notifications
    enableDesktopNotifications: true,
    enablePushNotifications: true,
    enableSounds: true,
    mentionNotifications: true,
    serverNotifications: true,
    dmNotifications: true,

    // Appearance & Language
    theme: "dark",
    fontSize: 16,
    language: "English (US)",
    compactMode: false,
    showTimestamps: true,

    // Authorized Apps
    authorizedApps,

    // Nitro
    nitroSubscription: {
      plan: "nitro",
      status: "active",
      renewsAt: new Date("2024-02-15"),
    },
  })

  const users: User[] = [
    {
      id: "1",
      username: "Alice",
      email: "alice@example.com",
      discriminator: "1234",
      avatar: "/placeholder.svg?height=128&width=128",
      banner: "/placeholder.svg?height=300&width=600",
      bio: "Full-stack developer passionate about creating amazing user experiences. Love gaming, music, and open source projects! 🚀",
      status: "online",
      customStatus: "Building something awesome",
      badges: [badges[1], badges[2], badges[4]],
      joinedAt: new Date("2021-03-15"),
      createdAt: new Date("2019-08-20"),
      connections: [
        { id: "1", type: "github", name: "alice-dev", verified: true },
        { id: "2", type: "spotify", name: "Alice Music", verified: true },
        { id: "3", type: "twitch", name: "alice_streams", verified: false },
      ],
    },
    {
      id: "2",
      username: "Bob",
      email: "bob@example.com",
      discriminator: "5678",
      avatar: "/placeholder.svg?height=128&width=128",
      banner: "/placeholder.svg?height=300&width=600",
      bio: "Game developer and streamer. Always up for a good co-op session!",
      status: "away",
      customStatus: "In a meeting",
      badges: [badges[2], badges[3]],
      joinedAt: new Date("2020-11-08"),
      createdAt: new Date("2018-12-03"),
      connections: [
        { id: "4", type: "steam", name: "BobGamer", verified: true },
        { id: "5", type: "youtube", name: "Bob's Gaming Channel", verified: true },
      ],
    },
    {
      id: "3",
      username: "Charlie",
      email: "charlie@example.com",
      discriminator: "9012",
      avatar: "/placeholder.svg?height=128&width=128",
      bio: "Designer and artist. Creating beautiful things one pixel at a time.",
      status: "offline",
      badges: [badges[4]],
      joinedAt: new Date("2022-01-20"),
      createdAt: new Date("2020-06-15"),
      connections: [{ id: "6", type: "github", name: "charlie-design", verified: false }],
    },
  ]

  const servers: Server[] = [
    {
      id: "1",
      name: "General Server",
      icon: "/placeholder.svg?height=48&width=48",
      memberCount: 1247,
      createdAt: new Date("2020-05-15"),
      members: [
        {
          id: "1",
          userId: "1",
          username: "Alice",
          avatar: "/placeholder.svg?height=32&width=32",
          roles: ["admin"],
          status: "online",
          joinedAt: new Date("2020-05-15"),
        },
        {
          id: "2",
          userId: "2",
          username: "Bob",
          avatar: "/placeholder.svg?height=32&width=32",
          roles: ["member"],
          status: "away",
          voiceChannelId: "3",
          joinedAt: new Date("2020-06-20"),
        },
        {
          id: "3",
          userId: "3",
          username: "Charlie",
          avatar: "/placeholder.svg?height=32&width=32",
          roles: ["member"],
          status: "online",
          joinedAt: new Date("2020-07-10"),
        },
      ],
      categories: [
        {
          id: "1",
          name: "Text Channels",
          serverId: "1",
          channels: [
            { id: "1", name: "general", type: "text", categoryId: "1", serverId: "1", topic: "General discussion" },
            { id: "2", name: "random", type: "text", categoryId: "1", serverId: "1" },
            {
              id: "7",
              name: "announcements",
              type: "forum",
              categoryId: "1",
              serverId: "1",
              description: "Server announcements and updates",
            },
            {
              id: "8",
              name: "media-sharing",
              type: "media",
              categoryId: "1",
              serverId: "1",
              description: "Share your images and videos",
            },
          ],
        },
        {
          id: "2",
          name: "Voice Channels",
          serverId: "1",
          channels: [
            { id: "3", name: "General Voice", type: "voice", categoryId: "2", serverId: "1" },
            { id: "4", name: "Gaming Lounge", type: "voice", categoryId: "2", serverId: "1" },
            {
              id: "5",
              name: "Study Hall",
              type: "stage",
              categoryId: "2",
              serverId: "1",
              description: "Quiet study sessions",
            },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Gaming Hub",
      icon: "/placeholder.svg?height=48&width=48",
      memberCount: 856,
      createdAt: new Date("2021-02-10"),
      members: [
        {
          id: "4",
          userId: "1",
          username: "Alice",
          avatar: "/placeholder.svg?height=32&width=32",
          roles: ["member"],
          status: "online",
          joinedAt: new Date("2021-02-15"),
        },
        {
          id: "5",
          userId: "4",
          username: "Dave",
          avatar: "/placeholder.svg?height=32&width=32",
          roles: ["admin"],
          status: "dnd",
          joinedAt: new Date("2021-02-10"),
        },
      ],
      categories: [
        {
          id: "3",
          name: "Gaming",
          serverId: "2",
          channels: [
            { id: "6", name: "gaming-chat", type: "text", categoryId: "3", serverId: "2" },
            { id: "9", name: "Voice Lounge", type: "voice", categoryId: "3", serverId: "2" },
          ],
        },
      ],
    },
  ]

  const friends: Friend[] = [
    {
      id: "1",
      username: "Alice",
      discriminator: "1234",
      status: "online",
      // Remove avatar property to trigger letter fallback
    },
    {
      id: "2",
      username: "Bob",
      discriminator: "5678",
      status: "away",
      // Remove avatar property to trigger letter fallback
    },
    {
      id: "3",
      username: "Charlie",
      discriminator: "9012",
      status: "offline",
      // Remove avatar property to trigger letter fallback
    },
  ]

  const directMessages: DirectMessage[] = [
    { id: "1", participants: ["1"], lastMessage: "Hey there!", lastMessageTime: new Date() },
    { id: "2", participants: ["2"], lastMessage: "See you later", lastMessageTime: new Date(Date.now() - 3600000) },
  ]

  const threads: Thread[] = [
    {
      id: "1",
      name: "Bug Discussion",
      parentChannelId: "1",
      parentMessageId: "1",
      archived: false,
      locked: false,
      memberCount: 3,
    },
    {
      id: "2",
      name: "Feature Request",
      parentChannelId: "1",
      parentMessageId: "2",
      archived: false,
      locked: false,
      memberCount: 5,
    },
  ]

  const forumPosts: ForumPost[] = [
    {
      id: "1",
      title: "Welcome to the Server!",
      content: "Please read the rules and introduce yourself.",
      author: "Admin",
      authorId: "1",
      timestamp: new Date(Date.now() - 86400000),
      tags: ["announcement", "welcome"],
      pinned: true,
      locked: false,
      replyCount: 12,
      lastReply: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      title: "Server Update v2.1",
      content: "New features and bug fixes in this update.",
      author: "Admin",
      authorId: "1",
      timestamp: new Date(Date.now() - 172800000),
      tags: ["update", "changelog"],
      pinned: false,
      locked: false,
      replyCount: 8,
      lastReply: new Date(Date.now() - 7200000),
    },
  ]

  const stageParticipants: StageParticipant[] = [
    { id: "1", userId: "1", username: "Alice", avatar: "/placeholder.svg?height=32&width=32", role: "speaker" },
    { id: "2", userId: "2", username: "Bob", avatar: "/placeholder.svg?height=32&width=32", role: "moderator" },
    {
      id: "3",
      userId: "3",
      username: "Charlie",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "listener",
      requestedToSpeak: true,
    },
  ]

  const currentServer = servers.find((s) => s.id === selectedServerId)
  const currentChannel = currentServer?.categories
    .flatMap((cat) => cat.channels)
    .find((ch) => ch.id === selectedChannelId)
  const currentChannelType = currentChannel?.type || null

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
        selectedThreadId,
        setSelectedThreadId,
        selectedUserId,
        setSelectedUserId,
        servers,
        friends,
        directMessages,
        isVoiceConnected,
        setIsVoiceConnected,
        voiceChannelId,
        setVoiceChannelId,
        currentChannelType,
        threads,
        forumPosts,
        stageParticipants,
        showEmojiPicker,
        setShowEmojiPicker,
        users,
        showSettings,
        setShowSettings,
        userSettings,
        setUserSettings,
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
