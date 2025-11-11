/**
 * Header component with navigation and cart
 */

'use client';

import Link from 'next/link';
import { ShoppingCart, Store } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { Badge } from '@/components/ui';

export function Header() {
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Store className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">ShopHub</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <Badge variant="danger" size="sm" className="absolute -top-2 -right-2">
                {totalItems}
              </Badge>
            )}
            <span className="hidden sm:inline font-medium">Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
