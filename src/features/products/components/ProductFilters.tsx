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
    <div className="bg-card p-4 rounded-lg shadow-md mb-6 border">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        {/* Category Filter */}
        <div className="flex items-center space-x-2">
          <label htmlFor="category" className="text-sm font-medium text-foreground">
            Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as ProductCategory | 'all')}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {formatCategoryName(category)}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-sm font-medium text-foreground">
            Sort by:
          </label>
          <select
            id="sort"
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value as ProductSortOption)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="rating-desc">Rating (High to Low)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
