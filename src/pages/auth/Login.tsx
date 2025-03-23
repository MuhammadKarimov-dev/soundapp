import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MagicCard } from "../../components/magicui/magic-card"

export default function Login() {
  const [username, setUsername] = useState("")
  // const [password, setPassword] = useState("")
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
        <MagicCard gradientSize={200} gradientColor="gray" gradientOpacity={0.8} gradientFrom="#9E7AFF" gradientTo="#FE8BBB" className="">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Tizimga kirish
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Login" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              {/* <div>
                <input type="password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Parol" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div> */}
            </div>

            <div>
              <button className="p-[3px] relative w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                  Kirish
                </div>
              </button>
            </div>
          </form>

          <div className="mt-4 text-sm text-gray-600">
            <p className="font-medium mb-2">Test uchun loginlar:</p>
            <ul className="space-y-1">
              <li>Director: director</li>
              <li>Rejissor: rejissor</li>
            </ul>
          </div>
        </MagicCard>
      </div>
    </div>
  )
}