import { Bell, User } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <span className="text-2xl font-bold text-blue-600">SoundOn</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Bell className="h-6 w-6" />
            </button>
            <button 
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 p-2 text-gray-500 hover:text-gray-700"
            >
              <User className="h-6 w-6" />
              <span>Chiqish</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 