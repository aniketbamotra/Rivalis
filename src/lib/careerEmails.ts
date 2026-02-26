import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendCareerApplicationConfirmation(data: any) {
  return resend.emails.send({
    from: process.env.FROM_EMAIL || 'Rivalis Law <onboarding@resend.dev>',
    to: data.email,
    subject: 'Application Received - Rivalis Law Careers',
    html: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 100%); color: #ffffff; padding: 40px 20px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <div style="background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 32px; font-weight: 700; margin-bottom: 8px;">
            RIVALIS LAW
          </div>
          <div style="color: #d4af37; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">
            Application Received
          </div>
        </div>

        <div style="background: rgba(255, 255, 255, 0.05); padding: 30px; border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.2);">
          <h2 style="color: #d4af37; margin-top: 0;">Dear ${data.fullName},</h2>
          
          <p style="color: #e5e7eb; line-height: 1.6;">
            Thank you for your interest in joining Rivalis Law. We've successfully received your application for the <strong style="color: #d4af37;">${data.positionApplying}</strong> position.
          </p>

          <div style="background: rgba(212, 175, 55, 0.1); padding: 20px; border-left: 4px solid #d4af37; margin: 20px 0;">
            <p style="margin: 0; color: #d4af37; font-weight: 600;">Application Details:</p>
            <ul style="color: #e5e7eb; margin: 10px 0; padding-left: 20px;">
              <li>Position: ${data.positionApplying}</li>
              <li>Department: ${data.department}</li>
              <li>Submitted: ${new Date().toLocaleDateString()}</li>
            </ul>
          </div>

          <p style="color: #e5e7eb; line-height: 1.6;">
            <strong>Next Steps:</strong>
          </p>
          <ol style="color: #e5e7eb; line-height: 1.8;">
            <li>Our team will review your application and supporting materials</li>
            <li>Qualified candidates will be contacted for an initial screening call</li>
            <li>Interviews typically occur within 2-3 weeks of application</li>
          </ol>

          <p style="color: #9ca3af; font-size: 14px; margin-top: 30px;">
            Questions? Reply to this email or contact <a href="mailto:careers@rivalislaw.com" style="color: #d4af37;">careers@rivalislaw.com</a>
          </p>
        </div>

        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid rgba(212, 175, 55, 0.2);">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            © ${new Date().getFullYear()} Rivalis Law. All rights reserved.
          </p>
        </div>
      </div>
    `
  });
}

export async function sendCareerApplicationAdminAlert(data: any) {
  return resend.emails.send({
    from: process.env.FROM_EMAIL || 'Rivalis Law <onboarding@resend.dev>',
    to: process.env.ADMIN_EMAIL || 'admin@rivalislaw.com',
    subject: `New Career Application: ${data.positionApplying} - ${data.fullName}`,
    html: `
      <div style="font-family: 'Inter', sans-serif; max-width: 700px; margin: 0 auto; background: #ffffff; padding: 40px; border-radius: 8px; border: 2px solid #d4af37;">
        <h2 style="color: #1a1a2e; margin-top: 0; border-bottom: 3px solid #d4af37; padding-bottom: 10px;">
          🎯 New Career Application
        </h2>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3 style="color: #d4af37; margin-top: 0;">Candidate Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666;"><strong>Name:</strong></td><td style="color: #1a1a2e;">${data.fullName}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td><td style="color: #1a1a2e;">${data.email}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td><td style="color: #1a1a2e;">${data.phone}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Location:</strong></td><td style="color: #1a1a2e;">${data.location}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>LinkedIn:</strong></td><td style="color: #1a1a2e;">${data.linkedinUrl || 'N/A'}</td></tr>
          </table>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3 style="color: #d4af37; margin-top: 0;">Position Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666;"><strong>Position:</strong></td><td style="color: #1a1a2e;">${data.positionApplying}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Type:</strong></td><td style="color: #1a1a2e;">${data.positionType}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Department:</strong></td><td style="color: #1a1a2e;">${data.department}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Experience:</strong></td><td style="color: #1a1a2e;">${data.yearsExperience} years</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Work Preference:</strong></td><td style="color: #1a1a2e;">${data.workArrangement}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Start Date:</strong></td><td style="color: #1a1a2e;">${data.startDate}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Salary:</strong></td><td style="color: #1a1a2e;">${data.salaryExpectation || 'Not specified'}</td></tr>
          </table>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3 style="color: #d4af37; margin-top: 0;">Skills</h3>
          <p style="color: #1a1a2e; margin: 10px 0;"><strong>Technical:</strong> ${data.technicalSkills?.join(', ') || 'N/A'}</p>
          <p style="color: #1a1a2e; margin: 10px 0;"><strong>Languages:</strong> ${data.languages?.join(', ') || 'N/A'}</p>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3 style="color: #d4af37; margin-top: 0;">Why Rivalis</h3>
          <p style="color: #1a1a2e; line-height: 1.6; margin: 0;">${data.whyRivalis}</p>
        </div>

        ${data.resumeUrl ? `
        <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3 style="color: #d4af37; margin-top: 0;">Uploaded Documents</h3>
          <ul style="color: #1a1a2e; margin: 0; padding-left: 20px;">
            <li><a href="${data.resumeUrl}" style="color: #d4af37;">Resume/CV</a></li>
            ${data.coverLetterUrl ? `<li><a href="${data.coverLetterUrl}" style="color: #d4af37;">Cover Letter</a></li>` : ''}
            ${data.portfolioUrl ? `<li><a href="${data.portfolioUrl}" style="color: #d4af37;">Portfolio</a></li>` : ''}
          </ul>
        </div>
        ` : ''}

        <div style="text-align: center; margin-top: 30px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard" 
             style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%); color: #1a1a2e; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 600;">
            View in Dashboard
          </a>
        </div>

        <p style="color: #666; font-size: 12px; text-align: center; margin-top: 30px;">
          Application submitted on ${new Date().toLocaleString()}
        </p>
      </div>
    `
  });
}
