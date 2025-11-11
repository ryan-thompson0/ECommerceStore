/**
 * Validation schemas for checkout forms using Zod
 */

import { z } from 'zod';

export const shippingAddressSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters'),
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must not exceed 200 characters'),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must not exceed 100 characters'),
  state: z
    .string()
    .min(2, 'State must be at least 2 characters')
    .max(50, 'State must not exceed 50 characters'),
  zipCode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format'),
  country: z
    .string()
    .min(2, 'Country must be at least 2 characters')
    .max(100, 'Country must not exceed 100 characters'),
});

export const paymentMethodSchema = z.object({
  type: z.enum(['credit_card', 'debit_card', 'paypal']),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, 'Card number must be 16 digits')
    .optional(),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format')
    .optional(),
  cvv: z
    .string()
    .regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits')
    .optional(),
});

export const checkoutFormSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must not exceed 100 characters'),
  shippingAddress: shippingAddressSchema,
  paymentMethod: paymentMethodSchema,
});

export type CheckoutFormInput = z.infer<typeof checkoutFormSchema>;
