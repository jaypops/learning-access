export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  discriminator: string
  banner?: string
  bio?: string
  status: "online" | "offline" | "away" | "dnd"
  customStatus?: string
  badges: Badge[]
  joinedAt: Date
  createdAt: Date
  connections: Connection[]
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  earnedAt: Date
}

export interface Connection {
  id: string
  type: "spotify" | "youtube" | "twitch" | "github" | "steam" | "xbox" | "playstation"
  name: string
  verified: boolean
}

export interface UserSettings {
  // My Account
  username: string
  email: string
  phoneNumber?: string
  twoFactorEnabled: boolean

  // Privacy & Safety
  allowDirectMessages: "everyone" | "friends" | "server_members" | "none"
  allowFriendRequests: boolean
  allowServerInvites: boolean
  contentFilter: "disabled" | "friends_excluded" | "enabled"
  showActivity: boolean

  // Voice & Video
  inputDevice: string
  outputDevice: string
  cameraDevice: string
  inputVolume: number
  outputVolume: number
  inputSensitivity: number
  echoCancellation: boolean
  noiseSuppression: boolean
  automaticGainControl: boolean

  // Notifications
  enableDesktopNotifications: boolean
  enablePushNotifications: boolean
  enableSounds: boolean
  mentionNotifications: boolean
  serverNotifications: boolean
  dmNotifications: boolean

  // Appearance & Language
  theme: "light" | "dark" | "auto"
  fontSize: number
  language: string
  compactMode: boolean
  showTimestamps: boolean

  // Authorized Apps
  authorizedApps: AuthorizedApp[]

  // Nitro
  nitroSubscription?: NitroSubscription
}

export interface AuthorizedApp {
  id: string
  name: string
  description: string
  icon: string
  permissions: string[]
  authorizedAt: Date
  lastUsed?: Date
}

export interface NitroSubscription {
  plan: "nitro" | "nitro_basic"
  status: "active" | "cancelled" | "expired"
  renewsAt?: Date
  cancelledAt?: Date
}

export interface Server {
  id: string
  name: string
  icon?: string
  categories: Category[]
  members: ServerMember[]
  memberCount: number
  createdAt: Date
  unreadCount?: number
}

export interface Category {
  id: string
  name: string
  serverId: string
  channels: Channel[]
  collapsed?: boolean
}

export interface Channel {
  id: string
  name: string
  type: "text" | "voice" | "stage" | "forum" | "media"
  categoryId: string
  serverId: string
  description?: string
  topic?: string
  nsfw?: boolean
  slowMode?: number
}

export interface ServerMember {
  id: string
  userId: string
  username: string
  avatar?: string
  roles: string[]
  status: "online" | "offline" | "away" | "dnd"
  voiceChannelId?: string
  isMuted?: boolean
  isDeafened?: boolean
  isVideoOn?: boolean
  isScreenSharing?: boolean
  joinedAt: Date
}

export interface Friend {
  id: string
  username: string
  discriminator: string
  status: "online" | "offline" | "away" | "dnd"
  avatar?: string
  bio?: string
  joinedAt?: Date
}

export interface DirectMessage {
  id: string
  participants: string[]
  lastMessage?: string
  lastMessageTime?: Date
}

export interface Message {
  id: string
  author: string
  authorId: string
  content: string
  timestamp: Date
  avatar: string
  reactions?: Reaction[]
  userBadges?: string[]
  attachments?: Attachment[]
  threadId?: string
  parentMessageId?: string
  isDeleted?: boolean
  isOwner?: boolean
}

export interface Reaction {
  emoji: string
  count: number
  users: string[]
}

export interface Attachment {
  id: string
  filename: string
  url: string
  type: "image" | "video" | "file"
  size: number
}

export interface Thread {
  id: string
  name: string
  parentChannelId: string
  parentMessageId: string
  archived: boolean
  locked: boolean
  memberCount: number
}

export interface ForumPost {
  id: string
  title: string
  content: string
  author: string
  authorId: string
  timestamp: Date
  tags: string[]
  pinned: boolean
  locked: boolean
  replyCount: number
  lastReply?: Date
}

export interface StageParticipant {
  id: string
  userId: string
  username: string
  avatar?: string
  role: "speaker" | "listener" | "moderator"
  isMuted?: boolean
  requestedToSpeak?: boolean
}
