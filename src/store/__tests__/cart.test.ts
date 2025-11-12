import { describe, it, beforeEach, expect } from 'vitest';
import { useCartStore } from '../cart';
import type { Product } from '@/types';

const sampleProduct: Product = {
  id: 'prod-1',
  name: 'Sample Product',
  description: 'A great product',
  price: 25,
  image: '/sample.png',
  category: 'electronics',
  inventory: 10,
  rating: 4.5,
  reviewCount: 20,
  features: ['feature'],
  slug: 'sample-product',
};

describe('cart store actions', () => {
  beforeEach(() => {
    localStorage.clear();
    useCartStore.getState().clearCart();
  });

  it('adds items and tracks totals', () => {
    const { addItem } = useCartStore.getState();
    addItem(sampleProduct, 2);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.totalItems).toBe(2);
    expect(state.subtotal).toBe(50);
    expect(state.shipping).toBe(9.99);
  });

  it('increments quantity when adding the same product', () => {
    const { addItem } = useCartStore.getState();
    addItem(sampleProduct, 1);
    addItem(sampleProduct, 3);

    const state = useCartStore.getState();
    expect(state.items[0].quantity).toBe(4);
  });

  it('updates quantity and removes when set to zero', () => {
    const { addItem, updateQuantity } = useCartStore.getState();
    addItem(sampleProduct, 1);
    updateQuantity(sampleProduct.id, 3);

    expect(useCartStore.getState().items[0].quantity).toBe(3);

    updateQuantity(sampleProduct.id, 0);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('removes specific items', () => {
    const { addItem, removeItem } = useCartStore.getState();
    addItem(sampleProduct, 2);
    removeItem(sampleProduct.id);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
    expect(state.totalItems).toBe(0);
  });

  it('clears the cart completely', () => {
    const { addItem, clearCart } = useCartStore.getState();
    addItem(sampleProduct, 1);
    clearCart();

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
    expect(state.total).toBe(0);
  });
});
