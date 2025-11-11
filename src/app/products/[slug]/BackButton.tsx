/**
 * Back button component for product detail page
 */

'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
    >
      <ArrowLeft className="h-5 w-5" />
      <span>Back to Products</span>
    </button>
  );
}
