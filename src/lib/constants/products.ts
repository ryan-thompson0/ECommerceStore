/**
 * Constants and utilities for FakeStore API integration
 */

/**
 * Formats category names for display
 * Converts "men's clothing" to "Men's Clothing"
 */
export function formatCategoryName(category: string): string {
  return category
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Maps category IDs to display names
 * This will be populated dynamically from API in components
 */
export const CATEGORY_DISPLAY_MAP: Record<string, string> = {
  electronics: 'Electronics',
  jewelery: 'Jewelry',
  "men's clothing": "Men's Clothing",
  "women's clothing": "Women's Clothing",
};

export const TAX_RATE = 0.08; // 8% tax
export const SHIPPING_COST = 9.99;
export const FREE_SHIPPING_THRESHOLD = 100;
