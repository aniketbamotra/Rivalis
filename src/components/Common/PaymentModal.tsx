import React, { useState } from 'react';
import { redirectToCheckout } from '../../lib/stripe';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (paymentId: string) => void;
  email: string;
  amount: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  email,
  amount,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Redirect to Stripe Checkout
      await redirectToCheckout(email, amount);
      // Note: User will be redirected to Stripe, so we won't reach this point
      // Payment success will be handled on the success page
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
    }}>
      <div className="modal-content" style={{
        background: 'white',
        borderRadius: '16px',
        padding: '3rem',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      }}>
        <h2 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: '2rem',
          marginBottom: '1rem',
          color: 'var(--primary)',
        }}>
          Consultation Payment
        </h2>

        <div style={{
          background: 'var(--accent-light)',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          borderLeft: '4px solid var(--accent)',
        }}>
          <p style={{ marginBottom: '0.5rem', color: 'var(--gray-700)' }}>
            <strong>Email:</strong> {email}
          </p>
          <p style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: 'var(--primary)',
            marginTop: '1rem',
          }}>
            ${amount}
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', marginTop: '0.5rem' }}>
            One-time consultation fee
          </p>
        </div>

        <div style={{
          background: 'var(--gray-50)',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
        }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>
            What's Included:
          </h4>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}>
            <li style={{ padding: '0.5rem 0', display: 'flex', gap: '0.5rem' }}>
              <span>✓</span> Initial case review
            </li>
            <li style={{ padding: '0.5rem 0', display: 'flex', gap: '0.5rem' }}>
              <span>✓</span> 30-minute consultation
            </li>
            <li style={{ padding: '0.5rem 0', display: 'flex', gap: '0.5rem' }}>
              <span>✓</span> Strategy recommendations
            </li>
            <li style={{ padding: '0.5rem 0', display: 'flex', gap: '0.5rem' }}>
              <span>✓</span> Access to all intake forms
            </li>
          </ul>
        </div>

        {error && (
          <div style={{
            background: '#fee',
            border: '1px solid #fcc',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            color: '#c00',
          }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="btn btn-primary"
            style={{
              flex: 1,
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Processing...' : `Pay $${amount}`}
          </button>
          <button
            onClick={onClose}
            disabled={loading}
            className="btn btn-secondary"
            style={{
              padding: '1rem 2rem',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            Cancel
          </button>
        </div>

        <p style={{
          marginTop: '1.5rem',
          fontSize: '0.85rem',
          color: 'var(--gray-600)',
          textAlign: 'center',
        }}>
          <i className="fas fa-lock"></i> Secure payment powered by Stripe
        </p>
      </div>
    </div>
  );
};
