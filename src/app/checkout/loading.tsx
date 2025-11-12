/**
 * Loading skeleton for checkout page
 * Supports dark mode with CSS variables
 */

import { Container } from '@/components/layout';

export default function CheckoutLoading() {
  return (
    <Container>
      <div className="py-12 animate-pulse">
        {/* Page Title Skeleton */}
        <div className="h-10 w-40 bg-muted rounded-lg mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information Card */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="h-6 bg-muted rounded w-48 mb-4" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-20" />
                <div className="h-10 bg-muted rounded" />
              </div>
            </div>

            {/* Shipping Address Card */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="h-6 bg-muted rounded w-48 mb-4" />
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-24" />
                  <div className="h-10 bg-muted rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-24" />
                  <div className="h-10 bg-muted rounded" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-16" />
                    <div className="h-10 bg-muted rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-16" />
                    <div className="h-10 bg-muted rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="h-6 bg-muted rounded w-48 mb-4" />
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-32" />
                  <div className="h-10 bg-muted rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-28" />
                  <div className="h-10 bg-muted rounded" />
                </div>
              </div>
            </div>

            {/* Submit Button Skeleton */}
            <div className="h-12 bg-muted rounded-lg" />
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 space-y-4 sticky top-24">
              <div className="h-6 bg-muted rounded w-32 mb-6" />
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-16 h-16 bg-muted rounded" />
                    <div className="flex-grow space-y-2">
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-3 bg-muted rounded w-20" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 mt-6 space-y-3">
                <div className="flex justify-between">
                  <div className="h-4 bg-muted rounded w-24" />
                  <div className="h-4 bg-muted rounded w-20" />
                </div>
                <div className="flex justify-between">
                  <div className="h-6 bg-muted rounded w-20" />
                  <div className="h-6 bg-muted rounded w-24" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
