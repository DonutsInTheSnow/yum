'use client';

import React, { useState } from 'react'; // Removed useEffect from import
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '@/lib/CartContext';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function OrderForm() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [product, setProduct] = useState('Cake');
  const [size, setSize] = useState('6-inch round');
  const [variant, setVariant] = useState('Chocolate Chip');
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [batter, setBatter] = useState('Gold');
  const [icing, setIcing] = useState('Buttercream');
  const [loading, setLoading] = useState(false);
  const { cart, addToCart, removeFromCart, clearCart } = useCart(); // Added clearCart

  const productPrices: { [key: string]: number | { [key: string]: number } } = {
    Cake: { '6-inch round': 2200, '7-inch round': 2600, '8-inch round': 3000, '10-inch round': 3800, '12-inch round': 4400, 'Half sheet': 4400, 'Full sheet': 8000 },
    Cookies: 137,
    Donuts: 285,
    Turnovers: 265,
    Muffins: 260,
  };

  const handleAddToCart = () => {
    const basePrice = typeof productPrices[product] === 'number' ? productPrices[product] : 0;
    const unitPrice = product === 'Cake' ? (productPrices[product] as { [key: string]: number })?.[size] || 0 : basePrice;
    if (!unitPrice || unitPrice === 0) {
      console.error(`No valid price found for ${product} ${product === 'Cake' ? size : ''}`);
      return;
    }
    addToCart(product, unitPrice, product === 'Cake' ? `${batter}/${icing}` : variant, quantity);
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const totalPrice = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
      const stripe = await stripePromise;
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, phone, selectedDate, description, price: totalPrice }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Checkout session creation failed:', error);
        alert(`Checkout error: ${error?.error || 'Unknown error'}`);
        return;
      }

      const { id: sessionId } = await response.json();
      await stripe!.redirectToCheckout({ sessionId });
      clearCart();
    } catch (err) {
      console.error('Checkout failed:', err);
      alert('There was a problem connecting to Stripe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white mt-16 order-form">
      <h1 className="text-2xl font-bold mb-4">Order Form</h1>
      <div className="mb-4">
        <label htmlFor="product" className="block mb-2">Product:</label>
        <select id="product" value={product} onChange={(e) => setProduct(e.target.value)} className="w-full p-2 border">
          <option value="Cake">Cake</option>
          <option value="Cookies">Cookies</option>
          <option value="Donuts">Donuts</option>
          <option value="Turnovers">Turnovers</option>
          <option value="Muffins">Muffins</option>
        </select>
      </div>
      {product === 'Cake' && (
        <>
          <div className="mb-4">
            <label className="block mb-2">Size:</label>
            <select value={size} onChange={(e) => setSize(e.target.value)} className="w-full p-2 border">
              <option value="6-inch round">6-inch round ($22, feeds 4)</option>
              <option value="7-inch round">7-inch round ($26, feeds 8)</option>
              <option value="8-inch round">8-inch round ($30, feeds 10)</option>
              <option value="10-inch round">10-inch round ($38, feeds 14)</option>
              <option value="12-inch round">12-inch round ($44, feeds 24)</option>
              <option value="Half sheet">Half sheet ($44, feeds 24)</option>
              <option value="Full sheet">Full sheet ($80, feeds 48)</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Batter:</label>
            <select value={batter} onChange={(e) => setBatter(e.target.value)} className="w-full p-2 border">
              <option value="Gold">Gold</option>
              <option value="Chocolate">Chocolate</option>
              <option value="Carrot">Carrot</option>
              <option value="Marble">Marble</option>
              <option value="Spice">Spice</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Icing:</label>
            <select value={icing} onChange={(e) => setIcing(e.target.value)} className="w-full p-2 border">
              <option value="Buttercream">Buttercream</option>
              <option value="Cream Cheese">Cream Cheese</option>
              <option value="Chocolate">Chocolate</option>
            </select>
          </div>
        </>
      )}
      {['Cookies', 'Donuts', 'Turnovers', 'Muffins'].includes(product) && (
        <div className="mb-4">
          <label className="block mb-2">{product} Type:</label>
          <select value={variant} onChange={(e) => setVariant(e.target.value)} className="w-full p-2 border">
            {product === 'Cookies' && (
              <>
                <option value="Chocolate Chip">Chocolate Chip ($1.37)</option>
                <option value="Oatmeal Raisin">Oatmeal Raisin ($1.37)</option>
                <option value="Filled Raspberry">Filled Raspberry ($1.37)</option>
                <option value="Sugar">Sugar ($1.37)</option>
              </>
            )}
            {product === 'Donuts' && (
              <>
                <option value="Apple Filled">Apple Filled ($2.85)</option>
                <option value="Blueberry">Blueberry ($2.85)</option>
                <option value="Boston Cream">Boston Cream ($2.85)</option>
              </>
            )}
            {product === 'Turnovers' && (
              <>
                <option value="Apple">Apple ($2.65)</option>
                <option value="Blueberry">Blueberry ($2.65)</option>
                <option value="Raspberry">Raspberry ($2.65)</option>
                <option value="Apricot">Apricot ($2.65)</option>
              </>
            )}
            {product === 'Muffins' && (
              <>
                <option value="Coffee Cake Crumble">Coffee Cake Crumble ($2.60)</option>
                <option value="Chocolate Chip">Chocolate Chip ($2.60)</option>
                <option value="Cranberry Orange Walnut">Cranberry Orange Walnut ($2.60)</option>
                <option value="Wild Blueberry">Wild Blueberry ($2.60)</option>
              </>
            )}
          </select>
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-2">Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          min="1"
          className="w-full p-2 border"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Desired Pickup Date:</label>
        <DatePicker selected={selectedDate} onChange={setSelectedDate} className="w-full p-2 border" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Phone:</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border" required />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Notes to Bakers (e.g., allergies, message):</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border" />
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={handleAddToCart}
          className="bg-[#9B6027] text-white px-4 py-2 mr-2 rounded cursor-pointer"
        >
          Add to Cart
        </button>
        <button
          onClick={handleCheckout}
          disabled={cart.length === 0 || loading}
          className="bg-[#fb8005] text-black px-4 py-2 rounded cursor-pointer flex items-center justify-center disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <span className="inline-block w-40 text-center">Checkout with Stripe</span>
          )}
        </button>
      </div>

      {cart.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Cart</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="mb-2">
                {item.product} {item.variant ? `- ${item.variant}` : ''} x {item.quantity} = ${(item.unitPrice * item.quantity / 100).toFixed(2)}
                <button onClick={() => removeFromCart(index)} className="ml-2 text-red-600">Remove</button>
              </li>
            ))}
          </ul>
          <p className="font-bold">Total: ${(cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0) / 100).toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}