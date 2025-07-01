import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature');
  if (!sig) return NextResponse.json({ error: 'Missing Stripe-Signature' }, { status: 400 });

  const rawBody = await req.arrayBuffer(); // Use arrayBuffer for raw body

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(rawBody),
      sig,
      process.env.STRIPE_WEBHOOK_SIGNING_SECRET!
    );
  } catch (err) {
    console.error('❌ Error verifying webhook:', err);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  // Act on the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email;
      console.log('✅ Webhook received:', event.type, session);

      if (email) {
        const { error } = await supabaseAdmin
          .from('orders')
          .update({ status: 'completed' })
          .eq('email', email);

        if (error) {
          console.error('❌ DB update failed:', error);
          return NextResponse.json({ error: 'Error updating order' }, { status: 500 });
        }
      }
      return new NextResponse(null, { status: 200 });

    case 'charge.captured':
      const charge = event.data.object as Stripe.Charge;
      const chargeEmail = charge.receipt_email || (await stripe.checkout.sessions.retrieve(charge.payment_intent as string)).customer_details?.email;
      console.log('✅ Webhook received:', event.type, charge);

      if (chargeEmail) {
        const { error } = await supabaseAdmin
          .from('orders')
          .update({ status: 'completed' })
          .eq('email', chargeEmail);

        if (error) {
          console.error('❌ DB update failed:', error);
          return NextResponse.json({ error: 'Error updating order' }, { status: 500 });
        }
      }
      return new NextResponse(null, { status: 200 });

    default:
      return new NextResponse('Unhandled event type', { status: 200 });
  }
}