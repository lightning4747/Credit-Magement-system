"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockTransactions } from "@/lib/mock-data"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

export function TransactionList() {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      tuition: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      fine: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      scholarship: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      parking: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      workstudy: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      dining: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
    }
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest account activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === "credit"
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-red-100 dark:bg-red-900/30"
                  }`}
                >
                  {transaction.type === "credit" ? (
                    <ArrowDownLeft className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{transaction.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(transaction.category)}`}>
                      {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    transaction.type === "credit"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {transaction.type === "credit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground capitalize">{transaction.status}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
