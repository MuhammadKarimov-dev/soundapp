import * as React from "react"
import { Outlet } from "react-router-dom"
import { ThemeProvider } from "../../components/ThemeProvider"
import { MainNav } from "./components/MainNav"
import { UserNav } from "./components/UserNav"
import { BottomNav } from "./components/BottomNav"

export default function DirectorLayout() {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 bg-white shadow-lg">
          <div className="container mx-auto px-4 flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-bold">Seezntv</h1>
              <MainNav />
            </div>
            <UserNav />
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