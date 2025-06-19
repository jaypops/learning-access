"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, UserPlus, Search, Menu } from "lucide-react"
import { FriendsList } from "./FriendsList"
import { useState } from "react"

export function FriendsArea() {
  const [activeTab, setActiveTab] = useState<"all" | "online" | "pending">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  return (
    <div className="flex-1 flex flex-col bg-gray-800 min-h-0 h-full">
      {/* Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center space-x-3">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <Users className="w-6 h-6" />
          <span className="font-semibold">Friends</span>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <UserPlus className="w-5 h-5" />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-700 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-900 border-gray-600 pl-10 h-8 text-sm placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-4 py-2 border-b border-gray-700 flex-shrink-0">
        <div className="flex space-x-6 overflow-x-auto">
          <Button
            variant="ghost"
            size="sm"
            className={`text-sm font-medium px-0 h-auto whitespace-nowrap ${
              activeTab === "all"
                ? "text-white border-b-2 border-white rounded-none"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`text-sm font-medium px-0 h-auto whitespace-nowrap ${
              activeTab === "online"
                ? "text-white border-b-2 border-white rounded-none"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("online")}
          >
            Online
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`text-sm font-medium px-0 h-auto whitespace-nowrap ${
              activeTab === "pending"
                ? "text-white border-b-2 border-white rounded-none"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </Button>
        </div>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto min-h-0 scroll-container">
        <div className="p-4">
          <FriendsList activeTab={activeTab} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  )
}
