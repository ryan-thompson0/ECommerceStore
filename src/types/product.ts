/**
 * Product-related type definitions
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  inventory: number;
  rating: number;
  reviewCount: number;
  features: string[];
  slug: string;
}

export type ProductCategory =
  | 'electronics'
  | 'jewelery'
  | "men's clothing"
  | "women's clothing"
  | string; // Allow any string for flexibility

export interface ProductFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: ProductSortOption;
}

export type ProductSortOption =
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'
  | 'rating-desc';
