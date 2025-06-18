import { Button } from "@/components/ui/button"
import { useApp } from "../context/AppContext"
import { MessageCircle, Phone, MoreHorizontal } from "lucide-react"

export function FriendsList() {
  const { friends } = useApp()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "dnd":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-2">
      {friends.map((friend) => (
        <div key={friend.id} className="flex items-center justify-between p-2 rounded hover:bg-gray-600 group">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img src={friend.avatar || "/placeholder.svg"} alt={friend.username} className="w-8 h-8 rounded-full" />
              <div
                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-700 ${getStatusColor(friend.status)}`}
              />
            </div>
            <div>
              <div className="font-medium">{friend.username}</div>
              <div className="text-xs text-gray-400">#{friend.discriminator}</div>
            </div>
          </div>

          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-white">
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-white">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-white">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
