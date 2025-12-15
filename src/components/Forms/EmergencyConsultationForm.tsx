import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const STRIPE_CHECKOUT_URL = '/.netlify/functions/create-checkout-session';

type UrgencyLevel = 'critical' | 'urgent' | 'high';
type ContactMode = 'call' | 'email' | 'video';

interface FormData {
  urgency: UrgencyLevel;
  issue: string;
  contactMode: ContactMode;
  phone: string;
}

export function EmergencyConsultationForm() {
  const { user, profile } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    urgency: 'urgent',
    issue: '',
    contactMode: 'call',
    phone: profile?.phone || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to request emergency consultation');
      return;
    }

    // Validate form
    if (!formData.issue.trim()) {
      setError('Please describe your urgent legal matter');
      return;
    }

    if (formData.contactMode === 'call' && !formData.phone.trim()) {
      setError('Phone number is required for call consultations');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create Stripe checkout session for $499 payment
      const response = await fetch(STRIPE_CHECKOUT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: 'emergency-consultation',
          serviceName: 'Emergency Legal Consultation',
          amount: 49900, // $499 in cents
          email: user.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment session');
      }

      const { url } = await response.json();
      
      if (!url) {
        throw new Error('No checkout URL received');
      }

      // Store form data in localStorage to retrieve after payment
      localStorage.setItem('emergencyConsultationData', JSON.stringify({
        ...formData,
        userId: user.id,
        userEmail: user.email,
        userName: profile?.full_name || user.email,
      }));

      // Redirect to Stripe checkout
      window.location.href = url;
    } catch (err) {
      console.error('Error submitting emergency consultation:', err);
      setError(err instanceof Error ? err.message : 'Failed to process payment. Please try again.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '3rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#22c55e',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" style={{ width: '48px', height: '48px' }}>
            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '1rem' }}>
          Request Submitted Successfully
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '1.5rem' }}>
          Our team will contact you within 2 hours
        </p>
        <div style={{
          backgroundColor: '#fef3c7',
          border: '1px solid #fbbf24',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1.5rem',
        }}>
          <p style={{ color: '#92400e', margin: 0, fontSize: '0.95rem' }}>
            For immediate assistance, call: <strong style={{ fontWeight: '700' }}>+1 (555) 123-4567</strong>
          </p>
        </div>
        <button
          onClick={() => {
            setSuccess(false);
            setFormData({
              urgency: 'urgent',
              issue: '',
              contactMode: 'call',
              phone: profile?.phone || '',
            });
          }}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: '#0088cc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid #f0f0f0',
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#fee2e2',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
        }}>
          🚨
        </div>
        <div>
          <h2 style={{
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1a1a1a',
          }}>
            Emergency Legal Consultation
          </h2>
          <p style={{
            margin: '0.25rem 0 0 0',
            color: '#666',
            fontSize: '0.95rem',
          }}>
            $499 • Response within 2 hours
          </p>
        </div>
      </div>

      {/* Alert Banner */}
      <div style={{
        backgroundColor: '#fef3c7',
        border: '1px solid #fbbf24',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1.5rem',
      }}>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.25rem' }}>⚠️</span>
          <div>
            <p style={{ color: '#92400e', margin: 0, fontSize: '0.95rem', fontWeight: '600', marginBottom: '0.25rem' }}>
              For Life-Threatening Emergencies
            </p>
            <p style={{ color: '#92400e', margin: 0, fontSize: '0.9rem' }}>
              If you're in immediate danger, please call 911 first. This service is for urgent legal matters requiring immediate attorney attention.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Urgency Level */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.95rem',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '0.5rem',
          }}>
            Urgency Level *
          </label>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {[
              { value: 'critical', label: 'Critical', color: '#ef4444', emoji: '🔴' },
              { value: 'urgent', label: 'Urgent', color: '#f97316', emoji: '🟠' },
              { value: 'high', label: 'High Priority', color: '#eab308', emoji: '🟡' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData({ ...formData, urgency: option.value as UrgencyLevel })}
                style={{
                  flex: 1,
                  padding: '1rem',
                  border: `2px solid ${formData.urgency === option.value ? option.color : '#e5e7eb'}`,
                  backgroundColor: formData.urgency === option.value ? `${option.color}10` : 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{option.emoji}</span>
                <span style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: formData.urgency === option.value ? option.color : '#64748b',
                }}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Issue Description */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.95rem',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '0.5rem',
          }}>
            Describe Your Urgent Legal Matter *
          </label>
          <textarea
            value={formData.issue}
            onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
            placeholder="Please provide details about your urgent legal situation. Include relevant dates, parties involved, and why immediate legal assistance is needed..."
            required
            rows={6}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical',
            }}
          />
          <p style={{ fontSize: '0.85rem', color: '#666', margin: '0.5rem 0 0 0' }}>
            Minimum 50 characters required
          </p>
        </div>

        {/* Contact Mode */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.95rem',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '0.5rem',
          }}>
            Preferred Contact Method *
          </label>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {[
              { value: 'call', label: 'Phone Call', icon: '📞' },
              { value: 'email', label: 'Email', icon: '✉️' },
              { value: 'video', label: 'Video Call', icon: '🎥' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData({ ...formData, contactMode: option.value as ContactMode })}
                style={{
                  flex: 1,
                  padding: '1rem',
                  border: `2px solid ${formData.contactMode === option.value ? '#0088cc' : '#e5e7eb'}`,
                  backgroundColor: formData.contactMode === option.value ? '#f0f9ff' : 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{option.icon}</span>
                <span style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: formData.contactMode === option.value ? '#0088cc' : '#64748b',
                }}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Phone Number (conditional) */}
        {formData.contactMode === 'call' && (
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#1a1a1a',
              marginBottom: '0.5rem',
            }}>
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
              }}
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #ef4444',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1.5rem',
          }}>
            <p style={{ color: '#dc2626', margin: 0, fontSize: '0.95rem' }}>
              {error}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || formData.issue.length < 50}
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: loading || formData.issue.length < 50 ? '#cbd5e1' : '#0088cc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: '700',
            cursor: loading || formData.issue.length < 50 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          {loading ? (
            <>
              <div style={{
                width: '20px',
                height: '20px',
                border: '3px solid white',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }} />
              Processing Payment...
            </>
          ) : (
            <>
              🔒 Pay $499 & Submit Request
            </>
          )}
        </button>

        {/* Info Text */}
        <p style={{
          fontSize: '0.85rem',
          color: '#666',
          textAlign: 'center',
          marginTop: '1rem',
          marginBottom: 0,
        }}>
          You will be redirected to secure payment processing. Our team will contact you within 2 hours of payment confirmation.
        </p>
      </form>
    </div>
  );
}
