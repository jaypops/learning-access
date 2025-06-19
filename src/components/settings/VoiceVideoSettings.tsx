"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Mic, Volume2, Video, Settings, TestTube } from "lucide-react"
import { useApp } from "../../context/AppContext"

export function VoiceVideoSettings() {
  const { userSettings, setUserSettings } = useApp()

  const handleSettingChange = (key: keyof typeof userSettings, value: any) => {
    setUserSettings({ ...userSettings, [key]: value })
  }

  const handleVolumeChange = (key: keyof typeof userSettings, value: number[]) => {
    setUserSettings({ ...userSettings, [key]: value[0] })
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Voice & Video</h2>
        <p className="text-gray-400">Configure your audio and video devices and settings.</p>
      </div>

      {/* Input Device */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mic className="w-5 h-5" />
            <span>Input Device</span>
          </CardTitle>
          <CardDescription>Choose your microphone and configure input settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Microphone</label>
            <Select
              value={userSettings.inputDevice}
              onValueChange={(value) => handleSettingChange("inputDevice", value)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="Default - Microphone (Realtek Audio)">
                  Default - Microphone (Realtek Audio)
                </SelectItem>
                <SelectItem value="USB Microphone">USB Microphone</SelectItem>
                <SelectItem value="Bluetooth Headset">Bluetooth Headset</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">Input Volume</label>
              <span className="text-sm text-gray-400">{userSettings.inputVolume}%</span>
            </div>
            <Slider
              value={[userSettings.inputVolume]}
              onValueChange={(value) => handleVolumeChange("inputVolume", value)}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">Input Sensitivity</label>
              <span className="text-sm text-gray-400">{userSettings.inputSensitivity}%</span>
            </div>
            <Slider
              value={[userSettings.inputSensitivity]}
              onValueChange={(value) => handleVolumeChange("inputSensitivity", value)}
              max={100}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-gray-500">Adjust how sensitive your microphone is to sound</p>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <TestTube className="w-4 h-4 mr-2" />
              Test Microphone
            </Button>
            <Button variant="outline" size="sm">
              Let's Check
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Output Device */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5" />
            <span>Output Device</span>
          </CardTitle>
          <CardDescription>Choose your speakers or headphones and configure output settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Speakers</label>
            <Select
              value={userSettings.outputDevice}
              onValueChange={(value) => handleSettingChange("outputDevice", value)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="Default - Speakers (Realtek Audio)">Default - Speakers (Realtek Audio)</SelectItem>
                <SelectItem value="Bluetooth Headphones">Bluetooth Headphones</SelectItem>
                <SelectItem value="USB Headset">USB Headset</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">Output Volume</label>
              <span className="text-sm text-gray-400">{userSettings.outputVolume}%</span>
            </div>
            <Slider
              value={[userSettings.outputVolume]}
              onValueChange={(value) => handleVolumeChange("outputVolume", value)}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          <Button variant="outline" size="sm">
            <TestTube className="w-4 h-4 mr-2" />
            Test Audio
          </Button>
        </CardContent>
      </Card>

      {/* Camera */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Video className="w-5 h-5" />
            <span>Camera</span>
          </CardTitle>
          <CardDescription>Configure your camera settings for video calls.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Camera Device</label>
            <Select
              value={userSettings.cameraDevice}
              onValueChange={(value) => handleSettingChange("cameraDevice", value)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="Default - Webcam (USB Camera)">Default - Webcam (USB Camera)</SelectItem>
                <SelectItem value="Integrated Camera">Integrated Camera</SelectItem>
                <SelectItem value="External USB Camera">External USB Camera</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="sm">
            <TestTube className="w-4 h-4 mr-2" />
            Test Camera
          </Button>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Advanced Settings</span>
          </CardTitle>
          <CardDescription>Fine-tune your audio processing settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Echo Cancellation</h4>
              <p className="text-sm text-gray-400">Reduce echo from your speakers</p>
            </div>
            <Switch
              checked={userSettings.echoCancellation}
              onCheckedChange={(checked) => handleSettingChange("echoCancellation", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Noise Suppression</h4>
              <p className="text-sm text-gray-400">Filter out background noise</p>
            </div>
            <Switch
              checked={userSettings.noiseSuppression}
              onCheckedChange={(checked) => handleSettingChange("noiseSuppression", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Automatic Gain Control</h4>
              <p className="text-sm text-gray-400">Automatically adjust microphone volume</p>
            </div>
            <Switch
              checked={userSettings.automaticGainControl}
              onCheckedChange={(checked) => handleSettingChange("automaticGainControl", checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
