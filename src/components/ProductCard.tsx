import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product, CartItem } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0],
    };
    
    addToCart(cartItem);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:h-80">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
          />
        </Link>
        
        {/* Product badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded">New</span>
          )}
          {product.originalPrice && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
            </span>
          )}
        </div>
        
        {/* Quick actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <button
            onClick={handleWishlist}
            className={`p-2 rounded-full shadow-md ${
              inWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-burgundy-600 hover:text-white'
            } transition-colors`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={18} />
          </button>
          
          <button
            onClick={handleQuickView}
            className="p-2 rounded-full shadow-md bg-white text-gray-700 hover:bg-burgundy-600 hover:text-white transition-colors"
            aria-label="Quick view"
          >
            <Eye size={18} />
          </button>
          
          <button
            onClick={handleAddToCart}
            className="p-2 rounded-full shadow-md bg-white text-gray-700 hover:bg-burgundy-600 hover:text-white transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700 font-medium">
            <Link to={`/product/${product.id}`}>
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <div className="text-sm font-medium">
          {product.originalPrice ? (
            <div className="flex flex-col items-end">
              <span className="text-burgundy-600">${product.price.toFixed(2)}</span>
              <span className="text-gray-500 line-through text-xs">
                ${product.originalPrice.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-gray-900">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;