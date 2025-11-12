/**
 * Loading state for home page
 * Supports dark mode with CSS variables
 */

import { Container } from '@/components/layout';

export default function Loading() {
  return (
    <Container className="py-8">
      <div className="mb-8 animate-pulse space-y-2">
        <div className="h-10 bg-muted rounded w-1/2" />
        <div className="h-6 bg-muted rounded w-3/4" />
      </div>

      <div className="bg-card border border-border p-6 rounded-xl shadow-sm mb-8 animate-pulse">
        <div className="h-10 bg-muted rounded w-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-card rounded-xl border border-border overflow-hidden animate-pulse"
          >
            <div className="h-64 bg-muted" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-6 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
