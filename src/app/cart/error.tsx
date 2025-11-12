'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Cart page error boundary
 * Handles errors specific to the shopping cart
 */
export default function CartError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Cart page error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-xl p-8 text-center space-y-6">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
              <div className="relative bg-primary/10 dark:bg-primary/20 p-4 rounded-full">
                <ShoppingCart className="h-12 w-12 text-primary" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Cart Error
            </h2>
            <p className="text-muted-foreground">
              We encountered an issue loading your cart. Your items are safe and stored locally.
            </p>
          </div>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-muted/50 rounded-lg p-4 text-left">
              <p className="text-xs font-mono text-muted-foreground break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={reset}
              className="flex-1 gap-2"
              variant="default"
            >
              <RefreshCw className="h-4 w-4" />
              Reload Cart
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1 gap-2"
            >
              <Link href="/">
                <Home className="h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
