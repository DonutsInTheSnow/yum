import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderForm from '@/app/orderForm/page';
import { CartProvider } from '@/lib/CartContext';

// Utility wrapper to provide CartContext
function renderWithProviders(ui: React.ReactElement) {
  return render(<CartProvider>{ui}</CartProvider>);
}

describe('OrderForm', () => {
  it('renders the heading', () => {
    renderWithProviders(<OrderForm />);
    expect(screen.getByRole('heading', { name: /order form/i })).toBeInTheDocument();
  });

  it('shows default selected product as Cake', () => {
    renderWithProviders(<OrderForm />);
    expect(screen.getByDisplayValue('Cake')).toBeInTheDocument();
  });

  it('allows changing product selection', () => {
    renderWithProviders(<OrderForm />);
    const productSelect = screen.getByLabelText(/product/i);
    fireEvent.change(productSelect, { target: { value: 'Donuts' } });
    expect(screen.getByDisplayValue('Donuts')).toBeInTheDocument();
  });

  it('renders Add to Cart button', () => {
    renderWithProviders(<OrderForm />);
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });
});
