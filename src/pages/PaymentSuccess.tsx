import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { updateFormSubmissionsAfterPayment } from '../lib/supabase';
import { setAccountCreationPending, getConsultationEmail } from '../utils/consultationFlow';

export const PaymentSuccess: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAccountPrompt, setShowAccountPrompt] = useState(false);

  useEffect(() => {
    const processPayment = async () => {
      const sessionId = searchParams.get('session_id');
      
      // Check if this is an emergency consultation payment
      const emergencyData = localStorage.getItem('emergencyConsultationData');
      
      if (emergencyData) {
        // Process emergency consultation
        try {
          const data = JSON.parse(emergencyData);
          
          if (sessionId) {
            // Send emergency email and store in database
            const emailResponse = await fetch('/api/emergency-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userEmail: data.userEmail,
                userName: data.userName,
                userPhone: data.phone,
                urgency: data.urgency,
                issue: data.issue,
                contactMode: data.contactMode,
                paymentId: sessionId,
                hasAccount: true,
                userId: data.userId,
              }),
            });

            if (!emailResponse.ok) {
              throw new Error('Failed to send emergency notification');
            }

            // Clear localStorage
            localStorage.removeItem('emergencyConsultationData');
            
            // Redirect to dashboard
            setTimeout(() => {
              router.push('/dashboard?tab=emergency&success=true');
            }, 2000);
          }
        } catch (err) {
          console.error('Error processing emergency consultation:', err);
          setError('Error submitting emergency request. Please contact support.');
          setLoading(false);
          return;
        }
        
        setLoading(false);
        return;
      }
      
      // Get email from localStorage for regular consultations
      const email = getConsultationEmail();
      
      if (!email) {
        setError('Payment email not found. Please make sure you submitted a form before payment.');
        setLoading(false);
        return;
      }

      try {
        // If no session_id, this might be a test or direct navigation
        // Still show success and prompt for account creation
        if (sessionId) {
          // Payment will be recorded by webhook
          setAccountCreationPending(email, sessionId);
          
          // Update form submissions (in case webhook hasn't fired yet)
          await updateFormSubmissionsAfterPayment(email);
        } else {
          // No session_id - likely testing or direct access
          // Just mark as pending for account creation
          setAccountCreationPending(email, 'test_session');
        }

        setLoading(false);
        setShowAccountPrompt(true);

      } catch (err) {
        console.error('Error processing payment:', err);
        setError('Payment successful, but there was an error updating your account. Please contact support.');
        setLoading(false);
      }
    };

    processPayment();
  }, [searchParams, router]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Processing Payment...</h2>
        <p style={{ color: '#666' }}>Please wait while we confirm your payment.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#dc2626' }}>⚠️</div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#dc2626' }}>Error</h2>
        <p style={{ color: '#666', marginBottom: '2rem', maxWidth: '500px' }}>{error}</p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            backgroundColor: '#1a1a1a',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '500',
          }}
        >
          Return to Home
        </Link>
      </div>
    );
  }

  if (showAccountPrompt) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: '#f9fafb',
      }}>
        <div style={{
          maxWidth: '600px',
          backgroundColor: 'white',
          padding: '3rem',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#1a1a1a',
          }}>
            Payment Successful!
          </h1>
          <p style={{
            color: '#666',
            marginBottom: '2rem',
            lineHeight: '1.6',
            fontSize: '1.1rem',
          }}>
            Thank you for your payment. Your consultation has been confirmed.
          </p>

          {/* Step 2: Schedule Consultation */}
          <div style={{
            backgroundColor: '#10b981',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            color: 'white',
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}>
              <span>📅</span>
              Step 2: Schedule Your Consultation
            </h3>
            <p style={{
              lineHeight: '1.6',
              marginBottom: '0',
              opacity: 0.95,
            }}>
              Book your 60-minute legal consultation with our team below
            </p>
          </div>

          {/* Calendly Embed */}
          <div style={{
            width: '100%',
            marginBottom: '2rem',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}>
            <iframe
              src={`${import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/aniketbamotra/legal'}?embed_domain=${window.location.hostname}&embed_type=Inline&hide_gdpr_banner=1&primary_color=0088cc`}
              width="100%"
              height="700"
              frameBorder="0"
              title="Schedule Consultation"
            />
          </div>

          {/* Account Creation Prompt */}
          <div style={{
            backgroundColor: '#f0f9ff',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            borderLeft: '4px solid #0088cc',
          }}>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              marginBottom: '0.75rem',
              color: '#1a1a1a',
            }}>
              Step 3: Create Your Account
            </h3>
            <p style={{
              color: '#666',
              lineHeight: '1.6',
              marginBottom: '0',
            }}>
              Create your account to access all intake forms and track your consultation status.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              onClick={() => {
                const email = getConsultationEmail();
                if (email) {
                  sessionStorage.setItem('signupEmail', email);
                  sessionStorage.setItem('fromConsultation', 'true');
                }
                router.push('/signup');
              }}
              style={{
                width: '100%',
                padding: '1rem 2rem',
                backgroundColor: '#0088cc',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
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
              Create Account
            </button>
            <button
              onClick={() => router.push('/')}
              style={{
                width: '100%',
                padding: '1rem 2rem',
                backgroundColor: 'transparent',
                color: '#666',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              I'll do this later
            </button>
          </div>

          <p style={{
            marginTop: '1.5rem',
            fontSize: '0.875rem',
            color: '#999',
          }}>
            You can create your account anytime using the email you provided.
          </p>
        </div>
      </div>
    );
  }

  return null;
};
