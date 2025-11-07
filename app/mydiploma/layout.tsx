"use client"

import { AuthProvider } from "@/contexts/auth-context"
import { AuthGuard } from "@/components/auth-guard"
import type { ReactNode } from "react"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const AdminHeader = () => {
    return (
      <header className="bg-blue-500 text-white p-4">
        <h1>Admin Panel</h1>
      </header>
    )
  }

  return (
    <AuthProvider>
      <AuthGuard>
        <div className="w-full">
          <AdminHeader />
          {children}
        </div>
      </AuthGuard>
    </AuthProvider>
  )
}
