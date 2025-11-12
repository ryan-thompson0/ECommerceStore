/**
 * Premium footer with glassmorphism and gradient effects
 */

import Link from 'next/link';
import { Github, Linkedin, Twitter, Sparkles, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto relative overflow-hidden">
      {/* Top Gradient Border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      {/* Glass Background */}
      <div className="glass-card border-t border-primary/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* About */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-bold text-primary gradient-text">
                  About ShopHub
                </h3>
                <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your one-stop destination for quality products at great prices.
                Built with modern web technologies and premium design.
              </p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
                <span>by the ShopHub team</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-foreground">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 h-px bg-gradient-primary group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2" />
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 h-px bg-gradient-primary group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 h-px bg-gradient-primary group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-foreground">Customer Service</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 h-px bg-gradient-primary group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2" />
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 h-px bg-gradient-primary group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2" />
                    Returns
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 h-px bg-gradient-primary group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2" />
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-foreground">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 rounded-lg glass hover:bg-gradient-primary transition-all duration-300 hover:scale-110 hover:shadow-glow"
                >
                  <Github className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors duration-300" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 rounded-lg glass hover:bg-gradient-accent transition-all duration-300 hover:scale-110 hover:shadow-glow"
                >
                  <Twitter className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors duration-300" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 rounded-lg glass hover:bg-gradient-cosmic transition-all duration-300 hover:scale-110 hover:shadow-glow"
                >
                  <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright with Premium Styling */}
          <div className="border-t border-primary/20 mt-12 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              &copy; {currentYear} <span className="font-bold text-primary gradient-text">ShopHub</span>. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs mt-2">
              Built with Next.js, React, and TypeScript
            </p>
          </div>
        </div>

        {/* Decorative Gradient Blobs */}
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-primary opacity-10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-accent opacity-10 blur-3xl pointer-events-none" />
      </div>
    </footer>
  );
}
