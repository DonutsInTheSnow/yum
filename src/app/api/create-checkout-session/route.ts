import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { CartItem } from '@/lib/CartContext'; // Verify this path

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Parsed body:', body);

    const { cart, phone, selectedDate, description, price } = body;

    console.log('selectedDate received:', selectedDate);
    console.log('phone received:', phone);

    if (!cart || !phone || !selectedDate || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const parsedDate = new Date(selectedDate);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json({ error: 'Invalid selectedDate' }, { status: 400 });
    }

    const baseUrl = req.headers.get('origin') || 'http://localhost:3000';
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart
        .filter((item: CartItem) => item.unitPrice > 0 && item.quantity > 0) // Type annotation here
        .map((item: CartItem) => ({ // And here
          price_data: { currency: 'usd', product_data: { name: `${item.product}${item.variant ? ` - ${item.variant}` : ''}` }, unit_amount: item.unitPrice },
          quantity: item.quantity,
        })),
      mode: 'payment',
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/orderForm`,
      metadata: {
        phone,
        selectedDate: parsedDate.toISOString(),
        ...(description && { description }),
      },
    });

    const { error } = await supabaseAdmin.from('orders').insert({
      total_amount: price,
      status: 'pending',
      items: cart,
      stripe_session_id: session.id,
      pickup_date: parsedDate.toISOString(),
      notes: description,
      phone: phone,
    });
    if (error) console.error('Supabase insert error:', error);

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}