/**
 * Loading skeleton for cart page
 * Supports dark mode with CSS variables
 */

import { Container } from '@/components/layout';

export default function CartLoading() {
  return (
    <Container>
      <div className="py-12 animate-pulse">
        {/* Page Title Skeleton */}
        <div className="h-10 w-48 bg-muted rounded-lg mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Cart Item Skeletons */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 bg-card rounded-lg border border-border"
              >
                {/* Image Skeleton */}
                <div className="flex-shrink-0 w-24 h-24 bg-muted rounded-md" />

                {/* Content Skeleton */}
                <div className="flex-grow space-y-3">
                  <div className="h-5 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="flex items-center justify-between">
                    <div className="h-8 w-32 bg-muted rounded" />
                    <div className="h-8 w-24 bg-muted rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="h-6 bg-muted rounded w-32 mb-6" />
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-4 bg-muted rounded w-24" />
                  <div className="h-4 bg-muted rounded w-20" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-muted rounded w-24" />
                  <div className="h-4 bg-muted rounded w-20" />
                </div>
                <div className="flex justify-between pt-4 border-t border-border">
                  <div className="h-6 bg-muted rounded w-20" />
                  <div className="h-6 bg-muted rounded w-24" />
                </div>
              </div>
              <div className="h-12 bg-muted rounded-lg mt-6" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
