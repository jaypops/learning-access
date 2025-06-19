"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, MessageCircle, UserPlus, Server, Eye } from "lucide-react"
import { useApp } from "../../context/AppContext"

export function PrivacySafetySettings() {
  const { userSettings, setUserSettings } = useApp()

  const handleSettingChange = (key: keyof typeof userSettings, value: any) => {
    setUserSettings({ ...userSettings, [key]: value })
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Privacy & Safety</h2>
        <p className="text-gray-400">Control who can contact you and what content you see.</p>
      </div>

      {/* Direct Messages */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Direct Messages</span>
          </CardTitle>
          <CardDescription>Control who can send you direct messages.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Allow direct messages from</label>
            <Select
              value={userSettings.allowDirectMessages}
              onValueChange={(value) => handleSettingChange("allowDirectMessages", value)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="everyone">Everyone</SelectItem>
                <SelectItem value="friends">Friends only</SelectItem>
                <SelectItem value="server_members">Server members only</SelectItem>
                <SelectItem value="none">No one</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Friend Requests */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5" />
            <span>Friend Requests</span>
          </CardTitle>
          <CardDescription>Manage how others can add you as a friend.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Allow friend requests</h4>
              <p className="text-sm text-gray-400">Let others send you friend requests</p>
            </div>
            <Switch
              checked={userSettings.allowFriendRequests}
              onCheckedChange={(checked) => handleSettingChange("allowFriendRequests", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Server Invites */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="w-5 h-5" />
            <span>Server Invites</span>
          </CardTitle>
          <CardDescription>Control server invitation permissions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Allow server invites</h4>
              <p className="text-sm text-gray-400">Let others invite you to servers</p>
            </div>
            <Switch
              checked={userSettings.allowServerInvites}
              onCheckedChange={(checked) => handleSettingChange("allowServerInvites", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Content Filter */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Content Filter</span>
          </CardTitle>
          <CardDescription>Filter potentially explicit content in messages.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Safe Direct Messaging</label>
            <Select
              value={userSettings.contentFilter}
              onValueChange={(value) => handleSettingChange("contentFilter", value)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="disabled">Don't scan any messages</SelectItem>
                <SelectItem value="friends_excluded">Scan messages from non-friends</SelectItem>
                <SelectItem value="enabled">Scan all messages</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              This setting helps filter potentially explicit content from direct messages.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Activity Status */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Activity Status</span>
          </CardTitle>
          <CardDescription>Control what others can see about your activity.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Display current activity</h4>
              <p className="text-sm text-gray-400">Show others what you're playing, listening to, or watching</p>
            </div>
            <Switch
              checked={userSettings.showActivity}
              onCheckedChange={(checked) => handleSettingChange("showActivity", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle>Data & Privacy</CardTitle>
          <CardDescription>Manage your data and privacy preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-gray-800 rounded border border-gray-600">
              <h4 className="font-medium mb-1">Request Data</h4>
              <p className="text-sm text-gray-400 mb-2">Download a copy of your Discord data</p>
              <button className="text-[#5865F2] hover:underline text-sm">Request Data</button>
            </div>

            <div className="p-3 bg-gray-800 rounded border border-gray-600">
              <h4 className="font-medium mb-1">Data Usage</h4>
              <p className="text-sm text-gray-400 mb-2">See how Discord uses your data to improve your experience</p>
              <button className="text-[#5865F2] hover:underline text-sm">Learn More</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
