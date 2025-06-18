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
} from "lucide-react"
import { useApp } from "../context/AppContext"

interface Message {
  id: string
  author: string
  content: string
  timestamp: Date
  avatar: string
}

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
  } = useApp()

  const [message, setMessage] = useState("")
  const [messages] = useState<Message[]>([
    {
      id: "1",
      author: "Alice",
      content: "Hey everyone! How's it going?",
      timestamp: new Date(Date.now() - 3600000),
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      author: "Bob",
      content: "Pretty good! Just working on some code.",
      timestamp: new Date(Date.now() - 1800000),
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      author: "Charlie",
      content: "Same here! Discord is such a great platform for developers.",
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
      // Handle sending message
      setMessage("")
    }
  }

  let headerTitle = ""
  let headerIcon = null

  if (currentView === "server" && selectedChannelId) {
    const server = servers.find((s) => s.id === selectedServerId)
    const channel = server?.channels.find((c) => c.id === selectedChannelId)
    if (channel) {
      headerTitle = channel.name
      headerIcon = channel.type === "text" ? <Hash className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />
    }
  } else if (currentView === "dm" && selectedDmId) {
    const dm = directMessages.find((d) => d.id === selectedDmId)
    const friend = friends.find((f) => dm?.participants.includes(f.id))
    if (friend) {
      headerTitle = friend.username
      headerIcon = (
        <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs">
          {friend.username.charAt(0)}
        </div>
      )
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-800">
      {/* Chat Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-3">
          {headerIcon}
          <span className="font-semibold">{headerTitle}</span>
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
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Pin className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Users className="w-5 h-5" />
          </Button>
          <div className="relative">
            <Input placeholder="Search" className="w-36 h-6 bg-gray-900 border-none text-sm" />
            <Search className="absolute right-2 top-1 w-4 h-4 text-gray-400" />
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Inbox className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <QuestionMarkCircle className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                <img
                  src={msg.avatar || "/placeholder.svg"}
                  alt={msg.author}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-baseline space-x-2">
                    <span className="font-semibold text-white">{msg.author}</span>
                    <span className="text-xs text-gray-400">{formatTime(msg.timestamp)}</span>
                  </div>
                  <p className="text-gray-300 mt-1">{msg.content}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Message Input */}
      <div className="p-4">
        <form onSubmit={handleSendMessage}>
          <div className="relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Message ${headerTitle}`}
              className="bg-gray-700 border-none pr-12 py-3"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
              <Button type="button" variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-white">
                <span className="text-lg">+</span>
              </Button>
              <Button type="button" variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-white">
                <span className="text-lg">😀</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
