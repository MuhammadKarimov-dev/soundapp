import { User } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function UserNav() {
  const navigate = useNavigate()

  return (
    <div 
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => navigate("/director/profile")}
    >
      <div className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
        <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        <span className="text-sm text-gray-700 dark:text-gray-300 hidden md:block">
          John Director
        </span>
      </div>
    </div>
  )
} 