import React from "react"
import { Outlet } from "react-router-dom"
import { MainNav } from "./components/MainNav"
import { UserNav } from "./components/UserNav"
import { BottomNav } from "./components/BottomNav"
import { ThemeProvider } from "../../components/ThemeProvider"
import { ThemeToggle } from "./components/ThemeToggle"

export default function DirectorLayout() {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
        <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Seezntv</h1>
              <MainNav />
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <UserNav />
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-8 mb-16 md:mb-8">
          <Outlet />
        </main>

        <BottomNav />
      </div>
    </ThemeProvider>
  )
} 