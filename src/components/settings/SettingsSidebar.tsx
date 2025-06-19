"use client"

import { Button } from "@/components/ui/button"
import { User, Shield, Mic, Bell, Palette, Zap, Crown } from "lucide-react"
import type { SettingsPage } from "../SettingsModal"
import { cn } from "@/lib/utils"

interface SettingsSidebarProps {
  currentPage: SettingsPage
  setCurrentPage: (page: SettingsPage) => void
}

export function SettingsSidebar({ currentPage, setCurrentPage }: SettingsSidebarProps) {
  const settingsPages = [
    {
      id: "my-account" as SettingsPage,
      label: "My Account",
      icon: User,
      category: "User Settings",
    },
    {
      id: "privacy-safety" as SettingsPage,
      label: "Privacy & Safety",
      icon: Shield,
      category: "User Settings",
    },
    {
      id: "voice-video" as SettingsPage,
      label: "Voice & Video",
      icon: Mic,
      category: "User Settings",
    },
    {
      id: "notifications" as SettingsPage,
      label: "Notifications",
      icon: Bell,
      category: "User Settings",
    },
    {
      id: "appearance-language" as SettingsPage,
      label: "Appearance",
      icon: Palette,
      category: "User Settings",
    },
    {
      id: "authorized-apps" as SettingsPage,
      label: "Authorized Apps",
      icon: Zap,
      category: "User Settings",
    },
    {
      id: "nitro" as SettingsPage,
      label: "Nitro",
      icon: Crown,
      category: "Billing Settings",
    },
  ]

  const userSettingsPages = settingsPages.filter((page) => page.category === "User Settings")
  const billingSettingsPages = settingsPages.filter((page) => page.category === "Billing Settings")

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-700 p-4">
      <div className="space-y-6">
        {/* User Settings */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">User Settings</h3>
          <div className="space-y-1">
            {userSettingsPages.map((page) => {
              const Icon = page.icon
              return (
                <Button
                  key={page.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700",
                    currentPage === page.id && "bg-gray-700 text-white",
                  )}
                  onClick={() => setCurrentPage(page.id)}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {page.label}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-700" />

        {/* Billing Settings */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Billing Settings</h3>
          <div className="space-y-1">
            {billingSettingsPages.map((page) => {
              const Icon = page.icon
              return (
                <Button
                  key={page.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700",
                    currentPage === page.id && "bg-gray-700 text-white",
                  )}
                  onClick={() => setCurrentPage(page.id)}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {page.label}
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
