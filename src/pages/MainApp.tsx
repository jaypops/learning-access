"use client"

import { ServerSidebar } from "../components/ServerSidebar"
import { ChannelSidebar } from "../components/ChannelSidebar"
import { MainContent } from "../components/MainContent"
import { UserPanel } from "../components/UserPanel"
import { VoicePanel } from "../components/VoicePanel"
import { SettingsModal } from "../components/SettingsModal"
import { useApp } from "../context/AppContext"

export function MainApp() {
  const { isVoiceConnected, showSettings, currentView, selectedChannelId, selectedDmId } = useApp()

  // Check if we're in a chat view on mobile
  const isInChat = (currentView === "server" && selectedChannelId) || (currentView === "dm" && selectedDmId)
  const shouldHideSidebarsOnMobile = isInChat

  return (
    <div className="h-screen flex bg-gray-900 text-white overflow-hidden">
      {/* Server Sidebar - Hidden on mobile when in chat */}
      <div className={`flex-shrink-0 ${shouldHideSidebarsOnMobile ? "hidden md:flex" : "flex"}`}>
        <ServerSidebar />
      </div>

      {/* Channel Sidebar - Hidden on mobile when in chat */}
      <div className={`flex-shrink-0 ${shouldHideSidebarsOnMobile ? "hidden md:flex" : "hidden md:flex"}`}>
        <ChannelSidebar />
      </div>

      {/* Main Content Area - Full width on mobile when in chat */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <div className="flex-1 min-h-0">
          <MainContent />
        </div>

        {/* Voice Panel - Fixed height when active */}
        {isVoiceConnected && (
          <div className="flex-shrink-0">
            <VoicePanel />
          </div>
        )}

        {/* User Panel - Hidden on mobile when in chat */}
        <div className={`flex-shrink-0 ${shouldHideSidebarsOnMobile ? "hidden md:flex" : "flex"}`}>
          <UserPanel />
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && <SettingsModal />}
    </div>
  )
}
