import { apiCall } from "./api-config"

export interface BlogPost {
  id?: string
  date?: string
  time?: string
  translations?: Array<{
    language: string
    name?: string
    davomiyligini?: string
    level?: string
    darajalar?: string
    daraja?: string
    yonalishi?: string
  }>
}

export const fetchBlogPosts = async () => {
  try {
    return await apiCall("GET", "POSTS")
  } catch (error) {
    console.error("[API] Failed to fetch blog posts:", error)
    return []
  }
}

export const fetchBlogPostById = async (id: string) => {
  try {
    return await apiCall("GET", "POSTS", id)
  } catch (error) {
    console.error("[API] Failed to fetch blog post:", error)
    return null
  }
}

export const createBlogPost = async (data: BlogPost) => {
  try {
    return await apiCall("POST", "POSTS", undefined, data)
  } catch (error) {
    console.error("[API] Failed to create blog post:", error)
    throw error
  }
}

export const updateBlogPost = async (id: string, data: BlogPost) => {
  try {
    return await apiCall("PATCH", "POSTS", id, data)
  } catch (error) {
    console.error("[API] Failed to update blog post:", error)
    throw error
  }
}

export const deleteBlogPost = async (id: string) => {
  try {
    return await apiCall("DELETE", "POSTS", id)
  } catch (error) {
    console.error("[API] Failed to delete blog post:", error)
    throw error
  }
}
