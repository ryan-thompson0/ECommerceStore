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
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
