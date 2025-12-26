import { loadStripe } from '@stripe/stripe-js';
import type { Stripe } from '@stripe/stripe-js';

// Initialize Stripe
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    
    if (!publishableKey) {
      console.error('Missing VITE_STRIPE_PUBLISHABLE_KEY environment variable');
      return null;
    }
    
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

/**
 * Create a Stripe Checkout session for consultation payment
 */
export const createCheckoutSession = async (email: string, amount: number) => {
  try {
    const response = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100), // Convert dollars to cents for Stripe
        successUrl: `${window.location.origin}/payment-success`,
        cancelUrl: window.location.href,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create checkout session');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

/**
 * Redirect to Stripe Checkout
 */
export const redirectToCheckout = async (email: string, amount: number) => {
  try {
    // Store email in localStorage for after payment
    localStorage.setItem('consultation_paid_email', email);
    
    const data = await createCheckoutSession(email, amount);
    
    // Redirect to Stripe Checkout URL
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error('No checkout URL returned');
    }
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    throw error;
  }
};
