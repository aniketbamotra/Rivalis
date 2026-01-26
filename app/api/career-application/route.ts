import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendCareerApplicationConfirmation, sendCareerApplicationAdminAlert } from '@/lib/careerEmails';

// Create Supabase admin client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Insert into career_applications table
    const { data: application, error } = await supabaseAdmin
      .from('career_applications')
      .insert([{
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        linkedin_url: data.linkedinUrl,
        location: data.location,
        position_applying: data.positionApplying,
        position_type: data.positionType,
        department: data.department,
        years_experience: data.yearsExperience,
        current_employer: data.currentEmployer,
        current_position: data.currentPosition,
        bar_admissions: data.barAdmissions,
        education: data.education,
        technical_skills: data.technicalSkills,
        languages: data.languages,
        specializations: data.specializations,
        work_arrangement: data.workArrangement,
        start_date: data.startDate,
        salary_expectation: data.salaryExpectation,
        resume_url: data.resumeUrl,
        cover_letter_url: data.coverLetterUrl,
        portfolio_url: data.portfolioUrl,
        how_did_you_hear: data.howDidYouHear,
        why_rivalis: data.whyRivalis,
        additional_info: data.additionalInfo,
        status: 'submitted'
      }])
      .select()
      .single();

    if (error) throw error;

    // Send emails (non-blocking)
    Promise.all([
      sendCareerApplicationConfirmation(data),
      sendCareerApplicationAdminAlert(data)
    ]).catch(err => console.error('Email error:', err));

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error('Career application error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
