export interface Program {
  id: string
  university: string
  country: string
  program: string
  duration: string
  tuition: string
  image: string
  description: string
}

export const getPrograms = (): Program[] => {
  if (typeof window === "undefined") return []
  const programs = localStorage.getItem("mydiploma_programs")
  return programs ? JSON.parse(programs) : []
}

export const saveProgram = (program: Omit<Program, "id">) => {
  const programs = getPrograms()
  const newProgram: Program = {
    ...program,
    id: Math.random().toString(36).substring(2, 11),
  }
  programs.push(newProgram)
  localStorage.setItem("mydiploma_programs", JSON.stringify(programs))
  return newProgram
}

export const updateProgram = (id: string, program: Omit<Program, "id">) => {
  const programs = getPrograms()
  const index = programs.findIndex((p) => p.id === id)
  if (index !== -1) {
    programs[index] = { ...program, id }
    localStorage.setItem("mydiploma_programs", JSON.stringify(programs))
  }
}

export const deleteProgram = (id: string) => {
  const programs = getPrograms()
  const filtered = programs.filter((p) => p.id !== id)
  localStorage.setItem("mydiploma_programs", JSON.stringify(filtered))
}
