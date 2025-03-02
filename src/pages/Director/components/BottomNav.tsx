import * as React from "react"
import { NavLink } from "react-router-dom"
import { LayoutDashboard, Film, Users, DollarSign } from "lucide-react"

export function BottomNav() {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/director" },
    { icon: Film, label: "Loyihalar", path: "/director/projects" },
    { icon: Users, label: "Hodimlar", path: "/director/employees" },
    { icon: DollarSign, label: "Moliya", path: "/director/finances" }
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-4 gap-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) => `
              flex flex-col items-center gap-1 py-3
              ${isActive 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }
            `}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
} 