/**
 * Structured data (JSON-LD) generators for SEO
 * Creates schema.org compliant structured data
 */

import { env } from '@/lib/env';
import type { Product } from '@/types';

/**
 * Generates Organization schema
 * Used in the root layout for site-wide organization info
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: env.NEXT_PUBLIC_APP_NAME,
    url: env.NEXT_PUBLIC_APP_URL,
    logo: `${env.NEXT_PUBLIC_APP_URL}/logo.png`,
    description: 'Modern e-commerce platform for quality products',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@shophub.com',
    },
    sameAs: [
      'https://twitter.com/shophub',
      'https://facebook.com/shophub',
      'https://instagram.com/shophub',
    ],
  };
}

/**
 * Generates WebSite schema
 * Used in the root layout for site-wide search
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: env.NEXT_PUBLIC_APP_NAME,
    url: env.NEXT_PUBLIC_APP_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${env.NEXT_PUBLIC_APP_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generates Product schema for product pages
 */
export function generateProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.id,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: env.NEXT_PUBLIC_APP_NAME,
    },
    offers: {
      '@type': 'Offer',
      url: `${env.NEXT_PUBLIC_APP_URL}/products/${product.slug}`,
      priceCurrency: 'USD',
      price: product.price.toFixed(2),
      availability:
        product.inventory > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: env.NEXT_PUBLIC_APP_NAME,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toFixed(1),
      reviewCount: product.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
  };
}

/**
 * Generates BreadcrumbList schema for navigation
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{
  name: string;
  url: string;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${env.NEXT_PUBLIC_APP_URL}${crumb.url}`,
    })),
  };
}

/**
 * Component for rendering JSON-LD structured data
 * Use this component to inject structured data into pages
 *
 * @example
 * ```tsx
 * <StructuredData data={generateProductSchema(product)} />
 * ```
 */
export function StructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
