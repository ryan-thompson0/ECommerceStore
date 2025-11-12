import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../button';

describe('Button component', () => {
  it('renders with default variant styles', () => {
    render(<Button data-testid="btn">Click me</Button>);
    const button = screen.getByTestId('btn');

    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveClass('inline-flex');
    expect(button).toHaveClass('bg-gradient-primary');
    expect(button).toHaveTextContent('Click me');
  });

  it('renders children as provided when using asChild', () => {
    render(
      <Button asChild>
        <a href="/link">Visit</a>
      </Button>
    );

    const link = screen.getByRole('link', { name: /Visit/i });
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/link');
  });
});
