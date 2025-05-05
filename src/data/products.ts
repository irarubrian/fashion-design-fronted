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

// Add more products
const additionalProducts: Product[] = [
  {
    id: 9,
    name: 'Floral Summer Dress',
    price: 119.99,
    image: 'https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'women',
    colors: ['Blue', 'Pink', 'Yellow'],
    sizes: ['XS', 'S', 'M', 'L'],
    isNew: true,
    description: 'Light and airy floral dress perfect for summer days. Features a flattering silhouette and breathable fabric.'
  },
  {
    id: 10,
    name: 'Structured Tote Bag',
    price: 139.99,
    originalPrice: 179.99,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'accessories',
    colors: ['Black', 'Beige', 'Red'],
    sizes: ['One Size'],
    isFeatured: true,
    description: 'Spacious structured tote with multiple compartments for organization. Made from durable vegan leather.'
  },
  {
    id: 11,
    name: 'Linen Blend Shirt',
    price: 89.99,
    image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'men',
    colors: ['White', 'Blue', 'Beige'],
    sizes: ['S', 'M', 'L', 'XL'],
    isTrending: true,
    description: 'Breathable linen blend shirt perfect for warm weather. Features a relaxed fit and classic design.'
  },
  {
    id: 12,
    name: 'Pleated Midi Skirt',
    price: 99.99,
    image: 'https://images.pexels.com/photos/1631181/pexels-photo-1631181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'women',
    colors: ['Black', 'Navy', 'Burgundy'],
    sizes: ['XS', 'S', 'M', 'L'],
    isFeatured: true,
    description: 'Elegant pleated midi skirt that transitions seamlessly from office to evening. Features a comfortable elastic waistband.'
  },
  {
    id: 13,
    name: 'Leather Ankle Boots',
    price: 189.99,
    originalPrice: 229.99,
    image: 'https://images.pexels.com/photos/267242/pexels-photo-267242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'women',
    colors: ['Black', 'Brown', 'Tan'],
    sizes: ['36', '37', '38', '39', '40', '41'],
    isTrending: true,
    description: 'Classic leather ankle boots with a comfortable block heel. Versatile style that complements any outfit.'
  },
  {
    id: 14,
    name: 'Graphic Print T-Shirt',
    price: 49.99,
    image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'men',
    colors: ['White', 'Black', 'Grey'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNew: true,
    description: 'Soft cotton t-shirt featuring an exclusive graphic print. Perfect for casual everyday wear.'
  },
  {
    id: 15,
    name: 'Wide Leg Trousers',
    price: 129.99,
    image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'women',
    colors: ['Black', 'Camel', 'Navy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isFeatured: true,
    description: 'Sophisticated wide leg trousers crafted from premium fabric with a beautiful drape. Features a high waist and flattering fit.'
  },
  {
    id: 16,
    name: 'Knit Beanie Hat',
    price: 39.99,
    image: 'https://images.pexels.com/photos/1070058/pexels-photo-1070058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'accessories',
    colors: ['Grey', 'Black', 'Burgundy', 'Navy'],
    sizes: ['One Size'],
    isTrending: true,
    description: 'Cozy knit beanie made from soft yarn. Perfect for keeping warm while adding style to your winter outfits.'
  }
];

// Combine original products with additional products
const allProducts = [...products, ...additionalProducts];

export const getFeaturedProducts = (): Product[] => {
  return allProducts.filter(product => product.isFeatured).slice(0, 8);
};

export const getTrendingProducts = (): Product[] => {
  return allProducts.filter(product => product.isTrending).slice(0, 8);
};

export const getNewArrivals = (): Product[] => {
  return allProducts.filter(product => product.isNew).slice(0, 8);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};