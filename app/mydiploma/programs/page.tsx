"use client"

import { useState, useEffect } from "react"
import { getPrograms, deleteProgram } from "@/lib/program-store"
import type { Program } from "@/lib/program-store"
import { ProgramForm } from "@/components/admin/program-form"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Trash2, Edit2, Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { fetchPrograms as fetchProgramsFromAPI } from "@/lib/api-programs"

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        setIsLoading(true)
        const fetchedPrograms = await fetchProgramsFromAPI()
        setPrograms(fetchedPrograms || getPrograms())
      } catch (error) {
        console.error("[v0] Failed to load programs:", error)
        setPrograms(getPrograms())
      } finally {
        setIsLoading(false)
      }
    }
    loadPrograms()
  }, [])

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this program?")) {
      deleteProgram(id)
      setPrograms(getPrograms())
    }
  }

  const handleFormClose = () => {
    setIsAdding(false)
    setEditingId(null)
    setPrograms(getPrograms())
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
          <Button onClick={() => setIsAdding(true)} className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700">
            <Plus className="w-4 h-4" />
            Add Program
          </Button>
        </div>

        {isLoading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">Loading programs...</p>
          </motion.div>
        ) : isAdding || editingId ? (
          <ProgramForm programId={editingId || undefined} onClose={handleFormClose} />
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
              programs.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">{program.university}</h3>
                      <p className="text-blue-600 font-semibold">{program.program}</p>
                      <p className="text-gray-600 mt-1">{program.country}</p>
                      <p className="text-gray-500 text-sm mt-2">{program.description}</p>
                      <div className="flex gap-4 mt-3 text-sm text-gray-600">
                        <span>Duration: {program.duration}</span>
                        <span>Tuition: {program.tuition}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => setEditingId(program.id)} variant="outline" size="sm" className="gap-2">
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(program.id)}
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
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
