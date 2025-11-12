import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('merges multiple class names', () => {
    expect(cn('button', 'button-primary')).toBe('button button-primary');
  });

  it('removes duplicates and falsey values', () => {
    expect(cn('p-4', undefined, 'p-4', false && 'hidden')).toBe('p-4');
  });

  it('merges tailwind classes with overrides', () => {
    expect(cn('text-center', 'text-left')).toBe('text-left');
  });
});
