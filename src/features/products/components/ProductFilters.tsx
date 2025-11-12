/**
 * Product filters component for category and sort options
 */

'use client';

import type { ProductCategory, ProductSortOption } from '@/types';
import { formatCategoryName } from '@/lib/constants/products';

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: ProductCategory | 'all';
  selectedSort: ProductSortOption;
  onCategoryChange: (category: ProductCategory | 'all') => void;
  onSortChange: (sort: ProductSortOption) => void;
}

export function ProductFilters({
  categories,
  selectedCategory,
  selectedSort,
  onCategoryChange,
  onSortChange,
}: ProductFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        {/* Category Filter */}
        <div className="flex items-center space-x-2">
          <label htmlFor="category" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as ProductCategory | 'all')}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <option value="all" className="bg-white dark:bg-gray-800 text-foreground">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category} className="bg-white dark:bg-gray-800 text-foreground">
                {formatCategoryName(category)}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Sort by:
          </label>
          <select
            id="sort"
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value as ProductSortOption)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <option value="name-asc" className="bg-white dark:bg-gray-800 text-foreground">Name (A-Z)</option>
            <option value="name-desc" className="bg-white dark:bg-gray-800 text-foreground">Name (Z-A)</option>
            <option value="price-asc" className="bg-white dark:bg-gray-800 text-foreground">Price (Low to High)</option>
            <option value="price-desc" className="bg-white dark:bg-gray-800 text-foreground">Price (High to Low)</option>
            <option value="rating-desc" className="bg-white dark:bg-gray-800 text-foreground">Rating (High to Low)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
