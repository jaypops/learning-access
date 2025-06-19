"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, ExternalLink, Trash2, Shield, Clock } from "lucide-react"
import { useApp } from "../../context/AppContext"

export function AuthorizedAppsSettings() {
  const { userSettings } = useApp()

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getAppIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "spotify":
        return "🎵"
      case "github":
        return "🐙"
      case "steam":
        return "🎮"
      default:
        return "🔗"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Authorized Apps</h2>
        <p className="text-gray-400">Manage applications that have access to your Discord account.</p>
      </div>

      {/* Info Card */}
      <Card className="bg-blue-900/20 border-blue-800">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-400 mb-1">Security Notice</h4>
              <p className="text-sm text-gray-300">
                Only authorize apps you trust. You can revoke access at any time by clicking "Revoke Access" below.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Authorized Apps List */}
      <div className="space-y-4">
        {userSettings.authorizedApps.map((app) => (
          <Card key={app.id} className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-2xl">
                    {getAppIcon(app.name)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-lg">{app.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        Connected
                      </Badge>
                    </div>

                    <p className="text-gray-400 text-sm mb-3">{app.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>Authorized on {formatDate(app.authorizedAt)}</span>
                      </div>

                      {app.lastUsed && (
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <ExternalLink className="w-4 h-4" />
                          <span>Last used on {formatDate(app.lastUsed)}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium text-sm mb-2">Permissions:</h4>
                      <div className="flex flex-wrap gap-2">
                        {app.permissions.map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View App
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Revoke
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {userSettings.authorizedApps.length === 0 && (
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-12 text-center">
            <Zap className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Authorized Apps</h3>
            <p className="text-gray-400 mb-4">
              You haven't authorized any applications to access your Discord account yet.
            </p>
            <Button variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              Browse App Directory
            </Button>
          </CardContent>
        </Card>
      )}

      {/* App Directory */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle>Discover Apps</CardTitle>
          <CardDescription>Find new applications to enhance your Discord experience.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white text-sm">
                  🎵
                </div>
                <div>
                  <h4 className="font-medium">Music Bots</h4>
                  <p className="text-xs text-gray-400">Play music in voice channels</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Explore
              </Button>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-sm">
                  🤖
                </div>
                <div>
                  <h4 className="font-medium">Moderation</h4>
                  <p className="text-xs text-gray-400">Automate server management</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Explore
              </Button>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-white text-sm">
                  🎮
                </div>
                <div>
                  <h4 className="font-medium">Gaming</h4>
                  <p className="text-xs text-gray-400">Game stats and utilities</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Explore
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
