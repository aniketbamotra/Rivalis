import React, { useState } from 'react';

interface EmailVerificationModalProps {
  isOpen: boolean;
  onSubmit: (email: string) => void;
  onClose: () => void;
}

/**
 * Modal to collect email for cross-device form access verification
 */
export const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  isOpen,
  onSubmit,
  onClose,
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    onSubmit(email);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '1rem',
          color: '#1a1a1a',
        }}>
          Verify Your Email
        </h2>
        
        <p style={{
          color: '#666',
          marginBottom: '1.5rem',
          lineHeight: '1.6',
        }}>
          To access additional forms, please enter the email address you used for your consultation payment.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label
              htmlFor="verification-email"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
              }}
            >
              Email Address
            </label>
            <input
              id="verification-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#0088cc';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
              }}
              autoFocus
            />
            {error && (
              <p style={{
                color: '#dc2626',
                fontSize: '0.875rem',
                marginTop: '0.5rem',
              }}>
                {error}
              </p>
            )}
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '1.5rem',
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                backgroundColor: 'white',
                color: '#374151',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '0.75rem',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: '#0088cc',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#006699';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0088cc';
              }}
            >
              Verify
            </button>
          </div>
        </form>

        <p style={{
          marginTop: '1.5rem',
          fontSize: '0.875rem',
          color: '#6b7280',
          lineHeight: '1.5',
        }}>
          💡 If you haven't paid for a consultation yet, you can submit your first form for free. Payment will be required before submitting additional forms.
        </p>
      </div>
    </div>
  );
};
