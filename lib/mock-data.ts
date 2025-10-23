export const mockStudent = {
  id: "STU001",
  name: "Alex Johnson",
  email: "alex.johnson@university.edu",
  studentId: "2024001",
  balance: 2450.5,
  credits: 1225,
  joinDate: "2024-01-15",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
}

export const mockTransactions = [
  {
    id: "TXN001",
    type: "credit",
    description: "Tuition Payment",
    amount: 500.0,
    date: "2024-10-20",
    status: "completed",
    category: "tuition",
  },
  {
    id: "TXN002",
    type: "debit",
    description: "Library Fine",
    amount: 25.5,
    date: "2024-10-18",
    status: "completed",
    category: "fine",
  },
  {
    id: "TXN003",
    type: "credit",
    description: "Scholarship Disbursement",
    amount: 1000.0,
    date: "2024-10-15",
    status: "completed",
    category: "scholarship",
  },
  {
    id: "TXN004",
    type: "debit",
    description: "Parking Permit",
    amount: 150.0,
    date: "2024-10-10",
    status: "completed",
    category: "parking",
  },
  {
    id: "TXN005",
    type: "credit",
    description: "Work-Study Payment",
    amount: 200.0,
    date: "2024-10-08",
    status: "completed",
    category: "workstudy",
  },
  {
    id: "TXN006",
    type: "debit",
    description: "Dining Plan Charge",
    amount: 75.0,
    date: "2024-10-05",
    status: "completed",
    category: "dining",
  },
]

export const dashboardStats = {
  totalSpent: 250.5,
  totalEarned: 1700.0,
  pendingTransactions: 2,
  accountHealth: 92,
}
