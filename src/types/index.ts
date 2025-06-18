export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  discriminator: string
}

export interface Server {
  id: string
  name: string
  icon?: string
  channels: Channel[]
}

export interface Channel {
  id: string
  name: string
  type: "text" | "voice"
  serverId: string
}

export interface Friend {
  id: string
  username: string
  discriminator: string
  status: "online" | "offline" | "away" | "dnd"
  avatar?: string
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
  content: string
  timestamp: Date
  avatar: string
}
