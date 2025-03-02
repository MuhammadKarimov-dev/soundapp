import * as React from "react"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  CreditCard,
  Wallet
} from "lucide-react"

const transactions = [
  {
    id: 1,
    description: "Loyiha to'lovi - Avengers",
    amount: "+$15,000",
    date: "2024-03-15",
    type: "income"
  },
  // ... boshqa tranzaksiyalar
]

export function FinanceOverview() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Moliya</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Umumiy daromad</h3>
            <DollarSign className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">$12,345</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Oxirgi 30 kun</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Oylik daromad</h3>
            <TrendingUp className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white text-green-600">+$45,000</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Oylik xarajat</h3>
            <TrendingDown className="h-6 w-6 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white text-red-600">-$15,000</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Moliyaviy operatsiyalar
          </h3>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'income' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
                  }`}>
                    <DollarSign className={`h-4 w-4 ${
                      transaction.type === 'income' ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-300'
                    }`} />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900 dark:text-white">{transaction.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</p>
                  </div>
                </div>
                <span className={`font-medium ${
                  transaction.type === 'income' ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-300'
                }`}>
                  {transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 