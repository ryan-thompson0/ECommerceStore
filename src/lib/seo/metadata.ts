/**
 * SEO metadata utility functions
 * Generates metadata objects for Next.js pages
 */

import type { Metadata } from 'next';
import { env } from '@/lib/env';

/**
 * Default metadata configuration
 */
const defaultMetadata = {
  siteName: env.NEXT_PUBLIC_APP_NAME,
  siteUrl: env.NEXT_PUBLIC_APP_URL,
  defaultTitle: 'ShopHub - Modern E-Commerce Store',
  defaultDescription:
    'Discover amazing products at great prices. Shop electronics, clothing, jewelry and more with fast, free shipping.',
  defaultImage: '/og-image.png',
  twitterHandle: '@shophub',
};

/**
 * Generates metadata for product pages
 */
export function generateProductMetadata(product: {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}): Metadata {
  const title = `${product.name} | ${defaultMetadata.siteName}`;
  const description = product.description.slice(0, 160);
  const url = `${defaultMetadata.siteUrl}/products/${encodeURIComponent(
    product.name.toLowerCase().replace(/\s+/g, '-')
  )}`;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.category,
      'buy online',
      'e-commerce',
      'shop',
      'ShopHub',
    ],
    authors: [{ name: defaultMetadata.siteName }],
    creator: defaultMetadata.siteName,
    publisher: defaultMetadata.siteName,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: defaultMetadata.siteName,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: defaultMetadata.twitterHandle,
      creator: defaultMetadata.twitterHandle,
      title,
      description,
      images: [product.image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generates metadata for static pages
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  image = defaultMetadata.defaultImage,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const fullTitle = title.includes(defaultMetadata.siteName)
    ? title
    : `${title} | ${defaultMetadata.siteName}`;
  const url = `${defaultMetadata.siteUrl}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      url,
      title: fullTitle,
      description,
      siteName: defaultMetadata.siteName,
      images: [
        {
          url: image.startsWith('http')
            ? image
            : `${defaultMetadata.siteUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: defaultMetadata.twitterHandle,
      creator: defaultMetadata.twitterHandle,
      title: fullTitle,
      description,
      images: [
        image.startsWith('http') ? image : `${defaultMetadata.siteUrl}${image}`,
      ],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}

/**
 * Generates metadata for the home page
 */
export function generateHomeMetadata(): Metadata {
  return generatePageMetadata({
    title: defaultMetadata.defaultTitle,
    description: defaultMetadata.defaultDescription,
    path: '/',
  });
}
