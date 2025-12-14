import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '' // Use service role key for admin access
);

export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('Missing STRIPE_WEBHOOK_SECRET');
    return { statusCode: 500, body: 'Webhook secret not configured' };
  }

  let stripeEvent;

  try {
    // Verify webhook signature
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  // Handle the event
  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object;
        
        // Extract customer information
        const email = session.customer_email || session.customer_details?.email;
        const paymentIntentId = session.payment_intent;
        const amountTotal = session.amount_total / 100; // Convert from cents

        if (!email) {
          console.error('No email found in checkout session');
          break;
        }

        // Record payment in Supabase
        const { data: payment, error: paymentError } = await supabase
          .from('payments')
          .insert({
            email,
            stripe_payment_id: paymentIntentId,
            amount: amountTotal,
            currency: session.currency || 'usd',
            status: 'succeeded',
            payment_method: 'card',
            metadata: {
              payment_type: 'consultation',
              session_id: session.id,
            },
          })
          .select()
          .single();

        if (paymentError) {
          console.error('Error recording payment:', paymentError);
          break;
        }

        console.log('Payment recorded:', payment);

        // Update any pending form submissions for this email
        const { error: updateError } = await supabase
          .from('form_submissions')
          .update({ status: 'pending' })
          .eq('email', email)
          .eq('status', 'pending_payment');

        if (updateError) {
          console.error('Error updating form submissions:', updateError);
        }

        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = stripeEvent.data.object;
        console.log('Payment failed:', paymentIntent.id);
        
        // Optionally record failed payment
        const email = paymentIntent.receipt_email;
        if (email) {
          await supabase
            .from('payments')
            .insert({
              email,
              stripe_payment_id: paymentIntent.id,
              amount: paymentIntent.amount / 100,
              currency: paymentIntent.currency,
              status: 'failed',
              payment_method: 'card',
              metadata: {
                payment_type: 'consultation',
                error: paymentIntent.last_payment_error?.message,
              },
            });
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('Error processing webhook:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook processing failed' }),
    };
  }
};
