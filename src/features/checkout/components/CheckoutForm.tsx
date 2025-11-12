/**
 * Checkout form component with validation
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, Card, Label } from '@/components/ui';
import { useCartStore } from '@/store/cart';
import { checkoutFormSchema } from '@/lib/validations/checkout';
import type { CheckoutFormData } from '@/types';
import { Loader2 } from 'lucide-react';

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
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 text-foreground">Contact Information</h2>
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="john@example.com"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}
        </div>
      </Card>

      {/* Shipping Address */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 text-foreground">Shipping Address</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              type="text"
              name="shippingAddress.fullName"
              value={formData.shippingAddress.fullName}
              onChange={handleInputChange}
              required
              placeholder="John Doe"
              className={errors['shippingAddress.fullName'] ? 'border-red-500' : ''}
            />
            {errors['shippingAddress.fullName'] && (
              <p className="text-sm text-red-600">{errors['shippingAddress.fullName']}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">
              Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              type="text"
              name="shippingAddress.address"
              value={formData.shippingAddress.address}
              onChange={handleInputChange}
              required
              placeholder="123 Main St"
              className={errors['shippingAddress.address'] ? 'border-red-500' : ''}
            />
            {errors['shippingAddress.address'] && (
              <p className="text-sm text-red-600">{errors['shippingAddress.address']}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                type="text"
                name="shippingAddress.city"
                value={formData.shippingAddress.city}
                onChange={handleInputChange}
                required
                placeholder="San Francisco"
                className={errors['shippingAddress.city'] ? 'border-red-500' : ''}
              />
              {errors['shippingAddress.city'] && (
                <p className="text-sm text-red-600">{errors['shippingAddress.city']}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">
                State <span className="text-red-500">*</span>
              </Label>
              <Input
                id="state"
                type="text"
                name="shippingAddress.state"
                value={formData.shippingAddress.state}
                onChange={handleInputChange}
                required
                placeholder="CA"
                className={errors['shippingAddress.state'] ? 'border-red-500' : ''}
              />
              {errors['shippingAddress.state'] && (
                <p className="text-sm text-red-600">{errors['shippingAddress.state']}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zipCode">
                ZIP Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="zipCode"
                type="text"
                name="shippingAddress.zipCode"
                value={formData.shippingAddress.zipCode}
                onChange={handleInputChange}
                required
                placeholder="94102"
                className={errors['shippingAddress.zipCode'] ? 'border-red-500' : ''}
              />
              {errors['shippingAddress.zipCode'] && (
                <p className="text-sm text-red-600">{errors['shippingAddress.zipCode']}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">
                Country <span className="text-red-500">*</span>
              </Label>
              <Input
                id="country"
                type="text"
                name="shippingAddress.country"
                value={formData.shippingAddress.country}
                onChange={handleInputChange}
                required
                placeholder="United States"
                className={errors['shippingAddress.country'] ? 'border-red-500' : ''}
              />
              {errors['shippingAddress.country'] && (
                <p className="text-sm text-red-600">{errors['shippingAddress.country']}</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Payment Method */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 text-foreground">Payment Method</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="paymentType">
              Payment Type <span className="text-red-500">*</span>
            </Label>
            <select
              id="paymentType"
              name="paymentMethod.type"
              value={formData.paymentMethod.type}
              onChange={handleInputChange}
              className="flex h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
            >
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          {formData.paymentMethod.type !== 'paypal' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">
                  Card Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cardNumber"
                  type="text"
                  name="paymentMethod.cardNumber"
                  value={formData.paymentMethod.cardNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="1234567890123456"
                  maxLength={16}
                  className={errors['paymentMethod.cardNumber'] ? 'border-red-500' : ''}
                />
                {errors['paymentMethod.cardNumber'] && (
                  <p className="text-sm text-red-600">{errors['paymentMethod.cardNumber']}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">
                    Expiry Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="expiryDate"
                    type="text"
                    name="paymentMethod.expiryDate"
                    value={formData.paymentMethod.expiryDate}
                    onChange={handleInputChange}
                    required
                    placeholder="MM/YY"
                    maxLength={5}
                    className={errors['paymentMethod.expiryDate'] ? 'border-red-500' : ''}
                  />
                  {errors['paymentMethod.expiryDate'] && (
                    <p className="text-sm text-red-600">{errors['paymentMethod.expiryDate']}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">
                    CVV <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cvv"
                    type="text"
                    name="paymentMethod.cvv"
                    value={formData.paymentMethod.cvv}
                    onChange={handleInputChange}
                    required
                    placeholder="123"
                    maxLength={4}
                    className={errors['paymentMethod.cvv'] ? 'border-red-500' : ''}
                  />
                  {errors['paymentMethod.cvv'] && (
                    <p className="text-sm text-red-600">{errors['paymentMethod.cvv']}</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </Card>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? 'Processing...' : 'Complete Order'}
      </Button>
    </form>
  );
}
