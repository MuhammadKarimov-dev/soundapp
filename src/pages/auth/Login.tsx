import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Sun, Moon, Eye } from "lucide-react"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [darkMode, setDarkMode] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === "director") {
      navigate("/director");
    } else if (username === "rejissor") {
      navigate("/rejissor");
    }
  };

  return (
    <div style={{ position: 'relative', backgroundColor: darkMode ? 'rgb(17 24 39)' : 'rgb(0, 0, 0, 0.1)' }} className="min-h-screen flex items-center justify-center bg-gray-50">
      <button style={{ position: 'absolute', top: '30px', right: '30px' }}
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        {darkMode ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </button>
      <div style={{ backgroundColor: darkMode ? 'rgb(31, 41, 55)' : 'rgb(0, 0, 0, 0.1)' }} className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 style={{ color: darkMode ? '#fff' : '#333' }} className="text-center text-3xl font-extrabold text-gray-900">
            Tizimga kirish
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                style={{ backgroundColor: darkMode ? 'rgb(31 41 55' : 'rgb(0, 0, 0, 0.1)', color: darkMode ? '#fff' : '#333' }}
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="relative w-full">
              <input
                style={{ backgroundColor: darkMode ? 'rgb(31 41 55' : 'rgb(0, 0, 0, 0.1)', color: darkMode ? '#fff' : '#333', position: 'relative' }}
                type={showPassword ? 'text' : 'password'}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z 10 focus:ring-1 sm:text-sm"
                placeholder="Parol"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center px-2 focus:outline-none focus:ring-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                 <Eye style={{color: darkMode ? '#fff' : '#333'}} size={20} />
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Kirish
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}