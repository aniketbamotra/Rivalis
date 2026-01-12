import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(request: Request) {
  try {
    const { email, amount, successUrl, cancelUrl, serviceId, serviceName } = await request.json();

    // Validate inputs
    if (!email || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Determine product details based on serviceId
    let productName = serviceName || 'Legal Consultation';
    let productDescription = 'Initial consultation and case review with access to all intake forms';
    
    if (serviceId === 'emergency-consultation') {
      productName = 'Emergency Legal Consultation';
      productDescription = 'Urgent legal consultation with response within 2 hours';
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
              description: productDescription,
            },
            unit_amount: amount, // Amount already in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      success_url: successUrl || `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}`,
      metadata: {
        email,
        serviceId: serviceId || 'consultation',
        serviceName: productName,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
