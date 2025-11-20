"use client"

import { useState, useEffect } from "react"
import { fetchPrograms as fetchProgramsFromAPI, deleteProgram } from "@/lib/api-programs"
import type { Program } from "@/lib/program-store"
import ProgramForm from "@/components/admin/program-form"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function ProgramsPage() {
  const { t, locale } = useLanguage()
  const [programs, setPrograms] = useState<Program[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

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
      <Link href="/mydiploma">
        <Button variant="outline" className="mb-6 gap-2 bg-transparent">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </Link>

      <div className="max-w-7xl mx-auto">
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

        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg mb-4">Loading programs...</p>
          </motion.div>
        ) : (
          <div className="grid gap-6">
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

                // 🔥 Til o‘zgarganda avtomatik mos tarjima chiqadi
                const translation =
                  program.translations.find(t => t.language == locale)

                return (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col md:flex-row gap-4 md:gap-6"
                  >
                    {/* Image */}
                    <div className="flex-shrink-0 w-full md:w-48 h-36 md:h-40 overflow-hidden rounded-xl">
                      <img
                        src={program.image}
                        alt={translation?.nomi || "university photo"}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {translation?.nomi || "Nomi mavjud emas"}
                        </h3>

                        <p className="text-blue-600 font-semibold mt-1">
                          {translation?.davlat || "-"}
                        </p>

                        <p className="text-gray-600 mt-1">
                          {translation?.daraja || "-"}
                        </p>

                        <p className="text-gray-500 text-sm mt-2">
                          {translation?.yonalishi || "-"}
                        </p>

                        <div className="flex gap-4 mt-3 text-sm text-gray-600">
                          <span>Duration: {translation?.davomiyligi || "-"}</span>
                          <span>Level: {translation?.level || "-"}</span>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-4 md:mt-0">
                        <Button
                          onClick={() => handleDelete(program.id!)}
                          variant="destructive"
                          size="sm"
                          className="gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
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
