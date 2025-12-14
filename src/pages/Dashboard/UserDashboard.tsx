import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { MainLayout } from '../../components/Layout';
import { getUserPurchases, supabase } from '../../lib/supabase';
import type { Purchase, FormSubmission, Service } from '../../types/database';
import './dashboard.css';

type PurchaseWithRelations = Purchase & {
  service: Service | null;
  form_submission: FormSubmission | null;
};

export function UserDashboard() {
  const { user, profile } = useAuth();
  const [purchases, setPurchases] = useState<PurchaseWithRelations[]>([]);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'submissions'>('overview');

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        const [purchasesData, submissionsData] = await Promise.all([
          getUserPurchases(user.id),
          supabase
            .from('form_submissions')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
        ]);
        
        setPurchases(purchasesData as PurchaseWithRelations[]);
        setSubmissions(submissionsData.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const getStatusBadge = (status: string) => {
    const statusClasses: Record<string, string> = {
      pending: 'status-pending',
      reviewed: 'status-reviewed',
      in_progress: 'status-progress',
      completed: 'status-completed',
      paid: 'status-paid',
    };
    return `status-badge ${statusClasses[status] || 'status-pending'}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatPrice = (price: number | null) => {
    if (!price) return 'Custom';
    return `$${price.toLocaleString()}`;
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="dashboard-loading">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="dashboard">
        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-header-content">
            <div className="user-welcome">
              <h1>Welcome back, {profile?.full_name || 'User'}</h1>
              <p>{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="dashboard-tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            My Services
          </button>
          <button 
            className={`tab ${activeTab === 'submissions' ? 'active' : ''}`}
            onClick={() => setActiveTab('submissions')}
          >
            Form Submissions
          </button>
        </div>

        {/* Content */}
        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="overview-grid">
              {/* Calendly Booking Section */}
              <div style={{
                gridColumn: '1 / -1',
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                marginBottom: '2rem',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  paddingBottom: '1rem',
                  borderBottom: '2px solid #f0f0f0',
                }}>
                  <div style={{
                    fontSize: '2.5rem',
                  }}>
                    📅
                  </div>
                  <div>
                    <h2 style={{
                      margin: 0,
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: '#1a1a1a',
                    }}>
                      Schedule Your Consultation
                    </h2>
                    <p style={{
                      margin: '0.25rem 0 0 0',
                      color: '#666',
                      fontSize: '0.95rem',
                    }}>
                      Book or reschedule your 60-minute legal consultation
                    </p>
                  </div>
                </div>
                
                <div style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                }}>
                  <iframe
                    src={`https://calendly.com/aniketbamotra/legal?embed_domain=${window.location.hostname}&embed_type=Inline&hide_gdpr_banner=1&primary_color=0088cc${user?.email ? `&email=${encodeURIComponent(user.email)}` : ''}`}
                    width="100%"
                    height="700"
                    frameBorder="0"
                    title="Schedule Consultation"
                  />
                </div>
              </div>

              {/* Stats Cards */}
              <div className="stat-card">
                <div className="stat-icon services-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                    <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                    <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                  </svg>
                </div>
                <div className="stat-info">
                  <span className="stat-number">{purchases.length}</span>
                  <span className="stat-label">Active Services</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon submissions-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clipRule="evenodd" />
                    <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                  </svg>
                </div>
                <div className="stat-info">
                  <span className="stat-number">{submissions.length}</span>
                  <span className="stat-label">Form Submissions</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon pending-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="stat-info">
                  <span className="stat-number">
                    {submissions.filter(s => s.status === 'pending' || s.status === 'in_progress').length}
                  </span>
                  <span className="stat-label">In Progress</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="services-section">
              <h2>My Purchased Services</h2>
              {purchases.length === 0 ? (
                <div className="empty-state">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                  </svg>
                  <h3>No services yet</h3>
                  <p>Browse our services and get started with your legal needs.</p>
                  <Link to="/#services" className="cta-button">Browse Services</Link>
                </div>
              ) : (
                <div className="purchases-list">
                  {purchases.map((purchase) => (
                    <div key={purchase.id} className="purchase-card">
                      <div className="purchase-header">
                        <h3>{purchase.service?.name || 'Service'}</h3>
                        <span className={getStatusBadge(purchase.status)}>
                          {purchase.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="purchase-details">
                        <div className="detail">
                          <span className="label">Amount:</span>
                          <span className="value">{formatPrice(purchase.amount)}</span>
                        </div>
                        <div className="detail">
                          <span className="label">Date:</span>
                          <span className="value">{formatDate(purchase.created_at)}</span>
                        </div>
                      </div>
                      {purchase.notes && (
                        <div className="purchase-notes">
                          <p>{purchase.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="submissions-section">
              <h2>Form Submissions</h2>
              {submissions.length === 0 ? (
                <div className="empty-state">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" clipRule="evenodd" />
                  </svg>
                  <h3>No submissions yet</h3>
                  <p>Fill out an intake form to get started with our services.</p>
                  <Link to="/forms/qualification" className="cta-button">Start Intake Form</Link>
                </div>
              ) : (
                <div className="submissions-list">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="submission-card">
                      <div className="submission-header">
                        <h3>{submission.form_type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
                        <span className={getStatusBadge(submission.status)}>
                          {submission.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="submission-details">
                        <div className="detail">
                          <span className="label">Submitted:</span>
                          <span className="value">{formatDate(submission.created_at)}</span>
                        </div>
                        <div className="detail">
                          <span className="label">Email:</span>
                          <span className="value">{submission.email}</span>
                        </div>
                      </div>
                      {submission.admin_notes && (
                        <div className="admin-notes">
                          <strong>Notes from Rivalis:</strong>
                          <p>{submission.admin_notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
