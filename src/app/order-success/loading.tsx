/**
 * Loading skeleton for order success page
 * Supports dark mode with CSS variables
 */

import { Container } from '@/components/layout';

export default function OrderSuccessLoading() {
  return (
    <Container>
      <div className="min-h-[60vh] flex items-center justify-center py-12">
        <div className="max-w-md w-full animate-pulse">
          <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-6">
            {/* Icon Skeleton */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-muted rounded-full" />
            </div>

            {/* Title Skeleton */}
            <div className="h-8 bg-muted rounded w-48 mx-auto" />

            {/* Description Skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-5/6 mx-auto" />
            </div>

            {/* Order Details Skeleton */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <div className="h-4 bg-muted rounded w-24" />
                <div className="h-4 bg-muted rounded w-32" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-muted rounded w-24" />
                <div className="h-4 bg-muted rounded w-20" />
              </div>
            </div>

            {/* Button Skeleton */}
            <div className="h-12 bg-muted rounded-lg" />
          </div>
        </div>
      </div>
    </Container>
  );
}
