/**
 * Premium header with glassmorphism and floating effect
 */

'use client';

import Link from 'next/link';
import { ShoppingCart, Store } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <header className="sticky top-0 z-50 animate-slide-up">
      {/* Glassmorphism Background */}
      <div className="glass-card border-b border-primary/20 shadow-glow">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            {/* Logo with Gradient Effect */}
            <Link
              href="/"
              className="flex items-center space-x-3 group hover:scale-105 transition-transform duration-300"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <Store className="h-9 w-9 text-primary relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span className="text-2xl font-black text-primary gradient-text group-hover:animate-pulse-glow">
                ShopHub
              </span>
            </Link>

            {/* Navigation with Enhanced Styling */}
            <nav className="hidden md:flex items-center space-x-2" aria-label="Main navigation">
              <Link
                href="/"
                className="relative px-4 py-2 text-foreground/80 hover:text-primary font-semibold transition-all duration-300 group overflow-hidden rounded-lg"
              >
                <span className="relative z-10">Products</span>
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-primary group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                href="/about"
                className="relative px-4 py-2 text-foreground/80 hover:text-primary font-semibold transition-all duration-300 group overflow-hidden rounded-lg"
              >
                <span className="relative z-10">About</span>
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-primary group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                href="/contact"
                className="relative px-4 py-2 text-foreground/80 hover:text-primary font-semibold transition-all duration-300 group overflow-hidden rounded-lg"
              >
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-primary group-hover:w-full transition-all duration-300" />
              </Link>
            </nav>

            {/* Actions with Enhanced Styling */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Cart with Premium Design */}
              <Link
                href="/cart"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary text-white [background-image:var(--gradient-primary)] hover:shadow-glow-lg hover:scale-105 transition-all duration-300 group"
                aria-label={`Shopping cart with ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
              >
                <div className="relative inline-flex">
                  <ShoppingCart className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
                  {totalItems > 0 && (
                    <span
                      className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full [background-image:var(--gradient-cosmic)] text-white text-[10px] font-bold shadow-glow animate-pulse-glow border border-white/30"
                      aria-label={`${totalItems} items in cart`}
                    >
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-bold" aria-hidden="true">Cart</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Border */}
        <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      </div>
    </header>
  );
}
