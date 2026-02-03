import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { sendConfirmationEmail, sendPartnerNotification } from '@/lib/partnerEmails';

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await request.json();
    const { token, ...formData } = body;

    // Validate token and get inquiry_id
    const { data: inquiry, error: inquiryError } = await supabase
      .from('partner_inquiries')
      .select('id')
      .eq('application_token', token)
      .single();

    if (inquiryError || !inquiry) {
      return NextResponse.json(
        { error: 'Invalid application token' },
        { status: 401 }
      );
    }

    // Prepare application data (matching database schema)
    const applicationData = {
      inquiry_id: inquiry.id,
      access_token: token,
      
      // Contact info (phone is NOT NULL in DB)
      full_name: `${formData.first_name} ${formData.last_name}`.trim(),
      email: formData.email,
      phone: formData.phone || '', // NOT NULL - use empty string if missing
      linkedin_url: formData.linkedin || null,
      current_firm: formData.current_firm || null,
      current_position: formData.current_position || null,
      preferred_work_location: formData.city && formData.location ? `${formData.city}, ${formData.location}` : null,
      
      // Experience (years_experience is NOT NULL in DB)
      bar_admissions: formData.bar_admissions ? formData.bar_admissions.split('\n').map((s: string) => s.trim()).filter(Boolean) : null,
      primary_specialties: formData.primary_specialty ? [formData.primary_specialty] : null,
      years_experience: formData.years_practice ? (formData.years_practice.includes('+') ? 20 : parseInt(formData.years_practice.split('-')[0]) || 0) : 0, // NOT NULL
      education_credentials: formData.education || null,
      notable_achievements: formData.achievements || null,
      
      // Business dev (annual_billings, portable_book, client_base_description are NOT NULL)
      annual_billings: formData.annual_billings || '', // NOT NULL
      portable_book: formData.portable_book || '', // NOT NULL
      client_base_description: formData.client_base || '', // NOT NULL
      business_dev_strengths: formData.bd_strengths && formData.bd_strengths.length > 0 ? formData.bd_strengths : null,
      
      // Financial (preferred_pathway, transition_timeline are NOT NULL)
      current_compensation: formData.current_compensation || null,
      preferred_pathway: formData.pathway || 'discuss', // NOT NULL - default to 'discuss'
      capital_contribution_capacity: formData.capital_capacity || null,
      transition_timeline: formData.timeline || '', // NOT NULL
      
      // Documents
      resume_url: formData.resume_url || null,
      writing_sample_url: formData.writing_sample_url || null,
      client_list_url: formData.client_list_url || null,
      additional_docs_urls: formData.additional_docs && formData.additional_docs.length > 0 ? formData.additional_docs : null,
      
      // References (stored as JSONB)
      professional_references: formData.references || null,
      
      // Other fields
      why_rivalis: formData.why_rivalis || '', // NOT NULL - required field in form
      has_conflicts: formData.conflicts === 'yes',
      conflicts_details: formData.conflicts_details || '',
      additional_info: formData.additional_info || '',
      
      status: 'pending',
    };

    // Insert application
    const { data: application, error: applicationError } = await supabase
      .from('partner_applications')
      .insert([applicationData])
      .select()
      .single();

    if (applicationError) {
      console.error('Database error:', applicationError);
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      );
    }

    // Update inquiry status
    await supabase
      .from('partner_inquiries')
      .update({ status: 'application_submitted' })
      .eq('id', inquiry.id);

    // Send confirmation email (non-blocking)
    const applicantName = `${formData.first_name} ${formData.last_name}`.trim();
    sendConfirmationEmail(formData.email, applicantName)
      .then(() => console.log('✅ Application confirmation email sent'))
      .catch(err => console.error('❌ Failed to send confirmation email:', err));

    // Transform application data for email (matches email template expectations)
    const emailData = {
      id: application.id,
      full_name: application.full_name,
      email: application.email,
      phone: application.phone || '',
      linkedin_url: application.linkedin_url,
      current_firm: application.current_firm || '',
      current_title: application.current_position || '', // Map back to what email expects
      bar_admissions: application.bar_admissions || [],
      law_school: formData.education?.split('\n')[0] || '', // First line is usually J.D.
      law_school_year: 0, // Not available in new format
      undergrad: formData.education?.split('\n')[1] || '', // Second line is usually undergrad
      practice_areas: application.primary_specialties || [], // Map back
      years_practice: application.years_experience || 0, // Map back
      representative_matters: formData.achievements || '',
      publications: '',
      speaking_engagements: '',
      awards: '',
      annual_billings: application.annual_billings || '',
      portable_book: application.portable_book || '',
      client_concentration: formData.client_base || '',
      referral_sources: '',
      marketing_activities: formData.bd_strengths?.join(', ') || '',
      current_compensation: application.current_compensation || '',
      compensation_expectations: formData.timeline || '',
      partnership_tier_preference: application.preferred_pathway || '', // Map back
      capital_contribution: application.capital_contribution_capacity,
      why_rivalis: formData.why_rivalis || '',
      resume_url: application.resume_url,
      writing_sample_url: application.writing_sample_url,
      client_list_url: application.client_list_url,
      references: application.professional_references as any || [] // Map back
    };

    // Send notification to partners (non-blocking)
    sendPartnerNotification(emailData)
      .then(() => console.log('✅ Partner notification email sent'))
      .catch(err => console.error('❌ Failed to send partner notification:', err));

    return NextResponse.json({ success: true, data: application });
  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
