/**
 * Cart summary component for displaying totals and checkout button
 */

'use client';

import Link from 'next/link';
import { Card, Button } from '@/components/ui';
import { formatCurrency } from '@/lib/utils/format';
import { useCartStore } from '@/store/cart';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants/products';

export function CartSummary() {
  const { subtotal, tax, shipping, total, items } = useCartStore();

  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
  const qualifiesForFreeShipping = remainingForFreeShipping <= 0;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4 text-foreground">Order Summary</h2>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-foreground">
          <span>Subtotal:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-foreground">
          <span>Tax:</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="flex justify-between text-foreground">
          <span>Shipping:</span>
          <span className={shipping === 0 ? 'text-green-600 dark:text-green-400 font-medium' : ''}>
            {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
          </span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span className="text-foreground">Total:</span>
            <span className="text-primary">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* Free Shipping Message */}
      {!qualifiesForFreeShipping && items.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-sm p-3 rounded-lg mb-4 border border-blue-200 dark:border-blue-800/50">
          Add {formatCurrency(remainingForFreeShipping)} more to get FREE shipping!
        </div>
      )}

      {qualifiesForFreeShipping && items.length > 0 && (
        <div className="bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-300 text-sm p-3 rounded-lg mb-4 border border-green-200 dark:border-green-800/50">
          You qualify for FREE shipping! 🎉
        </div>
      )}

      <Link href="/checkout">
        <Button
          className="w-full"
          size="lg"
          disabled={items.length === 0}
        >
          Proceed to Checkout
        </Button>
      </Link>

      <Link href="/">
        <Button
          className="w-full mt-3"
          variant="outline"
        >
          Continue Shopping
        </Button>
      </Link>
    </Card>
  );
}
