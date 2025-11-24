"use client"

import { useState, useEffect } from "react"
import { fetchPrograms as fetchProgramsFromAPI, deleteProgram } from "@/lib/api-programs"
import type { Program } from "@/lib/program-store"
import ProgramForm from "@/components/admin/program-form"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Plus, ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function ProgramsPage() {
  const { t, locale } = useLanguage()
  const [programs, setPrograms] = useState<Program[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [programsInView, setProgramsInView] = useState(true) // motion trigger

  const loadPrograms = async () => {
    setIsLoading(true)
    try {
      const fetched = await fetchProgramsFromAPI()
      setPrograms(fetched || [])
    } catch (err) {
      console.error("Failed to load programs:", err)
      setPrograms([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadPrograms()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Rostdan ham o‘chirmoqchimisiz?")) return
    try {
      await deleteProgram(id)
      loadPrograms()
    } catch (err) {
      console.error("Failed to delete program:", err)
    }
  }

  const handleFormClose = () => {
    setIsAdding(false)
    loadPrograms()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      {/* Back Button */}
      <Link href="/mydiploma">
        <Button variant="outline" className="mb-6 gap-2 bg-transparent">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </Link>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Programs Management</h1>
          <Button
            onClick={() => setIsAdding(true)}
            className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Program
          </Button>
        </div>

        {/* Add/Edit Form */}
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-10"
            >
              <ProgramForm onClose={handleFormClose} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Programs Grid */}
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg mb-4">Loading programs...</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">No programs added yet</p>
                <Button onClick={() => setIsAdding(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add First Program
                </Button>
              </motion.div>
            ) : (
              programs.map((program, index) => {
                const t = program.translations[0] || {}

                return (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={programsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group"
                  >
                    <div className="h-full rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl overflow-hidden backdrop-blur-sm">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={program.image || "/placeholder.svg"}
                          alt={t.nomi || "Program"}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {t.davlat && (
                          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                            {t.davlat}
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                            {t.nomi || "No Name"}
                          </h3>
                          <p className="text-primary font-semibold">{t.yonalishi || "-"}</p>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">{t.level || "-"}</p>

                        <div className="space-y-2 pt-4 border-t border-border">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{t.davomiyligi || "-"}</span>
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2 mt-4">
                          <Button
                            onClick={() => setIsAdding(true)} // Edit tugmasi uchun form ochiladi
                            size="sm"
                            className="flex-1 gap-2 bg-blue-600 text-white hover:bg-blue-700"
                          >
                            Edit
                          </Button>

                          <Button
                            onClick={() => handleDelete(program.id!)}
                            variant="destructive"
                            size="sm"
                            className="flex-1 gap-2"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })
            )}
          </div>
        )}
      </div>
    </div>
  )
}
