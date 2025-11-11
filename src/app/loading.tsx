/**
 * Loading state for home page
 */

import { Container } from '@/components/layout';

export default function Loading() {
  return (
    <Container className="py-8">
      <div className="mb-8">
        <div className="h-10 bg-gray-200 rounded w-1/2 mb-2 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="h-64 bg-gray-200 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
