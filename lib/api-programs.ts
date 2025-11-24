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

/**
 * 🔹 Barcha dasturlarni olish (til bilan)
 * @param lang - masalan: "uz" | "en" | "ru"
 */
export const fetchPrograms = async (lang = "uz") => {
  try {
    const res = await apiCall(
      "GET",
      "PROGRAMS",
      undefined,
      undefined,
      { lang, language: lang, locale: lang } as any,
    )
    const list = Array.isArray(res)
      ? res
      : (res?.data ?? res?.results ?? res?.items ?? [])
    return list
  } catch (error) {
    console.error("[API] Failed to fetch programs:", error)
    return []
  }
}

/**
 * 🔹 ID bo‘yicha bitta dastur olish
 * @param id - dastur ID
 * @param lang - masalan: "uz" | "en" | "ru"
 */
export const fetchProgramById = async (id: string, lang = "uz") => {
  try {
    return await apiCall("GET", "PROGRAMS", id, undefined, { lang, language: lang, locale: lang } as any)
  } catch (error) {
    console.error("[API] Failed to fetch program:", error)
    return null
  }
}

/**
 * 🔹 Yangi dastur yaratish
 */
export const createProgram = async (data: FormData) => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

    const res = await fetch("https://cansalting.fullstackchi.uz/dasturlar", {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: data,
    });

    const text = await res.text(); // JSON bo'lmasa ham tutib olish uchun

    if (!res.ok) {
      console.error("❌ Server response:", text);
      throw new Error(`Server error: ${res.status}`);
    }

    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } catch (error) {
    console.error("[API] Failed to create program:", error);
    throw error;
  }
};

/**
 * 🔹 Dastur yangilash
 */
export const updateProgram = async (id: string, data: Program) => {
  try {
    return await apiCall("PATCH", "PROGRAMS", id, data)
  } catch (error) {
    console.error("[API] Failed to update program:", error)
    throw error
  }
}

/**
 * 🔹 Dastur o‘chirish
 */
export const deleteProgram = async (id: string) => {
  try {
    return await apiCall("DELETE", "PROGRAMS", id)
  } catch (error) {
    console.error("[API] Failed to delete program:", error)
  }
}
