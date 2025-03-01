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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="p-6 bg-white rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                {stat.icon}
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Loyihalar statistikasi</h3>
          <ProjectsChart />
        </div>
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Xodimlar faolligi</h3>
          <EmployeeActivityChart />
        </div>
      </div>
    </div>
  )
} 