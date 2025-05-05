"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ShoppingBag, Heart, Menu, X, Search, User, LogOut } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import AuthModal from "./AuthModal"

const Navbar: React.FC = () => {
  const { state: cart, toggleCart } = useCart()
  const { state: wishlist } = useWishlist()
  const { isAuthenticated, user, logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20
      setIsScrolled(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
   
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    setIsSearchOpen(false)
    setSearchQuery("")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
      style={{
        background: isScrolled
          ? "white"
          : "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter text-gray-300">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white-200"
            >
              {/* Stylized fashion logo - scissors and thread */}
              <path
                d="M7 7.5C7 8.88071 8.11929 10 9.5 10C10.8807 10 12 8.88071 12 7.5C12 6.11929 10.8807 5 9.5 5C8.11929 5 7 6.11929 7 7.5Z"
                fill="currentColor"
              />
              <path
                d="M17 16.5C17 17.8807 18.1193 19 19.5 19C20.8807 19 22 17.8807 22 16.5C22 15.1193 20.8807 14 19.5 14C18.1193 14 17 15.1193 17 16.5Z"
                fill="currentColor"
              />
              <path d="M9.5 10L19.5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M9.5 5L19.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M2 5.5L7 7.5L2 9.5V5.5Z" fill="currentColor" />
              <path d="M2 14.5L7 16.5L2 18.5V14.5Z" fill="currentColor" />
            </svg>
            ELEGANCE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${isScrolled ? "text-gray-800 hover:text-gray-400" : "text-white hover:text-gray-300"}`}
            >
              Home
            </Link>
            <Link
              to="/category/women"
              className={`font-medium transition-colors ${isScrolled ? "text-gray-800 hover:text-gray-400" : "text-white hover:text-gray-300"}`}
            >
              Women
            </Link>
            <Link
              to="/category/men"
              className={`font-medium transition-colors ${isScrolled ? "text-gray-800 hover:text-gray-400" : "text-white hover:text-gray-300"}`}
            >
              Men
            </Link>
            <Link
              to="/category/accessories"
              className={`font-medium transition-colors ${isScrolled ? "text-gray-800 hover:text-gray-400" : "text-white hover:text-gray-300"}`}
            >
              Accessories
            </Link>
            <Link
              to="/collections"
              className={`font-medium transition-colors ${isScrolled ? "text-gray-800 hover:text-gray-400" : "text-white hover:text-gray-300"}`}
            >
              Collections
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`transition-colors ${isScrolled ? "text-gray-800 hover:text-gray-400" : "text-white hover:text-gray-300"}`}
            >
              <Search size={20} />
            </button>

            {/* Account */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`hidden md:flex items-center gap-2 transition-colors ${isScrolled ? "text-gray-800 hover:text-gray-400" : "text-white hover:text-gray-300"}`}
                >
                  <User size={20} />
                  <span className="text-sm font-medium">{user.name}</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <button
                      onClick={() => {
                        logout()
                        setShowUserMenu(false)
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className={`hidden md:block transition-colors ${isScrolled ? "text-gray-800 hover:text-gray-400" : "text-white hover:text-gray-300"}`}
              >
                <User size={20} />
              </button>
            )}

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className={`relative transition-colors ${isScrolled ? "text-gray-800 hover:text-gray-400" : "text-white hover:text-gray-300"}`}
            >
              <Heart size={20} />
              {wishlist.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.totalItems}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => toggleCart()}
              className={`relative transition-colors ${isScrolled ? "text-gray-800 hover:text-gray-400" : "text-white hover:text-gray-300"}`}
            >
              <ShoppingBag size={20} />
              {cart.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden ${isScrolled ? "text-gray-800" : "text-white"}`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 animate-slideDown">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow p-2 border border-gray-300 focus:outline-none focus:border-gray-500"
              />
              <button type="submit" className="bg-gray-500 text-white p-2 px-4 hover:bg-gray-600 transition-colors">
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md animate-slideDown">
            <nav className="flex flex-col">
              <Link
                to="/"
                className="p-4 text-gray-800 hover:bg-gray-100 transition-colors border-b border-gray-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/category/women"
                className="p-4 text-gray-800 hover:bg-gray-100 transition-colors border-b border-gray-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Women
              </Link>
              <Link
                to="/category/men"
                className="p-4 text-gray-800 hover:bg-gray-100 transition-colors border-b border-gray-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Men
              </Link>
              <Link
                to="/category/accessories"
                className="p-4 text-gray-800 hover:bg-gray-100 transition-colors border-b border-gray-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Accessories
              </Link>
              <Link
                to="/collections"
                className="p-4 text-gray-800 hover:bg-gray-100 transition-colors border-b border-gray-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                to="/account"
                className="p-4 text-gray-800 hover:bg-gray-100 transition-colors border-b border-gray-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Account
              </Link>
            </nav>
          </div>
        )}

        {/* Auth Modal */}
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </div>
    </header>
  )
}

export default Navbar
