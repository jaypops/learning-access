"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Shield,
  Mic,
  Bell,
  Palette,
  Zap,
  Crown,
  Users,
  MessageSquare,
  Home,
  Smartphone,
  Link,
  Scissors,
  Rocket,
  Gift,
  CreditCard,
} from "lucide-react"
import type { SettingsPage } from "../SettingsModal"
import { cn } from "@/lib/utils"

interface SettingsSidebarProps {
  currentPage: SettingsPage
  setCurrentPage: (page: SettingsPage) => void
}

export function SettingsSidebar({ currentPage, setCurrentPage }: SettingsSidebarProps) {
  const userSettingsPages = [
    {
      id: "my-account" as SettingsPage,
      label: "My Account",
      icon: User,
    },
    {
      id: "profiles" as SettingsPage,
      label: "Profiles",
      icon: Users,
      badge: "NEW",
      badgeColor: "bg-[#5865f2]",
    },
    {
      id: "content-social" as SettingsPage,
      label: "Content & Social",
      icon: MessageSquare,
    },
    {
      id: "privacy-safety" as SettingsPage,
      label: "Privacy & Safety",
      icon: Shield,
    },
    {
      id: "family-center" as SettingsPage,
      label: "Family Center",
      icon: Home,
    },
    {
      id: "authorized-apps" as SettingsPage,
      label: "Authorized Apps",
      icon: Zap,
    },
    {
      id: "devices" as SettingsPage,
      label: "Devices",
      icon: Smartphone,
    },
    {
      id: "connections" as SettingsPage,
      label: "Connections",
      icon: Link,
    },
    {
      id: "clips" as SettingsPage,
      label: "Clips",
      icon: Scissors,
    },
  ]

  const appSettingsPages = [
    {
      id: "voice-video" as SettingsPage,
      label: "Voice & Video",
      icon: Mic,
    },
    {
      id: "notifications" as SettingsPage,
      label: "Notifications",
      icon: Bell,
    },
    {
      id: "appearance-language" as SettingsPage,
      label: "Appearance",
      icon: Palette,
    },
  ]

  const billingSettingsPages = [
    {
      id: "nitro" as SettingsPage,
      label: "Nitro",
      icon: Crown,
      badge: "◆",
      badgeColor: "bg-transparent text-[#f47fff]",
    },
    {
      id: "server-boost" as SettingsPage,
      label: "Server Boost",
      icon: Rocket,
    },
    {
      id: "subscriptions" as SettingsPage,
      label: "Subscriptions",
      icon: CreditCard,
    },
    {
      id: "gift-inventory" as SettingsPage,
      label: "Gift Inventory",
      icon: Gift,
      badge: "1",
      badgeColor: "bg-[#f23f42]",
    },
    {
      id: "billing" as SettingsPage,
      label: "Billing",
      icon: CreditCard,
    },
  ]

  const renderMenuItem = (page: any) => {
    const Icon = page.icon
    const isActive = currentPage === page.id

    return (
      <Button
        key={page.id}
        variant="ghost"
        className={cn(
          "w-full justify-start text-[#b5bac1] hover:text-[#dbdee1] hover:bg-[#404249] h-8 px-2 text-sm font-medium rounded-[4px] relative",
          isActive && "bg-[#404249] text-[#dbdee1]",
        )}
        onClick={() => setCurrentPage(page.id)}
      >
        <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="truncate">{page.label}</span>
        {page.badge && (
          <Badge className={cn("ml-auto text-[10px] font-bold px-1 h-4 rounded-[8px] border-none", page.badgeColor)}>
            {page.badge}
          </Badge>
        )}
      </Button>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto px-[20px] pb-[20px] space-y-[8px]">
      {/* User Settings */}
      <div className="space-y-[2px]">
        <h3 className="text-[11px] font-semibold text-[#87898c] uppercase tracking-wide mb-[8px] px-2">
          User Settings
        </h3>
        <div className="space-y-[2px]">{userSettingsPages.map(renderMenuItem)}</div>
      </div>

      {/* App Settings */}
      <div className="space-y-[2px] pt-[8px]">
        <h3 className="text-[11px] font-semibold text-[#87898c] uppercase tracking-wide mb-[8px] px-2">App Settings</h3>
        <div className="space-y-[2px]">{appSettingsPages.map(renderMenuItem)}</div>
      </div>

      {/* Billing Settings */}
      <div className="space-y-[2px] pt-[8px]">
        <h3 className="text-[11px] font-semibold text-[#87898c] uppercase tracking-wide mb-[8px] px-2">
          Billing Settings
        </h3>
        <div className="space-y-[2px]">{billingSettingsPages.map(renderMenuItem)}</div>
      </div>
    </div>
  )
}
