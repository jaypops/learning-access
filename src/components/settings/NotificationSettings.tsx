"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Bell, MessageCircle } from "lucide-react"
import { useApp } from "../../context/AppContext"

export function NotificationSettings() {
  const { userSettings, setUserSettings } = useApp()

  const handleSettingChange = (key: keyof typeof userSettings, value: any) => {
    setUserSettings({ ...userSettings, [key]: value })
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Notifications</h2>
        <p className="text-gray-400">Choose when and how you want to be notified.</p>
      </div>

      {/* General Notifications */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>General Notifications</span>
          </CardTitle>
          <CardDescription>Control your overall notification preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable Desktop Notifications</h4>
              <p className="text-sm text-gray-400">Show notifications on your desktop</p>
            </div>
            <Switch
              checked={userSettings.enableDesktopNotifications}
              onCheckedChange={(checked) => handleSettingChange("enableDesktopNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable Push Notifications</h4>
              <p className="text-sm text-gray-400">Receive notifications on mobile devices</p>
            </div>
            <Switch
              checked={userSettings.enablePushNotifications}
              onCheckedChange={(checked) => handleSettingChange("enablePushNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable Notification Sounds</h4>
              <p className="text-sm text-gray-400">Play sounds when receiving notifications</p>
            </div>
            <Switch
              checked={userSettings.enableSounds}
              onCheckedChange={(checked) => handleSettingChange("enableSounds", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Message Notifications */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Message Notifications</span>
          </CardTitle>
          <CardDescription>Configure notifications for different types of messages.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Direct Message Notifications</h4>
              <p className="text-sm text-gray-400">Get notified when someone sends you a direct message</p>
            </div>
            <Switch
              checked={userSettings.dmNotifications}
              onCheckedChange={(checked) => handleSettingChange("dmNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Mention Notifications</h4>
              <p className="text-sm text-gray-400">Get notified when someone mentions you with @username</p>
            </div>
            <Switch
              checked={userSettings.mentionNotifications}
              onCheckedChange={(checked) => handleSettingChange("mentionNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Server Notifications</h4>
              <p className="text-sm text-gray-400">Get notified for all messages in servers</p>
            </div>
            <Switch
              checked={userSettings.serverNotifications}
              onCheckedChange={(checked) => handleSettingChange("serverNotifications", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Types */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle>Notification Types</CardTitle>
          <CardDescription>Customize which events trigger notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-gray-300">Message Events</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>New messages</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Message reactions</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Thread replies</span>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm text-gray-300">Server Events</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Member joins</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  <span>Member leaves</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Role updates</span>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm text-gray-300">Voice Events</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Voice channel joins</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  <span>Voice channel leaves</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Go live notifications</span>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm text-gray-300">Friend Events</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Friend requests</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Friend comes online</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  <span>Friend starts playing</span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle>Quiet Hours</CardTitle>
          <CardDescription>Set times when you don't want to receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable Quiet Hours</h4>
              <p className="text-sm text-gray-400">Automatically disable notifications during specified hours</p>
            </div>
            <Switch />
          </div>

          <div className="grid grid-cols-2 gap-4 opacity-50">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Start Time</label>
              <select className="w-full p-2 bg-gray-800 border border-gray-600 rounded" disabled>
                <option>10:00 PM</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">End Time</label>
              <select className="w-full p-2 bg-gray-800 border border-gray-600 rounded" disabled>
                <option>8:00 AM</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
