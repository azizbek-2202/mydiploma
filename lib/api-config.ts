export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://138.68.93.19:3000/",
  ENDPOINTS: {
    PROGRAMS: "dasturlar",
    GALLERY: "gallareya",
    POSTS: "blog", // ← bu o‘zgardi
    PROGRAM_INFO: "dastur-malumotlari",
  },
}
// ✅ lang (yoki boshqa query param) qo‘llaydigan buildUrl
export const buildUrl = (endpoint: string, id?: string | number, params?: Record<string, string>) => {
  const baseEndpoint = API_CONFIG.ENDPOINTS[endpoint as keyof typeof API_CONFIG.ENDPOINTS] || endpoint
  let url = id ? `${API_CONFIG.BASE_URL}${baseEndpoint}/${id}` : `${API_CONFIG.BASE_URL}${baseEndpoint}`

  if (params) {
    const query = new URLSearchParams(params).toString()
    url += `?${query}`
  }

  return url
}

export const apiCall = async (
  method: "GET" | "POST" | "PATCH" | "DELETE",
  endpoint: string,
  id?: string | number,
  body?: any,
  params?: Record<string, string>,
  isFormData?: boolean
) => {
  const url = buildUrl(endpoint, id, params)

  // ✅ faqat browserda token olish
  let token: string | null = null
  if (typeof window !== "undefined") {
    token = localStorage.getItem("auth_token")
  }

  const headers: HeadersInit = {
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  }

  if (!isFormData) {
    headers["Content-Type"] = "application/json"
  }

  const options: RequestInit = {
    method,
    headers,
  }

  if (body) {
    options.body = isFormData ? body : JSON.stringify(body)
  }

  try {
    const response = await fetch(url, options)
console.log("REQUEST URL:", url)

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    const text = await response.text()
    return text ? JSON.parse(text) : null
  } catch (error) {
    console.error(`[API] Error calling ${endpoint}:`, error)
    throw error
  }
}
