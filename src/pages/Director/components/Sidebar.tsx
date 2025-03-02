import { NavLink } from "react-router-dom"
import { Film, Users, DollarSign, LayoutDashboard } from "lucide-react"

export function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/director" },
    { icon: Film, label: "Loyihalar", path: "/director/projects" },
    { icon: Users, label: "Hodimlar", path: "/director/employees" },
    { icon: DollarSign, label: "Moliya", path: "/director/finances" }
  ]

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-2 px-4 py-2 rounded-lg
              ${isActive 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
              }
            `}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
} 