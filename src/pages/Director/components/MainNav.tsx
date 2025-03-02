import * as React from "react"
import { NavLink } from "react-router-dom"
import { 
  LayoutDashboard, 
  Film, 
  Users, 
  DollarSign 
} from "lucide-react"

export function MainNav() {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/director" },
    { icon: Film, label: "Loyihalar", path: "/director/projects" },
    { icon: Users, label: "Hodimlar", path: "/director/employees" },
    { icon: DollarSign, label: "Moliya", path: "/director/finances" }
  ]

  return (
    <nav className="hidden md:flex gap-6">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end
          className={({ isActive }) => `
            flex items-center gap-2 text-sm font-medium transition-colors
            ${isActive 
              ? 'text-blue-600 dark:text-blue-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }
          `}
        >
          <item.icon className={`h-4 w-4`} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
} 