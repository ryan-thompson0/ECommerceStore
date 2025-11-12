'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { CreditCard, ShoppingCart, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Checkout page error boundary
 * Handles errors specific to the checkout process
 */
export default function CheckoutError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Checkout error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-xl p-8 text-center space-y-6">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-destructive/20 rounded-full blur-xl animate-pulse" />
              <div className="relative bg-destructive/10 dark:bg-destructive/20 p-4 rounded-full">
                <CreditCard className="h-12 w-12 text-destructive" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Checkout Error
            </h2>
            <p className="text-muted-foreground">
              We couldn&apos;t process your checkout. Don&apos;t worry, your cart is still saved.
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
              Try Again
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1 gap-2"
            >
              <Link href="/cart">
                <ShoppingCart className="h-4 w-4" />
                Back to Cart
              </Link>
            </Button>
          </div>

          {/* Help Text */}
          <p className="text-xs text-muted-foreground pt-4">
            If you continue to experience issues, please check your internet connection or try again later.
          </p>
        </div>
      </div>
    </div>
  );
}
