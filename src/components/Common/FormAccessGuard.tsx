import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { canAccessForms, getConsultationEmail, STORAGE_KEYS } from '../../utils/consultationFlow';
import { supabase } from '../../lib/supabase';
import { EmailVerificationModal } from './EmailVerificationModal';

interface FormAccessGuardProps {
  children: React.ReactNode;
}

/**
 * Guard component that checks if user can access forms
 * Blocks access and shows message if they've paid but haven't created account
 * Shows email verification modal for cross-device access
 */
export const FormAccessGuard: React.FC<FormAccessGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<unknown>(null);
  const [loading, setLoading] = React.useState(true);
  const [accessBlocked, setAccessBlocked] = React.useState(false);
  const [email, setEmail] = React.useState<string | null>(null);
  const [showEmailModal, setShowEmailModal] = React.useState(false);

  useEffect(() => {
    // Get current user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loading) return;

    const checkAccess = async () => {
      const consultationEmail = getConsultationEmail();
      const accessCheck = await canAccessForms(user, consultationEmail);
      
      if (!accessCheck.canAccess) {
        setAccessBlocked(true);
        setEmail(consultationEmail);
      }
    };

    checkAccess();
  }, [user, loading]);

  const handleEmailVerification = async (verifiedEmail: string) => {
    try {
      // Check if this email has paid for consultation
      const { checkConsultationPaid } = await import('../../lib/supabase');
      const hasPaid = await checkConsultationPaid(verifiedEmail);
      
      if (hasPaid) {
        // Store email in localStorage for future checks
        localStorage.setItem(STORAGE_KEYS.CONSULTATION_EMAIL, verifiedEmail);
        localStorage.setItem(STORAGE_KEYS.PENDING_ACCOUNT, 'true');
        
        // Block access and show account creation prompt
        setEmail(verifiedEmail);
        setAccessBlocked(true);
        setShowEmailModal(false);
      } else {
        // No payment found - they can proceed with first form
        setShowEmailModal(false);
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      // On error, allow access
      setShowEmailModal(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        color: '#666',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // If access is blocked, show message instead of form
  if (accessBlocked) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '2rem',
        backgroundColor: '#f9fafb',
      }}>
        <div style={{
          maxWidth: '500px',
          backgroundColor: 'white',
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1.5rem',
          }}>
            🔒
          </div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#111',
            marginBottom: '1rem',
          }}>
            Account Required
          </h2>
          <p style={{
            color: '#666',
            marginBottom: '2rem',
            lineHeight: '1.6',
          }}>
            You've completed your consultation payment! To access additional forms, please create your account.
          </p>
          <button
            onClick={() => navigate('/signup', {
              state: {
                email,
                fromConsultation: true,
              },
            })}
            style={{
              width: '100%',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#1a1a1a',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              marginBottom: '1rem',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
          >
            Create Account
          </button>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              color: '#666',
              textDecoration: 'none',
              fontSize: '0.875rem',
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <EmailVerificationModal
        isOpen={showEmailModal}
        onSubmit={handleEmailVerification}
        onClose={() => setShowEmailModal(false)}
      />
      {children}
    </>
  );
};
