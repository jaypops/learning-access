"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { useApp } from "../../context/AppContext"

export function MyAccountSettings() {
  //setUserSettings was removed
  const { userSettings } = useApp()
  const [activeTab, setActiveTab] = useState("security")

  return (
    <div className="max-w-[740px] mx-auto p-[40px]">
      {/* Tab Navigation */}
      <div className="flex space-x-[32px] mb-[20px] border-b border-[#1e1f22]">
        <button
          onClick={() => setActiveTab("security")}
          className={`pb-[16px] text-[16px] font-medium border-b-2 transition-colors ${
            activeTab === "security"
              ? "text-[#00a8fc] border-[#00a8fc]"
              : "text-[#b5bac1] border-transparent hover:text-[#dbdee1]"
          }`}
        >
          Security
        </button>
        <button
          onClick={() => setActiveTab("standing")}
          className={`pb-[16px] text-[16px] font-medium border-b-2 transition-colors ${
            activeTab === "standing"
              ? "text-[#00a8fc] border-[#00a8fc]"
              : "text-[#b5bac1] border-transparent hover:text-[#dbdee1]"
          }`}
        >
          Standing
        </button>
      </div>

      {activeTab === "security" && (
        <div className="space-y-[20px]">
          {/* Profile Card */}
          <div className="bg-[#5865f2] rounded-[8px] p-[16px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#5865f2] to-[#3c45a5] opacity-90" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-[16px]">
                <div className="relative">
                  <div className="w-[80px] h-[80px] rounded-full bg-[#313338] flex items-center justify-center text-[32px] font-bold text-white">
                    {userSettings.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-[2px] -right-[2px] w-[24px] h-[24px] bg-[#23a55a] rounded-full border-[4px] border-[#5865f2]" />
                </div>
                <div>
                  <div className="flex items-center space-x-[8px]">
                    <span className="text-[20px] font-semibold text-white">{userSettings.username}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white/80 hover:text-white hover:bg-white/10 w-6 h-6"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <Button className="bg-white text-[#5865f2] hover:bg-gray-100 font-medium">Edit User Profile</Button>
            </div>
          </div>

          {/* Account Information */}
          <div className="space-y-[20px]">
            {/* Display Name */}
            <div className="flex items-center justify-between py-[16px] border-b border-[#1e1f22]">
              <div>
                <div className="text-[14px] font-medium text-[#f2f3f5] mb-[4px]">Display Name</div>
                <div className="text-[16px] text-[#b5bac1]">{userSettings.username}</div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-[#4e5058] border-[#6d6f78] text-[#f2f3f5] hover:bg-[#5c5e66] h-[32px] px-[16px]"
              >
                Edit
              </Button>
            </div>

            {/* Username */}
            <div className="flex items-center justify-between py-[16px] border-b border-[#1e1f22]">
              <div>
                <div className="text-[14px] font-medium text-[#f2f3f5] mb-[4px]">Username</div>
                <div className="text-[16px] text-[#b5bac1]">{userSettings.username}</div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-[#4e5058] border-[#6d6f78] text-[#f2f3f5] hover:bg-[#5c5e66] h-[32px] px-[16px]"
              >
                Edit
              </Button>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between py-[16px] border-b border-[#1e1f22]">
              <div>
                <div className="text-[14px] font-medium text-[#f2f3f5] mb-[4px]">Email</div>
                <div className="text-[16px] text-[#b5bac1] flex items-center space-x-[8px]">
                  <span>••••••••••••@gmail.com</span>
                  <button className="text-[#00a8fc] text-[14px] font-medium hover:underline">Reveal</button>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-[#4e5058] border-[#6d6f78] text-[#f2f3f5] hover:bg-[#5c5e66] h-[32px] px-[16px]"
              >
                Edit
              </Button>
            </div>

            {/* Phone Number */}
            <div className="flex items-center justify-between py-[16px] border-b border-[#1e1f22]">
              <div>
                <div className="text-[14px] font-medium text-[#f2f3f5] mb-[4px]">Phone Number</div>
                <div className="text-[16px] text-[#b5bac1] flex items-center space-x-[8px]">
                  <span>••••••••••5469</span>
                  <button className="text-[#00a8fc] text-[14px] font-medium hover:underline">Reveal</button>
                </div>
              </div>
              <div className="flex items-center space-x-[8px]">
                <button className="text-[#f23f42] text-[14px] font-medium hover:underline">Remove</button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-[#4e5058] border-[#6d6f78] text-[#f2f3f5] hover:bg-[#5c5e66] h-[32px] px-[16px]"
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>

          {/* Password and Authentication Section */}
          <div className="mt-[40px]">
            <h2 className="text-[20px] font-semibold text-[#f2f3f5] mb-[20px]">Password and Authentication</h2>

            {/* Multi-Factor Authentication Status */}
            <div className="flex items-center space-x-[8px] mb-[16px]">
              <div className="w-[16px] h-[16px] bg-[#23a55a] rounded-full flex items-center justify-center">
                <svg className="w-[10px] h-[10px] text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-[16px] font-medium text-[#23a55a]">Multi-Factor Authentication Enabled</span>
            </div>

            <Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white mb-[32px]">Change Password</Button>

            {/* Authenticator App */}
            <div className="mb-[32px]">
              <h3 className="text-[16px] font-semibold text-[#f2f3f5] mb-[8px]">Authenticator App</h3>
              <p className="text-[14px] text-[#b5bac1] mb-[16px] leading-[20px]">
                Configuring an authenticator app is a good way to add an extra layer of security to your Discord account
                to make sure that only you have the ability to log in.
              </p>
              <div className="flex items-center space-x-[12px]">
                <Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white">View Backup Codes</Button>
                <Button
                  variant="outline"
                  className="border-[#f23f42] text-[#f23f42] hover:bg-[#f23f42] hover:text-white"
                >
                  Remove Authenticator App
                </Button>
              </div>
            </div>

            {/* SMS Backup Authentication */}
            <div className="mb-[32px]">
              <h3 className="text-[16px] font-semibold text-[#f2f3f5] mb-[8px]">SMS Backup Authentication</h3>
              <p className="text-[14px] text-[#b5bac1] mb-[8px] leading-[20px]">
                Add your phone as a backup MFA method in case you lose access to your authenticator app or backup codes.
              </p>
              <div className="text-[14px] text-[#b5bac1] mb-[16px]">
                Your current phone number is: <span className="text-[#f2f3f5]">••••••••••5469</span>{" "}
                <button className="text-[#00a8fc] hover:underline">Reveal</button>
              </div>
              <Button variant="outline" className="border-[#f23f42] text-[#f23f42] hover:bg-[#f23f42] hover:text-white">
                Remove SMS Authentication
              </Button>
            </div>

            {/* Security Keys */}
            <div className="mb-[32px]">
              <h3 className="text-[16px] font-semibold text-[#f2f3f5] mb-[8px]">Security Keys</h3>
              <p className="text-[14px] text-[#b5bac1] mb-[16px] leading-[20px]">
                Add an additional layer of protection to your account with a Security Key.
              </p>
              <Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white">Register a Security Key</Button>
            </div>

            {/* Account Removal */}
            <div className="pt-[20px] border-t border-[#1e1f22]">
              <h3 className="text-[16px] font-semibold text-[#f2f3f5] mb-[8px]">Account Removal</h3>
              <p className="text-[14px] text-[#b5bac1] leading-[20px]">
                Disabling your account means you can recover it at any time after taking this action.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "standing" && (
        <div className="text-center py-[40px]">
          <div className="text-[#b5bac1] text-[16px]">Standing information would go here</div>
        </div>
      )}
    </div>
  )
}
