"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"

const Register: React.FC = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      const success = await register(name, email, password)
      if (success) {
        navigate("/")
      } else {
        setError("Registration failed. Please try again.")
      }
    } catch (err) {
      setError("An error occurred during registration. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div
        className={`max-w-md w-full space-y-8 p-8 rounded-lg shadow-lg ${isDark ? "bg-dark-secondary" : "bg-white"}`}
      >
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>
            ELEGANCE
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">Create your account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  isDark
                    ? "border-gray-700 bg-dark-elevated text-white placeholder-gray-500"
                    : "border-gray-300 placeholder-gray-500 text-gray-900"
                } rounded-t-md focus:outline-none focus:ring-silver focus:border-silver focus:z-10 sm:text-sm`}
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  isDark
                    ? "border-gray-700 bg-dark-elevated text-white placeholder-gray-500"
                    : "border-gray-300 placeholder-gray-500 text-gray-900"
                } focus:outline-none focus:ring-silver focus:border-silver focus:z-10 sm:text-sm`}
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  isDark
                    ? "border-gray-700 bg-dark-elevated text-white placeholder-gray-500"
                    : "border-gray-300 placeholder-gray-500 text-gray-900"
                } focus:outline-none focus:ring-silver focus:border-silver focus:z-10 sm:text-sm`}
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  isDark
                    ? "border-gray-700 bg-dark-elevated text-white placeholder-gray-500"
                    : "border-gray-300 placeholder-gray-500 text-gray-900"
                } rounded-b-md focus:outline-none focus:ring-silver focus:border-silver focus:z-10 sm:text-sm`}
                placeholder="Confirm Password"
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-center text-red-500">
              <p>{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-800 hover:bg-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-silver transition-colors duration-200 ease-in-out ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </button>
          </div>

          <div className="text-center">
            <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Already have an account?{" "}
              <Link
                to="/login"
                className={`font-medium ${
                  isDark ? "text-silver hover:text-white" : "text-silver-dark hover:text-gray-900"
                }`}
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
