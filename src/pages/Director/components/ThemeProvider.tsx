import * as React from "react"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: string
  storageKey?: string
}

export function ThemeProvider({ 
  children, 
  defaultTheme = "light", 
  storageKey = "seezntv-theme" 
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  )

  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  return (
    <div className={theme}>
      {children}
    </div>
  )
} 