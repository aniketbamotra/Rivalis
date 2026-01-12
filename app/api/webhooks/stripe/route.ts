import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-11-17.clover',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '' // Use service role key for admin access
);

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const sig = headersList.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    console.error('Missing signature or webhook secret');
    return NextResponse.json(
      { error: 'Webhook configuration error' },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Extract customer information
        const email = session.customer_email || session.customer_details?.email;
        const paymentIntentId = session.payment_intent as string;
        const amountTotal = (session.amount_total || 0) / 100; // Convert from cents
        const serviceId = session.metadata?.serviceId || 'consultation';
        const serviceName = session.metadata?.serviceName || 'Legal Consultation';

        console.log('Payment successful:', {
          email,
          paymentIntentId,
          amountTotal,
          serviceId,
        });

        // Record the payment in Supabase
        if (email && paymentIntentId) {
          const { error: insertError } = await supabase
            .from('consultation_payments')
            .insert({
              email,
              stripe_payment_id: paymentIntentId,
              amount: amountTotal,
              service_id: serviceId,
              service_name: serviceName,
              status: 'completed',
              payment_date: new Date().toISOString(),
            });

          if (insertError) {
            console.error('Error recording payment:', insertError);
          } else {
            console.log('Payment recorded successfully');
          }
        }

        // Update any pending form submissions
        if (email) {
          const { error: updateError } = await supabase
            .from('form_submissions')
            .update({ payment_received: true })
            .eq('email', email)
            .is('payment_received', null);

          if (updateError) {
            console.error('Error updating form submissions:', updateError);
          }
        }

        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
