import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductQuickView from '../components/ProductQuickView';
import NewsletterSignup from '../components/NewsletterSignup';
import { Product } from '../types';
import { getFeaturedProducts, getTrendingProducts, getNewArrivals } from '../data/products';

const HomePage: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  const featuredProducts = getFeaturedProducts();
  const trendingProducts = getTrendingProducts();
  const newArrivals = getNewArrivals();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/5442447/pexels-photo-5442447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">Elevate Your Style This Season</h1>
            <p className="text-xl mb-8">Discover our new collection that redefines modern elegance.</p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/category/women" 
                className="px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-md transition-colors font-medium"
              >
                Shop Women
              </Link>
              <Link 
                to="/category/men" 
                className="px-6 py-3 bg-transparent border border-white text-white hover:bg-white hover:text-gray-900 rounded-md transition-colors font-medium"
              >
                Shop Men
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Women */}
            <div className="relative overflow-hidden group rounded-lg h-80">
              <img 
                src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Women's Collection" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Women</h3>
                  <Link 
                    to="/category/women"
                    className="inline-block px-6 py-2 bg-white text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Men */}
            <div className="relative overflow-hidden group rounded-lg h-80">
              <img 
                src="https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Men's Collection" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Men</h3>
                  <Link 
                    to="/category/men"
                    className="inline-block px-6 py-2 bg-white text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Accessories */}
            <div className="relative overflow-hidden group rounded-lg h-80">
              <img 
                src="https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Accessories Collection" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Accessories</h3>
                  <Link 
                    to="/category/accessories"
                    className="inline-block px-6 py-2 bg-white text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/featured" className="text-burgundy-600 hover:text-burgundy-800 font-medium flex items-center">
              View All
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Promo Banner */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-lg">
            <div className="bg-burgundy-600 text-white py-16 px-8 md:px-16 md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Summer Collection 2025</h2>
              <p className="mb-8 text-burgundy-100">
                Discover our new summer essentials. Light fabrics, vibrant colors, and effortless style for the warmer days ahead.
              </p>
              <Link 
                to="/collections/summer"
                className="inline-block px-6 py-3 bg-white text-burgundy-600 hover:bg-burgundy-50 rounded-md transition-colors font-medium"
              >
                Explore Collection
              </Link>
            </div>
            <img 
              src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Summer Collection" 
              className="hidden md:block absolute top-0 right-0 w-1/2 h-full object-cover"
            />
          </div>
        </div>
      </section>
      
      {/* Trending Now */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <Link to="/trending" className="text-burgundy-600 hover:text-burgundy-800 font-medium flex items-center">
              View All
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* New Arrivals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <Link to="/new-arrivals" className="text-burgundy-600 hover:text-burgundy-800 font-medium flex items-center">
              View All
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <NewsletterSignup />
      
      {/* Quick View Modal */}
      <ProductQuickView 
        product={quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
      />
    </div>
  );
};

export default HomePage;