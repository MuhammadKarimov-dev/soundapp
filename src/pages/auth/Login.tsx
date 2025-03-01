import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { authService } from "../../services/api.service"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  // Component mount bo'lganda tekshirish
  useEffect(() => {
    // Agar foydalanuvchi autentifikatsiya qilingan bo'lsa va login sahifada bo'lsa
    if (authService.isAuthenticated() && location.pathname === '/login') {
      const userRole = authService.getRole();
      if (userRole) {
        navigate(`/${userRole}`, { replace: true });
      } else {
        // Agar rol topilmasa, logout qilamiz
        authService.logout();
      }
    }
  }, [navigate, location.pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const success = authService.login(username, password)
      
      if (success) {
        const user = authService.getCurrentUser()
        console.log("Logged in user:", user) // Debug uchun

        if (user?.role) {
          const path = `/${user.role}`
          console.log("Navigating to:", path) // Debug uchun
          navigate(path)
        }
      } else {
        setError("Login yoki parol noto'g'ri")
      }
    } catch (error) {
      console.error("Login error:", error) // Debug uchun
      setError("Tizimga kirishda xatolik yuz berdi")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Tizimga kirish
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Login
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Parol
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Parol"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Kirish
            </button>
          </div>
        </form>

        {/* Test uchun login ma'lumotlari */}
        <div className="mt-4 text-sm text-gray-600">
          <p className="font-medium mb-2">Test uchun login/parollar:</p>
          <ul className="space-y-1">
            <li>Director: director / 123</li>
            <li>Rejissor: rejissor / 123</li>
            <li>Ovoz aktyori: ovoz-aktyori / 123</li>
            <li>Ovoz rejissori: sound-rejissor / 123</li>
            <li>Tahrirchi: tahrirchi / 123</li>
          </ul>
        </div>
      </div>
    </div>
  )
}