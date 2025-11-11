/**
 * Order and checkout type definitions
 */

import type { CartItem } from './cart';

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentMethod {
  type: 'credit_card' | 'debit_card' | 'paypal';
  last4?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface CheckoutFormData {
  email: string;
  shippingAddress: ShippingAddress;
  paymentMethod: Omit<PaymentMethod, 'last4'> & {
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
  };
}
