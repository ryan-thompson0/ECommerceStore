/**
 * API service functions for FakeStore API
 * Documentation: https://fakestoreapi.com/docs
 */

import { env } from '@/lib/env';

const API_BASE_URL = env.NEXT_PUBLIC_API_URL;

/**
 * FakeStore API Product interface
 */
export interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

/**
 * Fetches all products from FakeStore API
 * @param limit - Optional limit for number of products
 * @returns Array of products
 */
export async function fetchProducts(limit?: number): Promise<FakeStoreProduct[]> {
  try {
    const url = limit
      ? `${API_BASE_URL}/products?limit=${limit}`
      : `${API_BASE_URL}/products`;

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    return response.json() as Promise<FakeStoreProduct[]>;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Fetches a single product by ID
 * @param id - Product ID
 * @returns Product details
 */
export async function fetchProductById(id: number): Promise<FakeStoreProduct> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    return response.json() as Promise<FakeStoreProduct>;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
}

/**
 * Fetches all available categories
 * @returns Array of category names
 */
export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`, {
      next: { revalidate: 86400 }, // Revalidate once per day
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    return response.json() as Promise<string[]>;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

/**
 * Fetches products by category
 * @param category - Category name
 * @returns Array of products in the category
 */
export async function fetchProductsByCategory(
  category: string
): Promise<FakeStoreProduct[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/category/${category}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products by category: ${response.statusText}`);
    }

    return response.json() as Promise<FakeStoreProduct[]>;
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw error;
  }
}

/**
 * Transforms FakeStore product to app Product format
 */
export function transformProduct(fakeStoreProduct: FakeStoreProduct) {
  return {
    id: String(fakeStoreProduct.id),
    name: fakeStoreProduct.title,
    description: fakeStoreProduct.description,
    price: fakeStoreProduct.price,
    image: fakeStoreProduct.image,
    category: fakeStoreProduct.category,
    inventory: Math.floor(Math.random() * 100) + 10, // Random inventory (API doesn't provide)
    rating: fakeStoreProduct.rating.rate,
    reviewCount: fakeStoreProduct.rating.count,
    features: generateFeatures(fakeStoreProduct), // Generate features from description
    slug: createSlug(fakeStoreProduct.title, fakeStoreProduct.id),
  };
}

/**
 * Creates a URL-friendly slug from product title and ID
 */
export function createSlug(title: string, id: number): string {
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
  return `${slug}-${id}`;
}

/**
 * Generates feature list from product description
 */
export function generateFeatures(product: FakeStoreProduct): string[] {
  // Split description into sentences and take first 3-4 as features
  const sentences = product.description
    .split('.')
    .filter((s) => s.trim().length > 10)
    .map((s) => s.trim());

  // Return first 3 sentences as features, or create generic features
  if (sentences.length >= 3) {
    return sentences.slice(0, 3);
  }

  // Fallback features based on category
  const categoryFeatures: Record<string, string[]> = {
    electronics: ['High Quality', 'Latest Technology', 'Warranty Included', 'Fast Shipping'],
    jewelery: ['Premium Materials', 'Elegant Design', 'Gift Wrapped', 'Certificate Included'],
    "men's clothing": ['Comfortable Fit', 'Durable Fabric', 'Easy Care', 'Modern Style'],
    "women's clothing": ['Stylish Design', 'Quality Fabric', 'Perfect Fit', 'Versatile'],
  };

  return categoryFeatures[product.category] || ['High Quality', 'Fast Shipping', 'Great Value'];
}
