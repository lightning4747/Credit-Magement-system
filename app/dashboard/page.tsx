"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { AccountLockOverlay } from "@/components/account-lock-overlay"
import { DashboardAnalytics } from "@/components/dashboard-analytics"
import { TransactionList } from "@/components/transaction-list"

export default function Dashboard() {
  const [isAccountLocked, setIsAccountLocked] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLockClick={() => setIsAccountLocked(true)} />
      <AccountLockOverlay isOpen={isAccountLocked} onClose={() => setIsAccountLocked(false)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardAnalytics />

        <div className="mt-8">
          <TransactionList />
        </div>
      </main>
    </div>
  )
}
