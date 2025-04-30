import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Menu, X, Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const { state: cart, toggleCart } = useCart();
  const { state: wishlist } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log(`Searching for: ${searchQuery}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tighter">
            ELEGANCE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-800 hover:text-burgundy-600 transition-colors">
              Home
            </Link>
            <Link to="/category/women" className="text-gray-800 hover:text-burgundy-600 transition-colors">
              Women
            </Link>
            <Link to="/category/men" className="text-gray-800 hover:text-burgundy-600 transition-colors">
              Men
            </Link>
            <Link to="/category/accessories" className="text-gray-800 hover:text-burgundy-600 transition-colors">
              Accessories
            </Link>
            <Link to="/collections" className="text-gray-800 hover:text-burgundy-600 transition-colors">
              Collections
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-800 hover:text-burgundy-600 transition-colors"
            >
              <Search size={20} />
            </button>

            {/* Account */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="text-gray-800 hover:text-burgundy-600 transition-colors hidden md:block"
            >
              <User size={20} />
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="text-gray-800 hover:text-burgundy-600 transition-colors relative">
              <Heart size={20} />
              {wishlist.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-burgundy-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.totalItems}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => toggleCart()}
              className="text-gray-800 hover:text-burgundy-600 transition-colors relative"
            >
              <ShoppingBag size={20} />
              {cart.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-burgundy-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-800 md:hidden"
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
                className="flex-grow p-2 border border-gray-300 focus:outline-none focus:border-burgundy-600"
              />
              <button
                type="submit"
                className="bg-burgundy-600 text-white p-2 px-4 hover:bg-burgundy-700 transition-colors"
              >
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
  );
};

export default Navbar;