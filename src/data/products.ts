import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Oversized Cotton Shirt',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.pexels.com/photos/769732/pexels-photo-769732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'women',
    colors: ['White', 'Black', 'Beige'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
    isFeatured: true,
    description: 'Elevate your casual wardrobe with our premium oversized cotton shirt. Featuring a relaxed fit and sustainable materials, this versatile piece transitions effortlessly from day to night.'
  },
  {
    id: 2,
    name: 'Slim Fit Denim Jeans',
    price: 129.99,
    image: 'https://images.pexels.com/photos/1346187/pexels-photo-1346187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'men',
    colors: ['Blue', 'Black', 'Grey'],
    sizes: ['28', '30', '32', '34', '36'],
    isTrending: true,
    description: 'Our signature slim fit jeans combine comfort with style. Made from premium stretch denim that moves with you while maintaining its shape throughout the day.'
  },
  {
    id: 3,
    name: 'Cashmere Blend Sweater',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'women',
    colors: ['Cream', 'Grey', 'Black'],
    sizes: ['XS', 'S', 'M', 'L'],
    isFeatured: true,
    description: 'Luxuriously soft cashmere blend sweater designed for exceptional warmth and comfort. Featuring a classic silhouette that pairs perfectly with any outfit.'
  },
  {
    id: 4,
    name: 'Leather Crossbody Bag',
    price: 159.99,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'accessories',
    colors: ['Tan', 'Black', 'Brown'],
    sizes: ['One Size'],
    isNew: true,
    description: 'Handcrafted from premium Italian leather, this crossbody bag offers timeless style with practical organization. Features adjustable strap and secure magnetic closure.'
  },
  {
    id: 5,
    name: 'Wool Tailored Blazer',
    price: 249.99,
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'men',
    colors: ['Navy', 'Charcoal', 'Black'],
    sizes: ['38', '40', '42', '44', '46'],
    isFeatured: true,
    description: 'Expertly tailored blazer crafted from fine wool. The perfect statement piece for elevating your professional and formal attire.'
  },
  {
    id: 6,
    name: 'Silk Slip Dress',
    price: 179.99,
    image: 'https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'women',
    colors: ['Black', 'Champagne', 'Emerald'],
    sizes: ['XS', 'S', 'M', 'L'],
    isTrending: true,
    description: 'Elegant silk slip dress designed for a flawless drape. Perfect for special occasions or evenings out, this timeless piece exudes effortless sophistication.'
  },
  {
    id: 7,
    name: 'Minimalist Watch',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'accessories',
    colors: ['Silver', 'Gold', 'Rose Gold'],
    sizes: ['One Size'],
    isTrending: true,
    description: 'Sleek minimalist watch with premium movement and scratch-resistant sapphire crystal. Water-resistant to 50 meters with a genuine leather strap.'
  },
  {
    id: 8,
    name: 'Technical Performance Jacket',
    price: 229.99,
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'men',
    colors: ['Black', 'Navy', 'Olive'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNew: true,
    description: 'Weatherproof technical jacket designed for the urban explorer. Features breathable waterproof fabric, taped seams, and strategic ventilation for maximum comfort.'
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (id: number, category: string): Product[] => {
  return products
    .filter(product => product.id !== id && product.category === category)
    .slice(0, 4);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured).slice(0, 4);
};

export const getTrendingProducts = (): Product[] => {
  return products.filter(product => product.isTrending).slice(0, 4);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.isNew).slice(0, 4);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};