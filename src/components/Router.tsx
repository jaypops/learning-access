"use client"

import { useAuth } from "../context/AuthContext"
import { LoginPage } from "../pages/LoginPage"
import { SignUpPage } from "../pages/SignUpPage"
import { MainApp } from "../pages/MainApp"
import { useApp } from "../context/AppContext"

export function Router() {
  const { isAuthenticated } = useAuth()
  const { currentView } = useApp()

  if (!isAuthenticated) {
    return currentView === "signup" ? <SignUpPage /> : <LoginPage />
  }

  return <MainApp />
}
