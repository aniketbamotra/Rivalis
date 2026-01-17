import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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
          name,
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
      return NextResponse.json(
        { error: 'Failed to submit inquiry' },
        { status: 500 }
      );
    }

    // Send confirmation email to applicant
    await sendConfirmationEmail(email, name);

    // Send notification to partners
    await sendPartnerNotification(data);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function sendConfirmationEmail(email: string, name: string) {
  // TODO: Integrate with your email service (Resend, SendGrid, etc.)
  // For now, this is a placeholder
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  console.log(`Sending confirmation email to ${email}`);
  
  // Example with Resend:
  /*
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  await resend.emails.send({
    from: 'partnerships@rivalislaw.com',
    to: email,
    subject: 'Partnership Inquiry Received - Rivalis Law',
    html: `
      <h1>Thank You for Your Interest, ${name}</h1>
      <p>We've received your partnership inquiry and will review it within 3-5 business days.</p>
      <p>If your background aligns with our current needs, we'll send you a private link to our detailed application.</p>
      <br/>
      <p>Best regards,<br/>The Rivalis Law Partnership Team</p>
    `
  });
  */
}

async function sendPartnerNotification(inquiry: unknown) {
  // TODO: Send notification to partners@rivalislaw.com
  console.log('Sending notification to partners:', inquiry);
  
  // Example:
  /*
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  await resend.emails.send({
    from: 'system@rivalislaw.com',
    to: 'partners@rivalislaw.com',
    subject: `New Partnership Inquiry: ${inquiry.name}`,
    html: `
      <h2>New Partnership Inquiry Received</h2>
      <ul>
        <li><strong>Name:</strong> ${inquiry.name}</li>
        <li><strong>Email:</strong> ${inquiry.email}</li>
        <li><strong>Pathway:</strong> ${inquiry.pathway_interest}</li>
        <li><strong>Specialty:</strong> ${inquiry.primary_specialty}</li>
        <li><strong>Years Practice:</strong> ${inquiry.years_practice}</li>
      </ul>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/applications">View in Admin Dashboard</a></p>
    `
  });
  */
}
