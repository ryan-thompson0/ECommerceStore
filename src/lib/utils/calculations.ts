/**
 * Calculation utility functions for cart and pricing
 */

import type { CartItem } from '@/types';
import { TAX_RATE, SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '../constants/products';

/**
 * Calculates the subtotal for cart items
 * @param items - Array of cart items
 * @returns Subtotal amount
 */
export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
}

/**
 * Calculates tax based on subtotal
 * @param subtotal - The subtotal amount
 * @returns Tax amount
 */
export function calculateTax(subtotal: number): number {
  return subtotal * TAX_RATE;
}

/**
 * Calculates shipping cost based on subtotal
 * @param subtotal - The subtotal amount
 * @returns Shipping cost (0 if free shipping threshold is met)
 */
export function calculateShipping(subtotal: number): number {
  if (subtotal <= 0) {
    return 0;
  }

  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

/**
 * Calculates the total cart value including tax and shipping
 * @param items - Array of cart items
 * @returns Total cart value object
 */
export function calculateCartTotals(items: CartItem[]) {
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const total = subtotal + tax + shipping;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    subtotal,
    tax,
    shipping,
    total,
    totalItems,
  };
}

/**
 * Rounds a number to 2 decimal places
 * @param value - The number to round
 * @returns Rounded number
 */
export function roundToTwo(value: number): number {
  return Math.round(value * 100) / 100;
}
