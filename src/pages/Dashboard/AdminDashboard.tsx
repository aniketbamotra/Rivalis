import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { MainLayout } from '../../components/Layout';
import { 
  getAllUsers, 
  getFormSubmissions,
  updateFormSubmissionStatus,
  supabase 
} from '../../lib/supabase';
import type { Service, Profile, FormSubmission } from '../../types/database';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import './dashboard.css';

interface EmergencyRequest {
  id: string;
  user_id: string;
  urgency: 'critical' | 'urgent' | 'high';
  issue: string;
  contact_mode: 'call' | 'email' | 'video';
  phone: string;
  status: 'pending' | 'contacted' | 'in_progress' | 'resolved' | 'cancelled';
  payment_id: string;
  admin_notes: string | null;
  created_at: string;
  contacted_at: string | null;
  resolved_at: string | null;
  profiles?: {
    full_name: string;
    email: string;
  };
}

export function AdminDashboard() {
  const { isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [services, setServices] = useState<Service[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [emergencyRequests, setEmergencyRequests] = useState<EmergencyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'users' | 'submissions' | 'emergency'>('overview');
  
  // Edit modal state
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newPrice, setNewPrice] = useState('');
  const [newCalendlyUrl, setNewCalendlyUrl] = useState('');
  const [saving, setSaving] = useState(false);
  
  // Submission details modal state
  const [viewingSubmission, setViewingSubmission] = useState<FormSubmission | null>(null);
  
  // Emergency notes modal state
  const [editingNotes, setEditingNotes] = useState<EmergencyRequest | null>(null);
  const [notesText, setNotesText] = useState('');

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/dashboard');
    }
  }, [authLoading, isAdmin, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isAdmin) return;
      
      try {
        const [servicesData, usersData, submissionsData, emergencyData] = await Promise.all([
          supabase.from('services').select('*').order('display_order'),
          getAllUsers(),
          getFormSubmissions(),
          supabase
            .from('emergency_requests')
            .select('*')
            .order('created_at', { ascending: false })
        ]);
        
        // Fetch profiles for emergency requests
        const emergencyWithProfiles = (emergencyData.data || []) as EmergencyRequest[];
        if (emergencyWithProfiles.length > 0) {
          const userIds = [...new Set(emergencyWithProfiles.map(req => req.user_id))];
          const { data: profilesData } = await supabase
            .from('profiles')
            .select('id, full_name, email')
            .in('id', userIds);
          
          // Merge profiles into emergency requests
          emergencyWithProfiles.forEach(request => {
            const profile = (profilesData as any)?.find((p: any) => p.id === request.user_id);
            if (profile) {
              (request as any).profiles = profile;
            }
          });
        }
        
        setServices(servicesData.data || []);
        setUsers(usersData);
        setSubmissions(submissionsData);
        setEmergencyRequests(emergencyWithProfiles);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAdmin]);

  const handleUpdatePrice = async () => {
    if (!editingService) return;
    
    setSaving(true);
    try {
      // Update both price and calendly_url
      const { error } = await supabase
        .from('services')
        // @ts-expect-error - Supabase type inference issue
        .update({ 
          price: parseFloat(newPrice),
          calendly_url: newCalendlyUrl || null
        })
        .eq('id', editingService.id);

      if (error) throw error;

      setServices(services.map(s => 
        s.id === editingService.id ? { ...s, price: parseFloat(newPrice), calendly_url: newCalendlyUrl || null } : s
      ));
      setEditingService(null);
      setNewPrice('');
      setNewCalendlyUrl('');
    } catch (error) {
      console.error('Error updating service:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateStatus = async (submissionId: string, newStatus: string) => {
    try {
      await updateFormSubmissionStatus(submissionId, newStatus);
      setSubmissions(submissions.map(s =>
        s.id === submissionId ? { ...s, status: newStatus as FormSubmission['status'] } : s
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSaveNotes = async () => {
    if (!editingNotes) return;
    
    try {
      // @ts-ignore - Supabase type inference issue
      const { error } = await supabase.from('emergency_requests').update({ admin_notes: notesText, updated_at: new Date().toISOString() }).eq('id', editingNotes.id);
      
      if (error) throw error;
      
      setEmergencyRequests(emergencyRequests.map(r => 
        r.id === editingNotes.id ? { ...r, admin_notes: notesText } : r
      ));
      
      setEditingNotes(null);
      setNotesText('');
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number | null) => {
    if (!price) return 'Custom';
    return `$${price.toLocaleString()}`;
  };

  const getStatusBadge = (status: string) => {
    const statusClasses: Record<string, string> = {
      pending: 'status-pending',
      reviewed: 'status-reviewed',
      in_progress: 'status-progress',
      completed: 'status-completed',
    };
    return `status-badge ${statusClasses[status] || 'status-pending'}`;
  };

  if (authLoading || loading) {
    return (
      <MainLayout>
        <div className="dashboard-loading">
          <div className="spinner"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </MainLayout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <MainLayout>
      <div className="dashboard admin-dashboard">
        {/* Header */}
        <div className="dashboard-header admin-header">
          <div className="dashboard-header-content">
            <div className="user-welcome">
              <h1>Admin Dashboard</h1>
              <p>Manage services, users, and submissions</p>
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
            Services & Pricing
          </button>
          <button 
            className={`tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users ({users.length})
          </button>
          <button 
            className={`tab ${activeTab === 'submissions' ? 'active' : ''}`}
            onClick={() => setActiveTab('submissions')}
          >
            Submissions ({submissions.length})
          </button>
          <button 
            className={`tab ${activeTab === 'emergency' ? 'active' : ''}`}
            onClick={() => setActiveTab('emergency')}
            style={{
              background: emergencyRequests.filter(r => r.status === 'pending').length > 0 
                ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' 
                : undefined,
              color: emergencyRequests.filter(r => r.status === 'pending').length > 0 
                ? 'white' 
                : undefined
            }}
          >
            🚨 Emergency ({emergencyRequests.filter(r => r.status === 'pending').length})
          </button>
        </div>

        {/* Content */}
        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="admin-overview">
              <div className="overview-grid">
                <div className="stat-card">
                  <div className="stat-icon services-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                    </svg>
                  </div>
                  <div className="stat-info">
                    <span className="stat-number">{services.filter(s => s.is_active).length}</span>
                    <span className="stat-label">Active Services</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon users-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="stat-info">
                    <span className="stat-number">{users.length}</span>
                    <span className="stat-label">Total Users</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon submissions-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" clipRule="evenodd" />
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
                      {submissions.filter(s => s.status === 'pending').length}
                    </span>
                    <span className="stat-label">Pending Review</span>
                  </div>
                </div>
              </div>

              {/* Recent Submissions */}
              <div className="recent-section">
                <h2>Recent Submissions</h2>
                <div className="recent-list">
                  {submissions.slice(0, 5).map((submission) => (
                    <div key={submission.id} className="recent-item">
                      <div className="recent-info">
                        <strong>{submission.form_type.replace(/-/g, ' ')}</strong>
                        <span>{submission.email}</span>
                      </div>
                      <div className="recent-meta">
                        <span className={getStatusBadge(submission.status)}>
                          {submission.status}
                        </span>
                        <span className="recent-date">{formatDate(submission.created_at)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="services-section admin-services">
              <div className="section-header">
                <h2>Services & Pricing</h2>
                <p>Update service pricing and details</p>
              </div>
              
              {/* Consultation Fee Highlight */}
              {services.find(s => s.type === 'consultation') && (
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  marginBottom: '2rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>
                      Consultation Fee
                    </h3>
                    <p style={{ margin: 0, opacity: 0.9 }}>
                      One-time fee required to access all intake forms
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                      ${services.find(s => s.type === 'consultation')?.price || 299}
                    </div>
                    <button 
                      style={{
                        background: 'white',
                        color: '#667eea',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        marginTop: '0.5rem',
                      }}
                      onClick={() => {
                        const consultationService = services.find(s => s.type === 'consultation');
                        if (consultationService) {
                          setEditingService(consultationService);
                          setNewPrice(consultationService.price?.toString() || '');
                          setNewCalendlyUrl(consultationService.calendly_url || '');
                        }
                      }}
                    >
                      Update Fee
                    </button>
                  </div>
                </div>
              )}
              
              <div className="services-table">
                <table>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Price Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.filter(s => s.type !== 'consultation').map((service) => (
                      <tr key={service.id}>
                        <td>
                          <div className="service-name">
                            <strong>{service.name}</strong>
                            <span>{service.short_description}</span>
                          </div>
                        </td>
                        <td>{service.category}</td>
                        <td className="price-cell">{formatPrice(service.price)}</td>
                        <td>{service.price_type}</td>
                        <td>
                          <span className={`status-badge ${service.is_active ? 'status-completed' : 'status-pending'}`}>
                            {service.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="edit-button"
                            onClick={() => {
                              setEditingService(service);
                              setNewPrice(service.price?.toString() || '');
                              setNewCalendlyUrl(service.calendly_url || '');
                            }}
                          >
                            Edit Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="users-section">
              <div className="section-header">
                <h2>All Users</h2>
                <p>View and manage user accounts</p>
              </div>
              
              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Company</th>
                      <th>Role</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.full_name || '-'}</td>
                        <td>{user.email}</td>
                        <td>{user.company_name || '-'}</td>
                        <td>
                          <span className={`role-badge ${user.role === 'admin' ? 'role-admin' : 'role-user'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>{formatDate(user.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="submissions-section admin-submissions">
              <div className="section-header">
                <h2>Form Submissions</h2>
                <p>Review and manage intake form submissions</p>
              </div>
              
              <div className="submissions-table">
                <table>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Submitted</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((submission) => (
                      <tr key={submission.id}>
                        <td className="form-type">
                          {submission.form_type.replace(/-/g, ' ')}
                        </td>
                        <td>{submission.email}</td>
                        <td>
                          <select
                            value={submission.status}
                            onChange={(e) => handleUpdateStatus(submission.id, e.target.value)}
                            className="status-select"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>
                        <td>{formatDate(submission.created_at)}</td>
                        <td>
                          <button 
                            className="view-button"
                            onClick={() => setViewingSubmission(submission)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'emergency' && (
            <div className="emergency-section">
              <div className="section-header">
                <h2>🚨 Emergency Consultation Requests</h2>
                <p>Priority requests requiring immediate attention</p>
              </div>

              {emergencyRequests.length === 0 ? (
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '3rem',
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem' }}>
                    No Emergency Requests
                  </h3>
                  <p style={{ color: '#666' }}>
                    All emergency consultation requests have been handled.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {emergencyRequests.map((request) => {
                    const getUrgencyColor = (urgency: string) => {
                      switch (urgency) {
                        case 'critical': return '#dc2626';
                        case 'urgent': return '#ea580c';
                        case 'high': return '#ca8a04';
                        default: return '#6b7280';
                      }
                    };

                    return (
                      <div
                        key={request.id}
                        style={{
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          padding: '1.5rem',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                          border: request.status === 'pending' 
                            ? '1px solid #dc2626' 
                            : '1px solid #e5e7eb',
                          borderLeft: request.status === 'pending' 
                            ? '4px solid #dc2626' 
                            : '4px solid #e5e7eb',
                        }}
                      >
                        {/* Header */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '1.25rem',
                          paddingBottom: '1rem',
                          borderBottom: '1px solid #e5e7eb',
                        }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                              <span style={{
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                color: getUrgencyColor(request.urgency),
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                padding: '0.25rem 0.5rem',
                                backgroundColor: `${getUrgencyColor(request.urgency)}10`,
                                borderRadius: '4px',
                              }}>
                                {request.urgency}
                              </span>
                              <span style={{
                                display: 'inline-block',
                                padding: '0.25rem 0.5rem',
                                backgroundColor: '#f3f4f6',
                                color: '#6b7280',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: '500',
                                textTransform: 'capitalize',
                              }}>
                                {request.status.replace('_', ' ')}
                              </span>
                            </div>
                            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                              {new Date(request.created_at).toLocaleString()}
                            </span>
                          </div>
                          
                          <div style={{
                            fontSize: '0.75rem',
                            color: '#6b7280',
                            fontFamily: 'monospace',
                          }}>
                            {request.payment_id.substring(0, 24)}...
                          </div>
                        </div>

                        {/* Client Info */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                          gap: '1rem',
                          marginBottom: '1.5rem',
                        }}>
                          <div style={{
                            backgroundColor: '#f9fafb',
                            padding: '1rem',
                            borderRadius: '8px',
                          }}>
                            <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem', fontWeight: '600' }}>
                              CLIENT NAME
                            </div>
                            <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1a1a1a' }}>
                              {request.profiles?.full_name || 'N/A'}
                            </div>
                          </div>
                          
                          <div style={{
                            backgroundColor: '#f9fafb',
                            padding: '1rem',
                            borderRadius: '8px',
                          }}>
                            <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem', fontWeight: '600' }}>
                              EMAIL
                            </div>
                            <a href={`mailto:${request.profiles?.email}`} style={{
                              fontSize: '1rem',
                              fontWeight: '600',
                              color: '#0088cc',
                              textDecoration: 'none',
                            }}>
                              {request.profiles?.email || 'N/A'}
                            </a>
                          </div>
                          
                          <div style={{
                            backgroundColor: '#f9fafb',
                            padding: '1rem',
                            borderRadius: '8px',
                          }}>
                            <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem', fontWeight: '600' }}>
                              PHONE
                            </div>
                            <a href={`tel:${request.phone}`} style={{
                              fontSize: '1rem',
                              fontWeight: '600',
                              color: '#0088cc',
                              textDecoration: 'none',
                            }}>
                              {request.phone}
                            </a>
                          </div>
                          
                          <div style={{
                            backgroundColor: '#f9fafb',
                            padding: '1rem',
                            borderRadius: '8px',
                          }}>
                            <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem', fontWeight: '600' }}>
                              PREFERRED CONTACT
                            </div>
                            <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1a1a1a', textTransform: 'capitalize' }}>
                              {request.contact_mode}
                            </div>
                          </div>
                        </div>

                        {/* Issue Description */}
                        <div style={{
                          backgroundColor: '#f9fafb',
                          border: '1px solid #e5e7eb',
                          padding: '1rem',
                          borderRadius: '6px',
                          marginBottom: '1.25rem',
                        }}>
                          <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Issue Description
                          </div>
                          <p style={{
                            margin: 0,
                            fontSize: '0.875rem',
                            color: '#1f2937',
                            lineHeight: '1.6',
                            whiteSpace: 'pre-wrap',
                          }}>
                            {request.issue}
                          </p>
                        </div>

                        {/* Admin Notes */}
                        {request.admin_notes && (
                          <div style={{
                            backgroundColor: '#eff6ff',
                            border: '1px solid #dbeafe',
                            padding: '1rem',
                            borderRadius: '6px',
                            marginBottom: '1.25rem',
                          }}>
                            <div style={{
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              color: '#2563eb',
                              marginBottom: '0.5rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                            }}>
                              Admin Notes
                            </div>
                            <p style={{
                              margin: 0,
                              fontSize: '0.875rem',
                              color: '#1f2937',
                              lineHeight: '1.6',
                            }}>
                              {request.admin_notes}
                            </p>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div style={{
                          display: 'flex',
                          gap: '0.75rem',
                          flexWrap: 'wrap',
                        }}>
                          <button
                            onClick={() => {
                              setEditingNotes(request);
                              setNotesText(request.admin_notes || '');
                            }}
                            style={{
                              padding: '0.5rem 1rem',
                              backgroundColor: '#6b7280',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              cursor: 'pointer',
                            }}
                          >
                            Add Notes
                          </button>

                          {request.status === 'pending' && (
                            <button
                              onClick={async () => {
                                // @ts-ignore
                                const { error } = await supabase.from('emergency_requests').update({ status: 'contacted', contacted_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('id', request.id);
                                
                                setEmergencyRequests(emergencyRequests.map(r => 
                                  r.id === request.id ? { ...r, status: 'contacted', contacted_at: new Date().toISOString() } : r
                                ));
                              }}
                              style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#2563eb',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                              }}
                            >
                              Mark Contacted
                            </button>
                          )}

                          {(request.status === 'contacted' || request.status === 'pending') && (
                            <button
                              onClick={async () => {
                                // @ts-ignore
                                const { error } = await supabase.from('emergency_requests').update({ status: 'in_progress', updated_at: new Date().toISOString() }).eq('id', request.id);
                                
                                setEmergencyRequests(emergencyRequests.map(r => 
                                  r.id === request.id ? { ...r, status: 'in_progress' } : r
                                ));
                              }}
                              style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#7c3aed',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                              }}
                            >
                              In Progress
                            </button>
                          )}

                          {request.status !== 'resolved' && (
                            <button
                              onClick={async () => {
                                // @ts-ignore
                                const { error } = await supabase.from('emergency_requests').update({ status: 'resolved', resolved_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('id', request.id);
                                
                                setEmergencyRequests(emergencyRequests.map(r => 
                                  r.id === request.id ? { ...r, status: 'resolved', resolved_at: new Date().toISOString() } : r
                                ));
                              }}
                              style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#059669',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                              }}
                            >
                              Resolve
                            </button>
                          )}

                          <a
                            href={`tel:${request.phone}`}
                            style={{
                              padding: '0.5rem 1rem',
                              backgroundColor: '#dc2626',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              textDecoration: 'none',
                              display: 'inline-block',
                            }}
                          >
                            Call Now
                          </a>

                          <a
                            href={`mailto:${request.profiles?.email}`}
                            style={{
                              padding: '0.5rem 1rem',
                              backgroundColor: '#0891b2',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              textDecoration: 'none',
                              display: 'inline-block',
                            }}
                          >
                            ✉️ Email Client
                          </a>
                        </div>

                        {/* Timestamps */}
                        {(request.contacted_at || request.resolved_at) && (
                          <div style={{
                            fontSize: '0.8rem',
                            color: '#666',
                            marginTop: '1.5rem',
                            paddingTop: '1rem',
                            borderTop: '1px solid #e5e7eb',
                          }}>
                            {request.contacted_at && `Contacted: ${new Date(request.contacted_at).toLocaleString()}`}
                            {request.contacted_at && request.resolved_at && ' • '}
                            {request.resolved_at && `Resolved: ${new Date(request.resolved_at).toLocaleString()}`}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Edit Price Modal */}
        {editingService && (
          <div className="modal-overlay" onClick={() => setEditingService(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>Edit Service Details</h3>
              <p className="modal-service-name">{editingService.name}</p>
              
              <div className="modal-form">
                <label htmlFor="price">Price ($)</label>
                <input
                  id="price"
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                />

                <label htmlFor="calendly" style={{ marginTop: '1rem' }}>Calendly Scheduling URL (optional)</label>
                <input
                  id="calendly"
                  type="url"
                  value={newCalendlyUrl}
                  onChange={(e) => setNewCalendlyUrl(e.target.value)}
                  placeholder="https://calendly.com/your-username/event-type"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                />
                <p style={{
                  fontSize: '0.85rem',
                  color: '#666',
                  marginTop: '0.5rem',
                  marginBottom: 0,
                }}>
                  Users will see this Calendly link when booking consultations for this service
                </p>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="cancel-button"
                  onClick={() => setEditingService(null)}
                >
                  Cancel
                </button>
                <button 
                  className="save-button"
                  onClick={handleUpdatePrice}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Submission Details Modal */}
        <Dialog open={!!viewingSubmission} onOpenChange={(open) => !open && setViewingSubmission(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Submission Details</DialogTitle>
              <DialogDescription>
                {viewingSubmission && (
                  <>
                    <span className="font-semibold">{viewingSubmission.form_type}</span>
                    {' • '}
                    <span>Submitted on {new Date(viewingSubmission.created_at).toLocaleString()}</span>
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            
            {viewingSubmission && (
              <div className="space-y-4 mt-4">
                {/* Status and Email */}
                <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${
                      viewingSubmission.status === 'completed' ? 'bg-green-100 text-green-800' :
                      viewingSubmission.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      viewingSubmission.status === 'reviewed' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {viewingSubmission.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">User Email</p>
                    <p className="text-sm">{viewingSubmission.email}</p>
                  </div>
                </div>

                {/* Form Data */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Form Data</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    {Object.entries(viewingSubmission.form_data as Record<string, any>).map(([key, value]) => (
                      <div key={key} className="border-b border-gray-200 pb-3 last:border-0">
                        <p className="text-sm font-semibold text-gray-700 mb-1 capitalize">
                          {key.replace(/_/g, ' ')}
                        </p>
                        <p className="text-sm text-gray-900 whitespace-pre-wrap">
                          {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Emergency Notes Modal */}
        <Dialog open={!!editingNotes} onOpenChange={(open) => {
          if (!open) {
            setEditingNotes(null);
            setNotesText('');
          }
        }}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Admin Notes</DialogTitle>
              <DialogDescription>
                {editingNotes && (
                  <>
                    Add or update notes for emergency request from {editingNotes.profiles?.full_name || 'User'}
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Notes
                </label>
                <textarea
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="Enter admin notes here..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setEditingNotes(null);
                    setNotesText('');
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNotes}
                  className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
