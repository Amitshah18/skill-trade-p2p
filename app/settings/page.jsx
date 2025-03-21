"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Bell, Check, Lock, Save, Shield, User } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SettingsPage() {
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  // Profile settings
  const [profileSettings, setProfileSettings] = useState({
    email: "john@example.com",
    username: "johndoe",
    language: "en",
    timezone: "America/New_York",
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    sessionReminders: true,
    marketingEmails: false,
    newMessages: true,
    contractUpdates: true,
  })

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    loginNotifications: true,
  })

  // Password change
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Handle profile settings change
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileSettings({
      ...profileSettings,
      [name]: value,
    })
  }

  // Handle notification settings change
  const handleNotificationChange = (name, value) => {
    setNotificationSettings({
      ...notificationSettings,
      [name]: value,
    })
  }

  // Handle security settings change
  const handleSecurityChange = (name, value) => {
    setSecuritySettings({
      ...securitySettings,
      [name]: typeof value === "string" ? value : value,
    })
  }

  // Handle password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value,
    })
  }

  // Save profile settings
  const handleSaveProfile = async () => {
    setIsSaving(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      setSuccess("Profile settings saved successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (error) {
      setError("Failed to save profile settings. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  // Save notification settings
  const handleSaveNotifications = async () => {
    setIsSaving(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      setSuccess("Notification settings saved successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (error) {
      setError("Failed to save notification settings. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  // Save security settings
  const handleSaveSecurity = async () => {
    setIsSaving(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      setSuccess("Security settings saved successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (error) {
      setError("Failed to save security settings. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  // Change password
  const handleChangePassword = async () => {
    setIsSaving(true)
    setError("")

    // Validate passwords
    if (!passwordData.currentPassword) {
      setError("Please enter your current password")
      setIsSaving(false)
      return
    }

    if (!passwordData.newPassword) {
      setError("Please enter a new password")
      setIsSaving(false)
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match")
      setIsSaving(false)
      return
    }

    if (passwordData.newPassword.length < 8) {
      setError("New password must be at least 8 characters long")
      setIsSaving(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      setSuccess("Password changed successfully!")
      setTimeout(() => setSuccess(""), 3000)

      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      setError("Failed to change password. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="container py-10">
      {success && (
        <Alert className="mb-6 bg-green-900/20 border-green-700/30 text-green-400">
          <Check className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mb-6 bg-red-900/20 border-red-700/30 text-red-400">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white neon-text-blue">Settings</h1>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="cyber-tabs mb-6">
          <TabsTrigger value="profile" className="data-[state=active]:cyber-tab-active">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:cyber-tab-active">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:cyber-tab-active">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-lg text-white">Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileSettings.email}
                    onChange={handleProfileChange}
                    className="cyber-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-300">
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    value={profileSettings.username}
                    onChange={handleProfileChange}
                    className="cyber-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language" className="text-gray-300">
                    Language
                  </Label>
                  <select
                    id="language"
                    name="language"
                    value={profileSettings.language}
                    onChange={handleProfileChange}
                    className="cyber-input w-full"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-gray-300">
                    Timezone
                  </Label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={profileSettings.timezone}
                    onChange={handleProfileChange}
                    className="cyber-input w-full"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                  </select>
                </div>
              </div>

              <Button onClick={handleSaveProfile} disabled={isSaving} className="cyber-button-enhanced">
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-lg text-white">Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-300">Email Notifications</Label>
                    <p className="text-xs text-gray-500">Receive email notifications</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(value) => handleNotificationChange("emailNotifications", value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-300">Session Reminders</Label>
                    <p className="text-xs text-gray-500">Get reminders before your scheduled sessions</p>
                  </div>
                  <Switch
                    checked={notificationSettings.sessionReminders}
                    onCheckedChange={(value) => handleNotificationChange("sessionReminders", value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-300">Marketing Emails</Label>
                    <p className="text-xs text-gray-500">Receive promotional emails and updates</p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(value) => handleNotificationChange("marketingEmails", value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-300">New Messages</Label>
                    <p className="text-xs text-gray-500">Get notified when you receive new messages</p>
                  </div>
                  <Switch
                    checked={notificationSettings.newMessages}
                    onCheckedChange={(value) => handleNotificationChange("newMessages", value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-300">Contract Updates</Label>
                    <p className="text-xs text-gray-500">Get notified about contract status changes</p>
                  </div>
                  <Switch
                    checked={notificationSettings.contractUpdates}
                    onCheckedChange={(value) => handleNotificationChange("contractUpdates", value)}
                  />
                </div>
              </div>

              <Button onClick={handleSaveNotifications} disabled={isSaving} className="cyber-button-enhanced">
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-lg text-white">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-300">Two-Factor Authentication</Label>
                    <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(value) => handleSecurityChange("twoFactorAuth", value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout" className="text-gray-300">
                    Session Timeout (minutes)
                  </Label>
                  <select
                    id="sessionTimeout"
                    name="sessionTimeout"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => handleSecurityChange("sessionTimeout", e.target.value)}
                    className="cyber-input w-full"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                    <option value="240">4 hours</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-300">Login Notifications</Label>
                    <p className="text-xs text-gray-500">Get notified when someone logs into your account</p>
                  </div>
                  <Switch
                    checked={securitySettings.loginNotifications}
                    onCheckedChange={(value) => handleSecurityChange("loginNotifications", value)}
                  />
                </div>
              </div>

              <Button onClick={handleSaveSecurity} disabled={isSaving} className="cyber-button-enhanced">
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-lg text-white">Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-gray-300">
                    Current Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="pl-10 cyber-input"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-gray-300">
                    New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="pl-10 cyber-input"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-300">
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="pl-10 cyber-input"
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleChangePassword} disabled={isSaving} className="cyber-button-enhanced">
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Changing Password...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Change Password
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

