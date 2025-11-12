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
    <div className="glass-card p-6 rounded-xl shadow-glow mb-8 border-2 border-primary/10 hover:border-primary/20 transition-all duration-300 animate-scale-in">
      <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        {/* Category Filter */}
        <div className="flex items-center space-x-3">
          <label htmlFor="category" className="text-sm font-bold text-foreground uppercase tracking-wide">
            Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as ProductCategory | 'all')}
            className="custom-select w-auto min-w-[200px] px-4 py-3 border border-border rounded-lg focus:outline-none bg-background text-foreground font-medium shadow-sm hover:shadow-md"
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
        <div className="flex items-center space-x-3 md:ml-auto">
          <label htmlFor="sort" className="text-sm font-bold text-foreground uppercase tracking-wide">
            Sort by:
          </label>
          <select
            id="sort"
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value as ProductSortOption)}
            className="custom-select w-auto min-w-[200px] px-4 py-3 border border-border rounded-lg focus:outline-none bg-background text-foreground font-medium shadow-sm hover:shadow-md"
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
