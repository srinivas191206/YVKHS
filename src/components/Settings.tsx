import React, { useState } from "react"
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Globe, Database, Wifi } from "lucide-react"
import { HealthcareCard } from "./ui/healthcare-card"
import { HealthcareButton } from "./ui/healthcare-button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Separator } from "./ui/separator"
import { Badge } from "./ui/badge"

export function Settings() {
  const [profileData, setProfileData] = useState({
    name: "Dr. Sarah Miller",
    email: "sarah.miller@healthcenter.com",
    role: "Health Center Admin",
    phone: "+1 (555) 123-4567"
  })

  const [notifications, setNotifications] = useState({
    emergencyAlerts: true,
    lowStockAlerts: true,
    patientUpdates: true,
    doctorAvailability: true,
    systemMaintenance: false
  })

  const [systemSettings, setSystemSettings] = useState({
    language: "en",
    timezone: "UTC-5",
    theme: "light",
    autoBackup: true,
    offlineMode: true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <SettingsIcon className="w-8 h-8 text-deep-teal" />
        <div>
          <h1 className="text-3xl font-bold text-deep-teal">Settings</h1>
          <p className="text-muted-foreground">Configure portal preferences and system options</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <HealthcareCard>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-deep-teal/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-deep-teal" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{profileData.name}</h3>
                <p className="text-muted-foreground">{profileData.role}</p>
                <Badge variant="secondary" className="mt-1">Active</Badge>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={profileData.role} onValueChange={(value) => setProfileData({...profileData, role: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Health Center Admin">Health Center Admin</SelectItem>
                      <SelectItem value="Nurse">Nurse</SelectItem>
                      <SelectItem value="Assistant">Assistant</SelectItem>
                      <SelectItem value="Doctor">Doctor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <HealthcareButton variant="caring">Save Changes</HealthcareButton>
              </div>
            </div>
          </HealthcareCard>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <HealthcareCard>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emergency-alerts" className="text-base font-medium">Emergency Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified immediately for emergency situations</p>
                </div>
                <Switch
                  id="emergency-alerts"
                  checked={notifications.emergencyAlerts}
                  onCheckedChange={(checked) => setNotifications({...notifications, emergencyAlerts: checked})}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="stock-alerts" className="text-base font-medium">Low Stock Alerts</Label>
                  <p className="text-sm text-muted-foreground">Notifications when medicine inventory is low</p>
                </div>
                <Switch
                  id="stock-alerts"
                  checked={notifications.lowStockAlerts}
                  onCheckedChange={(checked) => setNotifications({...notifications, lowStockAlerts: checked})}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="patient-updates" className="text-base font-medium">Patient Updates</Label>
                  <p className="text-sm text-muted-foreground">Updates on patient registrations and status changes</p>
                </div>
                <Switch
                  id="patient-updates"
                  checked={notifications.patientUpdates}
                  onCheckedChange={(checked) => setNotifications({...notifications, patientUpdates: checked})}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="doctor-availability" className="text-base font-medium">Doctor Availability</Label>
                  <p className="text-sm text-muted-foreground">Notifications when doctors come online or go offline</p>
                </div>
                <Switch
                  id="doctor-availability"
                  checked={notifications.doctorAvailability}
                  onCheckedChange={(checked) => setNotifications({...notifications, doctorAvailability: checked})}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="system-maintenance" className="text-base font-medium">System Maintenance</Label>
                  <p className="text-sm text-muted-foreground">Updates about scheduled system maintenance</p>
                </div>
                <Switch
                  id="system-maintenance"
                  checked={notifications.systemMaintenance}
                  onCheckedChange={(checked) => setNotifications({...notifications, systemMaintenance: checked})}
                />
              </div>
            </div>
          </HealthcareCard>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <HealthcareCard>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              System Configuration
            </h3>
            
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select value={systemSettings.language} onValueChange={(value) => setSystemSettings({...systemSettings, language: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={systemSettings.timezone} onValueChange={(value) => setSystemSettings({...systemSettings, timezone: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC-5">UTC-5 (Eastern)</SelectItem>
                      <SelectItem value="UTC-6">UTC-6 (Central)</SelectItem>
                      <SelectItem value="UTC-7">UTC-7 (Mountain)</SelectItem>
                      <SelectItem value="UTC-8">UTC-8 (Pacific)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="theme">Theme</Label>
                <Select value={systemSettings.theme} onValueChange={(value) => setSystemSettings({...systemSettings, theme: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5" />
                  <div>
                    <Label className="text-base font-medium">Automatic Backup</Label>
                    <p className="text-sm text-muted-foreground">Daily backup of patient data and settings</p>
                  </div>
                </div>
                <Switch
                  checked={systemSettings.autoBackup}
                  onCheckedChange={(checked) => setSystemSettings({...systemSettings, autoBackup: checked})}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wifi className="w-5 h-5" />
                  <div>
                    <Label className="text-base font-medium">Offline Mode</Label>
                    <p className="text-sm text-muted-foreground">Allow data entry when internet is unavailable</p>
                  </div>
                </div>
                <Switch
                  checked={systemSettings.offlineMode}
                  onCheckedChange={(checked) => setSystemSettings({...systemSettings, offlineMode: checked})}
                />
              </div>
            </div>
          </HealthcareCard>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <HealthcareCard>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Settings
            </h3>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>

              <Separator />

              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Security Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Two-Factor Authentication</span>
                    <Badge variant="destructive">Not Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Password Change</span>
                    <span className="text-sm text-muted-foreground">30 days ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Login Sessions</span>
                    <Badge variant="secondary">2 Active</Badge>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <HealthcareButton variant="caring">Update Password</HealthcareButton>
              </div>
            </div>
          </HealthcareCard>
        </TabsContent>
      </Tabs>
    </div>
  )
}