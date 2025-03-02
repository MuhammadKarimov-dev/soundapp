import * as React from "react"
import { 
  Film, 
  Users, 
  DollarSign, 
  TrendingUp 
} from "lucide-react"
import { ProjectsChart, EmployeeActivityChart } from "./Charts"

const stats = [
  {
    title: "Jami loyihalar",
    value: "45",
    change: "+12% o'tgan oyga nisbatan",
    icon: <Film className="h-6 w-6 text-blue-600" />
  },
  {
    title: "Faol xodimlar",
    value: "28",
    change: "4 ta yangi xodim",
    icon: <Users className="h-6 w-6 text-green-600" />
  },
  {
    title: "Oylik xarajat",
    value: "$45,000",
    change: "+8% o'tgan oyga nisbatan",
    icon: <DollarSign className="h-6 w-6 text-yellow-600" />
  },
  {
    title: "Yillik daromad",
    value: "$540,000",
    change: "+15% o'tgan yilga nisbatan",
    icon: <TrendingUp className="h-6 w-6 text-purple-600" />
  }
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Faol loyihalar</h3>
            <Film className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Hodimlar</h3>
            <Users className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">24</p>
        </div>

        {/* Boshqa statistika kartochkalari */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            So'nggi loyihalar
          </h3>
          {/* Loyihalar ro'yxati */}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Faol hodimlar
          </h3>
          {/* Hodimlar ro'yxati */}
        </div>
      </div>
    </div>
  )
} 