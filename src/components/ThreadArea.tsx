"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Hash, ArrowLeft, Users, Pin, Archive, Lock, MoreHorizontal } from "lucide-react"
import { useApp } from "../context/AppContext"
import type { Message } from "../types"

export function ThreadArea() {
  const { servers, selectedServerId, selectedChannelId, selectedThreadId, setSelectedThreadId, threads } = useApp()

  const [message, setMessage] = useState("")
  const [messages] = useState<Message[]>([
    {
      id: "1",
      author: "Alice",
      authorId: "1",
      content: "I found a bug in the latest update. The notification sound doesn't work properly.",
      timestamp: new Date(Date.now() - 7200000),
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      author: "Bob",
      authorId: "2",
      content: "I'm experiencing the same issue! It started after the update yesterday.",
      timestamp: new Date(Date.now() - 6900000),
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      author: "Charlie",
      authorId: "3",
      content: "Can you provide more details about your system? OS version, browser, etc.?",
      timestamp: new Date(Date.now() - 6600000),
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const currentServer = servers.find((s) => s.id === selectedServerId)
  const currentChannel = currentServer?.categories
    .flatMap((cat) => cat.channels)
    .find((ch) => ch.id === selectedChannelId)
  const currentThread = threads.find((t) => t.id === selectedThreadId)

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

  if (!currentThread || !currentChannel) return null

  return (
    <div className="flex-1 flex flex-col bg-gray-800">
      {/* Thread Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
            onClick={() => setSelectedThreadId(null)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Hash className="w-5 h-5 text-gray-400" />
          <div className="flex flex-col">
            <span className="font-semibold">{currentThread.name}</span>
            <span className="text-xs text-gray-400">in #{currentChannel.name}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Pin className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Users className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Archive className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Lock className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Thread Info Banner */}
      <div className="bg-blue-900/20 border-l-4 border-blue-500 p-3 mx-4 mt-4 rounded">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-blue-400">Thread: {currentThread.name}</div>
            <div className="text-sm text-gray-400">
              {currentThread.memberCount} member{currentThread.memberCount !== 1 ? "s" : ""} •
              {currentThread.archived ? " Archived" : " Active"}
              {currentThread.locked ? " • Locked" : ""}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!currentThread.archived && (
              <Button size="sm" variant="outline">
                Join Thread
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Thread Messages */}
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

      {/* Thread Message Input */}
      <div className="p-4">
        {currentThread.locked ? (
          <div className="bg-gray-700 rounded p-3 text-center">
            <Lock className="w-5 h-5 text-gray-400 mx-auto mb-2" />
            <span className="text-gray-400">This thread has been locked</span>
          </div>
        ) : currentThread.archived ? (
          <div className="bg-gray-700 rounded p-3 text-center">
            <Archive className="w-5 h-5 text-gray-400 mx-auto mb-2" />
            <span className="text-gray-400">This thread has been archived</span>
          </div>
        ) : (
          <form onSubmit={handleSendMessage}>
            <div className="relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Reply to ${currentThread.name}...`}
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
        )}
      </div>
    </div>
  )
}
