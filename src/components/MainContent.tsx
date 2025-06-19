import { useApp } from "../context/AppContext"
import { ChatArea } from "./ChatArea"
import { FriendsArea } from "./FriendsArea"
import { VoiceChannelArea } from "./VoiceChannelArea"
import { StageChannelArea } from "./StageChannelArea"
import { ForumChannelArea } from "./ForumChannelArea"
import { MediaChannelArea } from "./MediaChannelArea"
import { ThreadArea } from "./ThreadArea"
import { UserProfileArea } from "./UserProfileArea"

export function MainContent() {
  const { currentView, currentChannelType, selectedThreadId } = useApp()

  if (currentView === "friends") {
    return <FriendsArea />
  }

  if (currentView === "profile") {
    return <UserProfileArea />
  }

  if (selectedThreadId) {
    return <ThreadArea />
  }

  switch (currentChannelType) {
    case "text":
      return <ChatArea />
    case "voice":
      return <VoiceChannelArea />
    case "stage":
      return <StageChannelArea />
    case "forum":
      return <ForumChannelArea />
    case "media":
      return <MediaChannelArea />
    default:
      return <ChatArea />
  }
}
