import { describe, it, expect } from 'vitest';
import {
  formatCategoryName,
  CATEGORY_DISPLAY_MAP,
  TAX_RATE,
  SHIPPING_COST,
  FREE_SHIPPING_THRESHOLD,
} from '../products';

describe('product constants', () => {
  it('formats category names with capitalization', () => {
    expect(formatCategoryName("men's clothing")).toBe("Men's Clothing");
    expect(formatCategoryName('women clothing')).toBe('Women Clothing');
  });

  it('provides display names for all known categories', () => {
    expect(CATEGORY_DISPLAY_MAP).toMatchObject({
      electronics: 'Electronics',
      jewelery: 'Jewelry',
      "men's clothing": "Men's Clothing",
      "women's clothing": "Women's Clothing",
    });
  });

  it('exports consistent pricing constants', () => {
    expect(TAX_RATE).toBeCloseTo(0.08);
    expect(SHIPPING_COST).toBe(9.99);
    expect(FREE_SHIPPING_THRESHOLD).toBe(100);
  });
});
