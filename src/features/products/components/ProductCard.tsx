/**
 * Product card component with premium 3D effects and glassmorphism
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Sparkles } from 'lucide-react';
import type { Product } from '@/types';
import { Card, Button, Badge } from '@/components/ui';
import { formatCurrency } from '@/lib/utils/format';
import { useCartStore } from '@/store/cart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <Card className="h-full flex flex-col overflow-hidden relative transform-3d transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-glow-lg animate-scale-in glass-card border-2 border-primary/10 hover:border-primary/30">
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none z-10" />

        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-shimmer opacity-0 group-hover:opacity-100 animate-shimmer pointer-events-none z-20" />

        {/* Product Image Container with 3D Effect */}
        <div className="relative w-full h-72 overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10">
          <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-700">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Gradient Overlay on Image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Inventory Badges with Glass Effect */}
          {product.inventory < 10 && product.inventory > 0 && (
            <Badge
              className="absolute top-4 right-4 glass backdrop-blur-xl bg-gradient-cosmic text-white border-white/30 shadow-glow animate-pulse-glow"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              Low Stock
            </Badge>
          )}
          {product.inventory === 0 && (
            <Badge
              variant="destructive"
              className="absolute top-4 right-4 glass backdrop-blur-xl shadow-lg"
            >
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Product Info with Enhanced Styling */}
        <div className="p-6 flex flex-col flex-grow relative z-30 bg-card/80 backdrop-blur-sm">
          <div className="flex-grow space-y-3">
            {/* Category Badge with Gradient */}
            <div className="flex items-center justify-between">
              <div className="capitalize inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold bg-gradient-primary text-white border-0 shadow-colored hover:shadow-glow transition-shadow duration-300">
                {product.category}
              </div>

              {/* Rating with Enhanced Styling */}
              <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 px-3 py-1 rounded-full border border-yellow-400/30">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 drop-shadow-glow" />
                <span className="text-sm font-bold text-foreground">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({product.reviewCount})
                </span>
              </div>
            </div>

            {/* Product Name with Gradient Text on Hover */}
            <h3 className="font-bold text-xl text-foreground mb-2 line-clamp-2 group-hover:gradient-text transition-all duration-300">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Price and Add to Cart with Fancy Styling */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-primary/20">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Price
              </span>
              <span className="text-2xl font-bold text-primary gradient-text">
                {formatCurrency(product.price)}
              </span>
            </div>
            <Button
              size="default"
              onClick={handleAddToCart}
              disabled={product.inventory === 0}
              className="flex items-center space-x-2 bg-gradient-primary hover:shadow-glow-lg hover:scale-105 transition-all duration-300 border-0 shadow-colored group/button"
            >
              <ShoppingCart className="h-4 w-4 group-hover/button:rotate-12 transition-transform duration-300" />
              <span className="font-medium">Add to Cart</span>
            </Button>
          </div>
        </div>

        {/* Corner Accent Decoration */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-accent opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500" />
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-secondary opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500" />
      </Card>
    </Link>
  );
}
