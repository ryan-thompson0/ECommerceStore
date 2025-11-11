/**
 * Client component for product filtering and display
 */

'use client';

import { useState, useMemo } from 'react';
import { ProductGrid, ProductFilters } from '@/features/products/components';
import type { Product, ProductCategory, ProductSortOption } from '@/types';

interface ProductsClientProps {
  products: Product[];
  categories: string[];
}

export function ProductsClient({ products, categories }: ProductsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedSort, setSelectedSort] = useState<ProductSortOption>('name-asc');

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (selectedSort) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, selectedCategory, selectedSort]);

  return (
    <>
      <ProductFilters
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSort={selectedSort}
        onCategoryChange={setSelectedCategory}
        onSortChange={setSelectedSort}
      />

      <div className="mb-4">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{filteredAndSortedProducts.length}</span> products
        </p>
      </div>

      <ProductGrid products={filteredAndSortedProducts} />
    </>
  );
}
