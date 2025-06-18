import { ServerSidebar } from "../components/ServerSidebar"
import { ChannelSidebar } from "../components/ChannelSidebar"
import { MainContent } from "../components/MainContent"
import { UserPanel } from "../components/UserPanel"
import { VoicePanel } from "../components/VoicePanel"
import { useApp } from "../context/AppContext"

export function MainApp() {
  const { isVoiceConnected } = useApp()

  return (
    <div className="h-screen flex bg-gray-800 text-white">
      {/* Server Sidebar */}
      <ServerSidebar />

      {/* Channel/Friends Sidebar */}
      <ChannelSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <MainContent />

        {/* Voice Panel */}
        {isVoiceConnected && <VoicePanel />}

        {/* User Panel */}
        <UserPanel />
      </div>
    </div>
  )
}
