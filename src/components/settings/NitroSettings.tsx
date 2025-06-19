"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Check, Star, Zap, Gift, Calendar, CreditCard } from "lucide-react"
import { useApp } from "../../context/AppContext"

export function NitroSettings() {
  const { userSettings } = useApp()

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const nitroFeatures = [
    "Higher quality screen share (1080p 60fps)",
    "Custom emoji anywhere",
    "Animated avatar, banner, and emoji",
    "Longer messages (up to 4,000 characters)",
    "Larger file uploads (up to 500MB)",
    "HD video calling",
    "2 Server Boosts",
    "Custom Discord Tag",
    "Profile badge",
  ]

  const nitroBasicFeatures = [
    "Custom emoji anywhere",
    "Larger file uploads (up to 50MB)",
    "HD video calling",
    "Custom Discord Tag",
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 flex items-center space-x-2">
          <Crown className="w-8 h-8 text-yellow-500" />
          <span>Discord Nitro</span>
        </h2>
        <p className="text-gray-400">Upgrade your Discord experience with premium features.</p>
      </div>

      {/* Current Subscription */}
      {userSettings.nitroSubscription && (
        <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Crown className="w-6 h-6 text-yellow-500" />
              <span>Current Subscription</span>
              <Badge className="bg-yellow-500 text-black">
                {userSettings.nitroSubscription.plan === "nitro" ? "Nitro" : "Nitro Basic"}
              </Badge>
            </CardTitle>
            <CardDescription>Your premium Discord experience is active.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Status</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="capitalize">{userSettings.nitroSubscription.status}</span>
                </div>
              </div>

              {userSettings.nitroSubscription.renewsAt && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Next Billing</span>
                  </div>
                  <span>{formatDate(userSettings.nitroSubscription.renewsAt)}</span>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Button variant="outline">
                <Gift className="w-4 h-4 mr-2" />
                Gift Nitro
              </Button>
              <Button variant="outline">Manage Subscription</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Nitro Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nitro Basic */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-6 h-6 text-blue-500" />
              <span>Nitro Basic</span>
            </CardTitle>
            <CardDescription>Essential premium features for a better Discord experience.</CardDescription>
            <div className="text-3xl font-bold">
              $2.99<span className="text-lg text-gray-400">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {nitroBasicFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              className="w-full"
              variant={userSettings.nitroSubscription?.plan === "nitro_basic" ? "outline" : "default"}
              disabled={userSettings.nitroSubscription?.plan === "nitro_basic"}
            >
              {userSettings.nitroSubscription?.plan === "nitro_basic" ? "Current Plan" : "Get Nitro Basic"}
            </Button>
          </CardContent>
        </Card>

        {/* Nitro */}
        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-700 relative">
          <div className="absolute top-4 right-4">
            <Badge className="bg-yellow-500 text-black">
              <Star className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          </div>

          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Crown className="w-6 h-6 text-yellow-500" />
              <span>Nitro</span>
            </CardTitle>
            <CardDescription>The ultimate Discord experience with all premium features.</CardDescription>
            <div className="text-3xl font-bold">
              $9.99<span className="text-lg text-gray-400">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {nitroFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              disabled={userSettings.nitroSubscription?.plan === "nitro"}
            >
              {userSettings.nitroSubscription?.plan === "nitro" ? "Current Plan" : "Get Nitro"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Server Boosts */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-pink-500" />
            <span>Server Boosts</span>
          </CardTitle>
          <CardDescription>Use your Nitro boosts to enhance your favorite servers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div>
              <h4 className="font-medium">Available Boosts</h4>
              <p className="text-sm text-gray-400">
                {userSettings.nitroSubscription?.plan === "nitro"
                  ? "2 boosts included with Nitro"
                  : "No boosts available"}
              </p>
            </div>
            <div className="text-2xl font-bold text-pink-500">
              {userSettings.nitroSubscription?.plan === "nitro" ? "2" : "0"}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Boost Benefits</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-green-500" />
                <span>Higher quality voice (128kbps)</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-green-500" />
                <span>Custom server banner</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-green-500" />
                <span>Animated server icon</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-green-500" />
                <span>More custom emoji slots</span>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            Learn More About Server Boosting
          </Button>
        </CardContent>
      </Card>

      {/* Gift Nitro */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gift className="w-6 h-6 text-green-500" />
            <span>Gift Nitro</span>
          </CardTitle>
          <CardDescription>Share the premium Discord experience with friends.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
              <h4 className="font-medium mb-2">1 Month Nitro</h4>
              <div className="text-2xl font-bold mb-2">$9.99</div>
              <Button variant="outline" size="sm" className="w-full">
                Gift Now
              </Button>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
              <h4 className="font-medium mb-2">1 Year Nitro</h4>
              <div className="text-2xl font-bold mb-2">
                $99.99
                <span className="text-sm text-green-400 ml-2">Save 17%</span>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Gift Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
