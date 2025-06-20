"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Search } from "lucide-react"
import { useApp } from "../context/AppContext"
import { SettingsSidebar } from "./settings/SettingsSidebar"
import { MyAccountSettings } from "./settings/MyAccountSettings"
import { PrivacySafetySettings } from "./settings/PrivacySafetySettings"
import { VoiceVideoSettings } from "./settings/VoiceVideoSettings"
import { NotificationSettings } from "./settings/NotificationSettings"
import { AppearanceLanguageSettings } from "./settings/AppearanceLanguageSettings"
import { AuthorizedAppsSettings } from "./settings/AuthorizedAppsSettings"
import { NitroSettings } from "./settings/NitroSettings"

export type SettingsPage =
  | "my-account"
  | "profiles"
  | "content-social"
  | "privacy-safety"
  | "family-center"
  | "authorized-apps"
  | "devices"
  | "connections"
  | "clips"
  | "voice-video"
  | "notifications"
  | "appearance-language"
  | "nitro"
  | "server-boost"
  | "subscriptions"
  | "gift-inventory"
  | "billing"

export function SettingsModal() {
  const { setShowSettings } = useApp()
  const [currentPage, setCurrentPage] = useState<SettingsPage>("my-account")
  const [searchQuery, setSearchQuery] = useState("")

  const renderSettingsPage = () => {
    switch (currentPage) {
      case "my-account":
        return <MyAccountSettings />
      case "privacy-safety":
        return <PrivacySafetySettings />
      case "voice-video":
        return <VoiceVideoSettings />
      case "notifications":
        return <NotificationSettings />
      case "appearance-language":
        return <AppearanceLanguageSettings />
      case "authorized-apps":
        return <AuthorizedAppsSettings />
      case "nitro":
        return <NitroSettings />
      default:
        return <MyAccountSettings />
    }
  }

  const getPageTitle = () => {
    switch (currentPage) {
      case "my-account":
        return "My Account"
      case "profiles":
        return "Profiles"
      case "content-social":
        return "Content & Social"
      case "privacy-safety":
        return "Privacy & Safety"
      case "family-center":
        return "Family Center"
      case "authorized-apps":
        return "Authorized Apps"
      case "devices":
        return "Devices"
      case "connections":
        return "Connections"
      case "clips":
        return "Clips"
      case "voice-video":
        return "Voice & Video"
      case "notifications":
        return "Notifications"
      case "appearance-language":
        return "Appearance"
      case "nitro":
        return "Nitro"
      case "server-boost":
        return "Server Boost"
      case "subscriptions":
        return "Subscriptions"
      case "gift-inventory":
        return "Gift Inventory"
      case "billing":
        return "Billing"
      default:
        return "Settings"
    }
  }

  return (
    <div className="fixed inset-0 bg-[#313338] flex z-50">
      {/* Settings Sidebar */}
      <div className="w-[232px] bg-[#2b2d31] flex flex-col border-r border-[#1e1f22] flex-shrink-0">
        {/* Search */}
        <div className="p-[20px] pb-[8px]">
          <div className="relative">
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#1e1f22] border-none text-[#dbdee1] placeholder:text-[#87898c] h-[30px] text-sm pl-8"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#87898c]" />
          </div>
        </div>

        <SettingsSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="h-[60px] px-[40px] flex items-center justify-between border-b border-[#1e1f22] bg-[#313338]">
          <h1 className="text-[20px] font-semibold text-[#f2f3f5]">{getPageTitle()}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-[#87898c] text-sm font-medium">ESC</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(false)}
              className="text-[#b5bac1] hover:text-[#dbdee1] hover:bg-[#404249] w-8 h-8"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto bg-[#313338]">{renderSettingsPage()}</div>
      </div>
    </div>
  )
}
