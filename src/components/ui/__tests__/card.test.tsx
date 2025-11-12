import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardDescription } from '../card';

function renderCard() {
  render(
    <Card className="custom-card" data-testid="card-root">
      <CardHeader>Header</CardHeader>
      <CardDescription>Description</CardDescription>
    </Card>
  );
}

describe('Card component', () => {
  it('renders base styles and accepts custom class names', () => {
    renderCard();
    const card = screen.getByTestId('card-root');

    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('rounded-xl');
    expect(card).toHaveClass('custom-card');
  });

  it('renders header and description content', () => {
    renderCard();
    screen.getByText('Header');
    screen.getByText('Description');
  });
});
