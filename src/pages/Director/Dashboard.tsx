import * as React from "react"
import { 
  Film, 
  Users, 
  DollarSign, 
  TrendingUp,
  Award,
  Clock,
  Calendar,
  Star
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts'

interface TopEmployee {
  id: number
  fullName: string
  position: string
  completedProjects: number
  rating: number
  avatar?: string
}

interface MonthlyData {
  name: string
  loyihalar: number
  daromad: number
}

const monthlyData: MonthlyData[] = [
  { name: "Yanvar", loyihalar: 4, daromad: 120 },
  { name: "Fevral", loyihalar: 6, daromad: 150 },
  { name: "Mart", loyihalar: 8, daromad: 180 },
  { name: "April", loyihalar: 7, daromad: 190 },
  { name: "May", loyihalar: 9, daromad: 220 },
  { name: "Iyun", loyihalar: 11, daromad: 250 }
]

const projectStatusData = [
  { name: 'Yangi', value: 5 },
  { name: 'Jarayonda', value: 12 },
  { name: 'Yakunlangan', value: 8 },
  { name: 'To\'xtatilgan', value: 2 }
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function Dashboard() {
  const topEmployees: TopEmployee[] = [
    {
      id: 1,
      fullName: "Alisher Zokirov",
      position: "Ovoz aktyori",
      completedProjects: 15,
      rating: 4.8
    },
    {
      id: 2,
      fullName: "Jamshid Alimov",
      position: "Sound rejissor",
      completedProjects: 12,
      rating: 4.7
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Umumiy statistika va ma'lumotlar</p>
      </div>

      {/* Asosiy statistikalar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Faol loyihalar</p>
              <p className="text-2xl font-semibold">12</p>
              <p className="text-xs text-green-500 mt-1">+2 o'tgan oyga nisbatan</p>
            </div>
            <Film className="h-10 w-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Jami xodimlar</p>
              <p className="text-2xl font-semibold">45</p>
              <p className="text-xs text-green-500 mt-1">+3 yangi xodim</p>
            </div>
            <Users className="h-10 w-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Oylik byudjet</p>
              <p className="text-2xl font-semibold">125M</p>
              <p className="text-xs text-red-500 mt-1">-5% o'tgan oyga nisbatan</p>
            </div>
            <DollarSign className="h-10 w-10 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Yakunlangan loyihalar</p>
              <p className="text-2xl font-semibold">85</p>
              <p className="text-xs text-green-500 mt-1">98% mijozlar mamnun</p>
            </div>
            <TrendingUp className="h-10 w-10 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Eng yaxshi xodimlar */}
        <div className="bg-white rounded-lg border">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium flex items-center">
              <Award className="h-5 w-5 text-yellow-500 mr-2" />
              Eng yaxshi xodimlar
            </h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {topEmployees.map(employee => (
                <div key={employee.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      {employee.avatar ? (
                        <img 
                          src={employee.avatar} 
                          alt={employee.fullName}
                          className="h-10 w-10 rounded-full"
                        />
                      ) : (
                        <span className="font-medium text-blue-800">
                          {employee.fullName.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{employee.fullName}</p>
                      <p className="text-sm text-gray-500">{employee.position}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 font-medium">{employee.rating}</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {employee.completedProjects} loyiha
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Yaqinlashayotgan muddatlar */}
        <div className="bg-white rounded-lg border">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium flex items-center">
              <Calendar className="h-5 w-5 text-red-500 mr-2" />
              Yaqinlashayotgan muddatlar
            </h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium">Avengers: Endgame</p>
                  <p className="text-sm text-gray-500">3 kun qoldi</p>
                </div>
                <Clock className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grafiklar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Oylik loyihalar va daromad grafigi */}
        <div className="bg-white rounded-lg border p-4">
          <h2 className="text-lg font-medium mb-4">Oylik statistika</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="loyihalar"
                  stroke="#8884d8"
                  fill="#8884d8"
                  name="Loyihalar"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="daromad"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  name="Daromad (mln)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Loyihalar holati */}
        <div className="bg-white rounded-lg border p-4">
          <h2 className="text-lg font-medium mb-4">Loyihalar holati</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
} 