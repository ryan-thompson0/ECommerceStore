/**
 * Header component with navigation and cart
 */

'use client';

import Link from 'next/link';
import { ShoppingCart, Store } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <header className="sticky top-0 z-50 bg-background border-b shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Store className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">ShopHub</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-foreground/70 hover:text-primary font-medium transition-colors"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-foreground/70 hover:text-primary font-medium transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-foreground/70 hover:text-primary font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <ThemeToggle />

              {/* Cart */}
            <Link
              href="/cart"
              className="flex items-center space-x-2 text-foreground/70 hover:text-primary transition-colors"
            >
              <div className="relative inline-flex">
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-medium">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
