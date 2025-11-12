import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate, truncateText, slugify } from '../format';

const sampleDate = new Date('2024-01-01T12:00:00Z');

describe('format utilities', () => {
  it('formats currency to USD', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('formats dates consistently', () => {
    const formatted = formatDate(sampleDate);
    expect(formatted).toContain('2024');
    expect(formatted).toContain('January');
  });

  it('truncates text longer than max length', () => {
    const text = 'This sentence is quite verbose and needs to be shortened.';
    const shortened = truncateText(text, 20);
    expect(shortened).toBe('This sentence is qui...');
  });

  it('returns original text when under limit', () => {
    const text = 'Short text';
    expect(truncateText(text, 20)).toBe(text);
  });

  it('slugifies text and removes punctuation', () => {
    expect(slugify('Hello, World! Next.js')).toBe('hello-world-nextjs');
    expect(slugify('  Multiple   spaces  ')).toBe('multiple-spaces');
  });
});
