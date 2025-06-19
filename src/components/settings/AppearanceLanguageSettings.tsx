"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Palette, Sun, Moon, Monitor, Type, Globe } from "lucide-react"
import { useApp } from "../../context/AppContext"
// import { useTheme } from "../../context/ThemeContext"

export function AppearanceLanguageSettings() {
  const { userSettings, setUserSettings } = useApp()
  // const { theme, toggleTheme } = useTheme()

  const handleSettingChange = (key: keyof typeof userSettings, value: any) => {
    setUserSettings({ ...userSettings, [key]: value })
  }

  const handleFontSizeChange = (value: number[]) => {
    setUserSettings({ ...userSettings, fontSize: value[0] })
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Appearance</h2>
        <p className="text-gray-400">Customize how Discord looks and feels.</p>
      </div>

      {/* Theme */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="w-5 h-5" />
            <span>Theme</span>
          </CardTitle>
          <CardDescription>Choose between light and dark themes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                userSettings.theme === "light" ? "border-[#5865F2]" : "border-gray-600"
              }`}
              onClick={() => handleSettingChange("theme", "light")}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-8 bg-white rounded border border-gray-300 flex items-center justify-center">
                  <Sun className="w-4 h-4 text-gray-800" />
                </div>
                <span className="text-sm font-medium">Light</span>
              </div>
            </div>

            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                userSettings.theme === "dark" ? "border-[#5865F2]" : "border-gray-600"
              }`}
              onClick={() => handleSettingChange("theme", "dark")}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-8 bg-gray-800 rounded border border-gray-600 flex items-center justify-center">
                  <Moon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">Dark</span>
              </div>
            </div>

            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                userSettings.theme === "auto" ? "border-[#5865F2]" : "border-gray-600"
              }`}
              onClick={() => handleSettingChange("theme", "auto")}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-8 bg-gradient-to-r from-white to-gray-800 rounded border border-gray-600 flex items-center justify-center">
                  <Monitor className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium">Auto</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Font & Display */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Type className="w-5 h-5" />
            <span>Font & Display</span>
          </CardTitle>
          <CardDescription>Adjust text size and display preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">Font Size</label>
              <span className="text-sm text-gray-400">{userSettings.fontSize}px</span>
            </div>
            <Slider
              value={[userSettings.fontSize]}
              onValueChange={handleFontSizeChange}
              min={12}
              max={20}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Small</span>
              <span>Medium</span>
              <span>Large</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Compact Mode</h4>
              <p className="text-sm text-gray-400">Show more messages on screen by reducing spacing</p>
            </div>
            <Switch
              checked={userSettings.compactMode}
              onCheckedChange={(checked) => handleSettingChange("compactMode", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Show Timestamps</h4>
              <p className="text-sm text-gray-400">Display message timestamps</p>
            </div>
            <Switch
              checked={userSettings.showTimestamps}
              onCheckedChange={(checked) => handleSettingChange("showTimestamps", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Language & Region</span>
          </CardTitle>
          <CardDescription>Set your language and regional preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Language</label>
            <Select value={userSettings.language} onValueChange={(value) => handleSettingChange("language", value)}>
              <SelectTrigger className="bg-gray-800 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="English (US)">English (US)</SelectItem>
                <SelectItem value="English (UK)">English (UK)</SelectItem>
                <SelectItem value="Español">Español</SelectItem>
                <SelectItem value="Français">Français</SelectItem>
                <SelectItem value="Deutsch">Deutsch</SelectItem>
                <SelectItem value="Italiano">Italiano</SelectItem>
                <SelectItem value="Português">Português</SelectItem>
                <SelectItem value="日本語">日本語</SelectItem>
                <SelectItem value="한국어">한국어</SelectItem>
                <SelectItem value="中文">中文</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Date Format</label>
            <Select defaultValue="MM/DD/YYYY">
              <SelectTrigger className="bg-gray-800 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                <SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Time Format</label>
            <Select defaultValue="12-hour">
              <SelectTrigger className="bg-gray-800 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="12-hour">12-hour (AM/PM)</SelectItem>
                <SelectItem value="24-hour">24-hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle>Accessibility</CardTitle>
          <CardDescription>Features to improve accessibility and usability.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Reduced Motion</h4>
              <p className="text-sm text-gray-400">Reduce animations and motion effects</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">High Contrast</h4>
              <p className="text-sm text-gray-400">Increase contrast for better visibility</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Screen Reader Support</h4>
              <p className="text-sm text-gray-400">Enable enhanced screen reader compatibility</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>See how your settings affect the appearance.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-gray-800 rounded border border-gray-600">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                U
              </div>
              <div>
                <div className="font-medium" style={{ fontSize: `${userSettings.fontSize}px` }}>
                  Username
                </div>
                {userSettings.showTimestamps && <div className="text-xs text-gray-400">Today at 12:34 PM</div>}
              </div>
            </div>
            <div
              className={`text-gray-300 ${userSettings.compactMode ? "leading-tight" : "leading-relaxed"}`}
              style={{ fontSize: `${userSettings.fontSize}px` }}
            >
              This is a preview of how messages will appear with your current settings.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
