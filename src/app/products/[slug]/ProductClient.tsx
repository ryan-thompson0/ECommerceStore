/**
 * Client component for product detail page interactions
 */

'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui';
import type { Product } from '@/types';
import { useCartStore } from '@/store/cart';

interface ProductClientProps {
  product: Product;
}

export function ProductClient({ product }: ProductClientProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <>
      {/* Inventory Status */}
      <div className="mb-6">
        {product.inventory > 0 ? (
          <p className="text-green-600 dark:text-green-400 font-medium">
            In Stock ({product.inventory} available)
          </p>
        ) : (
          <p className="text-red-600 dark:text-red-400 font-medium">Out of Stock</p>
        )}
      </div>

      {/* Quantity Selector */}
      {product.inventory > 0 && (
        <div className="mb-8 animate-slide-up">
          <label className="block text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
            Quantity:
          </label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="custom-select min-w-[120px] px-5 py-3 border border-border rounded-lg focus:outline-none bg-background text-foreground font-semibold text-lg shadow-sm hover:shadow-md"
          >
            {Array.from({ length: Math.min(10, product.inventory) }, (_, i) => i + 1).map(
              (num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              )
            )}
          </select>
        </div>
      )}

      {/* Add to Cart Button */}
      <Button
        size="lg"
        onClick={handleAddToCart}
        disabled={product.inventory === 0 || isAdded}
        className="flex items-center justify-center space-x-2"
      >
        {isAdded ? (
          <>
            <Check className="h-5 w-5" />
            <span>Added to Cart!</span>
          </>
        ) : (
          <>
            <ShoppingCart className="h-5 w-5" />
            <span>Add to Cart</span>
          </>
        )}
      </Button>
    </>
  );
}
