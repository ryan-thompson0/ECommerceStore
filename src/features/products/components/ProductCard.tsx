/**
 * Product card component for displaying product information in grid
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import type { Product } from '@/types';
import { Card, Button, Badge } from '@/components/ui';
import { formatCurrency } from '@/lib/utils/format';
import { useCartStore } from '@/store/cart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
        {/* Product Image */}
        <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.inventory < 10 && product.inventory > 0 && (
            <Badge
              className="absolute top-3 right-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 hover:bg-yellow-100/80 dark:hover:bg-yellow-900/80"
            >
              Low Stock
            </Badge>
          )}
          {product.inventory === 0 && (
            <Badge
              variant="destructive"
              className="absolute top-3 right-3"
            >
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex-grow">
            <Badge className="mb-2 capitalize bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-100/80 dark:hover:bg-blue-900/80">
              {product.category}
            </Badge>
            <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-foreground text-sm mb-3 line-clamp-2">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center mb-3">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm font-medium text-foreground">
                {product.rating.toFixed(1)}
              </span>
              <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t dark:border-gray-700">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(product.price)}
            </span>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={product.inventory === 0}
              className="flex items-center space-x-1"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add</span>
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}
