import { describe, it, beforeEach, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckoutForm } from '../CheckoutForm';
import { useCartStore } from '@/store/cart';

describe('CheckoutForm', () => {
  beforeEach(() => {
    localStorage.clear();
    useCartStore.getState().clearCart();
  });

  const fillCheckoutForm = async (user: ReturnType<typeof userEvent.setup>, overrides?: { email?: string }) => {
    const email = overrides?.email ?? 'customer@example.com';
    await user.type(screen.getByLabelText(/Email/i), email);
    await user.type(screen.getByLabelText(/Full Name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/Address/i), '456 Market St');
    await user.type(screen.getByLabelText(/City/i), 'San Francisco');
    await user.type(screen.getByLabelText(/State/i), 'CA');
    await user.type(screen.getByLabelText(/ZIP Code/i), '94105');
    await user.type(screen.getByLabelText(/Country/i), 'United States');
    await user.type(screen.getByLabelText(/Card Number/i), '4111111111111111');
    await user.type(screen.getByLabelText(/Expiry Date/i), '12/34');
    await user.type(screen.getByLabelText(/CVV/i), '123');
  };

  it('prevents submission when the email is invalid', async () => {
    const clearCartSpy = vi.spyOn(useCartStore.getState(), 'clearCart');

    try {
      const user = userEvent.setup();
      render(<CheckoutForm />);

      await fillCheckoutForm(user, { email: 'bad-email' });

      await user.click(screen.getByRole('button', { name: /Complete Order/i }));

      await waitFor(() => expect(clearCartSpy).not.toHaveBeenCalled());
      const submitButton = screen.getByRole('button', { name: /Complete Order/i });
      expect(submitButton).not.toBeDisabled();
    } finally {
      clearCartSpy.mockRestore();
    }
  });

  it('clears the cart after a successful submit', async () => {
    const clearCartSpy = vi.spyOn(useCartStore.getState(), 'clearCart');

    try {
      const user = userEvent.setup();
      render(<CheckoutForm processingDelay={0} />);

      await fillCheckoutForm(user);

      await user.click(screen.getByRole('button', { name: /Complete Order/i }));

      await waitFor(() => expect(clearCartSpy).toHaveBeenCalled());
    } finally {
      clearCartSpy.mockRestore();
    }
  });
});
