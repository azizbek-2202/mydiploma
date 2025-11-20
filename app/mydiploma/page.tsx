"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { LogOut, BookOpen, Layers } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 -my-16">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mydiploma Admin
            </h1>
            <p className="text-gray-600 text-sm mt-1">Logged in as {user}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 max-w-2xl"
        >
          {/* Programs Card */}
          <motion.div whileHover={{ y: -8, scale: 1.02 }} className="group">
            <Link href="/mydiploma/programs">
              <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white shadow-xl cursor-pointer border border-blue-400/30 hover:border-blue-400 transition-all">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Layers className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Programs</h2>
                <p className="text-blue-100 mb-6">Manage study abroad programs and universities</p>
                <div className="inline-block px-4 py-2 bg-white/20 rounded-lg text-sm font-semibold group-hover:bg-white/30 transition-all">
                  Manage Programs →
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Blog Card */}
          <motion.div whileHover={{ y: -8, scale: 1.02 }} className="group">
            <Link href="/mydiploma/blog">
              <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white shadow-xl cursor-pointer border border-purple-400/30 hover:border-purple-400 transition-all">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Blog</h2>
                <p className="text-purple-100 mb-6">Create and manage blog articles</p>
                <div className="inline-block px-4 py-2 bg-white/20 rounded-lg text-sm font-semibold group-hover:bg-white/30 transition-all">
                  Manage Blog →
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          <div className="p-6 rounded-xl bg-white border border-gray-100 shadow-sm">
            <p className="text-gray-600 text-sm mb-2">Total Programs</p>
            <p className="text-3xl font-bold text-blue-600">0</p>
          </div>
          <div className="p-6 rounded-xl bg-white border border-gray-100 shadow-sm">
            <p className="text-gray-600 text-sm mb-2">Blog Posts</p>
            <p className="text-3xl font-bold text-purple-600">0</p>
          </div>
          <div className="p-6 rounded-xl bg-white border border-gray-100 shadow-sm">
            <p className="text-gray-600 text-sm mb-2">Status</p>
            <p className="text-lg font-bold text-green-600">Online</p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
