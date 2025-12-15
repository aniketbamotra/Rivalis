const { Resend } = require('resend');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { 
      userEmail, 
      userName, 
      userPhone,
      urgency, 
      issue, 
      contactMode,
      paymentId,
      hasAccount,
      userId
    } = JSON.parse(event.body);

    // Store in Supabase if userId provided
    if (userId) {
      const { error: dbError } = await supabase
        .from('emergency_requests')
        .insert({
          user_id: userId,
          urgency,
          issue,
          contact_mode: contactMode,
          phone: userPhone,
          payment_id: paymentId,
          status: 'pending'
        });

      if (dbError) {
        console.error('Error storing emergency request:', dbError);
        // Don't fail the entire request, just log it
      }
    }

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: 'Rivalis Law <onboarding@resend.dev>',
      to: userEmail,
      subject: 'Emergency Consultation Request Received - Rivalis Law',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .details { background: white; padding: 20px; border-left: 4px solid #d4af37; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #d4af37; color: #666; }
            .urgent { color: #e74c3c; font-weight: bold; }
            .phone { font-size: 1.5em; color: #d4af37; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Emergency Consultation Request Received</h1>
            </div>
            <div class="content">
              <p>Hi <strong>${userName}</strong>,</p>
              
              <p>We've received your emergency consultation request and our team is reviewing it now.</p>
              
              <div class="details">
                <h3>Request Details:</h3>
                <p><strong>Payment ID:</strong> ${paymentId}</p>
                <p><strong>Urgency Level:</strong> <span class="urgent">${urgency}</span></p>
                <p><strong>Preferred Contact Method:</strong> ${contactMode}</p>
                <p><strong>Issue Description:</strong> ${issue}</p>
              </div>
              
              <h3>What Happens Next:</h3>
              <ul>
                <li>Our team will review your request within <strong>2 hours</strong></li>
                <li>We'll contact you via <strong>${contactMode}</strong></li>
                <li>Response time: <strong>Same business day for urgent matters</strong></li>
              </ul>
              
              <div style="background: #fff3cd; border: 2px solid #ffc107; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Need Immediate Assistance?</h3>
                <p style="margin: 10px 0;">Call us directly at:</p>
                <p class="phone">+1 (313) 771-2283</p>
              </div>
              
              <div class="footer">
                <p><strong>Rivalis Law</strong><br>
                Aaishwarya Aeron, Esq.<br>
                NY & MI Bar | Oxford AI Certified | Big 4 Trained</p>
                <p style="font-size: 0.9em; margin-top: 15px;">
                  This email confirms receipt of your emergency consultation request.<br>
                  Attorney-client privilege applies to all communications.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    });

    // Send priority alert to admin
    const adminEmailResponse = await resend.emails.send({
      from: 'Emergency Alerts <onboarding@resend.dev>',
      to: 'aaishaeron@gmail.com',
      subject: `🚨 PRIORITY: New Emergency Consultation - ${urgency} Urgency`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 700px; margin: 0 auto; padding: 20px; }
            .alert-header { background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #fff; padding: 30px; border: 3px solid #e74c3c; border-radius: 0 0 8px 8px; }
            .priority-box { background: #fff3cd; border-left: 5px solid #ffc107; padding: 20px; margin: 20px 0; }
            .client-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .action-buttons { margin: 30px 0; text-align: center; }
            .btn { display: inline-block; padding: 15px 30px; margin: 0 10px; text-decoration: none; border-radius: 8px; font-weight: bold; }
            .btn-call { background: #e74c3c; color: white; }
            .btn-email { background: #d4af37; color: white; }
            .urgent { color: #e74c3c; font-weight: bold; font-size: 1.2em; }
            .info-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 10px; background: white; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="alert-header">
              <h1>🚨 EMERGENCY CONSULTATION REQUEST</h1>
              <p style="font-size: 1.3em; margin: 10px 0;">ACTION REQUIRED WITHIN 2 HOURS</p>
            </div>
            <div class="content">
              <div class="priority-box">
                <h2 style="margin-top: 0; color: #e74c3c;">⚡ Urgency Level: ${urgency}</h2>
                <p><strong>Payment Status:</strong> ✅ PAID ($499)</p>
                <p><strong>Payment ID:</strong> ${paymentId}</p>
                <p><strong>Account Status:</strong> ${hasAccount ? '✅ Existing Account' : '⚠️ New User'}</p>
              </div>
              
              <div class="client-details">
                <h3>Client Information:</h3>
                <div class="info-row">
                  <strong>Name:</strong>
                  <span>${userName}</span>
                </div>
                <div class="info-row">
                  <strong>Email:</strong>
                  <span>${userEmail}</span>
                </div>
                <div class="info-row">
                  <strong>Phone:</strong>
                  <span>${userPhone}</span>
                </div>
                <div class="info-row">
                  <strong>Preferred Contact:</strong>
                  <span>${contactMode}</span>
                </div>
              </div>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>Issue Description:</h3>
                <p style="white-space: pre-wrap; line-height: 1.8;">${issue}</p>
              </div>
              
              <div class="action-buttons">
                <a href="tel:${userPhone}" class="btn btn-call">📞 Call Client Now</a>
                <a href="mailto:${userEmail}" class="btn btn-email">📧 Email Client</a>
              </div>
              
              <div style="background: #e8f4f8; border: 2px solid #2c5282; padding: 20px; border-radius: 8px; margin-top: 30px;">
                <h3 style="margin-top: 0; color: #2c5282;">⏰ Next Steps:</h3>
                <ol>
                  <li>Review client issue description above</li>
                  <li>Contact client via <strong>${contactMode}</strong></li>
                  <li>Update emergency request status in admin dashboard</li>
                  <li>Document consultation notes in client record</li>
                </ol>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #dee2e6;">
                <p style="color: #666; font-size: 0.9em;">
                  This is an automated priority alert from Rivalis Law emergency consultation system.<br>
                  Timestamp: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        userEmailId: userEmailResponse.id,
        adminEmailId: adminEmailResponse.id,
        message: 'Emergency consultation emails sent successfully'
      })
    };

  } catch (error) {
    console.error('Error sending emergency emails:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send emails',
        details: error.message 
      })
    };
  }
};
