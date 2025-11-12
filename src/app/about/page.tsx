/**
 * About page - Company information
 */

import { Container } from '@/components/layout';
import { Badge } from '@/components/ui';
import { Store, Sparkles, Shield, Heart, Zap, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <Container className="py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-scale-in">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary blur-2xl opacity-50 animate-pulse-glow" />
            <Store className="h-20 w-20 text-primary relative z-10" />
          </div>
        </div>
        <h1 className="text-5xl font-black text-foreground mb-4">
          About <span className="gradient-text">ShopHub</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Your trusted destination for quality products at competitive prices, built with modern technology and exceptional design.
        </p>
      </div>

      {/* Mission Section */}
      <div className="glass-card p-8 rounded-xl shadow-glow mb-12 border-2 border-primary/10 animate-slide-up">
        <div className="flex items-center space-x-3 mb-6">
          <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
        </div>
        <p className="text-lg text-foreground leading-relaxed mb-4">
          At ShopHub, we're committed to providing an exceptional online shopping experience that combines cutting-edge technology with user-friendly design. Our mission is to make quality products accessible to everyone while maintaining the highest standards of service and reliability.
        </p>
        <p className="text-lg text-foreground leading-relaxed">
          We believe that shopping online should be simple, secure, and enjoyable. That's why we've built our platform using the latest web technologies to ensure fast performance, beautiful design, and seamless interactions across all devices.
        </p>
      </div>

      {/* Values Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-foreground text-center mb-8">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quality */}
          <div className="glass-card p-6 rounded-xl border-2 border-primary/10 hover:border-primary/30 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-scale-in group">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-lg bg-gradient-primary">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Quality First</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We carefully curate our product selection to ensure every item meets our high standards of quality and durability.
            </p>
          </div>

          {/* Customer Focus */}
          <div className="glass-card p-6 rounded-xl border-2 border-primary/10 hover:border-primary/30 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-scale-in group" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-lg bg-gradient-cosmic">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Customer Focused</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Your satisfaction is our top priority. We're here to provide exceptional service and support every step of the way.
            </p>
          </div>

          {/* Innovation */}
          <div className="glass-card p-6 rounded-xl border-2 border-primary/10 hover:border-primary/30 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-scale-in group" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-lg bg-gradient-accent">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Innovation</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We leverage cutting-edge technology to create a fast, beautiful, and intuitive shopping experience.
            </p>
          </div>

          {/* Community */}
          <div className="glass-card p-6 rounded-xl border-2 border-primary/10 hover:border-primary/30 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-scale-in group" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-lg bg-gradient-secondary">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Community</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We're building a community of satisfied customers who trust us for their shopping needs.
            </p>
          </div>

          {/* Transparency */}
          <div className="glass-card p-6 rounded-xl border-2 border-primary/10 hover:border-primary/30 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-scale-in group" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-lg bg-gradient-aurora">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Transparency</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We believe in honest pricing, clear communication, and building trust through transparency.
            </p>
          </div>

          {/* Speed */}
          <div className="glass-card p-6 rounded-xl border-2 border-primary/10 hover:border-primary/30 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-scale-in group" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-lg bg-gradient-primary">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Fast Delivery</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We work with reliable shipping partners to ensure your orders arrive quickly and safely.
            </p>
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="glass-card p-8 rounded-xl shadow-glow border-2 border-primary/10 animate-slide-up">
        <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
          Built with Modern Technology
        </h2>
        <p className="text-lg text-foreground text-center mb-8 max-w-3xl mx-auto leading-relaxed">
          ShopHub is built using industry-leading web technologies to ensure the best possible experience for our customers.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Badge className="bg-gradient-primary text-white border-0 shadow-colored text-sm px-4 py-2">
            Next.js 16
          </Badge>
          <Badge className="bg-gradient-primary text-white border-0 shadow-colored text-sm px-4 py-2">
            React 19
          </Badge>
          <Badge className="bg-gradient-primary text-white border-0 shadow-colored text-sm px-4 py-2">
            TypeScript 5.9
          </Badge>
          <Badge className="bg-gradient-primary text-white border-0 shadow-colored text-sm px-4 py-2">
            Tailwind CSS 4
          </Badge>
          <Badge className="bg-gradient-primary text-white border-0 shadow-colored text-sm px-4 py-2">
            Zustand
          </Badge>
          <Badge className="bg-gradient-primary text-white border-0 shadow-colored text-sm px-4 py-2">
            Zod
          </Badge>
        </div>
      </div>
    </Container>
  );
}
