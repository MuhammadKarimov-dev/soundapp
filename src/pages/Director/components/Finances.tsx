import * as React from "react"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

interface Transaction {
  id: number
  description: string
  amount: number
  type: "income" | "expense"
  date: string
  category: string
  status: "completed" | "pending"
}

const transactions: Transaction[] = [
  {
    id: 1,
    description: "Avengers loyihasi uchun to'lov",
    amount: 25000000,
    type: "income",
    date: "2024-03-01",
    category: "Loyiha to'lovi",
    status: "completed"
  },
  {
    id: 2,
    description: "Xodimlar maoshi",
    amount: 15000000,
    type: "expense",
    date: "2024-03-01",
    category: "Maosh",
    status: "completed"
  },
  // ... boshqa tranzaksiyalar
]

export function Finances() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Moliya</h1>
        <p className="text-gray-500">Moliyaviy hisobotlar va statistika</p>
      </div>

      {/* Asosiy statistikalar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Umumiy balans</p>
              <p className="text-2xl font-semibold">250M so'm</p>
              <p className="text-xs text-green-500 mt-1 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +15% o'tgan oyga nisbatan
              </p>
            </div>
            <Wallet className="h-10 w-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Oylik daromad</p>
              <p className="text-2xl font-semibold">85M so'm</p>
              <p className="text-xs text-green-500 mt-1 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +8% o'tgan oyga nisbatan
              </p>
            </div>
            <TrendingUp className="h-10 w-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Oylik xarajat</p>
              <p className="text-2xl font-semibold">45M so'm</p>
              <p className="text-xs text-red-500 mt-1 flex items-center">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                +12% o'tgan oyga nisbatan
              </p>
            </div>
            <TrendingDown className="h-10 w-10 text-red-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">To'lanmagan to'lovlar</p>
              <p className="text-2xl font-semibold">15M so'm</p>
              <p className="text-xs text-yellow-500 mt-1">5 ta loyiha</p>
            </div>
            <CreditCard className="h-10 w-10 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Tranzaksiyalar jadvali */}
      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">So'nggi tranzaksiyalar</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tavsif</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Kategoriya</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Sana</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Summa</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{transaction.category}</td>
                  <td className="px-4 py-3 text-sm">{transaction.date}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-medium ${
                      transaction.type === "income" ? "text-green-600" : "text-red-600"
                    }`}>
                      {transaction.type === "income" ? "+" : "-"}
                      {transaction.amount.toLocaleString()} so'm
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.status === "completed" 
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {transaction.status === "completed" ? "Bajarilgan" : "Kutilmoqda"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 