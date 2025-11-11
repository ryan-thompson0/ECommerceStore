/**
 * Loading state for product detail page
 */

import { Container } from '@/components/layout';

export default function Loading() {
  return (
    <Container className="py-8">
      <div className="h-10 bg-gray-200 rounded w-32 mb-6 animate-pulse" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Skeleton */}
        <div className="h-96 lg:h-[600px] bg-gray-200 rounded-lg animate-pulse" />

        {/* Info Skeleton */}
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
          <div className="h-12 bg-gray-200 rounded w-40 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
          </div>
          <div className="space-y-2 pt-4">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
          </div>
        </div>
      </div>
    </Container>
  );
}
