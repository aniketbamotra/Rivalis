import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendInquiryConfirmation, sendInquiryAdminAlert } from '../../../src/lib/partnerEmails';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      name,
      email,
      phone,
      pathway,
      specialty,
      years_practice,
      brief_background,
      why_rivalis,
    } = body;

    // Validate required fields
    if (!name || !email || !pathway || !specialty || !years_practice || !brief_background || !why_rivalis) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert into database
    const { data, error } = await supabase
      .from('partner_inquiries')
      .insert([
        {
          full_name: name,
          email,
          phone: phone || null,
          pathway_interest: pathway,
          primary_specialty: specialty,
          years_practice: parseInt(years_practice),
          practice_overview: brief_background,
          why_rivalis,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: 'Failed to submit inquiry', details: error.message },
        { status: 500 }
      );
    }

    // Send confirmation email to applicant
    try {
      await sendInquiryConfirmation({
        email,
        name,
        pathway,
        specialty,
      });
      console.log('✅ Confirmation email sent to applicant');
    } catch (emailError) {
      console.error('❌ Failed to send confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    // Send notification to partners
    try {
      await sendInquiryAdminAlert({
        name,
        email,
        phone,
        pathway,
        specialty,
        yearsExperience: parseInt(years_practice),
        practiceOverview: brief_background,
        whyRivalis: why_rivalis,
        inquiryId: data.id,
      });
      console.log('✅ Admin notification email sent');
    } catch (emailError) {
      console.error('❌ Failed to send admin notification:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
