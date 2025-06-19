"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
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
  | "privacy-safety"
  | "voice-video"
  | "notifications"
  | "appearance-language"
  | "authorized-apps"
  | "nitro"

export function SettingsModal() {
  const { setShowSettings } = useApp()
  const [currentPage, setCurrentPage] = useState<SettingsPage>("my-account")

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

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800/90 backdrop-blur-md border border-gray-700/50 rounded-lg w-full max-w-6xl h-full max-h-[90vh] flex overflow-hidden shadow-2xl">
        {/* Settings Sidebar - Hidden on mobile */}
        <div className="hidden md:block">
          <SettingsSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>

        {/* Settings Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="h-16 px-4 sm:px-6 flex items-center justify-between border-b border-gray-700 flex-shrink-0">
            <h1 className="text-lg sm:text-xl font-semibold truncate">User Settings</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(false)}
              className="text-gray-400 hover:text-white flex-shrink-0"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Mobile Settings Navigation */}
          <div className="md:hidden border-b border-gray-700 p-4">
            <select
              value={currentPage}
              onChange={(e) => setCurrentPage(e.target.value as SettingsPage)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            >
              <option value="my-account">My Account</option>
              <option value="privacy-safety">Privacy & Safety</option>
              <option value="voice-video">Voice & Video</option>
              <option value="notifications">Notifications</option>
              <option value="appearance-language">Appearance</option>
              <option value="authorized-apps">Authorized Apps</option>
              <option value="nitro">Nitro</option>
            </select>
          </div>

          {/* Settings Page Content */}
          <div className="flex-1 overflow-y-auto min-h-0">{renderSettingsPage()}</div>
        </div>
      </div>
    </div>
  )
}
