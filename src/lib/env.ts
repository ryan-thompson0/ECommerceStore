/**
 * Environment variable validation and type-safe access
 * Validates environment variables at build time using Zod
 */

import { z } from 'zod';

/**
 * Environment variable schema
 * Defines all required and optional environment variables with validation
 */
const envSchema = z.object({
  // API Configuration
  NEXT_PUBLIC_API_URL: z
    .string()
    .url('Invalid API URL')
    .default('https://fakestoreapi.com'),

  // App Configuration
  NEXT_PUBLIC_APP_NAME: z.string().default('ShopHub'),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url('Invalid app URL')
    .default('http://localhost:3000'),

  // Feature Flags
  NEXT_PUBLIC_ENABLE_ANALYTICS: z
    .string()
    .default('false')
    .transform((val) => val === 'true'),

  // Analytics (Optional)
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),

  // Error Logging (Optional)
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional().or(z.literal('')),

  // Node Environment
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
});

/**
 * Validated environment variables
 * This will throw an error at build time if validation fails
 */
const envVars = envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS,
  NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  NODE_ENV: process.env.NODE_ENV,
});

/**
 * Type-safe environment variables
 * Export this object to access environment variables throughout the app
 *
 * @example
 * import { env } from '@/lib/env';
 * const apiUrl = env.NEXT_PUBLIC_API_URL;
 */
export const env = envVars;

/**
 * Environment variable types
 */
export type Env = z.infer<typeof envSchema>;
