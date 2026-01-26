import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

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

    // Prepare application data
    const applicationData = {
      inquiry_id: inquiry.id,
      access_token: token,
      
      // Contact info
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      linkedin_url: formData.linkedin || null,
      current_firm: formData.current_firm,
      current_title: formData.current_title,
      
      // Experience
      bar_admissions: formData.bar_admissions.filter((a: string) => a.trim()),
      law_school: formData.law_school,
      law_school_year: parseInt(formData.law_school_year),
      undergrad: formData.undergrad,
      practice_areas: formData.practice_areas.filter((a: string) => a.trim()),
      years_practice: parseInt(formData.years_practice),
      representative_matters: formData.representative_matters,
      publications: formData.publications || null,
      speaking_engagements: formData.speaking_engagements || null,
      awards: formData.awards || null,
      
      // Business dev
      annual_billings: formData.annual_billings,
      portable_book: formData.portable_book,
      client_concentration: formData.client_concentration,
      referral_sources: formData.referral_sources,
      marketing_activities: formData.marketing_activities,
      
      // Financial
      current_compensation: formData.current_compensation,
      compensation_expectations: formData.compensation_expectations,
      partnership_tier_preference: formData.partnership_tier_preference,
      capital_contribution: formData.capital_contribution || null,
      
      // Documents
      resume_url: formData.resume_url,
      writing_sample_url: formData.writing_sample_url,
      client_list_url: formData.client_list_url || null,
      
      // References (stored as JSONB)
      references: formData.references,
      
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

    // Send confirmation email
    await sendConfirmationEmail(formData.email, formData.full_name);

    // Send notification to partners
    await sendPartnerNotification(application);

    return NextResponse.json({ success: true, data: application });
  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function sendConfirmationEmail(email: string, name: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  console.log(`Sending confirmation email to ${email}`);
  // TODO: Integrate with email service
}

async function sendPartnerNotification(application: unknown) {
  console.log('Sending notification to partners:', application);
  // TODO: Send notification to partners@rivalislaw.com
}
