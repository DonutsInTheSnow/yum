import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: NextRequest) {
  try {
    const { product, name, email, phone, selectedDate } = await req.json();

    if (!product || !name || !email || !phone || !selectedDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const priceMap: { [key: string]: number } = {
      bread: 500,  // $5.00 in cents
      cake: 1000,  // $10.00 in cents
      cookies: 300 // $3.00 in cents
    };
    const amount = priceMap[product] || 500;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price_data: { currency: 'usd', product_data: { name }, unit_amount: amount }, quantity: 1 }],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/orderForm`,
      metadata: { name, email, phone, selectedDate: selectedDate.toISOString() },
    });

    await supabaseAdmin.from('orders').insert({
      total_amount: amount,
      status: 'pending',
      items: [{ name: product, price: amount, quantity: 1 }],
      stripe_session_id: session.id,
      pickup_date: selectedDate.toISOString(),
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}