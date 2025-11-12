import { describe, it, expect } from 'vitest';
import { checkoutFormSchema } from '../checkout';

describe('checkout form validation', () => {
  const validForm = {
    email: 'customer@example.com',
    shippingAddress: {
      fullName: 'Jane Doe',
      address: '456 Market St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'United States',
    },
    paymentMethod: {
      type: 'credit_card',
      cardNumber: '4111111111111111',
      expiryDate: '12/34',
      cvv: '123',
    },
  };

  it('accepts valid checkout data', () => {
    const result = checkoutFormSchema.safeParse(validForm);
    expect(result.success).toBe(true);
  });

  it('rejects invalid ZIP codes', () => {
    const invalidZip = {
      ...validForm,
      shippingAddress: {
        ...validForm.shippingAddress,
        zipCode: 'abc',
      },
    };

    const result = checkoutFormSchema.safeParse(invalidZip);
    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);
      expect(messages).toContain('Invalid ZIP code format');
    }
  });

  it('rejects emails with invalid formatting', () => {
    const shortEmail = {
      ...validForm,
      email: 'a@b.c',
    };

    const result = checkoutFormSchema.safeParse(shortEmail);
    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);
      expect(messages).toContain('Invalid email address');
    }
  });

  it('rejects empty emails that violate the minimum length', () => {
    const emptyEmail = {
      ...validForm,
      email: '',
    };

    const result = checkoutFormSchema.safeParse(emptyEmail);
    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);
      expect(messages).toContain('Email must be at least 5 characters');
    }
  });
});
