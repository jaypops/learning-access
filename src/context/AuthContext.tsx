"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  id: string
  username: string
  email: string
  avatar?: string
  discriminator: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async (email: string, password: string) => {
    // Mock login
    const mockUser: User = {
      id: "1",
      username: "User",
      email,
      discriminator: "1234",
      avatar: "/placeholder.svg?height=32&width=32",
    }
    setUser(mockUser)
    setIsAuthenticated(true)
  }

  const signup = async (username: string, email: string, password: string) => {
    // Mock signup
    const mockUser: User = {
      id: "1",
      username,
      email,
      discriminator: "1234",
      avatar: "/placeholder.svg?height=32&width=32",
    }
    setUser(mockUser)
    setIsAuthenticated(true)
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
