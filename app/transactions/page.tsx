"use client"

import { Navbar } from "@/components/navbar"
import { AccountLockOverlay } from "@/components/account-lock-overlay"
import { TransactionList } from "@/components/transaction-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockTransactions } from "@/lib/mock-data"
import { useState } from "react"

export default function TransactionsPage() {
  const [isAccountLocked, setIsAccountLocked] = useState(false)

  const totalIncome = mockTransactions.filter((t) => t.type === "credit").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = mockTransactions.filter((t) => t.type === "debit").reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLockClick={() => setIsAccountLocked(true)} />
      <AccountLockOverlay isOpen={isAccountLocked} onClose={() => setIsAccountLocked(false)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Transaction History</h1>
            <p className="text-muted-foreground">View and manage all your account transactions</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(totalIncome - totalExpenses).toFixed(2)}</div>
              </CardContent>
            </Card>
          </div>

          {/* Transactions */}
          <TransactionList />
        </div>
      </main>
    </div>
  )
}
