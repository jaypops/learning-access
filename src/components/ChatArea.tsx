"use client"

import { cn } from "@/lib/utils"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Hash,
  Volume2,
  Users,
  Pin,
  Search,
  Inbox,
  MessageCircleQuestionIcon as QuestionMarkCircle,
  Phone,
  Video,
  Plus,
  Smile,
  MessageSquare,
  MoreHorizontal,
  User,
  ArrowLeft,
  Menu,
  Gift,
  ImageIcon,
  Sticker,
  Crown,
} from "lucide-react"
import { useApp } from "../context/AppContext"
import type { Message } from "../types"

export function ChatArea() {
  const {
    currentView,
    selectedChannelId,
    selectedDmId,
    servers,
    selectedServerId,
    friends,
    directMessages,
    setIsVoiceConnected,
    // threads,
    // setSelectedThreadId,
    showEmojiPicker,
    setShowEmojiPicker,
    setSelectedUserId,
    setCurrentView,
    setSelectedChannelId,
    setSelectedDmId,
  } = useApp()

  const [message, setMessage] = useState("")
  const [messages] = useState<Message[]>([
    {
      id: "1",
      author: "CharlieThePrick",
      authorId: "1",
      content: "Maybe look at who your talking to before you open your mouth",
      timestamp: new Date("2025-06-10T06:05:00"),
      avatar: "/placeholder.svg?height=40&width=40",
      isDeleted: true,
      userBadges: ["⭐"],
    },
    {
      id: "2",
      author: "CharlieThePrick",
      authorId: "1",
      content: "They gone",
      timestamp: new Date("2025-06-10T12:02:00"),
      avatar: "/placeholder.svg?height=40&width=40",
      isDeleted: true,
      userBadges: ["⭐"],
    },
    {
      id: "3",
      author: "Ginonerd",
      authorId: "2",
      content: "Br",
      timestamp: new Date("2025-06-10T19:13:00"),
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      author: "Lexi_LightStar",
      authorId: "3",
      content: "emm",
      timestamp: new Date("2025-06-11T03:05:00"),
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      author: "Jean shaun",
      authorId: "4",
      content: "Br??",
      timestamp: new Date("2025-06-11T14:12:00"),
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "6",
      author: "AniqFromYT",
      authorId: "5",
      content: "",
      timestamp: new Date("2025-06-12T02:37:00"),
      avatar: "/placeholder.svg?height=40&width=40",
      isOwner: true,
      userBadges: ["🔥", "CODM"],
    },
  ])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      setMessage("")
    }
  }

  // const handleReaction = (messageId: string, emoji: string) => {
  //   console.log(`Reacted to message ${messageId} with ${emoji}`)
  // }

  const handleCreateThread = (messageId: string) => {
    console.log(`Creating thread for message ${messageId}`)
  }

  const handleViewProfile = (authorId: string) => {
    setSelectedUserId(authorId)
    setCurrentView("profile")
  }

  const handleBackToChannels = () => {
    if (currentView === "server") {
      setSelectedChannelId(null)
    } else if (currentView === "dm") {
      setSelectedDmId(null)
      setCurrentView("friends")
    }
  }

  let headerTitle = ""
  let headerIcon = null
  let headerSubtitle = ""
  let channelEmoji = ""

  if (currentView === "server" && selectedChannelId) {
    const server = servers.find((s) => s.id === selectedServerId)
    const channel = server?.categories.flatMap((cat) => cat.channels).find((c) => c.id === selectedChannelId)
    if (channel) {
      headerTitle = channel.name
      headerSubtitle = "Talk with the cool peeps here!"
      channelEmoji = channel.name.includes("lobby") ? "🎁" : ""
      headerIcon = channel.type === "text" ? <Hash className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />
    }
  } else if (currentView === "dm" && selectedDmId) {
    const dm = directMessages.find((d) => d.id === selectedDmId)
    const friend = friends.find((f) => dm?.participants.includes(f.id))
    if (friend) {
      headerTitle = friend.username
      headerSubtitle = friend.discriminator ? `#${friend.discriminator}` : ""
      headerIcon =
        friend.avatar && friend.avatar !== "/placeholder.svg" ? (
          <img src={friend.avatar || "/placeholder.svg"} alt={friend.username} className="w-8 h-8 rounded-full" />
        ) : (
          <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {friend.username.charAt(0).toUpperCase()}
          </div>
        )
    }
  } else if (currentView === "friends") {
    headerTitle = "Direct Messages"
    headerIcon = <Users className="w-6 h-6" />
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-800 h-full">
      {/* Chat Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-gray-700 shadow-sm">
        <div className="flex items-center space-x-3">
          {/* Mobile Back Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-400 hover:text-white"
            onClick={handleBackToChannels}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          {headerIcon}
          {channelEmoji && <span className="text-lg">{channelEmoji}</span>}
          <div className="flex flex-col">
            <span className="font-semibold truncate">{headerTitle}</span>
            {headerSubtitle && <span className="text-xs text-gray-400 hidden sm:block">{headerSubtitle}</span>}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {currentView === "dm" && (
            <>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Phone className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
                onClick={() => setIsVoiceConnected(true)}
              >
                <Video className="w-5 h-5" />
              </Button>
            </>
          )}
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hidden sm:flex">
            <Pin className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Users className="w-5 h-5" />
          </Button>
          <div className="relative hidden sm:block">
            <Input placeholder="Search" className="w-36 h-7 bg-gray-900 border-none text-sm pl-8" />
            <Search className="absolute left-2 top-1.5 w-4 h-4 text-gray-400" />
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hidden sm:flex">
            <Inbox className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hidden sm:flex">
            <QuestionMarkCircle className="w-5 h-5" />
          </Button>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden text-gray-400 hover:text-white">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* New Messages Notification */}
      {currentView === "server" && (
        <div className="bg-[#5865F2] px-4 py-2 flex items-center justify-between text-white text-sm">
          <span>50+ new messages since 6:05 AM on June 10, 2025</span>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 h-7">
            Mark As Read
            <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
              📖
            </Badge>
          </Button>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((msg, index) => {
          const showDate = index === 0 || formatDate(messages[index - 1].timestamp) !== formatDate(msg.timestamp)

          return (
            <div key={msg.id}>
              {showDate && (
                <div className="flex items-center justify-center my-6">
                  <div className="bg-gray-600 px-3 py-1 rounded text-xs text-gray-200 font-medium">
                    {formatDate(msg.timestamp)}
                  </div>
                </div>
              )}
              <div className="flex space-x-3 hover:bg-gray-700/30 p-2 rounded group">
                {msg.avatar && msg.avatar !== "/placeholder.svg?height=40&width=40" ? (
                  <img
                    src={msg.avatar || "/placeholder.svg"}
                    alt={msg.author}
                    className="w-10 h-10 rounded-full flex-shrink-0 cursor-pointer hover:opacity-80"
                    onClick={() => handleViewProfile(msg.authorId)}
                  />
                ) : (
                  <div
                    className="w-10 h-10 bg-[#5865F2] rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 cursor-pointer hover:opacity-80"
                    onClick={() => handleViewProfile(msg.authorId)}
                  >
                    {msg.author.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {msg.isDeleted && (
                    <div className="text-xs text-gray-500 italic mb-1 flex items-center">
                      <span className="mr-1">↩</span>
                      Original message was deleted
                    </div>
                  )}
                  <div className="flex items-baseline space-x-2 mb-1">
                    <div className="flex items-center space-x-1">
                      <span
                        className={cn(
                          "font-medium cursor-pointer hover:underline truncate",
                          msg.isOwner ? "text-orange-400" : "text-white",
                        )}
                        onClick={() => handleViewProfile(msg.authorId)}
                      >
                        {msg.isOwner && <Crown className="w-3 h-3 inline mr-1" />}
                        {msg.author}
                      </span>
                      {msg.userBadges?.map((badge, i) => (
                        <span key={i} className="text-xs">
                          {badge}
                        </span>
                      ))}
                      {msg.isOwner && (
                        <Badge variant="secondary" className="text-xs px-1 py-0 h-4 bg-orange-600 text-white">
                          Owner
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {msg.timestamp.toLocaleDateString("en-US", {
                        month: "numeric",
                        day: "numeric",
                        year: "2-digit",
                      })}
                      , {formatTime(msg.timestamp)}
                    </span>
                  </div>

                  {/* Message Content */}
                  {msg.content && (
                    <div className="text-gray-300 break-words">
                      <p>{msg.content}</p>
                    </div>
                  )}

                  {/* Message Actions */}
                  <div className="flex items-center space-x-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-gray-400 hover:text-white h-6 px-2"
                      onClick={() => handleCreateThread(msg.id)}
                    >
                      <MessageSquare className="w-3 h-3 mr-1" />
                      <span className="hidden sm:inline">Thread</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-gray-400 hover:text-white h-6 px-2"
                      onClick={() => handleViewProfile(msg.authorId)}
                    >
                      <User className="w-3 h-3 mr-1" />
                      <span className="hidden sm:inline">Profile</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-white h-6 px-2">
                      <MoreHorizontal className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Message Input */}
      <div className="p-4 flex-shrink-0">
        <form onSubmit={handleSendMessage}>
          <div className="relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Message #${channelEmoji} • ${headerTitle}`}
              className="bg-gray-600 border-none pr-32 py-3 text-white placeholder-gray-400"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
              <Button type="button" variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-white">
                <Plus className="w-4 h-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-white">
                <Gift className="w-4 h-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-white">
                <ImageIcon className="w-4 h-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-white">
                <Sticker className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="w-6 h-6 text-gray-400 hover:text-white"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
