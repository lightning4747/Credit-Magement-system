"use client"

import { Navbar } from "@/components/navbar"
import { AccountLockOverlay } from "@/components/account-lock-overlay"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockStudent } from "@/lib/mock-data"
import { useState } from "react"
import { Bell, Shield, User, LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const [isAccountLocked, setIsAccountLocked] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  })
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLockClick={() => setIsAccountLocked(true)} />
      <AccountLockOverlay isOpen={isAccountLocked} onClose={() => setIsAccountLocked(false)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and security</p>
          </div>

          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <Input value={mockStudent.name} disabled className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Student ID</label>
                  <Input value={mockStudent.studentId} disabled className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input value={mockStudent.email} disabled className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Member Since</label>
                  <Input value={mockStudent.joinDate} disabled className="mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security
              </CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Button variant="outline" className="w-full bg-transparent">
                  Change Password
                </Button>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Two-Factor Authentication</label>
                <Button variant="outline" className="w-full bg-transparent">
                  Enable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label className="text-sm font-medium capitalize">{key} Notifications</label>
                  <button
                    onClick={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        [key]: !prev[key as keyof typeof notifications],
                      }))
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <LogOut className="w-5 h-5" />
                Sign Out
              </CardTitle>
              <CardDescription>End your current session</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleSignOut} variant="destructive" className="w-full">
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
