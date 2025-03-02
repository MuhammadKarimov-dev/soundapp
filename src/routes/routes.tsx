import { RouteObject } from "react-router-dom"
import Login from "../pages/auth/Login"
import { DirectorRoutes } from "../pages/Director/routes"
import { Navigate } from "react-router-dom"

// Vaqtinchalik test komponenti
const TestPage = ({ role }: { role: string }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">{role} sahifasi</h1>
    <p>Bu test sahifa. Tez orada to'liq funksionallik qo'shiladi.</p>
  </div>
)

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/director/*",
    element: <DirectorRoutes />
  },
  {
    path: "/rejissor",
    element: <TestPage role="Rejissor" />
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />
  }
] 