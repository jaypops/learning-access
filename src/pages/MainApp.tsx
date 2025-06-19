"use client"

import { ServerSidebar } from "../components/ServerSidebar"
import { ChannelSidebar } from "../components/ChannelSidebar"
import { MainContent } from "../components/MainContent"
import { UserPanel } from "../components/UserPanel"
import { VoicePanel } from "../components/VoicePanel"
import { SettingsModal } from "../components/SettingsModal"
import { useApp } from "../context/AppContext"

export function MainApp() {
  const { isVoiceConnected, showSettings } = useApp()

  return (
    <div className="h-screen flex bg-gray-900 text-white overflow-hidden">
      {/* Server Sidebar - Fixed width */}
      <div className="flex-shrink-0">
        <ServerSidebar />
      </div>

      {/* Channel Sidebar - Fixed width, hidden on small screens */}
      <div className="hidden md:flex flex-shrink-0">
        <ChannelSidebar />
      </div>

      {/* Main Content Area - Flexible */}
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

        {/* User Panel - Fixed height */}
        <div className="flex-shrink-0">
          <UserPanel />
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && <SettingsModal />}
    </div>
  )
}
