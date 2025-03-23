import { Film, Users, DollarSign, TrendingUp, Clock, Calendar } from "lucide-react"
import MonthlyProjects from "./components/graphics/MonthlyProjects"
import Conditions from "./components/graphics/Conditions"
import { GoodEmployees } from "./components/others/GoodEmployees"

export default function Dashboard() {
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
        <GoodEmployees />

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
        <MonthlyProjects />

        {/* Loyihalar holati */}
        <Conditions />
      </div>
    </div>
  )
} 