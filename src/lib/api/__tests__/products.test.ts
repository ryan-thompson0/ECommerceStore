import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  fetchProducts,
  fetchProductById,
  fetchCategories,
  fetchProductsByCategory,
  transformProduct,
  createSlug,
  generateFeatures,
  FakeStoreProduct,
} from '../products';
import { env } from '@/lib/env';

const createResponse = (body: unknown, ok = true, statusText = 'OK') => ({
  ok,
  statusText,
  json: () => Promise.resolve(body),
});

let fetchMock: ReturnType<typeof vi.fn>;

describe('FakeStore API helpers', () => {
  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches products without a limit', async () => {
    const data = [{ id: 1 }];
    fetchMock.mockResolvedValueOnce(createResponse(data));

    const products = await fetchProducts();
    expect(products).toEqual(data);
    expect(fetchMock).toHaveBeenCalledWith(`${env.NEXT_PUBLIC_API_URL}/products`, {
      next: { revalidate: 3600 },
    });
  });

  it('includes limit when provided', async () => {
    const data = [{ id: 2 }];
    fetchMock.mockResolvedValueOnce(createResponse(data));

    await fetchProducts(5);
    expect(fetchMock).toHaveBeenCalledWith(
      `${env.NEXT_PUBLIC_API_URL}/products?limit=5`,
      { next: { revalidate: 3600 } }
    );
  });

  it('throws when fetching products fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    fetchMock.mockResolvedValueOnce(createResponse({ message: 'nope' }, false, 'Not Found'));

    await expect(fetchProducts()).rejects.toThrow('Failed to fetch products: Not Found');
    consoleSpy.mockRestore();
  });

  it('fetches product by id', async () => {
    const data = { id: 5 };
    fetchMock.mockResolvedValueOnce(createResponse(data));

    const result = await fetchProductById(5);
    expect(result).toEqual(data);
    expect(fetchMock).toHaveBeenCalledWith(`${env.NEXT_PUBLIC_API_URL}/products/5`, {
      next: { revalidate: 3600 },
    });
  });

  it('fetches categories', async () => {
    const categories = ['electronics'];
    fetchMock.mockResolvedValueOnce(createResponse(categories));

    await fetchCategories();
    expect(fetchMock).toHaveBeenCalledWith(
      `${env.NEXT_PUBLIC_API_URL}/products/categories`,
      { next: { revalidate: 86400 } }
    );
  });

  it('fetches products by category', async () => {
    const payload = [{ id: 10 }];
    fetchMock.mockResolvedValueOnce(createResponse(payload));

    await fetchProductsByCategory('electronics');
    expect(fetchMock).toHaveBeenCalledWith(
      `${env.NEXT_PUBLIC_API_URL}/products/category/electronics`,
      { next: { revalidate: 3600 } }
    );
  });
});

describe('product transformation helpers', () => {
  const fakeProduct: FakeStoreProduct = {
    id: 123,
    title: 'Cool Gadget',
    price: 99.99,
    description:
      'This gadget is fast. It comes with a case. It feels premium. Extra sentence for padding.',
    category: 'electronics',
    image: 'https://example.com/image.png',
    rating: {
      rate: 4.8,
      count: 123,
    },
  };

  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates a stable slug from title and id', () => {
    expect(createSlug('Cool Gadget!', 123)).toBe('cool-gadget-123');
  });

  it('generates features from description sentences', () => {
    const features = generateFeatures(fakeProduct);
    expect(features).toHaveLength(3);
    expect(features[0]).toBe('This gadget is fast');
  });

  it('falls back to category features when description is short', () => {
    const shortDescriptionProduct = { ...fakeProduct, description: 'Tiny' };
    const features = generateFeatures(shortDescriptionProduct);
    expect(features).toContain('High Quality');
  });

  it('transforms FakeStore products to app products', () => {
    const transformed = transformProduct(fakeProduct);
    expect(transformed.id).toBe('123');
    expect(transformed.slug).toBe('cool-gadget-123');
    expect(transformed.inventory).toBe(20);
    expect(transformed.features).toHaveLength(3);
  });
});
