import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users } from "lucide-react"
import { FriendsList } from "./FriendsList"

export function FriendsArea() {
  return (
    <div className="flex-1 flex flex-col bg-gray-800">
      {/* Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <Users className="w-6 h-6" />
          <span className="font-semibold">Friends</span>
        </div>
      </div>

      {/* Add Friend Section */}
      <div className="p-4 border-b border-gray-700">
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Add Friend</h3>
          <p className="text-sm text-gray-400 mb-3">You can add friends with their Discord username.</p>
          <div className="flex space-x-2">
            <Input
              placeholder="You can add friends with their Discord username."
              className="flex-1 bg-gray-800 border-gray-600"
            />
            <Button className="bg-[#5865F2] hover:bg-[#4752C4]">Send Friend Request</Button>
          </div>
        </div>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Online — 2</h3>
          <FriendsList />
        </div>
      </div>
    </div>
  )
}
