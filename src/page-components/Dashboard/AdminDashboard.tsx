import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { MainLayout } from '../../components/Layout';
import { 
  getAllUsers, 
  getFormSubmissions,
  updateFormSubmissionStatus,
  getPartnerInquiries,
  getPartnerApplications,
  updateInquiryStatus,
  updateInquiryNotes,
  updateApplicationStatus,
  updateApplicationNotes,
  supabase 
} from '../../lib/supabase';
import type { Service, Profile, FormSubmission, SiteSettings, PartnerInquiry, PartnerApplication } from '../../types/database';
// Removed: sendApplicationInvite - now handled by API route
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
  const router = useRouter();
  
  const [services, setServices] = useState<Service[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [emergencyRequests, setEmergencyRequests] = useState<EmergencyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  type TabType = 'overview' | 'services' | 'users' | 'submissions' | 'partnerships' | 'emergency' | 'settings';
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
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

  // Site Settings state
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [editingSiteSettings, setEditingSiteSettings] = useState(false);
  const [settingsForm, setSettingsForm] = useState<Partial<SiteSettings>>({});

  // Partner Applications state
  const [partnerInquiries, setPartnerInquiries] = useState<PartnerInquiry[]>([]);
  const [partnerApplications, setPartnerApplications] = useState<PartnerApplication[]>([]);
  const [partnerSubTab, setPartnerSubTab] = useState<'inquiries' | 'applications'>('inquiries');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>('all');
  const [applicationStatusFilter, setApplicationStatusFilter] = useState<string>('all');
  
  // Partner modal state
  const [viewingInquiry, setViewingInquiry] = useState<PartnerInquiry | null>(null);
  const [viewingApplication, setViewingApplication] = useState<PartnerApplication | null>(null);
  const [editingInquiryNotes, setEditingInquiryNotes] = useState<PartnerInquiry | null>(null);
  const [inquiryNotesText, setInquiryNotesText] = useState('');
  const [editingApplicationNotes, setEditingApplicationNotes] = useState<PartnerApplication | null>(null);
  const [applicationNotesText, setApplicationNotesText] = useState('');
  const [sendingAppLink, setSendingAppLink] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/dashboard');
    }
  }, [authLoading, isAdmin, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isAdmin) return;
      
      try {
        const [servicesData, usersData, submissionsData, emergencyData, settingsData, partnerInquiriesData, partnerApplicationsData] = await Promise.all([
          supabase.from('services').select('*').order('display_order'),
          getAllUsers(),
          getFormSubmissions(),
          supabase
            .from('emergency_requests')
            .select('*')
            .order('created_at', { ascending: false }),
          supabase.from('site_settings').select('*').single() as unknown as { data: SiteSettings | null; error: any },
          getPartnerInquiries(),
          getPartnerApplications()
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
        setPartnerInquiries(partnerInquiriesData || []);
        setPartnerApplications(partnerApplicationsData || []);
        if (settingsData.data) {
          setSiteSettings(settingsData.data as SiteSettings);
          setSettingsForm(settingsData.data as Partial<SiteSettings>);
        }
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

  // Partner Inquiry Handlers
  const handleUpdateInquiryStatus = async (inquiryId: string, newStatus: string) => {
    try {
      await updateInquiryStatus(inquiryId, newStatus);
      setPartnerInquiries(partnerInquiries.map(i =>
        i.id === inquiryId ? { ...i, status: newStatus } : i
      ));
    } catch (error) {
      console.error('Error updating inquiry status:', error);
    }
  };

  const handleSaveInquiryNotes = async () => {
    if (!editingInquiryNotes) return;
    
    try {
      await updateInquiryNotes(editingInquiryNotes.id, inquiryNotesText);
      
      setPartnerInquiries(partnerInquiries.map(i => 
        i.id === editingInquiryNotes.id ? { ...i, notes: inquiryNotesText } : i
      ));
      
      setEditingInquiryNotes(null);
      setInquiryNotesText('');
    } catch (error) {
      console.error('Error saving inquiry notes:', error);
    }
  };

  const handleSendApplicationLink = async (inquiryId: string) => {
    const inquiry = partnerInquiries.find(i => i.id === inquiryId);
    if (!inquiry) return;
    
    const isResend = !!inquiry.application_link_sent_at;
    const confirmMessage = isResend 
      ? 'Resend the application link to this candidate? They will receive the same unique link.'
      : 'Send application link to this candidate via email?';
    
    if (!confirm(confirmMessage)) return;

    setSendingAppLink(true);
    
    try {
      // Call API route to send email (server-side)
      const response = await fetch('/api/partnership/send-application-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inquiryId }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to send application link');
      }

      // Update local state with the updated inquiry data from server
      setPartnerInquiries(partnerInquiries.map(i => 
        i.id === inquiryId ? result.inquiry : i
      ));

      alert(result.isResend
        ? 'Application link resent successfully!' 
        : 'Application link sent successfully!'
      );
      
    } catch (error) {
      console.error('Error sending application link:', error);
      alert('Failed to send email. Please check your configuration and try again.');
      
      // Refresh inquiries to get latest status from server
      const { data: updatedInquiries } = await supabase
        .from('partner_inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (updatedInquiries) {
        setPartnerInquiries(updatedInquiries);
      }
    } finally {
      setSendingAppLink(false);
    }
  };

  // Partner Application Handlers
  const handleUpdateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      await updateApplicationStatus(applicationId, newStatus);
      setPartnerApplications(partnerApplications.map(a =>
        a.id === applicationId ? { ...a, status: newStatus } : a
      ));
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const handleSaveApplicationNotes = async () => {
    if (!editingApplicationNotes) return;
    
    try {
      await updateApplicationNotes(editingApplicationNotes.id, applicationNotesText);
      
      setPartnerApplications(partnerApplications.map(a => 
        a.id === editingApplicationNotes.id ? { ...a, decision_notes: applicationNotesText } : a
      ));
      
      setEditingApplicationNotes(null);
      setApplicationNotesText('');
    } catch (error) {
      console.error('Error saving application notes:', error);
    }
  };

  const handleSaveSiteSettings = async () => {
    if (!siteSettings) return;
    
    try {
      setSaving(true);
      const { error } = await supabase
        .from('site_settings')
        // @ts-expect-error - Supabase type inference issue with site_settings table
        .update({
          ...settingsForm,
          updated_at: new Date().toISOString(),
          updated_by: (await supabase.auth.getUser()).data.user?.id
        })
        .eq('id', siteSettings.id);
      
      if (error) throw error;
      
      setSiteSettings({ ...siteSettings, ...settingsForm } as SiteSettings);
      setEditingSiteSettings(false);
      
      alert('Site settings saved successfully!');
    } catch (error) {
      console.error('Error saving site settings:', error);
      alert('Failed to save site settings. Please try again.');
    } finally {
      setSaving(false);
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
            className={`tab ${activeTab === 'partnerships' ? 'active' : ''}`}
            onClick={() => setActiveTab('partnerships')}
          >
            🤝 Partnerships ({partnerInquiries.length + partnerApplications.length})
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
          <button 
            className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Site Settings
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
                      ${services.find(s => s.type === 'consultation')?.price || 499}
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

          {/* Partnerships Tab */}
          {activeTab === 'partnerships' && (
            <div className="partnerships-section">
              <div className="section-header">
                <h2>🤝 Partnership Applications</h2>
                <p>Review and manage partnership inquiries and applications</p>
              </div>

              {/* Stats Overview */}
              <div className="overview-grid" style={{ marginBottom: '2rem' }}>
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
                    📝
                  </div>
                  <div className="stat-info">
                    <span className="stat-number">{partnerInquiries.length}</span>
                    <span className="stat-label">Total Inquiries</span>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' }}>
                    ⏳
                  </div>
                  <div className="stat-info">
                    <span className="stat-number">
                      {partnerInquiries.filter(i => i.status === 'pending').length}
                    </span>
                    <span className="stat-label">Pending Review</span>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#a78bfa' }}>
                    📋
                  </div>
                  <div className="stat-info">
                    <span className="stat-number">{partnerApplications.length}</span>
                    <span className="stat-label">Full Applications</span>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80' }}>
                    ✅
                  </div>
                  <div className="stat-info">
                    <span className="stat-number">
                      {partnerInquiries.filter(i => i.status === 'qualified').length}
                    </span>
                    <span className="stat-label">Qualified</span>
                  </div>
                </div>
              </div>

              {/* Sub-tabs */}
              <div className="sub-tabs" style={{ 
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
                marginBottom: '2rem',
                display: 'flex',
                gap: '1rem'
              }}>
                <button 
                  className={`tab ${partnerSubTab === 'inquiries' ? 'active' : ''}`}
                  onClick={() => setPartnerSubTab('inquiries')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: partnerSubTab === 'inquiries' ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                    border: 'none',
                    borderBottom: partnerSubTab === 'inquiries' ? '2px solid #d4af37' : '2px solid transparent',
                    color: partnerSubTab === 'inquiries' ? '#d4af37' : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                  }}
                >
                  Inquiries ({partnerInquiries.length})
                </button>
                <button 
                  className={`tab ${partnerSubTab === 'applications' ? 'active' : ''}`}
                  onClick={() => setPartnerSubTab('applications')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: partnerSubTab === 'applications' ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                    border: 'none',
                    borderBottom: partnerSubTab === 'applications' ? '2px solid #d4af37' : '2px solid transparent',
                    color: partnerSubTab === 'applications' ? '#d4af37' : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                  }}
                >
                  Full Applications ({partnerApplications.length})
                </button>
              </div>

              {/* Inquiries Table */}
              {partnerSubTab === 'inquiries' && (
                <div className="inquiries-table">
                  {/* Status Filter */}
                  <div className="status-filter-row" style={{
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <label style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Filter by status:</label>
                    <select
                      value={inquiryStatusFilter}
                      onChange={(e) => setInquiryStatusFilter(e.target.value)}
                      className="status-select"
                      style={{ padding: '0.5rem', borderRadius: '6px' }}
                    >
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="qualified">Qualified</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Pathway</th>
                        <th>Years</th>
                        <th>Status</th>
                        <th>Notes</th>
                        <th>Submitted</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {partnerInquiries
                        .filter(i => inquiryStatusFilter === 'all' || i.status === inquiryStatusFilter)
                        .map((inquiry) => (
                        <tr key={inquiry.id}>
                          <td>{inquiry.full_name}</td>
                          <td>{inquiry.email}</td>
                          <td className="capitalize">{inquiry.pathway_interest}</td>
                          <td>{inquiry.years_practice} yrs</td>
                          <td>
                            <select
                              value={inquiry.status}
                              onChange={(e) => handleUpdateInquiryStatus(inquiry.id, e.target.value)}
                              className="status-select"
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewing">Reviewing</option>
                              <option value="qualified">Qualified</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td>
                            {inquiry.notes ? (
                              <span style={{
                                fontSize: '0.85rem',
                                color: '#60a5fa',
                                maxWidth: '100px',
                                display: 'inline-block',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}>
                                {inquiry.notes.substring(0, 30)}...
                              </span>
                            ) : (
                              <span style={{ color: '#666', fontSize: '0.85rem' }}>—</span>
                            )}
                          </td>
                          <td>{formatDate(inquiry.created_at)}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                              <button 
                                className="view-button"
                                onClick={() => setViewingInquiry(inquiry)}
                                style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}
                              >
                                View
                              </button>
                              <button 
                                className="edit-button"
                                onClick={() => {
                                  setEditingInquiryNotes(inquiry);
                                  setInquiryNotesText(inquiry.notes || '');
                                }}
                                style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}
                              >
                                Notes
                              </button>
                              {inquiry.status === 'qualified' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                  <button 
                                    className="save-button"
                                    onClick={() => handleSendApplicationLink(inquiry.id)}
                                    disabled={sendingAppLink}
                                    style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}
                                  >
                                    {sendingAppLink ? 'Sending...' : 
                                     inquiry.application_link_sent_at ? 'Resend Link' : 'Send Link'}
                                  </button>
                                  
                                  {inquiry.application_link_sent_at && (
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                      {inquiry.application_link_last_send_status === 'failed' && (
                                        <span style={{ color: '#ef4444' }}>
                                          ⚠ Last send failed
                                        </span>
                                      )}
                                      {inquiry.application_link_last_send_status === 'success' && (
                                        <span style={{ color: '#10b981' }}>
                                          ✓ Sent {formatDate(inquiry.application_link_sent_at)}
                                        </span>
                                      )}
                                      {!inquiry.application_link_last_send_status && (
                                        <span style={{ color: '#10b981' }}>
                                          ✓ Sent {formatDate(inquiry.application_link_sent_at)}
                                        </span>
                                      )}
                                      {inquiry.application_link_send_count && inquiry.application_link_send_count > 1 && (
                                        <span style={{ color: '#94a3b8', marginLeft: '0.5rem' }}>
                                          ({inquiry.application_link_send_count}x)
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {partnerInquiries.filter(i => inquiryStatusFilter === 'all' || i.status === inquiryStatusFilter).length === 0 && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                      No inquiries found for the selected filter.
                    </div>
                  )}
                </div>
              )}

              {/* Applications Table */}
              {partnerSubTab === 'applications' && (
                <div className="applications-table">
                  {/* Status Filter */}
                  <div className="status-filter-row" style={{
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <label style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Filter by status:</label>
                    <select
                      value={applicationStatusFilter}
                      onChange={(e) => setApplicationStatusFilter(e.target.value)}
                      className="status-select"
                      style={{ padding: '0.5rem', borderRadius: '6px' }}
                    >
                      <option value="all">All Statuses</option>
                      <option value="submitted">Submitted</option>
                      <option value="under_review">Under Review</option>
                      <option value="interview">Interview</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Current Firm</th>
                        <th>Pathway</th>
                        <th>Status</th>
                        <th>Notes</th>
                        <th>Submitted</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {partnerApplications
                        .filter(a => applicationStatusFilter === 'all' || a.status === applicationStatusFilter)
                        .map((app) => (
                        <tr key={app.id}>
                          <td>{app.full_name}</td>
                          <td>{app.email}</td>
                          <td>{app.current_firm || '—'}</td>
                          <td className="capitalize">{app.preferred_pathway || '—'}</td>
                          <td>
                            <select
                              value={app.status}
                              onChange={(e) => handleUpdateApplicationStatus(app.id, e.target.value)}
                              className="status-select"
                            >
                              <option value="submitted">Submitted</option>
                              <option value="under_review">Under Review</option>
                              <option value="interview">Interview</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td>
                            {app.decision_notes ? (
                              <span style={{
                                fontSize: '0.85rem',
                                color: '#60a5fa',
                                maxWidth: '100px',
                                display: 'inline-block',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}>
                                {app.decision_notes.substring(0, 30)}...
                              </span>
                            ) : (
                              <span style={{ color: '#666', fontSize: '0.85rem' }}>—</span>
                            )}
                          </td>
                          <td>{formatDate(app.created_at)}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                              <button 
                                className="view-button"
                                onClick={() => setViewingApplication(app)}
                                style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}
                              >
                                View Full App
                              </button>
                              <button 
                                className="edit-button"
                                onClick={() => {
                                  setEditingApplicationNotes(app);
                                  setApplicationNotesText(app.decision_notes || '');
                                }}
                                style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}
                              >
                                Notes
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {partnerApplications.filter(a => applicationStatusFilter === 'all' || a.status === applicationStatusFilter).length === 0 && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                      No applications found for the selected filter.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Site Settings Tab */}
          {activeTab === 'settings' && (
            <div className="admin-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="section-header" style={{ marginBottom: '2rem', width: '100%', maxWidth: '900px' }}>
                <h2>Site Settings</h2>
                <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
                  Manage your firm information, contact details, and social media links
                </p>
              </div>

              {siteSettings && (
                <div style={{ maxWidth: '900px', width: '100%' }}>
                {/* Business Information Section */}
                <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '12px', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#f1f5f9' }}>Business Information</h3>
                  
                  <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                        Firm Name
                      </label>
                      <input
                        type="text"
                        value={editingSiteSettings ? settingsForm.firm_name || '' : siteSettings.firm_name}
                        onChange={(e) => setSettingsForm({ ...settingsForm, firm_name: e.target.value })}
                        disabled={!editingSiteSettings}
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '1px solid #475569', 
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: editingSiteSettings ? '#334155' : '#0f172a',
                          color: '#f1f5f9'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                        Attorney Name
                      </label>
                      <input
                        type="text"
                        value={editingSiteSettings ? settingsForm.attorney_name || '' : siteSettings.attorney_name}
                        onChange={(e) => setSettingsForm({ ...settingsForm, attorney_name: e.target.value })}
                        disabled={!editingSiteSettings}
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '1px solid #475569', 
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: editingSiteSettings ? '#334155' : '#0f172a',
                          color: '#f1f5f9'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                        Attorney Credentials
                      </label>
                      <input
                        type="text"
                        value={editingSiteSettings ? settingsForm.attorney_credentials || '' : siteSettings.attorney_credentials}
                        onChange={(e) => setSettingsForm({ ...settingsForm, attorney_credentials: e.target.value })}
                        disabled={!editingSiteSettings}
                        placeholder="NY & MI Bar | Oxford AI Certified | Big 4 Trained"
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '1px solid #475569', 
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: editingSiteSettings ? '#334155' : '#0f172a',
                          color: '#f1f5f9'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                        Bar Admission
                      </label>
                      <input
                        type="text"
                        value={editingSiteSettings ? settingsForm.bar_admission || '' : siteSettings.bar_admission}
                        onChange={(e) => setSettingsForm({ ...settingsForm, bar_admission: e.target.value })}
                        disabled={!editingSiteSettings}
                        placeholder="New York and Michigan"
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '1px solid #475569', 
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: editingSiteSettings ? '#334155' : '#0f172a',
                          color: '#f1f5f9'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                        Firm Tagline
                      </label>
                      <input
                        type="text"
                        value={editingSiteSettings ? settingsForm.firm_tagline || '' : siteSettings.firm_tagline || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, firm_tagline: e.target.value })}
                        disabled={!editingSiteSettings}
                        placeholder="Big 4 Trained Attorney | AI Governance | Global Immigration | M&A Transactions"
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '1px solid #475569', 
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: editingSiteSettings ? '#334155' : '#0f172a',
                          color: '#f1f5f9'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '12px', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#f1f5f9' }}>Contact Information</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                        Primary Phone
                      </label>
                      <input
                        type="text"
                        value={editingSiteSettings ? settingsForm.phone_primary || '' : siteSettings.phone_primary}
                        onChange={(e) => setSettingsForm({ ...settingsForm, phone_primary: e.target.value })}
                        disabled={!editingSiteSettings}
                        placeholder="+1 (313) 771-2283"
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '1px solid #475569', 
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: editingSiteSettings ? '#334155' : '#0f172a',
                          color: '#f1f5f9'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                        Display Phone
                      </label>
                      <input
                        type="text"
                        value={editingSiteSettings ? settingsForm.phone_display || '' : siteSettings.phone_display}
                        onChange={(e) => setSettingsForm({ ...settingsForm, phone_display: e.target.value })}
                        disabled={!editingSiteSettings}
                        placeholder="+1 (313) 771-2283"
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '1px solid #475569', 
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: editingSiteSettings ? '#334155' : '#0f172a',
                          color: '#f1f5f9'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Email Addresses Section */}
                <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '12px', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#f1f5f9' }}>Email Addresses</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                        General Contact
                      </label>
                      <input
                        type="email"
                        value={editingSiteSettings ? settingsForm.email_contact || '' : siteSettings.email_contact}
                        onChange={(e) => setSettingsForm({ ...settingsForm, email_contact: e.target.value })}
                        disabled={!editingSiteSettings}
                        placeholder="contact@rivalislaw.com"
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '1px solid #475569', 
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: editingSiteSettings ? '#334155' : '#0f172a', color: '#f1f5f9'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                        Employment Law
                      </label>
                      <input
                        type="email"
                        value={editingSiteSettings ? settingsForm.email_employment || '' : siteSettings.email_employment || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, email_employment: e.target.value })}
                        disabled={!editingSiteSettings}
                        placeholder="employment@rivalislaw.com"
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '1px solid #475569', 
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: editingSiteSettings ? '#334155' : '#0f172a', color: '#f1f5f9'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                        IP Strategy
                      </label>
                      <input
                        type="email"
                        value={editingSiteSettings ? settingsForm.email_ip || '' : siteSettings.email_ip || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, email_ip: e.target.value })}
                        disabled={!editingSiteSettings}
                        placeholder="ip@rivalislaw.com"
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '1px solid #475569', 
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: editingSiteSettings ? '#334155' : '#0f172a', color: '#f1f5f9'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                        Data Privacy
                      </label>
                      <input
                        type="email"
                        value={editingSiteSettings ? settingsForm.email_privacy || '' : siteSettings.email_privacy || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, email_privacy: e.target.value })}
                        disabled={!editingSiteSettings}
                        placeholder="privacy@rivalislaw.com"
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '1px solid #475569', 
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: editingSiteSettings ? '#334155' : '#0f172a', color: '#f1f5f9'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                        AI Governance
                      </label>
                      <input
                        type="email"
                        value={editingSiteSettings ? settingsForm.email_ai || '' : siteSettings.email_ai || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, email_ai: e.target.value })}
                        disabled={!editingSiteSettings}
                        placeholder="ai@rivalislaw.com"
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '1px solid #475569', 
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: editingSiteSettings ? '#334155' : '#0f172a', color: '#f1f5f9'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                        Entity Formation
                      </label>
                      <input
                        type="email"
                        value={editingSiteSettings ? settingsForm.email_formation || '' : siteSettings.email_formation || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, email_formation: e.target.value })}
                        disabled={!editingSiteSettings}
                        placeholder="formation@rivalislaw.com"
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '1px solid #475569', 
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: editingSiteSettings ? '#334155' : '#0f172a', color: '#f1f5f9'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                        M&A / Deals
                      </label>
                      <input
                        type="email"
                        value={editingSiteSettings ? settingsForm.email_deals || '' : siteSettings.email_deals || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, email_deals: e.target.value })}
                        disabled={!editingSiteSettings}
                        placeholder="deals@rivalislaw.com"
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '1px solid #475569', 
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: editingSiteSettings ? '#334155' : '#0f172a', color: '#f1f5f9'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                        Investigations
                      </label>
                      <input
                        type="email"
                        value={editingSiteSettings ? settingsForm.email_investigations || '' : siteSettings.email_investigations || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, email_investigations: e.target.value })}
                        disabled={!editingSiteSettings}
                        placeholder="investigations@rivalislaw.com"
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '1px solid #475569', 
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: editingSiteSettings ? '#334155' : '#0f172a', color: '#f1f5f9'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                        Contracts
                      </label>
                      <input
                        type="email"
                        value={editingSiteSettings ? settingsForm.email_contracts || '' : siteSettings.email_contracts || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, email_contracts: e.target.value })}
                        disabled={!editingSiteSettings}
                        placeholder="contracts@rivalislaw.com"
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '1px solid #475569', 
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: editingSiteSettings ? '#334155' : '#0f172a', color: '#f1f5f9'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                        Legal (General)
                      </label>
                      <input
                        type="email"
                        value={editingSiteSettings ? settingsForm.email_legal || '' : siteSettings.email_legal || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, email_legal: e.target.value })}
                        disabled={!editingSiteSettings}
                        placeholder="legal@rivalislaw.com"
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '1px solid #475569', 
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: editingSiteSettings ? '#334155' : '#0f172a', color: '#f1f5f9'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Social Media Section */}
                <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '12px', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#f1f5f9' }}>Social Media</h3>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                      LinkedIn Profile URL
                    </label>
                    <input
                      type="text"
                      value={editingSiteSettings ? settingsForm.linkedin_url || '' : siteSettings.linkedin_url || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, linkedin_url: e.target.value })}
                      disabled={!editingSiteSettings}
                      placeholder="https://linkedin.com/in/username"
                      style={{ 
                        width: '100%', 
                        padding: '0.75rem', 
                        border: '1px solid #475569', 
                        borderRadius: '8px',
                        fontSize: '1rem',
                        backgroundColor: editingSiteSettings ? '#334155' : '#0f172a',
                        color: '#f1f5f9'
                      }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  {editingSiteSettings ? (
                    <>
                      <button
                        onClick={() => {
                          setEditingSiteSettings(false);
                          setSettingsForm(siteSettings);
                        }}
                        style={{
                          padding: '0.75rem 1.5rem',
                          border: '1px solid #475569',
                          borderRadius: '8px',
                          background: 'white',
                          color: '#cbd5e1',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveSiteSettings}
                        disabled={saving}
                        style={{
                          padding: '0.75rem 1.5rem',
                          border: 'none',
                          borderRadius: '8px',
                          background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
                          color: 'white',
                          fontWeight: '600',
                          cursor: saving ? 'not-allowed' : 'pointer',
                          opacity: saving ? 0.7 : 1
                        }}
                      >
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setEditingSiteSettings(true)}
                      style={{
                        padding: '0.75rem 1.5rem',
                        border: 'none',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
                        color: 'white',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Edit Settings
                    </button>
                  )}
                </div>
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

        {/* Other Modals */}
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

        {/* Partner Inquiry Details Modal */}
        <Dialog open={!!viewingInquiry} onOpenChange={(open) => {
          if (!open) setViewingInquiry(null);
        }}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Partnership Inquiry Details</DialogTitle>
              <DialogDescription>
                {viewingInquiry && (
                  <>
                    Submitted on {new Date(viewingInquiry.created_at).toLocaleString()}
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            
            {viewingInquiry && (
              <div className="space-y-4 mt-4">
                {/* Contact Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Full Name</p>
                      <p className="text-sm">{viewingInquiry.full_name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Email</p>
                      <p className="text-sm">{viewingInquiry.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Phone</p>
                      <p className="text-sm">{viewingInquiry.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${
                        viewingInquiry.status === 'qualified' ? 'bg-green-100 text-green-800' :
                        viewingInquiry.status === 'reviewing' ? 'bg-blue-100 text-blue-800' :
                        viewingInquiry.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {viewingInquiry.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Professional Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">Professional Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Pathway Interest</p>
                      <p className="text-sm capitalize">{viewingInquiry.pathway_interest}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Primary Specialty</p>
                      <p className="text-sm">{viewingInquiry.primary_specialty}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Years in Practice</p>
                      <p className="text-sm">{viewingInquiry.years_practice} years</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Practice Overview</p>
                      <p className="text-sm whitespace-pre-wrap">{viewingInquiry.practice_overview}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Why Rivalis?</p>
                      <p className="text-sm whitespace-pre-wrap">{viewingInquiry.why_rivalis}</p>
                    </div>
                  </div>
                </div>

                {/* Admin Tracking */}
                {(viewingInquiry.notes || viewingInquiry.reviewed_by) && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="text-lg font-semibold mb-3 text-blue-900">Admin Information</h3>
                    <div className="space-y-2">
                      {viewingInquiry.reviewed_by && (
                        <div>
                          <p className="text-sm font-semibold text-gray-600 mb-1">Reviewed By</p>
                          <p className="text-sm">{viewingInquiry.reviewed_by}</p>
                        </div>
                      )}
                      {viewingInquiry.reviewed_at && (
                        <div>
                          <p className="text-sm font-semibold text-gray-600 mb-1">Reviewed At</p>
                          <p className="text-sm">{formatDate(viewingInquiry.reviewed_at)}</p>
                        </div>
                      )}
                      {viewingInquiry.application_link_sent_at && (
                        <div>
                          <p className="text-sm font-semibold text-gray-600 mb-1">Application Link Status</p>
                          <p className="text-sm">
                            Last sent: {formatDate(viewingInquiry.application_link_sent_at)}
                            {viewingInquiry.application_link_send_count && viewingInquiry.application_link_send_count > 1 && 
                              ` (sent ${viewingInquiry.application_link_send_count} times)`
                            }
                          </p>
                          {viewingInquiry.application_link_last_send_status === 'failed' && (
                            <p className="text-sm text-red-600 mt-1">⚠ Last send failed - click Resend Link to retry</p>
                          )}
                          {viewingInquiry.application_link_last_send_status === 'success' && (
                            <p className="text-sm text-green-600 mt-1">✓ Email delivered successfully</p>
                          )}
                        </div>
                      )}
                      {viewingInquiry.notes && (
                        <div>
                          <p className="text-sm font-semibold text-gray-600 mb-1">Notes</p>
                          <p className="text-sm whitespace-pre-wrap">{viewingInquiry.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Partner Application Details Modal */}
        <Dialog open={!!viewingApplication} onOpenChange={(open) => {
          if (!open) setViewingApplication(null);
        }}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Full Partnership Application</DialogTitle>
              <DialogDescription>
                {viewingApplication && (
                  <>
                    {viewingApplication.full_name} • Submitted on {new Date(viewingApplication.created_at).toLocaleString()}
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            
            {viewingApplication && (
              <div className="space-y-4 mt-4">
                {/* Section 1: Contact Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">1. Contact Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Full Name</p>
                      <p className="text-sm">{viewingApplication.full_name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Email</p>
                      <p className="text-sm">{viewingApplication.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Phone</p>
                      <p className="text-sm">{viewingApplication.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">LinkedIn</p>
                      <p className="text-sm">{viewingApplication.linkedin_url ? (
                        <a href={viewingApplication.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          View Profile
                        </a>
                      ) : 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Current Firm</p>
                      <p className="text-sm">{viewingApplication.current_firm || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Current Position</p>
                      <p className="text-sm">{viewingApplication.current_position || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Section 2: Professional Experience */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">2. Professional Experience</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Bar Admissions</p>
                      <p className="text-sm">{viewingApplication.bar_admissions?.join(', ') || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Primary Specialties</p>
                      <p className="text-sm">{viewingApplication.primary_specialties?.join(', ') || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Years of Experience</p>
                      <p className="text-sm">{viewingApplication.years_experience || 0} years</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Education & Credentials</p>
                      <p className="text-sm whitespace-pre-wrap">{viewingApplication.education_credentials || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Notable Achievements</p>
                      <p className="text-sm whitespace-pre-wrap">{viewingApplication.notable_achievements || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Business Development */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">3. Business Development</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Annual Billings</p>
                      <p className="text-sm">{viewingApplication.annual_billings || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Portable Book of Business</p>
                      <p className="text-sm">{viewingApplication.portable_book || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Client Base Description</p>
                      <p className="text-sm whitespace-pre-wrap">{viewingApplication.client_base_description || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Business Development Strengths</p>
                      <p className="text-sm">{viewingApplication.business_dev_strengths?.join(', ') || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Section 4: Partnership Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">4. Partnership Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Preferred Pathway</p>
                      <p className="text-sm capitalize">{viewingApplication.preferred_pathway || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Capital Contribution Capacity</p>
                      <p className="text-sm">{viewingApplication.capital_contribution_capacity || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Current Compensation</p>
                      <p className="text-sm">{viewingApplication.current_compensation || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Transition Timeline</p>
                      <p className="text-sm">{viewingApplication.transition_timeline || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Why Rivalis?</p>
                      <p className="text-sm whitespace-pre-wrap">{viewingApplication.why_rivalis || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Section 5: Documents */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">5. Documents</h3>
                  <div className="space-y-2">
                    {viewingApplication.resume_url && (
                      <div>
                        <a 
                          href={viewingApplication.resume_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:underline text-sm"
                        >
                          📄 View Resume/CV
                        </a>
                      </div>
                    )}
                    {viewingApplication.writing_sample_url && (
                      <div>
                        <a 
                          href={viewingApplication.writing_sample_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:underline text-sm"
                        >
                          📝 View Writing Sample
                        </a>
                      </div>
                    )}
                    {viewingApplication.client_list_url && (
                      <div>
                        <a 
                          href={viewingApplication.client_list_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:underline text-sm"
                        >
                          📋 View Client List
                        </a>
                      </div>
                    )}
                    {(!viewingApplication.resume_url && !viewingApplication.writing_sample_url && !viewingApplication.client_list_url) && (
                      <p className="text-sm text-gray-500">No documents uploaded</p>
                    )}
                  </div>
                </div>

                {/* Section 6: References & Additional Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">6. References & Additional Information</h3>
                  <div className="space-y-3">
                    {viewingApplication.professional_references && Array.isArray(viewingApplication.professional_references) && (
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-3">Professional References</p>
                        <div className="space-y-3">
                          {viewingApplication.professional_references.map((ref: any, index: number) => (
                            <div key={index} className="bg-white p-3 rounded-lg border border-gray-200">
                              <p className="text-sm font-semibold text-gray-800 mb-2">Reference {index + 1}</p>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="font-semibold text-gray-600">Name:</span>
                                  <span className="ml-2">{ref.name}</span>
                                </div>
                                <div>
                                  <span className="font-semibold text-gray-600">Relationship:</span>
                                  <span className="ml-2">{ref.relationship}</span>
                                </div>
                                <div>
                                  <span className="font-semibold text-gray-600">Email:</span>
                                  <a href={`mailto:${ref.email}`} className="ml-2 text-blue-600 hover:underline">
                                    {ref.email}
                                  </a>
                                </div>
                                <div>
                                  <span className="font-semibold text-gray-600">Phone:</span>
                                  <a href={`tel:${ref.phone}`} className="ml-2 text-blue-600 hover:underline">
                                    {ref.phone}
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Conflicts of Interest</p>
                      <p className="text-sm">{viewingApplication.has_conflicts ? 'Yes' : 'No'}</p>
                      {viewingApplication.has_conflicts && viewingApplication.conflicts_details && (
                        <p className="text-sm mt-1 whitespace-pre-wrap">{viewingApplication.conflicts_details}</p>
                      )}
                    </div>
                    {viewingApplication.additional_info && (
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Additional Information</p>
                        <p className="text-sm whitespace-pre-wrap">{viewingApplication.additional_info}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Admin Tracking */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="text-lg font-semibold mb-3 text-blue-900">Admin Information</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${
                        viewingApplication.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        viewingApplication.status === 'interview' ? 'bg-purple-100 text-purple-800' :
                        viewingApplication.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                        viewingApplication.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {viewingApplication.status.replace('_', ' ')}
                      </span>
                    </div>
                    {viewingApplication.reviewed_by && (
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Reviewed By</p>
                        <p className="text-sm">{viewingApplication.reviewed_by}</p>
                      </div>
                    )}
                    {viewingApplication.reviewed_at && (
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Reviewed At</p>
                        <p className="text-sm">{formatDate(viewingApplication.reviewed_at)}</p>
                      </div>
                    )}
                    {viewingApplication.decision_notes && (
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">Decision Notes</p>
                        <p className="text-sm whitespace-pre-wrap">{viewingApplication.decision_notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Partner Inquiry Notes Modal */}
        <Dialog open={!!editingInquiryNotes} onOpenChange={(open) => {
          if (!open) {
            setEditingInquiryNotes(null);
            setInquiryNotesText('');
          }
        }}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Inquiry Notes</DialogTitle>
              <DialogDescription>
                {editingInquiryNotes && (
                  <>
                    Add or update notes for {editingInquiryNotes.full_name}'s partnership inquiry
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Internal Notes
                </label>
                <textarea
                  value={inquiryNotesText}
                  onChange={(e) => setInquiryNotesText(e.target.value)}
                  placeholder="Enter internal notes about this inquiry..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setEditingInquiryNotes(null);
                    setInquiryNotesText('');
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveInquiryNotes}
                  className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Partner Application Notes Modal */}
        <Dialog open={!!editingApplicationNotes} onOpenChange={(open) => {
          if (!open) {
            setEditingApplicationNotes(null);
            setApplicationNotesText('');
          }
        }}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Decision Notes</DialogTitle>
              <DialogDescription>
                {editingApplicationNotes && (
                  <>
                    Add or update decision notes for {editingApplicationNotes.full_name}'s application
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Decision Notes
                </label>
                <textarea
                  value={applicationNotesText}
                  onChange={(e) => setApplicationNotesText(e.target.value)}
                  placeholder="Enter decision notes and evaluation comments..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setEditingApplicationNotes(null);
                    setApplicationNotesText('');
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveApplicationNotes}
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
