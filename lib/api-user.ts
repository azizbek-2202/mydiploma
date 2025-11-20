import { apiCall } from "./api-config"

export interface User {
    id?: string
    email: string
    password: string
    fullName?: string
    role?: string
}

export const fetchUsers = async () => {
    try {
        return await apiCall("GET", "USERS")
    } catch (error) {
        console.error("[API] Failed to fetch users:", error)
        return []
    }
}

export const registerUser = async (user: Omit<User, "id">) => {
    try {
        return await apiCall("POST", "users/register", undefined, user)
    } catch (error) {
        console.error("[API] Failed to register user:", error)
        throw error
    }
}

export const loginUser = async (email: string, password: string) => {
    try {
        return await apiCall("POST", "users/login", undefined, { email, password })
    } catch (error) {
        console.error("[API] Failed to login:", error)
        throw error
    }
}
