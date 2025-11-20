import { apiCall } from "./api-config"

export interface BlogPost {
  id?: string
  date?: string
  image?: File | string
  translations: Array<{
    language: string
    title: string
    desc: string
  }>
}

// Barcha postlarni olish
export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    return await apiCall("GET", "POSTS")
  } catch (error) {
    console.error("[API] Failed to fetch blog posts:", error)
    return []
  }
}

// ID bo‘yicha post olish
export const fetchBlogPostById = async (id: string): Promise<BlogPost | null> => {
  try {
    return await apiCall("GET", "POSTS", id)
  } catch (error) {
    console.error("[API] Failed to fetch blog post:", error)
    return null
  }
}

// Yangi post yaratish (FormData bilan)
export const createBlogPost = async (data: FormData) => {
  try {
    return await apiCall("POST", "POSTS", undefined, data, undefined, true)
  } catch (error) {
    console.error("[API] Failed to create blog post:", error)
    throw error
  }
}

// Postni yangilash (FormData bilan)
export const updateBlogPost = async (id: string, data: FormData) => {
  try {
    return await apiCall("PATCH", "POSTS", id, data)
  } catch (error) {
    console.error("[API] Failed to update blog post:", error)
    throw error
  }
}

// Postni o‘chirish
export const deleteBlogPost = async (id: string) => {
  try {
    return await apiCall("DELETE", "POSTS", id)
  } catch (error) {
    console.error("[API] Failed to delete blog post:", error)
    throw error
  }
}
