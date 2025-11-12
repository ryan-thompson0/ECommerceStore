/**
 * Tests for format utility functions
 */

import { describe, it, expect } from 'vitest';
import { formatCurrency } from '../format';

describe('formatCurrency', () => {
  it('should format positive numbers as USD currency', () => {
    expect(formatCurrency(29.99)).toBe('$29.99');
    expect(formatCurrency(100)).toBe('$100.00');
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('should format zero as $0.00', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('should format negative numbers correctly', () => {
    expect(formatCurrency(-10.5)).toBe('-$10.50');
    expect(formatCurrency(-100)).toBe('-$100.00');
  });

  it('should handle large numbers with thousand separators', () => {
    expect(formatCurrency(1000000)).toBe('$1,000,000.00');
    expect(formatCurrency(999999.99)).toBe('$999,999.99');
  });

  it('should round to 2 decimal places', () => {
    expect(formatCurrency(10.999)).toBe('$11.00');
    expect(formatCurrency(10.994)).toBe('$10.99');
    expect(formatCurrency(10.995)).toBe('$11.00');
  });

  it('should handle very small numbers', () => {
    expect(formatCurrency(0.01)).toBe('$0.01');
    expect(formatCurrency(0.001)).toBe('$0.00');
  });
});
