"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Edit, Shield, Smartphone, Mail, User } from "lucide-react"
import { useApp } from "../../context/AppContext"

export function MyAccountSettings() {
  const { userSettings, setUserSettings } = useApp()
  const [showPassword, setShowPassword] = useState(false)
  const [isEditing, setIsEditing] = useState({
    username: false,
    email: false,
    phone: false,
  })

  const handleSettingChange = (key: keyof typeof userSettings, value: any) => {
    setUserSettings({ ...userSettings, [key]: value })
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 h-full overflow-y-auto scroll-container">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2">My Account</h2>
        <p className="text-gray-400">Manage your account settings and security preferences.</p>
      </div>

      {/* Account Information */}
      <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Account Information</span>
          </CardTitle>
          <CardDescription>Update your account details and personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Username */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Username</label>
            <div className="flex items-center space-x-2">
              {isEditing.username ? (
                <>
                  <Input
                    value={userSettings.username}
                    onChange={(e) => handleSettingChange("username", e.target.value)}
                    className="bg-gray-800 border-gray-600"
                  />
                  <Button size="sm" onClick={() => setIsEditing({ ...isEditing, username: false })}>
                    Save
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setIsEditing({ ...isEditing, username: false })}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex-1 p-2 bg-gray-800 rounded border border-gray-600">{userSettings.username}</div>
                  <Button size="sm" variant="outline" onClick={() => setIsEditing({ ...isEditing, username: true })}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email</label>
            <div className="flex items-center space-x-2">
              {isEditing.email ? (
                <>
                  <Input
                    type="email"
                    value={userSettings.email}
                    onChange={(e) => handleSettingChange("email", e.target.value)}
                    className="bg-gray-800 border-gray-600"
                  />
                  <Button size="sm" onClick={() => setIsEditing({ ...isEditing, email: false })}>
                    Save
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setIsEditing({ ...isEditing, email: false })}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex-1 p-2 bg-gray-800 rounded border border-gray-600 flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{userSettings.email}</span>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setIsEditing({ ...isEditing, email: true })}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Phone Number</label>
            <div className="flex items-center space-x-2">
              {isEditing.phone ? (
                <>
                  <Input
                    type="tel"
                    value={userSettings.phoneNumber || ""}
                    onChange={(e) => handleSettingChange("phoneNumber", e.target.value)}
                    className="bg-gray-800 border-gray-600"
                    placeholder="+1 (555) 123-4567"
                  />
                  <Button size="sm" onClick={() => setIsEditing({ ...isEditing, phone: false })}>
                    Save
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setIsEditing({ ...isEditing, phone: false })}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex-1 p-2 bg-gray-800 rounded border border-gray-600 flex items-center space-x-2">
                    <Smartphone className="w-4 h-4 text-gray-400" />
                    <span>{userSettings.phoneNumber || "Not set"}</span>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setIsEditing({ ...isEditing, phone: true })}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password & Authentication */}
      <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Password & Authentication</span>
          </CardTitle>
          <CardDescription>Manage your password and two-factor authentication settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Current Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
                className="bg-gray-800 border-gray-600 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">New Password</label>
            <Input type="password" placeholder="Enter new password" className="bg-gray-800 border-gray-600" />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Confirm New Password</label>
            <Input type="password" placeholder="Confirm new password" className="bg-gray-800 border-gray-600" />
          </div>

          <Button className="bg-[#5865F2] hover:bg-[#4752C4]">Change Password</Button>

          {/* Two-Factor Authentication */}
          <div className="pt-4 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
              </div>
              <div className="flex items-center space-x-2">
                {userSettings.twoFactorEnabled && (
                  <Badge variant="secondary" className="bg-green-900 text-green-300">
                    Enabled
                  </Badge>
                )}
                <Switch
                  checked={userSettings.twoFactorEnabled}
                  onCheckedChange={(checked) => handleSettingChange("twoFactorEnabled", checked)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-red-400">Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions for your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-900/20 border border-red-800 rounded">
            <div>
              <h4 className="font-medium text-red-400">Delete Account</h4>
              <p className="text-sm text-gray-400">Permanently delete your account and all associated data</p>
            </div>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-yellow-900/20 border border-yellow-800 rounded">
            <div>
              <h4 className="font-medium text-yellow-400">Disable Account</h4>
              <p className="text-sm text-gray-400">Temporarily disable your account (can be reactivated)</p>
            </div>
            <Button variant="outline" size="sm" className="border-yellow-600 text-yellow-400">
              Disable Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
