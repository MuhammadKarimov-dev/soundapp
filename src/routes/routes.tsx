import { RouteObject } from "react-router-dom"
import Login from "../pages/auth/Login"
import PrivateRoute from "../pages/auth/PrivateRoute"
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
    element: <Login />,
  },
  {
    path: "/director/*",
    element: <PrivateRoute element={<DirectorRoutes />} allowedRole="director" />,
  },
  {
    path: "/rejissor",
    element: <PrivateRoute element={<TestPage role="Rejissor" />} allowedRole="rejissor" />,
  },
  {
    path: "/ovoz-aktyori",
    element: <PrivateRoute element={<TestPage role="Ovoz Aktyori" />} allowedRole="ovoz-aktyori" />,
  },
  {
    path: "/sound-rejissor",
    element: <PrivateRoute element={<TestPage role="Ovoz Rejissori" />} allowedRole="sound-rejissor" />,
  },
  {
    path: "/tahrirchi",
    element: <PrivateRoute element={<TestPage role="Tahrirchi" />} allowedRole="tahrirchi" />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
] 