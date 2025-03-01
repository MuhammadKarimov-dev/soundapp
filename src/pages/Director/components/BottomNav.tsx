import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { 
  LayoutDashboard, 
  Film, 
  Users, 
  DollarSign 
} from "lucide-react"

export function BottomNav() {
  const location = useLocation()

  const routes = [
    {
      href: "/director",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-6 w-6" />,
      active: location.pathname === "/director",
    },
    {
      href: "/director/projects",
      label: "Loyihalar",
      icon: <Film className="h-6 w-6" />,
      active: location.pathname === "/director/projects",
    },
    {
      href: "/director/employees",
      label: "Xodimlar",
      icon: <Users className="h-6 w-6" />,
      active: location.pathname === "/director/employees",
    },
    {
      href: "/director/finances",
      label: "Moliya",
      icon: <DollarSign className="h-6 w-6" />,
      active: location.pathname === "/director/finances",
    },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="flex justify-around items-center h-16">
        {routes.map((route) => (
          <Link
            key={route.href}
            to={route.href}
            className={`flex flex-col items-center justify-center flex-1 h-full ${
              route.active 
                ? "text-blue-600" 
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {route.icon}
            <span className="text-xs mt-1">{route.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
} 