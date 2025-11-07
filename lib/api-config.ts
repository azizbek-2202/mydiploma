// Configurable API base URL - change this single value to switch between environments
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://161.35.204.26:3000/api",
  ENDPOINTS: {
    PROGRAMS: "/dasturlar",
    GALLERY: "/gallareya",
    POSTS: "/posts",
    PROGRAM_INFO: "/dastur-malumotlari",
  },
}

export const buildUrl = (endpoint: string, id?: string | number) => {
  const baseEndpoint = API_CONFIG.ENDPOINTS[endpoint as keyof typeof API_CONFIG.ENDPOINTS] || endpoint
  return id ? `${API_CONFIG.BASE_URL}${baseEndpoint}/${id}` : `${API_CONFIG.BASE_URL}${baseEndpoint}`
}

export const apiCall = async (
  method: "GET" | "POST" | "PATCH" | "DELETE",
  endpoint: string,
  id?: string | number,
  body?: Record<string, any>,
) => {
  const url = buildUrl(endpoint, id)
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`[API] Error calling ${endpoint}:`, error)
    throw error
  }
}
