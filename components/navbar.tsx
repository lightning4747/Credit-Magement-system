"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "@/hooks/use-theme"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Lock, Menu, X, LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface NavbarProps {
  onLockClick: () => void
}

export function Navbar({ onLockClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              CC
            </div>
            <span className="hidden sm:inline">CampusCred</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/transactions" className="text-sm font-medium hover:text-primary transition-colors">
              Transactions
            </Link>
            <Link href="/settings" className="text-sm font-medium hover:text-primary transition-colors">
              Settings
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            {/* Lock Account */}
            <Button variant="ghost" size="icon" onClick={onLockClick} className="rounded-full" title="Lock account">
              <Lock className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon" onClick={handleSignOut} className="rounded-full" title="Sign out">
              <LogOut className="w-5 h-5" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-full"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md">
              Dashboard
            </Link>
            <Link href="/transactions" className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md">
              Transactions
            </Link>
            <Link href="/settings" className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md">
              Settings
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-muted rounded-md flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
