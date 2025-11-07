import { apiCall } from "./api-config"

export interface Program {
  id?: string
  sarlavha?: string
  fan?: string
  davlat?: string
  davlatiga_visa_vutgani?: string
  univer_nomi?: string
  qayst_davlatda_universitetidan?: string
  qays_yonahlida_yozadi?: string
  level?: string
  davami?: string
  daraja?: string
  yonalishi?: string
}

export const fetchPrograms = async () => {
  try {
    return await apiCall("GET", "PROGRAMS")
  } catch (error) {
    console.error("[API] Failed to fetch programs:", error)
    return []
  }
}

export const fetchProgramById = async (id: string) => {
  try {
    return await apiCall("GET", "PROGRAMS", id)
  } catch (error) {
    console.error("[API] Failed to fetch program:", error)
    return null
  }
}

export const createProgram = async (data: Program) => {
  try {
    return await apiCall("POST", "PROGRAMS", undefined, data)
  } catch (error) {
    console.error("[API] Failed to create program:", error)
    throw error
  }
}

export const updateProgram = async (id: string, data: Program) => {
  try {
    return await apiCall("PATCH", "PROGRAMS", id, data)
  } catch (error) {
    console.error("[API] Failed to update program:", error)
    throw error
  }
}

export const deleteProgram = async (id: string) => {
  try {
    return await apiCall("DELETE", "PROGRAMS", id)
  } catch (error) {
    console.error("[API] Failed to delete program:", error)
    throw error
  }
}
