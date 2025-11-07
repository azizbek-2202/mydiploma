export interface User {
  id: string
  email: string
  password: string
}

export const getStoredUsers = (): User[] => {
  if (typeof window === "undefined") return []
  const users = localStorage.getItem("mydiploma_users")
  return users ? JSON.parse(users) : []
}

export const saveUser = (user: Omit<User, "id">) => {
  const users = getStoredUsers()
  const newUser: User = {
    ...user,
    id: Math.random().toString(36).substring(2, 11),
  }
  users.push(newUser)
  localStorage.setItem("mydiploma_users", JSON.stringify(users))
  return newUser
}

export const validateUser = (email: string, password: string): User | null => {
  const users = getStoredUsers()
  return users.find((u) => u.email === email && u.password === password) || null
}

export const userExists = (email: string): boolean => {
  const users = getStoredUsers()
  return users.some((u) => u.email === email)
}
