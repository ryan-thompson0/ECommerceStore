/**
 * Zustand store for shopping cart state management
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartState, CartItem, Product } from '@/types';
import { calculateCartTotals } from '@/lib/utils/calculations';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,

      addItem: (product: Product, quantity: number = 1) => {
        const items = get().items;
        const existingItemIndex = items.findIndex(
          (item) => item.product.id === product.id
        );

        let newItems: CartItem[];

        if (existingItemIndex > -1) {
          // Update quantity if item already exists
          newItems = items.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // Add new item
          newItems = [...items, { product, quantity }];
        }

        const totals = calculateCartTotals(newItems);

        set({
          items: newItems,
          ...totals,
        });
      },

      removeItem: (productId: string) => {
        const items = get().items;
        const newItems = items.filter((item) => item.product.id !== productId);
        const totals = calculateCartTotals(newItems);

        set({
          items: newItems,
          ...totals,
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        const items = get().items;

        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const newItems = items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        );

        const totals = calculateCartTotals(newItems);

        set({
          items: newItems,
          ...totals,
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          subtotal: 0,
          tax: 0,
          shipping: 0,
          total: 0,
        });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
