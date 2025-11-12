/**
 * Loading skeleton for about page
 * Supports dark mode with CSS variables
 */

import { Container } from '@/components/layout';

export default function AboutLoading() {
  return (
    <Container>
      <div className="py-12 animate-pulse space-y-12">
        {/* Hero Section Skeleton */}
        <div className="text-center space-y-4">
          <div className="h-12 bg-muted rounded-lg w-96 mx-auto" />
          <div className="h-6 bg-muted rounded w-full max-w-2xl mx-auto" />
          <div className="h-6 bg-muted rounded w-3/4 max-w-xl mx-auto" />
        </div>

        {/* Feature Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-6 space-y-4"
            >
              <div className="w-12 h-12 bg-muted rounded-full mx-auto" />
              <div className="h-6 bg-muted rounded w-32 mx-auto" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-5/6 mx-auto" />
              </div>
            </div>
          ))}
        </div>

        {/* Content Section Skeleton */}
        <div className="bg-card border border-border rounded-xl p-8 space-y-6">
          <div className="h-8 bg-muted rounded w-64" />
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-4/5" />
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-3/4" />
          </div>
        </div>
      </div>
    </Container>
  );
}
