"use client"

import { createContext, useContext, type ReactNode } from "react"

interface ThemeContextType {
  resolvedTheme: "light"
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeContext.Provider value={{ resolvedTheme: "light" }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
