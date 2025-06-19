"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ImageIcon,
  Video,
  Upload,
  Grid3X3,
  List,
  Search,
  Filter,
  Download,
  Heart,
  MessageCircle,
  Share,
} from "lucide-react"
import { useApp } from "../context/AppContext"
import { useState } from "react"

interface MediaItem {
  id: string
  type: "image" | "video"
  url: string
  filename: string
  author: string
  authorId: string
  timestamp: Date
  size: number
  likes: number
  comments: number
}

export function MediaChannelArea() {
  const { servers, selectedServerId, selectedChannelId } = useApp()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all")

  const currentServer = servers.find((s) => s.id === selectedServerId)
  const currentChannel = currentServer?.categories
    .flatMap((cat) => cat.channels)
    .find((ch) => ch.id === selectedChannelId)

  // Mock media data
  const mediaItems: MediaItem[] = [
    {
      id: "1",
      type: "image",
      url: "/placeholder.svg?height=300&width=400",
      filename: "screenshot_2024.png",
      author: "Alice",
      authorId: "1",
      timestamp: new Date(Date.now() - 3600000),
      size: 2048000,
      likes: 12,
      comments: 3,
    },
    {
      id: "2",
      type: "video",
      url: "/placeholder.svg?height=300&width=400",
      filename: "gameplay_clip.mp4",
      author: "Bob",
      authorId: "2",
      timestamp: new Date(Date.now() - 7200000),
      size: 15728640,
      likes: 8,
      comments: 5,
    },
    {
      id: "3",
      type: "image",
      url: "/placeholder.svg?height=300&width=400",
      filename: "meme_collection.jpg",
      author: "Charlie",
      authorId: "3",
      timestamp: new Date(Date.now() - 10800000),
      size: 1024000,
      likes: 25,
      comments: 12,
    },
  ]

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return "now"
  }

  const filteredMedia = mediaItems.filter((item) => {
    const matchesSearch =
      item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === "all" || item.type === filterType
    return matchesSearch && matchesFilter
  })

  if (!currentChannel) return null

  return (
    <div className="flex-1 flex flex-col bg-gray-800">
      {/* Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <ImageIcon className="w-6 h-6" />
          <span className="font-semibold">{currentChannel.name}</span>
          {currentChannel.description && <span className="text-sm text-gray-400">— {currentChannel.description}</span>}
        </div>
        <Button className="bg-[#5865F2] hover:bg-[#4752C4]">
          <Upload className="w-4 h-4 mr-2" />
          Upload Media
        </Button>
      </div>

      {/* Media Controls */}
      <div className="p-4 border-b border-gray-700 bg-gray-750">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                placeholder="Search media..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-gray-800 border-gray-600 pl-8"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <Button
                variant={filterType === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilterType("all")}
              >
                All
              </Button>
              <Button
                variant={filterType === "image" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilterType("image")}
              >
                <ImageIcon className="w-4 h-4 mr-1" />
                Images
              </Button>
              <Button
                variant={filterType === "video" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilterType("video")}
              >
                <Video className="w-4 h-4 mr-1" />
                Videos
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Media Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="bg-gray-700 rounded-lg overflow-hidden hover:bg-gray-650 transition-colors group"
              >
                <div className="relative aspect-square">
                  <img
                    src={item.url || "/placeholder.svg"}
                    alt={item.filename}
                    className="w-full h-full object-cover"
                  />
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                        <Video className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="w-8 h-8 bg-black/50 hover:bg-black/70">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-3">
                  <div className="text-sm font-medium truncate mb-1">{item.filename}</div>
                  <div className="text-xs text-gray-400 mb-2">
                    by {item.author} • {formatTimeAgo(item.timestamp)}
                  </div>
                  <div className="text-xs text-gray-500 mb-2">{formatFileSize(item.size)}</div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{item.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{item.comments}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="w-4 h-4 text-gray-400 hover:text-white">
                      <Share className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredMedia.map((item) => (
              <div key={item.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-650 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-600 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={item.url || "/placeholder.svg"}
                      alt={item.filename}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      {item.type === "video" ? (
                        <Video className="w-4 h-4 text-blue-400" />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-green-400" />
                      )}
                      <span className="font-medium truncate">{item.filename}</span>
                    </div>
                    <div className="text-sm text-gray-400 mb-1">
                      Uploaded by {item.author} • {formatTimeAgo(item.timestamp)}
                    </div>
                    <div className="text-xs text-gray-500">{formatFileSize(item.size)}</div>
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{item.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{item.comments}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-white">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-white">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredMedia.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No media found</h3>
            <p className="text-gray-400 mb-4">
              {searchQuery ? "Try adjusting your search terms" : "Upload some images or videos to get started!"}
            </p>
            <Button className="bg-[#5865F2] hover:bg-[#4752C4]">
              <Upload className="w-4 h-4 mr-2" />
              Upload Media
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
