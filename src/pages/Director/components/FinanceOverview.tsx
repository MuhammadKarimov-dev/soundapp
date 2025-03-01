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
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-6 rounded-lg border bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Umumiy balans</p>
              <h3 className="text-2xl font-bold">$124,500</h3>
            </div>
            <Wallet className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="p-6 rounded-lg border bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Oylik daromad</p>
              <h3 className="text-2xl font-bold text-green-600">+$45,000</h3>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="p-6 rounded-lg border bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Oylik xarajat</p>
              <h3 className="text-2xl font-bold text-red-600">-$15,000</h3>
            </div>
            <TrendingDown className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-white">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">So'nggi tranzaksiyalar</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <DollarSign className={`h-4 w-4 ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
                <div className="ml-3">
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <span className={`font-medium ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 