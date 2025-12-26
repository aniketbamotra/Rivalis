import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AccountCreationNudgeProps {
  isOpen: boolean;
  email: string;
  paymentId: string;
  onSkip: () => void;
}

export const AccountCreationNudge: React.FC<AccountCreationNudgeProps> = ({
  isOpen,
  email,
  paymentId,
  onSkip,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCreateAccount = () => {
    navigate('/signup', {
      state: {
        email,
        paymentId,
        fromConsultation: true,
      },
    });
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10001,
      }}
    >
      <div
        className="modal-content"
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '3rem',
          maxWidth: '600px',
          width: '90%',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Success Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: 'white',
              fontSize: '2.5rem',
            }}
          >
            ✓
          </div>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '2.5rem',
              marginBottom: '0.5rem',
              color: 'var(--primary)',
            }}
          >
            Payment Successful! 🎉
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--gray-600)' }}>
          Your consultation ($499) has been confirmed.
        {/* Create Account Section */}
        <div
          style={{
            background: 'var(--accent-light)',
            padding: '2rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            border: '2px solid var(--accent)',
          }}
        >
          <h3
            style={{
              fontSize: '1.5rem',
              marginBottom: '1rem',
              color: 'var(--primary)',
            }}
          >
            Create Your Account
          </h3>
          
          <div
            style={{
              background: 'rgba(231, 76, 60, 0.1)',
              border: '2px solid #e74c3c',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <p style={{ margin: 0, color: '#c0392b', fontWeight: 600 }}>
              ⚠️ Account required to access additional forms
            </p>
          </div>

          <p style={{ marginBottom: '1rem', color: 'var(--gray-700)' }}>
            We've saved your email: <strong>{email}</strong>
          </p>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            <li style={{ padding: '0.75rem 0', display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
              <span style={{ color: 'var(--accent)', fontSize: '1.25rem' }}>✓</span>
              <span>Fill all other intake forms</span>
            </li>
            <li style={{ padding: '0.75rem 0', display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
              <span style={{ color: 'var(--accent)', fontSize: '1.25rem' }}>✓</span>
              <span>Track consultation status in real-time</span>
            </li>
            <li style={{ padding: '0.75rem 0', display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
              <span style={{ color: 'var(--accent)', fontSize: '1.25rem' }}>✓</span>
              <span>Communicate directly with your attorney</span>
            </li>
            <li style={{ padding: '0.75rem 0', display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
              <span style={{ color: 'var(--accent)', fontSize: '1.25rem' }}>✓</span>
              <span>Access documents and case updates</span>
            </li>
            <li style={{ padding: '0.75rem 0', display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
              <span style={{ color: 'var(--accent)', fontSize: '1.25rem' }}>✓</span>
              <span>Auto-fill future forms with saved information</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button
            onClick={handleCreateAccount}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '1.25rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 700,
            }}
          >
            Create Account Now
          </button>
          <button
            onClick={onSkip}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--gray-600)',
              padding: '0.75rem',
              cursor: 'pointer',
              fontSize: '0.95rem',
              textDecoration: 'underline',
            }}
          >
            Skip for now
          </button>
        </div>

        {/* Warning */}
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'var(--gray-50)',
            borderRadius: '8px',
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'start',
          }}
        >
          <span style={{ fontSize: '1.25rem' }}>ⓘ</span>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--gray-600)' }}>
            If you skip, you'll need to create an account before filling any other forms.
          </p>
        </div>

        {/* Privacy Note */}
        <p
          style={{
            marginTop: '1.5rem',
            fontSize: '0.85rem',
            color: 'var(--gray-500)',
            textAlign: 'center',
          }}
        >
          <i className="fas fa-shield-alt"></i> Your information is secure and protected by attorney-client privilege.
        </p>
      </div>
    </div>
  );
};
