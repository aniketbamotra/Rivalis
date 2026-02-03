import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { sendApplicationInvite } from '@/lib/partnerEmails';

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const { inquiryId } = await request.json();

    if (!inquiryId) {
      return NextResponse.json(
        { error: 'Inquiry ID is required' },
        { status: 400 }
      );
    }

    // Get inquiry from database
    const { data: inquiry, error: fetchError } = await supabase
      .from('partner_inquiries')
      .select('*')
      .eq('id', inquiryId)
      .single();

    if (fetchError || !inquiry) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    // Reuse existing token or generate new one
    const token = inquiry.application_token || crypto.randomUUID();
    
    // Send email FIRST
    const emailResult = await sendApplicationInvite({
      email: inquiry.email,
      name: inquiry.full_name,
      token: token
    });
    
    if (!emailResult.success) {
      // Update status to failed
      await supabase
        .from('partner_inquiries')
        .update({ 
          application_link_last_send_status: 'failed'
        } as never)
        .eq('id', inquiryId);

      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }
    
    // Only update database if email succeeded
    const { error: updateError } = await supabase
      .from('partner_inquiries')
      .update({ 
        application_token: token,
        application_link_sent_at: new Date().toISOString(),
        status: 'qualified',
        application_link_send_count: (inquiry.application_link_send_count || 0) + 1,
        application_link_last_send_status: 'success'
      } as never)
      .eq('id', inquiryId);

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update database' },
        { status: 500 }
      );
    }

    // Return updated inquiry data
    const { data: updatedInquiry } = await supabase
      .from('partner_inquiries')
      .select('*')
      .eq('id', inquiryId)
      .single();

    return NextResponse.json({ 
      success: true,
      inquiry: updatedInquiry,
      isResend: !!inquiry.application_link_sent_at
    });

  } catch (error) {
    console.error('Error in send-application-link API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
