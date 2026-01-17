import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, company } = body;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if subscriber already exists
    const { data: existingSubscriber } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .eq('email', email)
      .single();

    if (existingSubscriber) {
      // Reactivate if they previously unsubscribed
      if (existingSubscriber.status === 'unsubscribed') {
        await supabase
          .from('newsletter_subscribers')
          .update({ status: 'active', unsubscribed_at: null })
          .eq('email', email);
      }
      return NextResponse.json(
        { success: true, message: 'Already subscribed to newsletter' },
        { status: 200 }
      );
    }

    // Add subscriber to database
    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email,
        first_name: firstName || null,
        company: company || null,
        status: 'active',
      });

    if (insertError) {
      console.error('Supabase error:', insertError);
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      );
    }

    // Send confirmation email via Resend
    const confirmationEmail = await resend.emails.send({
      from: 'Intelligence Hub <noreply@rivalislaw.com>',
      to: email,
      subject: 'Welcome to Rivalis Law Intelligence Hub',
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="border-bottom: 3px solid #d4af37; padding-bottom: 20px; margin-bottom: 30px;">
            <h2 style="margin: 0; color: #1a1a2e; font-family: 'Crimson Pro', serif; font-size: 24px;">
              Welcome to Intelligence Hub
            </h2>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Hi ${firstName ? firstName : 'there'},
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Thank you for subscribing to Rivalis Law Intelligence Hub. You'll receive proprietary analysis on frontier legal developments—AI governance, space law, CRISPR regulation, quantum computing, and more.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
            Expect your first briefing within 48 hours.
          </p>
          
          <div style="background: #fafbfc; border-left: 4px solid #d4af37; padding: 20px; margin: 30px 0; border-radius: 4px;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              <strong>What to expect:</strong><br>
              • Biweekly intelligence briefings (every Monday & Thursday)<br>
              • Real-time regulatory updates<br>
              • Case law analysis from top specialists<br>
              • Exclusive templates and compliance tools
            </p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            <strong>Want more?</strong> 
            <a href="https://rivalislaw.com/intelligence-hub/premium" style="color: #d4af37; text-decoration: none; font-weight: 600;">
              Upgrade to Premium
            </a> 
            for full access to all resources, tools, and analysis.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 40px;">
            Questions? Reply to this email or contact us at 
            <a href="mailto:intelligence@rivalislaw.com" style="color: #d4af37; text-decoration: none; font-weight: 600;">
              intelligence@rivalislaw.com
            </a>
          </p>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; font-size: 12px; color: #999;">
            <p style="margin: 0 0 10px 0;">
              © ${new Date().getFullYear()} Rivalis Law. All rights reserved.
            </p>
            <p style="margin: 0;">
              <a href="https://rivalislaw.com/privacy" style="color: #d4af37; text-decoration: none;">Privacy Policy</a> | 
              <a href="https://rivalislaw.com" style="color: #d4af37; text-decoration: none;">Website</a>
            </p>
            <p style="margin: 10px 0 0 0;">
              <a href="[unsubscribe_link]" style="color: #999; text-decoration: none; font-size: 11px;">Unsubscribe from this list</a>
            </p>
          </div>
        </div>
      `,
    });

    if (confirmationEmail.error) {
      console.warn('Email send warning:', confirmationEmail.error);
      // Still return success even if email failed - subscriber was added to DB
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed. Check your email for confirmation.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
