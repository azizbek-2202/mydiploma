"use client"

import { Button } from "@/components/ui/button"
import { Sun } from "lucide-react"

export function ThemeSwitcher() {
  return (
    <Button variant="ghost" size="icon" className="relative" disabled>
      <Sun className="h-5 w-5 text-foreground" />
      <span className="sr-only">Light mode</span>
    </Button>
  )
}
