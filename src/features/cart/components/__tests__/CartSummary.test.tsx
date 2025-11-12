import { describe, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CartSummary } from '../CartSummary';
import { useCartStore } from '@/store/cart';
import type { Product, CartItem } from '@/types';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants/products';
import { formatCurrency } from '@/lib/utils/format';

const sampleProduct: Product = {
  id: 'prod-1',
  name: 'Sample Product',
  description: 'A reliable test product',
  price: 40,
  image: '/sample.png',
  category: 'electronics',
  inventory: 10,
  rating: 4.6,
  reviewCount: 5,
  features: ['lightweight'],
  slug: 'sample-product',
};

type CartValues = {
  items?: CartItem[];
  subtotal?: number;
  shipping?: number;
  tax?: number;
  total?: number;
  totalItems?: number;
};

function setCartState(overrides: CartValues) {
  useCartStore.setState({
    items: overrides.items ?? [],
    subtotal: overrides.subtotal ?? 0,
    shipping: overrides.shipping ?? 0,
    tax: overrides.tax ?? 0,
    total: overrides.total ?? 0,
    totalItems: overrides.totalItems ?? 0,
  });
}

describe('CartSummary', () => {
  beforeEach(() => {
    localStorage.clear();
    useCartStore.getState().clearCart();
  });

  it('disables checkout when the cart is empty', () => {
    setCartState({});
    render(<CartSummary />);

    const checkoutButton = screen.getByRole('button', { name: /Proceed to Checkout/i });
    expect(checkoutButton).toBeDisabled();
    expect(screen.queryByText(/FREE shipping/i)).not.toBeInTheDocument();
  });

  it('shows a reminder when more is needed for free shipping', () => {
    const subtotal = 80;
    const shipping = 9.99;
    const tax = subtotal * 0.08;
    const cartItem: CartItem = { product: sampleProduct, quantity: 1 };

    setCartState({
      items: [cartItem],
      subtotal,
      shipping,
      tax,
      total: subtotal + shipping + tax,
      totalItems: 1,
    });

    render(<CartSummary />);

    const reminder = screen.getByText(/Add .* more to get FREE shipping!/i);
    expect(reminder).toBeInTheDocument();
    const remaining = formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal);
    expect(reminder.textContent).toContain(remaining);
  });

  it('celebrates free shipping once threshold is met', () => {
    const subtotal = 150;
    const cartItem: CartItem = { product: sampleProduct, quantity: 2 };

    setCartState({
      items: [cartItem],
      subtotal,
      tax: subtotal * 0.08,
      shipping: 0,
      total: subtotal + subtotal * 0.08,
      totalItems: 2,
    });

    render(<CartSummary />);

    expect(screen.getByText(/You qualify for FREE shipping!/i)).toBeInTheDocument();
  });
});
