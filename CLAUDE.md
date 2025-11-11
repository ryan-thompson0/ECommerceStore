# ShopHub E-Commerce - Coding Practices & Standards

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [API Integration](#api-integration)
4. [TypeScript Standards](#typescript-standards)
5. [Code Organization](#code-organization)
6. [Component Guidelines](#component-guidelines)
7. [State Management](#state-management)
8. [Styling Guidelines](#styling-guidelines)
9. [Performance Best Practices](#performance-best-practices)
10. [Testing Strategy](#testing-strategy)
11. [Accessibility](#accessibility)

---

## Project Overview

ShopHub is a modern, production-ready e-commerce application built with:

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript 5.9**
- **Tailwind CSS 4**
- **Zustand** (State Management)
- **Zod** (Schema Validation)

This project demonstrates enterprise-level code quality, following industry best practices and modern web development standards.

---

## Architecture

### Clean Architecture Principles

The project follows a **feature-based architecture** with clear separation of concerns:

```
src/
├── app/              # Next.js App Router pages (routing & layouts)
├── components/       # Reusable UI components
│   ├── ui/          # Base components (Button, Input, Card, etc.)
│   └── layout/      # Layout components (Header, Footer, Container)
├── features/        # Feature modules (domain-driven design)
│   ├── products/   # Product-related features
│   ├── cart/       # Shopping cart features
│   └── checkout/   # Checkout flow features
├── lib/            # Utilities and helpers
│   ├── api/        # API service layer (FakeStore API)
│   ├── utils/      # Pure utility functions
│   ├── constants/  # Application constants
│   └── validations/ # Zod validation schemas
├── store/          # Zustand stores (global state)
├── types/          # TypeScript type definitions
└── styles/         # Global styles
```

### Key Architectural Decisions

1. **Feature-Based Organization**: Related code is grouped by feature, not by type
2. **Composition Over Inheritance**: React components use composition patterns
3. **Single Responsibility**: Each module has one clear purpose
4. **Dependency Injection**: Components receive dependencies via props
5. **Separation of Concerns**: Business logic separated from UI logic

---

## API Integration

### FakeStore API Integration

This project integrates with [FakeStore API](https://fakestoreapi.com) to demonstrate real-world API integration patterns.

### API Service Layer

All API calls are centralized in `src/lib/api/products.ts`:

```typescript
// Service function with Next.js caching
export async function fetchProducts(limit?: number): Promise<FakeStoreProduct[]> {
  const url = limit
    ? `${API_BASE_URL}/products?limit=${limit}`
    : `${API_BASE_URL}/products`;

  const response = await fetch(url, {
    next: { revalidate: 3600 }, // ISR: Revalidate every hour
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  return response.json();
}
```

### Server Components for Data Fetching

```typescript
// ✅ Good: Server Component fetches data
export default async function HomePage() {
  try {
    const [productsData, categoriesData] = await Promise.all([
      fetchProducts(),
      fetchCategories(),
    ]);

    const products = productsData.map(transformProduct);

    return <ProductsClient products={products} categories={categoriesData} />;
  } catch (error) {
    return <ErrorState />;
  }
}
```

### Data Transformation Pattern

```typescript
// Transform external API data to internal format
export function transformProduct(apiProduct: FakeStoreProduct): Product {
  return {
    id: String(apiProduct.id),
    name: apiProduct.title,
    price: apiProduct.price,
    description: apiProduct.description,
    // ... transform other fields
  };
}
```

### Best Practices

1. **Centralized API Logic**: All API calls in dedicated service files
2. **Error Handling**: Try-catch blocks with user-friendly error messages
3. **Loading States**: Dedicated `loading.tsx` files for suspense boundaries
4. **Type Safety**: Typed API responses and transformations
5. **Caching Strategy**: ISR with appropriate revalidation periods
6. **Parallel Requests**: Use `Promise.all()` for independent requests

### Revalidation Strategy

- **Products**: 1 hour (3600 seconds) - Product data changes infrequently
- **Categories**: 24 hours (86400 seconds) - Categories rarely change
- **Individual Products**: 1 hour - Same as product list

---

## TypeScript Standards

### Strict Mode Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Type Safety Rules

1. **No `any` Types**: Use specific types or `unknown` when necessary
2. **Explicit Return Types**: All functions should have explicit return types for complex logic
3. **Interface Over Type**: Use `interface` for object shapes, `type` for unions/intersections
4. **Proper Generics**: Use generics for reusable, type-safe components

### Type Organization

```typescript
// ✅ Good: Organized type definitions
export interface Product {
  id: string;
  name: string;
  price: number;
  // ... other properties
}

// Export types from dedicated files
export type ProductCategory = 'electronics' | 'clothing' | 'books';

// Use utility types effectively
export type PartialProduct = Partial<Product>;
```

### Naming Conventions

- **Interfaces**: PascalCase (e.g., `Product`, `CartItem`)
- **Types**: PascalCase (e.g., `ProductCategory`, `OrderStatus`)
- **Enums**: PascalCase with UPPER_CASE values
- **Type Parameters**: Single uppercase letter or descriptive PascalCase (e.g., `T`, `TProduct`)

---

## Code Organization

### File Naming

- **Components**: PascalCase (e.g., `ProductCard.tsx`, `Button.tsx`)
- **Utilities**: camelCase (e.g., `format.ts`, `calculations.ts`)
- **Types**: camelCase (e.g., `product.ts`, `cart.ts`)
- **Pages**: Next.js convention (e.g., `page.tsx`, `layout.tsx`)

### Import Order

```typescript
// 1. React and Next.js imports
import { useState } from 'react';
import Link from 'next/link';

// 2. Third-party imports
import { Star, ShoppingCart } from 'lucide-react';

// 3. Internal imports (absolute paths using @/)
import type { Product } from '@/types';
import { Button, Card } from '@/components/ui';
import { useCartStore } from '@/store/cart';
import { formatCurrency } from '@/lib/utils/format';

// 4. Relative imports (if needed)
import { helper } from './helper';
```

### Barrel Exports

Each feature/component folder includes an `index.ts` for clean imports:

```typescript
// components/ui/index.ts
export { Button } from './Button';
export { Card } from './Card';
export { Input } from './Input';

// Usage
import { Button, Card, Input } from '@/components/ui';
```

---

## Component Guidelines

### Component Structure

```typescript
/**
 * Brief component description
 */

'use client'; // Only if client component

import statements...

// 1. Type definitions
interface ComponentProps {
  prop1: string;
  prop2?: number;
}

// 2. Component declaration
export function Component({ prop1, prop2 = defaultValue }: ComponentProps) {
  // 3. Hooks (in order: state, context, refs, effects)
  const [state, setState] = useState();
  const store = useStore();

  // 4. Event handlers
  const handleEvent = () => {
    // handler logic
  };

  // 5. Computed values
  const computedValue = useMemo(() => {
    return expensiveOperation();
  }, [dependencies]);

  // 6. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Props Patterns

```typescript
// ✅ Good: Extend HTML attributes
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

// ✅ Good: Use destructuring with defaults
export function Button({
  children,
  variant = 'primary',
  isLoading = false,
  className = '',
  ...props
}: ButtonProps) {
  // Component logic
}
```

### Client vs Server Components

```typescript
// Server Component (default)
export function ServerComponent() {
  // No 'use client' directive
  // Can fetch data, use async/await
}

// Client Component
'use client';
export function ClientComponent() {
  // Has 'use client' directive
  // Can use hooks, event handlers, browser APIs
}
```

### Component Documentation

```typescript
/**
 * Reusable Button component with variants and sizes
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export function Button(props: ButtonProps) {
  // Implementation
}
```

---

## State Management

### Zustand Store Pattern

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  // State
  data: DataType[];

  // Actions
  addData: (item: DataType) => void;
  removeData: (id: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      data: [],

      // Actions
      addData: (item) => {
        set({ data: [...get().data, item] });
      },

      removeData: (id) => {
        set({ data: get().data.filter((item) => item.id !== id) });
      },
    }),
    {
      name: 'store-name', // localStorage key
    }
  )
);
```

### Store Usage

```typescript
// ✅ Good: Select specific state
const items = useCartStore((state) => state.items);
const addItem = useCartStore((state) => state.addItem);

// ❌ Bad: Select entire store (causes unnecessary re-renders)
const cart = useCartStore();
```

### Local vs Global State

- **Local State**: Component-specific state (useState)
- **Global State**: Shared across components (Zustand)
- **Server State**: Data from APIs (Next.js Server Components)
- **URL State**: Query parameters, route params (Next.js routing)

---

## Styling Guidelines

### Tailwind CSS Best Practices

```typescript
// ✅ Good: Utility classes with logical grouping
<button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 transition-colors" />

// ✅ Good: Extract common patterns
const buttonStyles = 'px-4 py-2 rounded-lg transition-colors';

// ✅ Good: Conditional classes
<div className={`base-styles ${isActive ? 'active-styles' : 'inactive-styles'}`} />
```

### Design System

```typescript
// Color Palette (from tailwind.config.ts)
primary: {
  50-950  // Primary brand colors
}

// Spacing Scale
spacing: {
  0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64
}

// Typography Scale
text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl
```

### Responsive Design

```typescript
// Mobile-first approach
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {/* Responsive grid */}
</div>
```

---

## Performance Best Practices

### Image Optimization

```typescript
import Image from 'next/image';

// ✅ Good: Use Next.js Image component
<Image
  src={product.image}
  alt={product.name}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={isAboveFold}
/>
```

### Code Splitting

```typescript
// ✅ Good: Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
});
```

### Memoization

```typescript
// ✅ Good: Memoize expensive calculations
const filteredProducts = useMemo(() => {
  return products.filter(filterFn).sort(sortFn);
}, [products, filterFn, sortFn]);

// ✅ Good: Memoize callbacks passed to children
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);
```

---

## Testing Strategy

### Unit Tests

```typescript
// Example test structure
describe('formatCurrency', () => {
  it('should format numbers as USD currency', () => {
    expect(formatCurrency(29.99)).toBe('$29.99');
  });

  it('should handle zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });
});
```

### Component Tests

```typescript
// Example component test
describe('Button', () => {
  it('should render children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## Accessibility

### Semantic HTML

```typescript
// ✅ Good: Use semantic elements
<header>, <nav>, <main>, <article>, <section>, <footer>

// ✅ Good: Proper heading hierarchy
<h1>, <h2>, <h3> (in order)
```

### ARIA Attributes

```typescript
// ✅ Good: Add ARIA labels for screen readers
<button aria-label="Add to cart">
  <ShoppingCart />
</button>

// ✅ Good: ARIA states
<button aria-pressed={isPressed} aria-disabled={isDisabled}>
```

### Keyboard Navigation

```typescript
// ✅ Good: Ensure keyboard accessibility
<button
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
```

### Focus Management

```typescript
// ✅ Good: Visible focus indicators
focus:ring-2 focus:ring-primary-500 focus:outline-none
```

---

## Additional Best Practices

### Error Handling

```typescript
// ✅ Good: Try-catch for async operations
try {
  await apiCall();
} catch (error) {
  console.error('Error:', error);
  // Show user-friendly error message
}
```

### Form Validation

```typescript
// ✅ Good: Use Zod for validation
const schema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(2, 'Name too short'),
});

const result = schema.safeParse(formData);
if (!result.success) {
  // Handle validation errors
}
```

### Environment Variables

```typescript
// ✅ Good: Use env variables for configuration
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

---

## Code Review Checklist

- [ ] TypeScript strict mode compliance
- [ ] No `any` types used
- [ ] Proper error handling
- [ ] Component documentation
- [ ] Accessible markup (ARIA, semantic HTML)
- [ ] Responsive design implemented
- [ ] Performance optimizations (memo, lazy loading)
- [ ] Consistent naming conventions
- [ ] No console.logs (except errors/warnings)
- [ ] Proper TypeScript types/interfaces

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [Zod Documentation](https://zod.dev/)

---

**Note**: This document should be updated as the project evolves and new patterns emerge.
