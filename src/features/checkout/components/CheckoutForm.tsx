/**
 * Checkout form component with validation
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, Card } from '@/components/ui';
import { useCartStore } from '@/store/cart';
import { checkoutFormSchema } from '@/lib/validations/checkout';
import type { CheckoutFormData } from '@/types';

export function CheckoutForm() {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<CheckoutFormData>({
    email: '',
    shippingAddress: {
      fullName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
    },
    paymentMethod: {
      type: 'credit_card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof CheckoutFormData] as Record<string, unknown>),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data
      checkoutFormSchema.parse(formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Clear cart and redirect to success page
      clearCart();
      router.push('/order-success');
    } catch (error) {
      if (error instanceof Error && 'errors' in error) {
        const zodError = error as { errors: Array<{ path: string[]; message: string }> };
        const newErrors: Record<string, string> = {};
        zodError.errors.forEach((err) => {
          const path = err.path.join('.');
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <Card>
        <h2 className="text-xl font-bold mb-4">Contact Information</h2>
        <Input
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
          placeholder="john@example.com"
        />
      </Card>

      {/* Shipping Address */}
      <Card>
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
        <div className="space-y-4">
          <Input
            type="text"
            name="shippingAddress.fullName"
            label="Full Name"
            value={formData.shippingAddress.fullName}
            onChange={handleInputChange}
            error={errors['shippingAddress.fullName']}
            required
            placeholder="John Doe"
          />
          <Input
            type="text"
            name="shippingAddress.address"
            label="Address"
            value={formData.shippingAddress.address}
            onChange={handleInputChange}
            error={errors['shippingAddress.address']}
            required
            placeholder="123 Main St"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              name="shippingAddress.city"
              label="City"
              value={formData.shippingAddress.city}
              onChange={handleInputChange}
              error={errors['shippingAddress.city']}
              required
              placeholder="San Francisco"
            />
            <Input
              type="text"
              name="shippingAddress.state"
              label="State"
              value={formData.shippingAddress.state}
              onChange={handleInputChange}
              error={errors['shippingAddress.state']}
              required
              placeholder="CA"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              name="shippingAddress.zipCode"
              label="ZIP Code"
              value={formData.shippingAddress.zipCode}
              onChange={handleInputChange}
              error={errors['shippingAddress.zipCode']}
              required
              placeholder="94102"
            />
            <Input
              type="text"
              name="shippingAddress.country"
              label="Country"
              value={formData.shippingAddress.country}
              onChange={handleInputChange}
              error={errors['shippingAddress.country']}
              required
              placeholder="United States"
            />
          </div>
        </div>
      </Card>

      {/* Payment Method */}
      <Card>
        <h2 className="text-xl font-bold mb-4">Payment Method</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Type <span className="text-red-500">*</span>
            </label>
            <select
              name="paymentMethod.type"
              value={formData.paymentMethod.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          {formData.paymentMethod.type !== 'paypal' && (
            <>
              <Input
                type="text"
                name="paymentMethod.cardNumber"
                label="Card Number"
                value={formData.paymentMethod.cardNumber}
                onChange={handleInputChange}
                error={errors['paymentMethod.cardNumber']}
                required
                placeholder="1234567890123456"
                maxLength={16}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="paymentMethod.expiryDate"
                  label="Expiry Date"
                  value={formData.paymentMethod.expiryDate}
                  onChange={handleInputChange}
                  error={errors['paymentMethod.expiryDate']}
                  required
                  placeholder="MM/YY"
                  maxLength={5}
                />
                <Input
                  type="text"
                  name="paymentMethod.cvv"
                  label="CVV"
                  value={formData.paymentMethod.cvv}
                  onChange={handleInputChange}
                  error={errors['paymentMethod.cvv']}
                  required
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </>
          )}
        </div>
      </Card>

      <Button
        type="submit"
        size="lg"
        fullWidth
        isLoading={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : 'Complete Order'}
      </Button>
    </form>
  );
}
