import * as React from "react"
import { NavLink } from "react-router-dom"
import { 
  LayoutDashboard, 
  Film, 
  Users, 
  DollarSign 
} from "lucide-react"

export function MainNav() {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <NavLink 
        to="/director" 
        end
        className={({ isActive }) => 
          `flex items-center text-sm font-medium transition-colors hover:text-primary ${
            isActive ? "text-blue-600" : "text-gray-500"
          }`
        }
      >
        <LayoutDashboard className="mr-2 h-4 w-4" />
        Dashboard
      </NavLink>
      
      <NavLink 
        to="/director/projects"
        className={({ isActive }) => 
          `flex items-center text-sm font-medium transition-colors hover:text-primary ${
            isActive ? "text-blue-600" : "text-gray-500"
          }`
        }
      >
        <Film className="mr-2 h-4 w-4" />
        Loyihalar
      </NavLink>
      
      <NavLink 
        to="/director/employees"
        className={({ isActive }) => 
          `flex items-center text-sm font-medium transition-colors hover:text-primary ${
            isActive ? "text-blue-600" : "text-gray-500"
          }`
        }
      >
        <Users className="mr-2 h-4 w-4" />
        Xodimlar
      </NavLink>
      
      <NavLink 
        to="/director/finances"
        className={({ isActive }) => 
          `flex items-center text-sm font-medium transition-colors hover:text-primary ${
            isActive ? "text-blue-600" : "text-gray-500"
          }`
        }
      >
        <DollarSign className="mr-2 h-4 w-4" />
        Moliya
      </NavLink>
    </nav>
  )
} 