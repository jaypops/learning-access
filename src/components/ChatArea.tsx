"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
    threads,
    setSelectedThreadId,
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
      author: "Alice",
      authorId: "1",
      content: "Hey everyone! How's it going?",
      timestamp: new Date(Date.now() - 3600000),
      avatar: "/placeholder.svg?height=40&width=40",
      reactions: [
        { emoji: "👍", count: 3, users: ["1", "2", "3"] },
        { emoji: "❤️", count: 1, users: ["2"] },
      ],
    },
    {
      id: "2",
      author: "Bob",
      authorId: "2",
      content:
        "Pretty good! Just working on some code. **Check this out:**\n```js\nconst hello = 'world';\nconsole.log(hello);\n```",
      timestamp: new Date(Date.now() - 1800000),
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      author: "Charlie",
      authorId: "3",
      content:
        "Same here! Discord is such a great platform for developers. Anyone want to start a thread about the new features?",
      timestamp: new Date(Date.now() - 900000),
      avatar: "/placeholder.svg?height=40&width=40",
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
      return date.toLocaleDateString()
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      setMessage("")
    }
  }

  const handleReaction = (messageId: string, emoji: string) => {
    console.log(`Reacted to message ${messageId} with ${emoji}`)
  }

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

  if (currentView === "server" && selectedChannelId) {
    const server = servers.find((s) => s.id === selectedServerId)
    const channel = server?.categories.flatMap((cat) => cat.channels).find((c) => c.id === selectedChannelId)
    if (channel) {
      headerTitle = channel.name
      headerIcon = channel.type === "text" ? <Hash className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />
    }
  } else if (currentView === "dm" && selectedDmId) {
    const dm = directMessages.find((d) => d.id === selectedDmId)
    const friend = friends.find((f) => dm?.participants.includes(f.id))
    if (friend) {
      headerTitle = friend.username
      headerIcon =
        friend.avatar && friend.avatar !== "/placeholder.svg" ? (
          <img src={friend.avatar || "/placeholder.svg"} alt={friend.username} className="w-6 h-6 rounded-full" />
        ) : (
          <div className="w-6 h-6 bg-[#5865F2] rounded-full flex items-center justify-center text-white text-xs font-semibold">
            {friend.username.charAt(0).toUpperCase()}
          </div>
        )
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-800 h-full">
      {/* Chat Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-gray-700">
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
          <span className="font-semibold truncate">{headerTitle}</span>
          {currentView === "server" && (
            <span className="text-sm text-gray-400 hidden sm:inline">— General discussion and announcements</span>
          )}
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
            <Input placeholder="Search" className="w-36 h-6 bg-gray-900 border-none text-sm" />
            <Search className="absolute right-2 top-1 w-4 h-4 text-gray-400" />
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

      {/* Active Threads */}
      {threads.length > 0 && currentView === "server" && (
        <div className="bg-blue-900/10 border-b border-gray-700 p-2">
          <div className="flex items-center space-x-2 text-sm">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 font-medium">Active Threads:</span>
            {threads.slice(0, 3).map((thread) => (
              <Button
                key={thread.id}
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                onClick={() => setSelectedThreadId(thread.id)}
              >
                {thread.name}
              </Button>
            ))}
            {threads.length > 3 && <span className="text-gray-400">+{threads.length - 3} more</span>}
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((msg, index) => {
          const showDate = index === 0 || formatDate(messages[index - 1].timestamp) !== formatDate(msg.timestamp)

          return (
            <div key={msg.id}>
              {showDate && (
                <div className="flex items-center justify-center my-4">
                  <div className="bg-gray-700 px-3 py-1 rounded text-xs text-gray-300">{formatDate(msg.timestamp)}</div>
                </div>
              )}
              <div className="flex space-x-3 hover:bg-gray-700/50 p-2 rounded group">
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
                  <div className="flex items-baseline space-x-2">
                    <span
                      className="font-semibold text-white cursor-pointer hover:underline truncate"
                      onClick={() => handleViewProfile(msg.authorId)}
                    >
                      {msg.author}
                    </span>
                    <span className="text-xs text-gray-400 flex-shrink-0">{formatTime(msg.timestamp)}</span>
                  </div>

                  {/* Message Content with Markdown Support */}
                  <div className="text-gray-300 mt-1 break-words">
                    {msg.content.includes("```") ? (
                      <div>
                        {msg.content.split("```").map((part, i) =>
                          i % 2 === 0 ? (
                            <span key={i}>{part}</span>
                          ) : (
                            <pre key={i} className="bg-gray-900 p-2 rounded mt-1 mb-1 text-sm overflow-x-auto">
                              <code>{part}</code>
                            </pre>
                          ),
                        )}
                      </div>
                    ) : (
                      <p>
                        {msg.content
                          .split("**")
                          .map((part, i) => (i % 2 === 0 ? part : <strong key={i}>{part}</strong>))}
                      </p>
                    )}
                  </div>

                  {/* Reactions */}
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className="flex items-center space-x-1 mt-2 flex-wrap">
                      {msg.reactions.map((reaction, i) => (
                        <Button
                          key={i}
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 bg-gray-700 hover:bg-gray-600 text-xs"
                          onClick={() => handleReaction(msg.id, reaction.emoji)}
                        >
                          {reaction.emoji} {reaction.count}
                        </Button>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  )}

                  {/* Message Actions */}
                  <div className="flex items-center space-x-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-gray-400 hover:text-white"
                      onClick={() => handleCreateThread(msg.id)}
                    >
                      <MessageSquare className="w-3 h-3 mr-1" />
                      <span className="hidden sm:inline">Thread</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-gray-400 hover:text-white"
                      onClick={() => handleViewProfile(msg.authorId)}
                    >
                      <User className="w-3 h-3 mr-1" />
                      <span className="hidden sm:inline">Profile</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-white">
                      <MoreHorizontal className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-20 left-4 right-4 sm:left-4 sm:right-auto bg-gray-700 rounded-lg p-4 shadow-lg z-10">
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
            {["😀", "😂", "😍", "🤔", "👍", "👎", "❤️", "🎉", "😢", "😡", "🔥", "💯"].map((emoji) => (
              <Button
                key={emoji}
                variant="ghost"
                size="sm"
                className="text-lg hover:bg-gray-600"
                onClick={() => {
                  setShowEmojiPicker(false)
                }}
              >
                {emoji}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4 flex-shrink-0 border-t border-gray-700">
        <form onSubmit={handleSendMessage}>
          <div className="relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Message ${headerTitle}`}
              className="bg-gray-700 border-none pr-20 py-3"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
              <Button type="button" variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-white">
                <Plus className="w-4 h-4" />
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
