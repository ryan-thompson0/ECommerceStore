/**
 * Checkout page
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/layout';
import { Card } from '@/components/ui';
import { CheckoutForm } from '@/features/checkout/components';
import { CartSummary } from '@/features/cart/components';
import { useCartStore } from '@/store/cart';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  if (items.length === 0) {
    return null;
  }

  return (
    <Container className="py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Items</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center space-x-3 pb-3 border-b last:border-b-0"
                  >
                    <div className="text-sm font-medium text-gray-600 w-8">
                      {item.quantity}x
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        ${item.product.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="mt-6">
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
