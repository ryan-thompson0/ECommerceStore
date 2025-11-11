# ShopHub - Modern E-Commerce Store

A production-ready, full-featured e-commerce application built with Next.js 16, React 19, TypeScript, and Tailwind CSS. This project showcases modern web development best practices, clean architecture, and enterprise-level code quality.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## 🎯 Project Overview

ShopHub is a modern e-commerce platform that demonstrates:

- **Clean Architecture** with feature-based organization
- **Real API Integration** with FakeStore API
- **Type-Safe Development** with strict TypeScript
- **Modern UI/UX** with responsive design
- **State Management** using Zustand
- **Form Validation** with Zod schemas
- **Performance Optimization** with Next.js 16
- **Accessibility** following WCAG guidelines

## ✨ Features

### Core Functionality

- **Product Catalog** (Real API Data)
  - Browse 20+ real products from FakeStore API
  - Dynamic categories (Electronics, Jewelry, Men's Clothing, Women's Clothing)
  - Search and filter products
  - Sort by price, name, and rating
  - Detailed product pages with images and descriptions
  - Server-side rendering for SEO optimization

- **Shopping Cart**
  - Add/remove items
  - Update quantities
  - Persistent cart using localStorage
  - Real-time price calculations
  - Free shipping threshold indicator

- **Checkout Flow**
  - Multi-step checkout form
  - Form validation with Zod
  - Shipping address collection
  - Payment method selection
  - Order confirmation

### Technical Features

- **Real API Integration** with FakeStore API (https://fakestoreapi.com)
  - Server Components for data fetching
  - ISR (Incremental Static Regeneration) with 1-hour revalidation
  - Error handling and loading states
  - Type-safe API service layer
- **Server-Side Rendering** with Next.js App Router
- **Client-Side State Management** with Zustand
- **Type Safety** throughout the application
- **Responsive Design** for all device sizes
- **Image Optimization** with Next.js Image component
- **Code Splitting** for optimal performance
- **SEO Friendly** with proper meta tags

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ECommerceStore
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Other Commands

```bash
# Type checking
npm run type-check

# Linting
npm run lint
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (product listing)
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   └── order-success/     # Order confirmation page
│
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Badge.tsx
│   └── layout/           # Layout components
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Container.tsx
│
├── features/             # Feature-based modules
│   ├── products/        # Product features
│   │   └── components/
│   ├── cart/           # Cart features
│   │   └── components/
│   └── checkout/       # Checkout features
│       └── components/
│
├── lib/                 # Utilities and helpers
│   ├── utils/          # Utility functions
│   ├── constants/      # App constants
│   └── validations/    # Zod schemas
│
├── store/              # Zustand stores
│   └── cart.ts        # Cart state management
│
├── types/              # TypeScript definitions
│   ├── product.ts
│   ├── cart.ts
│   └── order.ts
│
└── styles/             # Global styles
    └── globals.css
```

## 🛠️ Technology Stack

### Core Technologies

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript 5.9](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework

### State Management & Validation

- **[Zustand](https://docs.pmnd.rs/zustand)** - Lightweight state management
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### UI & Icons

- **[Lucide React](https://lucide.dev/)** - Beautiful icon set

### Development Tools

- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing

## 🎨 Design System

### Color Palette

- **Primary**: Blue shades (#0ea5e9 - #082f49)
- **Gray**: Neutral shades for text and backgrounds
- **Semantic**: Success (green), Warning (yellow), Danger (red)

### Typography

- **Font**: Inter (via Google Fonts)
- **Scale**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl

### Components

All components follow consistent design patterns:
- Variants (primary, secondary, outline, danger)
- Sizes (sm, md, lg)
- States (default, hover, focus, disabled)
- Responsive design

## 📝 Code Quality

### TypeScript Configuration

- Strict mode enabled
- No implicit any
- Unused locals/parameters detection
- Implicit returns checking

### Code Standards

See [CLAUDE.md](./CLAUDE.md) for comprehensive coding practices including:
- Architecture principles
- Component patterns
- State management guidelines
- Performance optimizations
- Accessibility standards

### ESLint Rules

- TypeScript recommended rules
- Next.js specific rules
- Unused variable warnings
- No explicit any warnings

## 🔒 Type Safety

Every component, function, and module is fully typed with TypeScript:

```typescript
// Strict typing for all interfaces
interface Product {
  id: string;
  name: string;
  price: number;
  // ... other properties
}

// Type-safe component props
interface ProductCardProps {
  product: Product;
}

// Validated form inputs with Zod
const checkoutSchema = z.object({
  email: z.string().email(),
  // ... other validations
});
```

## ⚡ Performance Optimizations

- **Image Optimization**: Next.js Image component with responsive sizes
- **Code Splitting**: Dynamic imports for route-based splitting
- **Memoization**: React.useMemo and useCallback for expensive operations
- **Lazy Loading**: Images and components loaded on demand
- **Bundle Optimization**: Tree-shaking and minification

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels and attributes
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Color contrast compliance

## 🧪 Testing Strategy

The project is structured for easy testing:

- **Unit Tests**: Utility functions and calculations
- **Component Tests**: UI component behavior
- **Integration Tests**: Feature workflows
- **E2E Tests**: Complete user journeys

## 🚧 Future Enhancements

Potential features to add:

- [ ] User authentication and accounts
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Order history tracking
- [ ] Admin dashboard
- [ ] Payment integration (Stripe, PayPal)
- [ ] Email notifications
- [ ] Advanced search with filters
- [ ] Product recommendations
- [ ] Multi-language support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Built as a portfolio project to demonstrate modern web development practices.

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for deployment platform
- [Tailwind Labs](https://tailwindcss.com/) for the CSS framework
- [Unsplash](https://unsplash.com/) for product images

## 📚 Documentation

- [CLAUDE.md](./CLAUDE.md) - Comprehensive coding practices and standards
- [Next.js Docs](https://nextjs.org/docs) - Framework documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript guide

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome!

---

**Built with ❤️ using Next.js, React, and TypeScript**
