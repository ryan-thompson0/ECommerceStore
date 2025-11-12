/**
 * Product detail page (Server Component)
 * Includes SEO metadata and structured data
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Check } from 'lucide-react';
import { Container } from '@/components/layout';
import { Button, Badge } from '@/components/ui';
import { fetchProductById, transformProduct } from '@/lib/api/products';
import { formatCurrency } from '@/lib/utils/format';
import { generateProductMetadata } from '@/lib/seo/metadata';
import {
  generateProductSchema,
  generateBreadcrumbSchema,
  StructuredData,
} from '@/lib/seo/structured-data';
import { ProductClient } from './ProductClient';
import { BackButton } from './BackButton';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generates dynamic metadata for product pages
 */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const idMatch = resolvedParams.slug.match(/-(\d+)$/);

    if (!idMatch) {
      return {
        title: 'Product Not Found',
        description: 'The requested product could not be found.',
      };
    }

    const productId = parseInt(idMatch[1], 10);
    const productData = await fetchProductById(productId);
    const product = transformProduct(productData);

    return generateProductMetadata(product);
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Product Error',
      description: 'Unable to load product information.',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;

  // Extract product ID from slug (format: "product-name-ID")
  const idMatch = resolvedParams.slug.match(/-(\d+)$/);
  if (!idMatch) {
    return (
      <Container className="py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-foreground">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Link href="/">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </Container>
    );
  }

  try {
    const productId = parseInt(idMatch[1], 10);
    const productData = await fetchProductById(productId);
    const product = transformProduct(productData);

    // Generate breadcrumbs for structured data
    const breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Products', url: '/' },
      { name: product.category, url: `/?category=${product.category}` },
      { name: product.name, url: `/products/${resolvedParams.slug}` },
    ];

    return (
      <>
        {/* Structured Data (JSON-LD) */}
        <StructuredData data={generateProductSchema(product)} />
        <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />

        <Container className="py-8">
          <BackButton />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative h-96 lg:h-[600px] rounded-lg overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <Badge className="w-fit mb-3 capitalize bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 hover:bg-blue-100/80 dark:hover:bg-blue-900/60">
              {product.category}
            </Badge>

            <h1 className="text-4xl font-bold text-foreground mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-foreground">
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-primary">
                {formatCurrency(product.price)}
              </span>
            </div>

            {/* Description */}
            <p className="text-foreground text-lg mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3 text-foreground">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive elements */}
            <ProductClient product={product} />
          </div>
          </div>
        </Container>
      </>
    );
  } catch (error) {
    console.error('Error loading product:', error);

    return (
      <Container className="py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-foreground">Unable to Load Product</h1>
          <p className="text-muted-foreground mb-6">
            We're having trouble loading this product. Please try again later.
          </p>
          <Link href="/">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </Container>
    );
  }
}
