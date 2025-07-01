'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  product: string;
  variant?: string;
  quantity: number;
  unitPrice: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: string, unitPrice: number, variant?: string, quantity?: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: string, unitPrice: number, variant?: string, quantity: number = 1) => {
    if (unitPrice <= 0) {
      console.error(`Invalid unitPrice for ${product} ${variant}: ${unitPrice}`);
      return;
    }
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product === product && item.variant === variant);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product === product && item.variant === variant
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, variant, quantity, unitPrice }];
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}