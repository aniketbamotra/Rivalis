'use client';

import { useState } from 'react';

interface PaywallProps {
  resourceId: string;
  resourceTitle: string;
  onPaymentSuccess?: () => void;
}

export function ResourcePaywall({ resourceId, resourceTitle, onPaymentSuccess }: PaywallProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgrade = async () => {
    setIsProcessing(true);
    try {
      // Create checkout session (reuse existing Stripe flow from your site)
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resourceId,
          resourceTitle,
          type: 'premium_intelligence_access',
        }),
      });

      const { sessionId } = await response.json();

      // Redirect to Stripe checkout
      if (window.Stripe) {
        const stripe = window.Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
        stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-navy-50 to-navy-100 border-2 border-gold/30 rounded-lg p-12 text-center">
      <div className="mb-6">
        <svg
          className="w-16 h-16 mx-auto text-gold mb-4"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
        </svg>
      </div>

      <h3 className="font-serif text-2xl font-bold text-navy-900 mb-3">
        Premium Resource
      </h3>

      <p className="text-gray-600 mb-6 leading-relaxed max-w-sm mx-auto">
        This premium resource is available to subscribers. Unlock full access to all intelligence hub tools, templates, and analysis.
      </p>

      <div className="bg-white rounded-lg p-6 mb-6 inline-block">
        <p className="text-sm text-gray-600 mb-2">Full Access Includes:</p>
        <ul className="text-left text-sm text-navy-900 space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-gold">✓</span> This resource
          </li>
          <li className="flex items-center gap-2">
            <span className="text-gold">✓</span> All other premium resources
          </li>
          <li className="flex items-center gap-2">
            <span className="text-gold">✓</span> Full intelligence briefings
          </li>
          <li className="flex items-center gap-2">
            <span className="text-gold">✓</span> 30-day access window
          </li>
        </ul>
      </div>

      <button
        onClick={handleUpgrade}
        disabled={isProcessing}
        className="bg-gold hover:bg-gold-dark disabled:opacity-50 disabled:cursor-not-allowed text-navy-900 px-8 py-3 rounded font-semibold uppercase tracking-wider transition-all inline-block"
      >
        {isProcessing ? 'Processing...' : 'Unlock Premium Access'}
      </button>

      <p className="text-xs text-gray-500 mt-4">
        Secure payment powered by Stripe. One-time payment for 30-day access.
      </p>
    </div>
  );
}
