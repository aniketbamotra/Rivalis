import { Resend } from 'resend';

// Deferred initialization to avoid build-time errors
const getResend = () => new Resend(process.env.RESEND_API_KEY);

interface InquiryConfirmationParams {
  email: string;
  name: string;
  pathway: string;
  specialty: string;
}

interface InquiryAdminAlertParams {
  name: string;
  email: string;
  phone?: string;
  pathway: string;
  specialty: string;
  yearsExperience: number;
  practiceOverview: string;
  whyRivalis: string;
  inquiryId: string;
}

interface ApplicationInviteParams {
  email: string;
  name: string;
  token: string;
}

interface ApplicationConfirmationParams {
  email: string;
  name: string;
}

interface ApplicationNotificationParams {
  full_name: string;
  email: string;
  phone: string;
  linkedin_url?: string;
  current_firm: string;
  current_title: string;
  bar_admissions: string[];
  law_school: string;
  law_school_year: number;
  undergrad: string;
  practice_areas: string[];
  years_practice: number;
  representative_matters: string;
  publications?: string;
  speaking_engagements?: string;
  awards?: string;
  annual_billings: string;
  portable_book: string;
  client_concentration: string;
  referral_sources: string;
  marketing_activities: string;
  current_compensation: string;
  compensation_expectations: string;
  partnership_tier_preference: string;
  capital_contribution?: string;
  why_rivalis: string;
  resume_url?: string;
  writing_sample_url?: string;
  client_list_url?: string;
  references: Array<{
    name: string;
    relationship: string;
    firm: string;
    email: string;
    phone: string;
  }>;
  id: string;
}

/**
 * Send confirmation email to applicant after inquiry submission
 */
export async function sendInquiryConfirmation({
  email,
  name,
  pathway,
  specialty,
}: InquiryConfirmationParams) {
  const resend = getResend();
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content {
          padding: 30px;
          background: #f9f9f9;
        }
        .info-box {
          background: white;
          padding: 20px;
          border-left: 4px solid #d4af37;
          margin: 20px 0;
          border-radius: 4px;
        }
        .info-box h3 {
          margin-top: 0;
          color: #d4af37;
          font-size: 18px;
        }
        .info-row {
          margin: 10px 0;
        }
        .info-label {
          font-weight: 600;
          color: #555;
        }
        .timeline {
          background: #eff6ff;
          border: 1px solid #dbeafe;
          padding: 20px;
          border-radius: 6px;
          margin: 20px 0;
        }
        .timeline-item {
          margin: 10px 0;
          padding-left: 20px;
          position: relative;
        }
        .timeline-item:before {
          content: "•";
          position: absolute;
          left: 0;
          color: #2563eb;
          font-size: 20px;
          line-height: 1;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #d4af37;
          color: #666;
          font-size: 0.9em;
        }
        .contact-link {
          color: #d4af37;
          text-decoration: none;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🤝 Partnership Inquiry Received</h1>
        </div>
        <div class="content">
          <p>Dear ${name},</p>
          
          <p>Thank you for your interest in exploring a partnership opportunity with <strong>Rivalis Law</strong>.</p>
          
          <div class="info-box">
            <h3>Your Inquiry Details</h3>
            <div class="info-row">
              <span class="info-label">Pathway Interest:</span> ${pathway.charAt(0).toUpperCase() + pathway.slice(1)}
            </div>
            <div class="info-row">
              <span class="info-label">Primary Specialty:</span> ${specialty}
            </div>
          </div>
          
          <div class="timeline">
            <h3 style="margin-top: 0; color: #2563eb;">What Happens Next?</h3>
            <div class="timeline-item">
              <strong>Step 1:</strong> Our partnership team will review your inquiry within 3-5 business days.
            </div>
            <div class="timeline-item">
              <strong>Step 2:</strong> If your qualifications align with our current needs, we'll send you a personalized application link.
            </div>
            <div class="timeline-item">
              <strong>Step 3:</strong> Complete the full application at your convenience (typically takes 45-60 minutes).
            </div>
            <div class="timeline-item">
              <strong>Step 4:</strong> Our team will schedule a conversation to discuss the opportunity in detail.
            </div>
          </div>
          
          <p><strong>Questions?</strong> Feel free to reach out to our partnership team at <a href="mailto:partners@rivalislaw.com" class="contact-link">partners@rivalislaw.com</a>.</p>
          
          <p>We appreciate your interest in Rivalis Law and look forward to exploring how we might work together.</p>
          
          <div class="footer">
            <p><strong>Rivalis Law</strong><br>
            Aaishwarya Aeron, Esq.<br>
            Managing Partner</p>
            <p style="font-size: 0.85em; color: #999; margin-top: 15px;">
              This communication and any attachments are confidential and may be protected by attorney-client privilege.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const response = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'Rivalis Law <onboarding@resend.dev>',
      to: email,
      subject: 'Partnership Inquiry Received - Rivalis Law',
      html,
    });

    return { success: true, emailId: response.data?.id };
  } catch (error) {
    console.error('Error sending inquiry confirmation:', error);
    return { success: false, error };
  }
}

/**
 * Send notification to admin/partners about new inquiry
 */
export async function sendInquiryAdminAlert({
  name,
  email,
  phone,
  pathway,
  specialty,
  yearsExperience,
  practiceOverview,
  whyRivalis,
  inquiryId,
}: InquiryAdminAlertParams) {
  const resend = getResend();
  
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const dashboardLink = `${appUrl}/admin/dashboard`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 700px;
          margin: 20px auto;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .alert-badge {
          background: #dc2626;
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          display: inline-block;
          margin-top: 10px;
        }
        .content {
          padding: 30px;
        }
        .field-group {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          padding: 15px;
          margin: 15px 0;
          border-radius: 6px;
        }
        .field-label {
          font-size: 11px;
          font-weight: 700;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        .field-value {
          font-size: 14px;
          color: #111827;
          font-weight: 500;
        }
        .text-block {
          background: white;
          border-left: 3px solid #2563eb;
          padding: 15px;
          margin: 15px 0;
        }
        .cta-button {
          display: inline-block;
          padding: 15px 30px;
          background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
          text-align: center;
          margin: 20px 0;
        }
        .cta-button:hover {
          background: linear-gradient(135deg, #b8941f 0%, #9a7a1a 100%);
        }
        .quick-actions {
          background: #fef3c7;
          border: 1px solid #fbbf24;
          padding: 20px;
          border-radius: 6px;
          margin: 20px 0;
        }
        .quick-actions h3 {
          margin-top: 0;
          color: #92400e;
        }
        .code-block {
          background: #1f2937;
          color: #10b981;
          padding: 15px;
          border-radius: 6px;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          overflow-x: auto;
          margin: 10px 0;
        }
        .footer {
          text-align: center;
          padding: 20px;
          background: #f9fafb;
          color: #666;
          font-size: 0.85em;
          border-top: 1px solid #e5e7eb;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🤝 New Partnership Inquiry</h1>
          <div class="alert-badge">ACTION REQUIRED</div>
        </div>
        <div class="content">
          <p><strong>A new partnership inquiry has been submitted and requires review.</strong></p>
          
          <h3 style="color: #2563eb; margin-top: 30px;">📋 Applicant Information</h3>
          
          <div class="field-group">
            <div class="field-label">Full Name</div>
            <div class="field-value">${name}</div>
          </div>
          
          <div class="field-group">
            <div class="field-label">Email Address</div>
            <div class="field-value">${email}</div>
          </div>
          
          ${phone ? `
          <div class="field-group">
            <div class="field-label">Phone Number</div>
            <div class="field-value">${phone}</div>
          </div>
          ` : ''}
          
          <h3 style="color: #2563eb; margin-top: 30px;">💼 Professional Details</h3>
          
          <div class="field-group">
            <div class="field-label">Pathway Interest</div>
            <div class="field-value">${pathway.charAt(0).toUpperCase() + pathway.slice(1)} Partnership</div>
          </div>
          
          <div class="field-group">
            <div class="field-label">Primary Specialty</div>
            <div class="field-value">${specialty}</div>
          </div>
          
          <div class="field-group">
            <div class="field-label">Years in Practice</div>
            <div class="field-value">${yearsExperience} years</div>
          </div>
          
          <div class="text-block">
            <div class="field-label">Practice Overview</div>
            <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${practiceOverview}</p>
          </div>
          
          <div class="text-block">
            <div class="field-label">Why Rivalis?</div>
            <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${whyRivalis}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${dashboardLink}" class="cta-button">
              📊 Review in Admin Dashboard
            </a>
          </div>
          
          <div class="quick-actions">
            <h3>⚡ Quick Actions</h3>
            <p><strong>To generate an application link for qualified candidates:</strong></p>
            <div class="code-block">
UPDATE partner_inquiries<br>
SET application_token = gen_random_uuid(),<br>
&nbsp;&nbsp;&nbsp;&nbsp;status = 'qualified',<br>
&nbsp;&nbsp;&nbsp;&nbsp;application_link_sent_at = NOW()<br>
WHERE id = '${inquiryId}';
            </div>
            <p style="font-size: 0.9em; color: #92400e; margin-top: 15px;">
              <strong>Note:</strong> You can also use the "Send App Link" button in the admin dashboard to automatically generate and email the application link.
            </p>
          </div>
          
          <div class="footer">
            <p><strong>Rivalis Law Partnership Team</strong></p>
            <p>This is an automated notification from your admin dashboard.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const response = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'Rivalis System <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL || 'partners@rivalislaw.com',
      subject: `New Partnership Inquiry: ${name} - ${specialty}`,
      html,
    });

    return { success: true, emailId: response.data?.id };
  } catch (error) {
    console.error('Error sending admin alert:', error);
    return { success: false, error };
  }
}

/**
 * Send application invitation with token link to qualified candidates
 */
export async function sendApplicationInvite({
  email,
  name,
  token,
}: ApplicationInviteParams) {
  const resend = getResend();
  
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const applicationLink = `${appUrl}/apply/partner-application?token=${token}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 650px;
          margin: 20px auto;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 26px;
          font-weight: 600;
        }
        .header p {
          margin: 10px 0 0 0;
          font-size: 16px;
          opacity: 0.95;
        }
        .content {
          padding: 40px 30px;
          background: #f9f9f9;
        }
        .congrats-box {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 25px;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 30px;
        }
        .congrats-box h2 {
          margin: 0;
          font-size: 22px;
        }
        .info-box {
          background: white;
          padding: 25px;
          border-left: 4px solid #d4af37;
          margin: 20px 0;
          border-radius: 4px;
        }
        .info-box h3 {
          margin-top: 0;
          color: #d4af37;
          font-size: 18px;
        }
        .checklist {
          background: #eff6ff;
          border: 1px solid #dbeafe;
          padding: 20px;
          border-radius: 6px;
          margin: 20px 0;
        }
        .checklist-item {
          margin: 12px 0;
          padding-left: 30px;
          position: relative;
        }
        .checklist-item:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #10b981;
          font-size: 20px;
          font-weight: bold;
        }
        .cta-button {
          display: block;
          padding: 18px 40px;
          background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
          text-align: center;
          margin: 30px auto;
          max-width: 300px;
          font-size: 16px;
          box-shadow: 0 4px 6px rgba(212, 175, 55, 0.3);
        }
        .cta-button:hover {
          background: linear-gradient(135deg, #b8941f 0%, #9a7a1a 100%);
        }
        .warning-box {
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
          font-size: 14px;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #d4af37;
          color: #666;
          font-size: 0.9em;
        }
        .link-box {
          background: #f3f4f6;
          padding: 15px;
          border-radius: 6px;
          word-break: break-all;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          margin: 15px 0;
          border: 1px solid #d1d5db;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Partnership Application Invitation</h1>
          <p>You've been selected to continue your partnership journey</p>
        </div>
        <div class="content">
          <div class="congrats-box">
            <h2>Congratulations, ${name}!</h2>
          </div>
          
          <p>Thank you for your interest in joining <strong>Rivalis Law</strong>. After reviewing your initial inquiry, we're excited to invite you to complete the full partnership application.</p>
          
          <div class="info-box">
            <h3>📋 What to Expect</h3>
            <p>The full application is comprehensive and designed to give us a complete picture of your practice, experience, and partnership goals. Please allow <strong>45-60 minutes</strong> to complete all sections.</p>
          </div>
          
          <div class="checklist">
            <h3 style="margin-top: 0; color: #2563eb;">✓ Documents to Prepare</h3>
            <div class="checklist-item">
              <strong>Current Resume or CV</strong> (PDF format)
            </div>
            <div class="checklist-item">
              <strong>Writing Sample</strong> - Legal brief, memo, or published article (PDF)
            </div>
            <div class="checklist-item">
              <strong>Client List</strong> (optional, anonymized acceptable)
            </div>
            <div class="checklist-item">
              <strong>Reference Contacts</strong> - 2-3 professional references
            </div>
          </div>
          
          <p style="text-align: center; font-size: 18px; color: #2563eb; margin: 30px 0 20px 0;">
            <strong>Ready to get started?</strong>
          </p>
          
          <a href="${applicationLink}" class="cta-button">
            🚀 Begin Application
          </a>
          
          <div class="warning-box">
            <strong>⏰ Important:</strong> This application link is personalized for you and will remain active for <strong>30 days</strong>. You can save your progress and return anytime using this link.
          </div>
          
          <div style="margin: 30px 0;">
            <p style="font-size: 13px; color: #6b7280; margin-bottom: 8px;">
              <strong>Your secure application link:</strong>
            </p>
            <div class="link-box">${applicationLink}</div>
          </div>
          
          <div class="info-box" style="border-left-color: #2563eb;">
            <h3 style="color: #2563eb;">📞 Questions or Need Assistance?</h3>
            <p>Our partnership team is here to help. If you have any questions about the application process, please contact us at:</p>
            <p style="margin-top: 15px;">
              <strong>Email:</strong> <a href="mailto:partners@rivalislaw.com" style="color: #d4af37;">partners@rivalislaw.com</a><br>
              <strong>Phone:</strong> Available upon request
            </p>
          </div>
          
          <p style="margin-top: 30px;">We look forward to learning more about your practice and exploring how we can work together to serve our clients with excellence.</p>
          
          <div class="footer">
            <p><strong>Rivalis Law</strong><br>
            Aaishwarya Aeron, Esq.<br>
            Managing Partner</p>
            <p style="font-size: 0.85em; color: #999; margin-top: 15px;">
              This communication and any attachments are confidential and may be protected by attorney-client privilege.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const response = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'Rivalis Law <onboarding@resend.dev>',
      to: email,
      subject: '🎉 Your Partnership Application Invitation - Rivalis Law',
      html,
    });

    return { success: true, emailId: response.data?.id };
  } catch (error) {
    console.error('Error sending application invite:', error);
    return { success: false, error };
  }
}

/**
 * Send confirmation email to applicant after full application submission
 */
export async function sendConfirmationEmail(email: string, name: string) {
  const resend = getResend();
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 600;
        }
        .header p {
          margin: 10px 0 0 0;
          font-size: 16px;
          opacity: 0.95;
        }
        .content {
          padding: 40px 30px;
          background: #f9f9f9;
        }
        .success-badge {
          background: #10b981;
          color: white;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 20px;
        }
        .info-box {
          background: white;
          padding: 25px;
          border-left: 4px solid #d4af37;
          margin: 20px 0;
          border-radius: 4px;
        }
        .info-box h3 {
          margin-top: 0;
          color: #d4af37;
          font-size: 18px;
        }
        .timeline {
          background: #eff6ff;
          border: 1px solid #dbeafe;
          padding: 20px;
          border-radius: 6px;
          margin: 20px 0;
        }
        .timeline-item {
          margin: 12px 0;
          padding-left: 25px;
          position: relative;
        }
        .timeline-item:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #10b981;
          font-size: 18px;
          font-weight: bold;
        }
        .highlight-box {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border: 2px solid #f59e0b;
          padding: 20px;
          border-radius: 8px;
          margin: 25px 0;
        }
        .highlight-box h3 {
          margin-top: 0;
          color: #92400e;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #d4af37;
          color: #666;
          font-size: 0.9em;
        }
        .contact-link {
          color: #d4af37;
          text-decoration: none;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Application Submitted Successfully</h1>
          <p>Thank you for completing your partnership application</p>
        </div>
        <div class="content">
          <div style="text-align: center;">
            <span class="success-badge">Application Received</span>
          </div>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for taking the time to complete your comprehensive partnership application with <strong>Rivalis Law</strong>. We've successfully received your submission and all supporting documents.</p>
          
          <div class="info-box">
            <h3>📋 What We Received</h3>
            <p>Your complete application package includes:</p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Professional background and experience</li>
              <li>Practice area details and representative matters</li>
              <li>Business development information</li>
              <li>Compensation expectations and partnership preferences</li>
              <li>Resume/CV and writing samples</li>
              <li>Professional references</li>
            </ul>
          </div>
          
          <div class="timeline">
            <h3 style="margin-top: 0; color: #2563eb;">What Happens Next?</h3>
            <div class="timeline-item">
              <strong>Week 1-2:</strong> Our partnership committee will conduct a thorough review of your application
            </div>
            <div class="timeline-item">
              <strong>Week 2-3:</strong> We'll verify your references and credentials
            </div>
            <div class="timeline-item">
              <strong>Week 3-4:</strong> Qualified candidates will be invited for initial interviews
            </div>
            <div class="timeline-item">
              <strong>Week 4-6:</strong> Final discussions and partnership offer (if selected)
            </div>
          </div>
          
          <div class="highlight-box">
            <h3>⏰ Timeline</h3>
            <p style="margin: 0;">You can expect to hear from us within <strong>2-3 weeks</strong> regarding the status of your application. If additional information is needed, we'll reach out promptly.</p>
          </div>
          
          <div class="info-box">
            <h3>📞 Questions or Updates?</h3>
            <p>If you have any questions about your application or need to provide additional information, please don't hesitate to contact our partnership team:</p>
            <p style="margin-top: 15px;">
              <strong>Email:</strong> <a href="mailto:partners@rivalislaw.com" class="contact-link">partners@rivalislaw.com</a><br>
              <strong>Phone:</strong> Available upon request
            </p>
          </div>
          
          <p style="margin-top: 30px;">We appreciate your interest in joining Rivalis Law and look forward to reviewing your application in detail.</p>
          
          <div class="footer">
            <p><strong>Rivalis Law</strong><br>
            Aaishwarya Aeron, Esq.<br>
            Managing Partner</p>
            <p style="font-size: 0.85em; color: #999; margin-top: 15px;">
              This communication and any attachments are confidential and may be protected by attorney-client privilege.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const response = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'Rivalis Law <onboarding@resend.dev>',
      to: email,
      subject: 'Partnership Application Received - Rivalis Law',
      html,
    });

    return { success: true, emailId: response.data?.id };
  } catch (error) {
    console.error('Error sending application confirmation:', error);
    return { success: false, error };
  }
}

/**
 * Send notification to admin/partners about new application submission
 */
export async function sendPartnerNotification(application: ApplicationNotificationParams) {
  const resend = getResend();
  
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const dashboardLink = `${appUrl}/admin/dashboard`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 800px;
          margin: 20px auto;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 26px;
          font-weight: 600;
        }
        .alert-badge {
          background: #dc2626;
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          display: inline-block;
          margin-top: 10px;
        }
        .content {
          padding: 30px;
        }
        .section {
          margin: 25px 0;
        }
        .section-title {
          color: #10b981;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 2px solid #10b981;
        }
        .field-group {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          padding: 15px;
          margin: 10px 0;
          border-radius: 6px;
        }
        .field-label {
          font-size: 11px;
          font-weight: 700;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        .field-value {
          font-size: 14px;
          color: #111827;
          font-weight: 500;
        }
        .field-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .text-block {
          background: white;
          border-left: 3px solid #10b981;
          padding: 15px;
          margin: 15px 0;
          border-radius: 4px;
        }
        .list-items {
          background: #f9fafb;
          padding: 15px;
          border-radius: 6px;
          margin: 10px 0;
        }
        .list-items ul {
          margin: 5px 0;
          padding-left: 20px;
        }
        .cta-button {
          display: inline-block;
          padding: 15px 30px;
          background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
          text-align: center;
          margin: 20px 0;
        }
        .reference-box {
          background: #eff6ff;
          border: 1px solid #dbeafe;
          padding: 15px;
          margin: 10px 0;
          border-radius: 6px;
        }
        .reference-box h4 {
          margin: 0 0 10px 0;
          color: #2563eb;
        }
        .document-link {
          display: inline-block;
          background: #10b981;
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          text-decoration: none;
          margin: 5px 5px 5px 0;
          font-size: 13px;
        }
        .footer {
          text-align: center;
          padding: 20px;
          background: #f9fafb;
          color: #666;
          font-size: 0.85em;
          border-top: 1px solid #e5e7eb;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 New Partnership Application</h1>
          <div class="alert-badge">FULL APPLICATION SUBMITTED</div>
        </div>
        <div class="content">
          <p><strong>A complete partnership application has been submitted and is ready for committee review.</strong></p>
          
          <!-- Contact Information -->
          <div class="section">
            <div class="section-title">📋 Contact Information</div>
            <div class="field-grid">
              <div class="field-group">
                <div class="field-label">Full Name</div>
                <div class="field-value">${application.full_name}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Email</div>
                <div class="field-value">${application.email}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Phone</div>
                <div class="field-value">${application.phone}</div>
              </div>
              ${application.linkedin_url ? `
              <div class="field-group">
                <div class="field-label">LinkedIn</div>
                <div class="field-value"><a href="${application.linkedin_url}" style="color: #2563eb;">${application.linkedin_url}</a></div>
              </div>
              ` : ''}
            </div>
            <div class="field-grid">
              <div class="field-group">
                <div class="field-label">Current Firm</div>
                <div class="field-value">${application.current_firm}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Current Title</div>
                <div class="field-value">${application.current_title}</div>
              </div>
            </div>
          </div>

          <!-- Professional Background -->
          <div class="section">
            <div class="section-title">🎓 Professional Background</div>
            <div class="field-grid">
              <div class="field-group">
                <div class="field-label">Law School</div>
                <div class="field-value">${application.law_school} (${application.law_school_year})</div>
              </div>
              <div class="field-group">
                <div class="field-label">Undergraduate</div>
                <div class="field-value">${application.undergrad}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Years in Practice</div>
                <div class="field-value">${application.years_practice} years</div>
              </div>
            </div>
            
            <div class="list-items">
              <div class="field-label">Bar Admissions</div>
              <ul>
                ${application.bar_admissions.map(bar => `<li>${bar}</li>`).join('')}
              </ul>
            </div>

            <div class="list-items">
              <div class="field-label">Practice Areas</div>
              <ul>
                ${application.practice_areas.map(area => `<li>${area}</li>`).join('')}
              </ul>
            </div>

            <div class="text-block">
              <div class="field-label">Representative Matters</div>
              <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${application.representative_matters}</p>
            </div>

            ${application.publications ? `
            <div class="text-block">
              <div class="field-label">Publications</div>
              <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${application.publications}</p>
            </div>
            ` : ''}

            ${application.speaking_engagements ? `
            <div class="text-block">
              <div class="field-label">Speaking Engagements</div>
              <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${application.speaking_engagements}</p>
            </div>
            ` : ''}

            ${application.awards ? `
            <div class="text-block">
              <div class="field-label">Awards & Recognition</div>
              <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${application.awards}</p>
            </div>
            ` : ''}
          </div>

          <!-- Business Development -->
          <div class="section">
            <div class="section-title">💼 Business Development</div>
            <div class="field-grid">
              <div class="field-group">
                <div class="field-label">Annual Billings</div>
                <div class="field-value">${application.annual_billings}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Portable Book</div>
                <div class="field-value">${application.portable_book}</div>
              </div>
            </div>

            <div class="text-block">
              <div class="field-label">Client Concentration</div>
              <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${application.client_concentration}</p>
            </div>

            <div class="text-block">
              <div class="field-label">Referral Sources</div>
              <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${application.referral_sources}</p>
            </div>

            <div class="text-block">
              <div class="field-label">Marketing Activities</div>
              <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${application.marketing_activities}</p>
            </div>
          </div>

          <!-- Financial Information -->
          <div class="section">
            <div class="section-title">💰 Financial & Partnership Details</div>
            <div class="field-grid">
              <div class="field-group">
                <div class="field-label">Current Compensation</div>
                <div class="field-value">${application.current_compensation}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Compensation Expectations</div>
                <div class="field-value">${application.compensation_expectations}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Partnership Tier Preference</div>
                <div class="field-value">${application.partnership_tier_preference}</div>
              </div>
              ${application.capital_contribution ? `
              <div class="field-group">
                <div class="field-label">Capital Contribution</div>
                <div class="field-value">${application.capital_contribution}</div>
              </div>
              ` : ''}
            </div>
            
            <div class="text-block">
              <div class="field-label">Why Rivalis?</div>
              <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${application.why_rivalis}</p>
            </div>
          </div>

          <!-- Documents -->
          <div class="section">
            <div class="section-title">📎 Uploaded Documents</div>
            <div style="margin: 15px 0;">
              ${application.resume_url ? `<a href="${application.resume_url}" class="document-link" target="_blank">📄 Resume/CV</a>` : ''}
              ${application.writing_sample_url ? `<a href="${application.writing_sample_url}" class="document-link" target="_blank">📝 Writing Sample</a>` : ''}
              ${application.client_list_url ? `<a href="${application.client_list_url}" class="document-link" target="_blank">📋 Client List</a>` : ''}
            </div>
          </div>

          <!-- References -->
          <div class="section">
            <div class="section-title">👥 Professional References</div>
            ${application.references.map((ref, index) => `
              <div class="reference-box">
                <h4>Reference ${index + 1}: ${ref.name}</h4>
                <div style="font-size: 14px;">
                  <strong>Relationship:</strong> ${ref.relationship}<br>
                  <strong>Firm/Organization:</strong> ${ref.firm}<br>
                  <strong>Email:</strong> <a href="mailto:${ref.email}" style="color: #2563eb;">${ref.email}</a><br>
                  <strong>Phone:</strong> ${ref.phone}
                </div>
              </div>
            `).join('')}
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${dashboardLink}" class="cta-button">
              📊 Review Full Application in Dashboard
            </a>
          </div>

          <div style="background: #fef3c7; border: 1px solid #fbbf24; padding: 20px; border-radius: 6px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #92400e;">⚡ Next Steps</h3>
            <ol style="margin: 10px 0;">
              <li>Review application materials and supporting documents</li>
              <li>Contact professional references for verification</li>
              <li>Schedule partnership committee review meeting</li>
              <li>Conduct initial interview if qualified</li>
              <li>Update application status in admin dashboard</li>
            </ol>
          </div>
          
          <div class="footer">
            <p><strong>Rivalis Law Partnership Committee</strong></p>
            <p>This is an automated notification. Application ID: ${application.id}</p>
            <p>Submitted: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const response = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'Rivalis System <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL || 'partners@rivalislaw.com',
      subject: `🎯 New Partnership Application: ${application.full_name} - ${application.practice_areas.join(', ')}`,
      html,
    });

    return { success: true, emailId: response.data?.id };
  } catch (error) {
    console.error('Error sending partner notification:', error);
    return { success: false, error };
  }
}
