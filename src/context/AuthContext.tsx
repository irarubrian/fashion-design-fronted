"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: number
  username: string
  email: string
  role: string
  isAdmin?: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  loginAdmin: (email: string, password: string) => Promise<boolean>
  register: (username: string, email: string, password: string, role?: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/check", {
        method: "GET",
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Auth check response:", data)
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Auth check error:", error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      console.log("Login attempt with:", { email })

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      })

      console.log("Login response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.log("Login error response:", errorData)
        throw new Error(`Server returned ${response.status}: ${JSON.stringify(errorData)}`)
      }

      const data = await response.json()
      console.log("Login response data:", data)

      if (data.success) {
        setUser(data.user)
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const loginAdmin = async (email: string, password: string) => {
    try {
      console.log("Admin login attempt with:", { email })

      const response = await fetch("http://localhost:5000/api/auth/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      })

      console.log("Admin login response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.log("Admin login error response:", errorData)
        throw new Error(`Server returned ${response.status}: ${JSON.stringify(errorData)}`)
      }

      const data = await response.json()
      console.log("Admin login response data:", data)

      if (data.success) {
        // Ensure isAdmin is explicitly set to true
        const adminUser = {
          ...data.user,
          isAdmin: true,
        }
        console.log("Setting admin user:", adminUser)
        setUser(adminUser)
        return true
      }
      return false
    } catch (error) {
      console.error("Admin login error:", error)
      return false
    }
  }

  const register = async (username: string, email: string, password: string, role = "customer") => {
    try {
      console.log("Registration attempt with:", { username, email, role })

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, role }),
        credentials: "include",
      })

      console.log("Registration response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.log("Registration error response:", errorData)
        throw new Error(`Server returned ${response.status}: ${JSON.stringify(errorData)}`)
      }

      const data = await response.json()
      console.log("Registration response data:", data)

      if (data.success) {
        setUser(data.user)
        return true
      }
      return false
    } catch (error) {
      console.error("Registration error:", error)
      return false
    }
  }

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setUser(null)
    }
  }

  // Calculate isAdmin value - be more permissive for testing
  const isAuthenticated = !!user
  const isAdmin = user?.isAdmin === true || user?.role === "admin"

  // Debug log for authentication state
  useEffect(() => {
    console.log("Auth state updated:", {
      isAuthenticated,
      isAdmin,
      user: user
        ? {
            id: user.id,
            email: user.email,
            role: user.role,
            isAdmin: user.isAdmin,
          }
        : null,
    })
  }, [isAuthenticated, isAdmin, user])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        loading,
        login,
        loginAdmin,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
