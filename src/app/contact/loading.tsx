/**
 * Loading skeleton for contact page
 * Supports dark mode with CSS variables
 */

import { Container } from '@/components/layout';

export default function ContactLoading() {
  return (
    <Container>
      <div className="py-12 animate-pulse">
        {/* Page Title Skeleton */}
        <div className="text-center space-y-4 mb-12">
          <div className="h-12 bg-muted rounded-lg w-64 mx-auto" />
          <div className="h-6 bg-muted rounded w-96 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form Skeleton */}
          <div className="bg-card border border-border rounded-xl p-8 space-y-6">
            <div className="h-8 bg-muted rounded w-48 mb-6" />

            {/* Form Fields */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-muted rounded w-24" />
                <div className="h-10 bg-muted rounded" />
              </div>
            ))}

            {/* Message Field (taller) */}
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-24" />
              <div className="h-32 bg-muted rounded" />
            </div>

            {/* Submit Button */}
            <div className="h-12 bg-muted rounded-lg" />
          </div>

          {/* Contact Info Skeleton */}
          <div className="space-y-6">
            {/* Contact Cards */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-6 space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-full" />
                  <div className="h-6 bg-muted rounded w-32" />
                </div>
                <div className="h-4 bg-muted rounded w-48" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
