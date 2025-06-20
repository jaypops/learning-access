"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Home } from "lucide-react"
import { useApp } from "../context/AppContext"
import { cn } from "@/lib/utils"

export function ServerSidebar() {
  const { servers, selectedServerId, setSelectedServerId, currentView, setCurrentView } = useApp()

  return (
    <div className="w-[72px] bg-gray-900 flex flex-col items-center py-3 space-y-2">
      {/* Home/Friends Button */}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "w-12 h-12 rounded-2xl bg-gray-700 hover:bg-[#5865F2] hover:rounded-xl transition-all duration-200",
            currentView === "friends" && "bg-[#5865F2] rounded-xl",
          )}
          onClick={() => {
            setCurrentView("friends")
            setSelectedServerId(null)
          }}
        >
          <Home className="w-6 h-6" />
        </Button>
        {/* Notification badge for DMs */}
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center"
        >
          12
        </Badge>
      </div>

      {/* Separator */}
      <div className="w-8 h-0.5 bg-gray-600 rounded-full" />

      {/* Server Icons */}
      {servers.map((server) => (
        <div key={server.id} className="relative">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "w-12 h-12 rounded-2xl bg-gray-700 hover:bg-gray-600 hover:rounded-xl transition-all duration-200 p-0 overflow-hidden",
              selectedServerId === server.id && "bg-[#5865F2] rounded-xl",
            )}
            onClick={() => {
              setSelectedServerId(server.id)
              setCurrentView("server")
            }}
          >
            {server.icon ? (
              <img src={server.icon || "/placeholder.svg"} alt={server.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg font-semibold">{server.name.charAt(0)}</span>
            )}
          </Button>
          {/* Server notification badges */}
          {server.unreadCount && server.unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center"
            >
              {server.unreadCount > 99 ? "99+" : server.unreadCount}
            </Badge>
          )}
        </div>
      ))}

      {/* Add Server Button */}
      <Button
        variant="ghost"
        size="icon"
        className="w-12 h-12 rounded-2xl bg-gray-700 hover:bg-green-600 hover:rounded-xl transition-all duration-200"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  )
}
