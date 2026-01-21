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
