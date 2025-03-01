import * as React from "react"
import { NavLink } from "react-router-dom"
import { 
  LayoutDashboard, 
  Film, 
  Mic2,
  Users,
  Calendar
} from "lucide-react"

export function MainNav() {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <NavLink 
        to="/rejissor" 
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
        to="/rejissor/projects"
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
        to="/rejissor/voice-actors"
        className={({ isActive }) => 
          `flex items-center text-sm font-medium transition-colors hover:text-primary ${
            isActive ? "text-blue-600" : "text-gray-500"
          }`
        }
      >
        <Mic2 className="mr-2 h-4 w-4" />
        Ovoz aktyorlari
      </NavLink>

      <NavLink 
        to="/rejissor/schedule"
        className={({ isActive }) => 
          `flex items-center text-sm font-medium transition-colors hover:text-primary ${
            isActive ? "text-blue-600" : "text-gray-500"
          }`
        }
      >
        <Calendar className="mr-2 h-4 w-4" />
        Jadval
      </NavLink>
    </nav>
  )
} 