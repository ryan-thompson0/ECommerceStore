/**
 * Home page - Product listing with filters (Server Component)
 */

import { Container } from '@/components/layout';
import { fetchProducts, fetchCategories, transformProduct } from '@/lib/api/products';
import { ProductsClient } from './ProductsClient';

export default async function HomePage() {
  try {
    // Fetch products and categories from API in parallel
    const [productsData, categoriesData] = await Promise.all([
      fetchProducts(),
      fetchCategories(),
    ]);

    // Transform API data to app format
    const products = productsData.map(transformProduct);

    return (
      <Container className="py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Discover Amazing Products
          </h1>
          <p className="text-gray-600 text-lg">
            Browse our collection of high-quality products at competitive prices
          </p>
        </div>

        <ProductsClient products={products} categories={categoriesData} />
      </Container>
    );
  } catch (error) {
    console.error('Error loading products:', error);

    return (
      <Container className="py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Unable to Load Products
          </h1>
          <p className="text-gray-600 mb-6">
            We're having trouble loading products. Please try again later.
          </p>
        </div>
      </Container>
    );
  }
}
