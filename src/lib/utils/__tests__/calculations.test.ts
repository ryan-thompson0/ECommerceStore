/**
 * Tests for calculation utility functions
 */

import { describe, it, expect } from 'vitest';
import {
  calculateSubtotal,
  calculateShipping,
  calculateTax,
  calculateCartTotals,
} from '../calculations';
import type { CartItem } from '@/types';

// Mock cart items for testing
const mockCartItems: CartItem[] = [
  {
    product: {
      id: '1',
      name: 'Test Product 1',
      price: 29.99,
      description: 'Test description',
      category: 'electronics',
      image: 'test.jpg',
      slug: 'test-product-1',
      rating: 4.5,
      reviewCount: 10,
      inventory: 10,
      features: ['feature 1'],
    },
    quantity: 2,
  },
  {
    product: {
      id: '2',
      name: 'Test Product 2',
      price: 49.99,
      description: 'Test description 2',
      category: 'electronics',
      image: 'test2.jpg',
      slug: 'test-product-2',
      rating: 4.0,
      reviewCount: 5,
      inventory: 5,
      features: ['feature 1'],
    },
    quantity: 1,
  },
];

describe('calculateSubtotal', () => {
  it('should calculate correct subtotal for cart items', () => {
    const subtotal = calculateSubtotal(mockCartItems);
    // (29.99 * 2) + (49.99 * 1) = 59.98 + 49.99 = 109.97
    expect(subtotal).toBe(109.97);
  });

  it('should return 0 for empty cart', () => {
    expect(calculateSubtotal([])).toBe(0);
  });

  it('should handle single item', () => {
    const singleItem = [mockCartItems[0]];
    expect(calculateSubtotal(singleItem)).toBe(59.98);
  });

  it('should handle items with zero price', () => {
    const zeroPrice: CartItem[] = [
      {
        ...mockCartItems[0],
        product: { ...mockCartItems[0].product, price: 0 },
      },
    ];
    expect(calculateSubtotal(zeroPrice)).toBe(0);
  });
});

describe('calculateShipping', () => {
  it('should return free shipping for orders over $50', () => {
    expect(calculateShipping(50)).toBe(0);
    expect(calculateShipping(100)).toBe(0);
    expect(calculateShipping(50.01)).toBe(0);
  });

  it('should calculate $5 shipping for orders under $50', () => {
    expect(calculateShipping(49.99)).toBe(5);
    expect(calculateShipping(25)).toBe(5);
    expect(calculateShipping(0.01)).toBe(5);
  });

  it('should return free shipping for $0 orders', () => {
    expect(calculateShipping(0)).toBe(0);
  });
});

describe('calculateTax', () => {
  it('should calculate 10% tax correctly', () => {
    expect(calculateTax(100)).toBe(10);
    expect(calculateTax(50)).toBe(5);
    expect(calculateTax(1000)).toBe(100);
  });

  it('should round to 2 decimal places', () => {
    expect(calculateTax(10.55)).toBeCloseTo(1.06, 2);
    expect(calculateTax(99.99)).toBeCloseTo(10.00, 2);
  });

  it('should return 0 tax for $0 amount', () => {
    expect(calculateTax(0)).toBe(0);
  });
});

describe('calculateCartTotals', () => {
  it('should calculate correct totals for cart items', () => {
    const totals = calculateCartTotals(mockCartItems);
    // subtotal = 109.97
    // shipping = 0 (over $50)
    // tax = 10.997
    // total = 120.967
    expect(totals.subtotal).toBe(109.97);
    expect(totals.shipping).toBe(0);
    expect(totals.tax).toBeCloseTo(10.997, 2);
    expect(totals.total).toBeCloseTo(120.967, 2);
    expect(totals.totalItems).toBe(3);
  });

  it('should include shipping for orders under $50', () => {
    const smallCart = [mockCartItems[0]];
    const totals = calculateCartTotals(smallCart);
    // subtotal = 29.99
    // shipping = 5
    // tax = 2.999
    // total = 37.989
    expect(totals.subtotal).toBeCloseTo(59.98, 2);
    expect(totals.shipping).toBe(5);
  });

  it('should handle empty cart', () => {
    const totals = calculateCartTotals([]);
    expect(totals.subtotal).toBe(0);
    expect(totals.shipping).toBe(0);
    expect(totals.tax).toBe(0);
    expect(totals.total).toBe(0);
    expect(totals.totalItems).toBe(0);
  });
});
