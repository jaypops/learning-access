"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Pin, Lock, Search, Plus, TrendingUp, Clock, MessageCircle } from "lucide-react"
import { useApp } from "../context/AppContext"
import { useState } from "react"

export function ForumChannelArea() {
  const { servers, selectedServerId, selectedChannelId, forumPosts } = useApp()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "oldest">("latest")

  const currentServer = servers.find((s) => s.id === selectedServerId)
  const currentChannel = currentServer?.categories
    .flatMap((cat) => cat.channels)
    .find((ch) => ch.id === selectedChannelId)

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return "now"
  }

  const filteredPosts = forumPosts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.replyCount - a.replyCount
        case "oldest":
          return a.timestamp.getTime() - b.timestamp.getTime()
        default:
          return (b.lastReply?.getTime() || b.timestamp.getTime()) - (a.lastReply?.getTime() || a.timestamp.getTime())
      }
    })

  if (!currentChannel) return null

  return (
    <div className="flex-1 flex flex-col bg-gray-800">
      {/* Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-6 h-6" />
          <span className="font-semibold">{currentChannel.name}</span>
          {currentChannel.description && <span className="text-sm text-gray-400">— {currentChannel.description}</span>}
        </div>
        <Button className="bg-[#5865F2] hover:bg-[#4752C4]">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Forum Controls */}
      <div className="p-4 border-b border-gray-700 bg-gray-750">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-gray-800 border-gray-600 pl-8"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Sort by:</span>
              <Button variant={sortBy === "latest" ? "default" : "ghost"} size="sm" onClick={() => setSortBy("latest")}>
                <Clock className="w-4 h-4 mr-1" />
                Latest
              </Button>
              <Button
                variant={sortBy === "popular" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSortBy("popular")}
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                Popular
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Forum Posts */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-700 rounded-lg p-4 hover:bg-gray-650 cursor-pointer transition-colors border-l-4 border-transparent hover:border-[#5865F2]"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Post Header */}
                  <div className="flex items-center space-x-2 mb-2">
                    {post.pinned && <Pin className="w-4 h-4 text-yellow-500" />}
                    {post.locked && <Lock className="w-4 h-4 text-gray-400" />}
                    <h3 className="font-semibold text-lg hover:text-[#5865F2] transition-colors">{post.title}</h3>
                  </div>

                  {/* Post Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex items-center space-x-2 mb-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-[#5865F2]/20 text-[#5865F2] text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Post Content Preview */}
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">{post.content}</p>

                  {/* Post Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span>by {post.author}</span>
                      <span>{formatTimeAgo(post.timestamp)}</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{post.replyCount}</span>
                      </div>
                      {post.lastReply && <span>Last reply {formatTimeAgo(post.lastReply)}</span>}
                    </div>
                  </div>
                </div>

                {/* Post Author Avatar */}
                <div className="ml-4">
                  <img src="/placeholder.svg?height=40&width=40" alt={post.author} className="w-10 h-10 rounded-full" />
                </div>
              </div>
            </div>
          ))}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No posts found</h3>
              <p className="text-gray-400 mb-4">
                {searchQuery ? "Try adjusting your search terms" : "Be the first to start a discussion!"}
              </p>
              <Button className="bg-[#5865F2] hover:bg-[#4752C4]">
                <Plus className="w-4 h-4 mr-2" />
                Create Post
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
