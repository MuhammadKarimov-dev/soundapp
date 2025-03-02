import React from "react"
import { User, Mail, Calendar, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Profile() {
  const navigate = useNavigate()
  
  const handleLogout = () => {
    // Keyinchalik auth logikasi qo'shiladi
    navigate("/login")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Profil ma'lumotlari
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">F.I.O</p>
              <p className="font-medium text-gray-900 dark:text-white">John Director</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-medium text-gray-900 dark:text-white">director@seezntv.uz</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ro'yxatdan o'tgan sana</p>
              <p className="font-medium text-gray-900 dark:text-white">01.03.2024</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Chiqish</span>
          </button>
        </div>
      </div>
    </div>
  )
} 