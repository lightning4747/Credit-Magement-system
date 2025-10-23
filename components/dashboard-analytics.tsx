"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { dashboardStats, mockStudent } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Wallet, AlertCircle } from "lucide-react"

const monthlyData = [
  { month: "Aug", income: 200, expenses: 150 },
  { month: "Sep", income: 300, expenses: 200 },
  { month: "Oct", income: 400, expenses: 250 },
  { month: "Nov", income: 350, expenses: 280 },
]

const categoryData = [
  { name: "Tuition", value: 500, fill: "hsl(var(--chart-1))" },
  { name: "Dining", value: 75, fill: "hsl(var(--chart-2))" },
  { name: "Parking", value: 150, fill: "hsl(var(--chart-3))" },
  { name: "Other", value: 25, fill: "hsl(var(--chart-4))" },
]

export function DashboardAnalytics() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Welcome back, {mockStudent.name}!</h1>
        <p className="text-muted-foreground">Here's your financial overview for this semester</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Balance Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockStudent.balance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">{mockStudent.credits} credits available</p>
          </CardContent>
        </Card>

        {/* Total Earned */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              Total Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${dashboardStats.totalEarned.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">This semester</p>
          </CardContent>
        </Card>

        {/* Total Spent */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-red-600" />
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${dashboardStats.totalSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">This semester</p>
          </CardContent>
        </Card>

        {/* Account Health */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Account Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.accountHealth}%</div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: `${dashboardStats.accountHealth}%` }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses */}
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
            <CardDescription>Monthly comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="hsl(var(--chart-1))" />
                <Bar dataKey="expenses" fill="hsl(var(--chart-2))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Spending by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>Distribution of expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Balance Trend</CardTitle>
          <CardDescription>Your account balance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="hsl(var(--chart-1))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Alert */}
      {dashboardStats.pendingTransactions > 0 && (
        <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              Pending Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              You have {dashboardStats.pendingTransactions} pending transaction
              {dashboardStats.pendingTransactions !== 1 ? "s" : ""} that may take 1-2 business days to process.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
