import { useApp } from "../context/AppContext"
import { ChatArea } from "./ChatArea"
import { FriendsArea } from "./FriendsArea"

export function MainContent() {
  const { currentView } = useApp()

  if (currentView === "friends") {
    return <FriendsArea />
  }

  return <ChatArea />
}
