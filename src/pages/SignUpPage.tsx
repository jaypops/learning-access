"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "../context/AuthContext"
import { useApp } from "../context/AppContext"

export function SignUpPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signup } = useAuth()
  const { setCurrentView } = useApp()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signup(username, email, password)
  }

  return (
    <div className="min-h-screen bg-[#5865F2] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">USERNAME</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">EMAIL</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">PASSWORD</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-[#5865F2] hover:bg-[#4752C4]">
              Continue
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button onClick={() => setCurrentView("login")} className="text-[#5865F2] hover:underline text-sm">
              Already have an account?
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
