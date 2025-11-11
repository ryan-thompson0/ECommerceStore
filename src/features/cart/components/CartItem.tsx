/**
 * Cart item component for displaying individual cart items
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '@/types';
import { Button } from '@/components/ui';
import { formatCurrency } from '@/lib/utils/format';
import { useCartStore } from '@/store/cart';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const { product, quantity } = item;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(product.id);
    } else if (newQuantity <= product.inventory) {
      updateQuantity(product.id, newQuantity);
    }
  };

  const itemTotal = product.price * quantity;

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Product Image */}
      <Link href={`/products/${product.slug}`} className="flex-shrink-0">
        <div className="relative w-24 h-24 rounded-md overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <Link
            href={`/products/${product.slug}`}
            className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
          >
            {product.name}
          </Link>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuantityChange(quantity - 1)}
              className="p-1 h-8 w-8"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium w-8 text-center">
              {quantity}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= product.inventory}
              className="p-1 h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <span className="font-bold text-lg text-gray-900">
              {formatCurrency(itemTotal)}
            </span>
            <Button
              size="sm"
              variant="danger"
              onClick={() => removeItem(product.id)}
              className="p-2"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
