/**
 * Root layout component
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header, Footer } from '@/components/layout';
import { ThemeProvider } from '@/components/theme-provider';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ShopHub - Modern E-Commerce Store',
  description:
    'Shop the latest products at great prices. Built with Next.js, React, and TypeScript.',
  keywords: ['ecommerce', 'shop', 'online store', 'products'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col relative overflow-x-hidden">
        {/* Animated Background Gradients */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Primary Gradient Orb - Top Left */}
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-primary opacity-20 blur-3xl animate-float" />

          {/* Secondary Gradient Orb - Top Right */}
          <div className="absolute -top-1/3 -right-1/4 w-2/3 h-2/3 bg-gradient-accent opacity-15 blur-3xl animate-pulse-glow"
               style={{ animationDelay: '1s' }} />

          {/* Accent Gradient Orb - Bottom Left */}
          <div className="absolute -bottom-1/4 -left-1/3 w-2/3 h-2/3 bg-gradient-cosmic opacity-10 blur-3xl animate-float"
               style={{ animationDelay: '2s' }} />

          {/* Aurora Gradient Orb - Bottom Right */}
          <div className="absolute -bottom-1/3 -right-1/4 w-1/2 h-1/2 bg-gradient-aurora opacity-15 blur-3xl animate-pulse-glow"
               style={{ animationDelay: '3s' }} />

          {/* Mesh Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        </div>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-grow relative z-0">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
