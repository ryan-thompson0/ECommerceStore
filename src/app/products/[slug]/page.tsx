/**
 * Product detail page (Server Component)
 */

import Image from 'next/image';
import Link from 'next/link';
import { Star, Check } from 'lucide-react';
import { Container } from '@/components/layout';
import { Button, Badge } from '@/components/ui';
import { fetchProductById, transformProduct } from '@/lib/api/products';
import { formatCurrency } from '@/lib/utils/format';
import { ProductClient } from './ProductClient';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;

  // Extract product ID from slug (format: "product-name-ID")
  const idMatch = resolvedParams.slug.match(/-(\d+)$/);
  if (!idMatch) {
    return (
      <Container className="py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">
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

    return (
      <Container className="py-8">
        <ProductClient product={product} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative h-96 lg:h-[600px] rounded-lg overflow-hidden bg-gray-100">
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
            <Badge variant="info" size="md" className="w-fit mb-3 capitalize">
              {product.category}
            </Badge>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
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
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-700">
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-blue-600">
                {formatCurrency(product.price)}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive elements are in ProductClient */}
          </div>
        </div>
      </Container>
    );
  } catch (error) {
    console.error('Error loading product:', error);

    return (
      <Container className="py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Unable to Load Product</h1>
          <p className="text-gray-600 mb-6">
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
