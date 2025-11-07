"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { saveProgram, updateProgram, getPrograms } from "@/lib/program-store"
import type { Program } from "@/lib/program-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

interface ProgramFormProps {
  programId?: string
  onClose: () => void
}

export function ProgramForm({ programId, onClose }: ProgramFormProps) {
  const [program, setProgram] = useState<Omit<Program, "id">>({
    university: "",
    country: "",
    program: "",
    duration: "",
    tuition: "",
    image: "",
    description: "",
  })

  useEffect(() => {
    if (programId) {
      const programs = getPrograms()
      const existing = programs.find((p) => p.id === programId)
      if (existing) {
        const { id, ...rest } = existing
        setProgram(rest)
      }
    }
  }, [programId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (programId) {
      updateProgram(programId, program)
    } else {
      saveProgram(program)
    }
    onClose()
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xl space-y-6 mb-8"
    >
      <h2 className="text-2xl font-bold">{programId ? "Edit Program" : "Add New Program"}</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label>University Name</Label>
          <Input
            value={program.university}
            onChange={(e) => setProgram({ ...program, university: e.target.value })}
            required
            placeholder="Harvard University"
          />
        </div>
        <div>
          <Label>Country</Label>
          <Input
            value={program.country}
            onChange={(e) => setProgram({ ...program, country: e.target.value })}
            required
            placeholder="USA"
          />
        </div>
        <div>
          <Label>Program Name</Label>
          <Input
            value={program.program}
            onChange={(e) => setProgram({ ...program, program: e.target.value })}
            required
            placeholder="Computer Science"
          />
        </div>
        <div>
          <Label>Duration</Label>
          <Input
            value={program.duration}
            onChange={(e) => setProgram({ ...program, duration: e.target.value })}
            required
            placeholder="4 years"
          />
        </div>
        <div>
          <Label>Tuition</Label>
          <Input
            value={program.tuition}
            onChange={(e) => setProgram({ ...program, tuition: e.target.value })}
            required
            placeholder="$54,000/year"
          />
        </div>
        <div>
          <Label>Image URL</Label>
          <Input
            value={program.image}
            onChange={(e) => setProgram({ ...program, image: e.target.value })}
            placeholder="/harvard-university-campus.jpg"
          />
        </div>
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          value={program.description}
          onChange={(e) => setProgram({ ...program, description: e.target.value })}
          required
          placeholder="Program description..."
          rows={4}
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-700">
          {programId ? "Update Program" : "Add Program"}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </motion.form>
  )
}
