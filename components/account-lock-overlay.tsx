"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock } from "lucide-react"

interface AccountLockOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function AccountLockOverlay({ isOpen, onClose }: AccountLockOverlayProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleUnlock = async () => {
    setError("")
    setIsLoading(true)

    // Simulate password verification (demo only)
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (password === "demo123") {
      setPassword("")
      setIsLoading(false)
      onClose()
    } else {
      setError("Incorrect password. Try 'demo123'")
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && password) {
      handleUnlock()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md mx-4 bg-card rounded-lg shadow-lg p-8 space-y-6">
        {/* Lock Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-destructive" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Account Locked</h2>
          <p className="text-muted-foreground">Enter your password to unlock your account</p>
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError("")
            }}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="text-center"
          />
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          <p className="text-xs text-muted-foreground text-center">Demo password: demo123</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setPassword("")
              setError("")
            }}
            disabled={isLoading}
            className="flex-1"
          >
            Clear
          </Button>
          <Button onClick={handleUnlock} disabled={!password || isLoading} className="flex-1">
            {isLoading ? "Unlocking..." : "Unlock"}
          </Button>
        </div>
      </div>
    </div>
  )
}
