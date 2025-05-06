"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Mock user data
const MOCK_USERS = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user",
  },
  {
    id: 2,
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
]

interface User {
  id: number
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  loginAdmin: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
   
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse saved user:", error)
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Kupata User na hizo matching credentials
    const foundUser = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      return true
    }

    return false
  }

  const loginAdmin = async (email: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const foundUser = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password && u.role === "admin",
    )

    if (foundUser) {

      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      return true
    }

    return false
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
   
    await new Promise((resolve) => setTimeout(resolve, 1000))

 
    if (MOCK_USERS.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return false
    }

    // ne User
    const newUser = {
      id: MOCK_USERS.length + 1,
      name,
      email,
      password,
      role: "user",
    }

    // mock users (Hapa Backend)
    MOCK_USERS.push(newUser)

   
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem("user", JSON.stringify(userWithoutPassword))

    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: !!user && user.role === "admin",
        loading,
        login,
        loginAdmin,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
