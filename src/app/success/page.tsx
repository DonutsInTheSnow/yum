'use client';
import { useCart } from '@/lib/CartContext';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Success() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center text-center text-gray-800">
      <Image
        src="/images/success-bg.webp"
        alt="Success background"
        fill
        className="object-cover opacity-10 z-[-1]"
        style={{ position: 'absolute' }}
      />
      <div className="relative z-10 p-6">
        <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
        <p className="text-lg italic">
          Grateful we are for your sweet purchase.
        </p>
        <p className="mt-4">Your cart is cleared. Enjoy your treats!</p>
      </div>
    </div>
  );
}