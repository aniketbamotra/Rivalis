# Email Testing Guide - Rivalis Law

## Overview

This guide provides step-by-step instructions for testing all email flows in the Rivalis Law application. All emails are sent via Resend using the verified domain `notifications.rivalislaw.com`.

---

## Prerequisites

Before testing, ensure you have:

1. ✅ Resend API key configured in environment variables
2. ✅ Domain `notifications.rivalislaw.com` verified in Resend
3. ✅ Environment variables set:
   - `RESEND_API_KEY` - Your Resend API key
   - `FROM_EMAIL` - noreply@notifications.rivalislaw.com
   - `ADMIN_EMAIL` - Your admin email address
   - `NEXT_PUBLIC_APP_URL` - Your application URL
4. ✅ Development server running or deployed to staging/production

---

## Email Flow 1: Emergency Consultation

**Endpoint:** `POST /api/emergency-email`

**What it does:** Sends two emails when someone submits an emergency consultation request:
- User confirmation email
- Admin priority alert email

### Testing Steps

1. **Navigate to Emergency Consultation Page**
   ```
   https://your-domain.com/services/[any-service]
   ```
   Click "Emergency Consultation" button

2. **Complete Payment**
   - Fill in contact information
   - Complete Stripe payment ($499)
   - Use test card: `4242 4242 4242 4242`

3. **Submit Request**
   - Fill in urgency level
   - Describe your issue
   - Select preferred contact method
   - Submit form

4. **Verify User Email**
   Check the user's inbox for:
   - **Subject:** "Emergency Consultation Request Received - Rivalis Law"
   - **From:** noreply@notifications.rivalislaw.com
   - **Content includes:**
     - Payment ID confirmation
     - Urgency level
     - Preferred contact method
     - What happens next timeline
     - Emergency phone number

5. **Verify Admin Email**
   Check admin inbox for:
   - **Subject:** "🚨 PRIORITY: New Emergency Consultation - [Urgency] Urgency"
   - **From:** Emergency Alerts <FROM_EMAIL>
   - **Content includes:**
     - Client information (name, email, phone)
     - Urgency level with payment confirmation
     - Issue description
     - Action buttons (call/email)
     - Next steps checklist

### Expected Behavior
- ✅ Both emails sent successfully
- ✅ User receives confirmation within seconds
- ✅ Admin receives priority alert immediately
- ✅ All data displays correctly in emails

---

## Email Flow 2: Career Application

**Endpoint:** `POST /api/career-application`

**What it does:** Sends two emails when someone submits a career application:
- Applicant confirmation email
- Admin notification email

### Testing Steps

1. **Navigate to Career Page**
   ```
   https://your-domain.com/join-firm
   ```
   Click "Apply Now" or similar career application link

2. **Fill Out Application Form**
   - Personal information (name, email, phone, location)
   - Position details (role, type, department)
   - Experience information
   - Skills and qualifications
   - Upload documents (resume, cover letter)
   - Why Rivalis section

3. **Submit Application**
   Click "Submit Application"

4. **Verify Applicant Email**
   Check applicant's inbox for:
   - **Subject:** "Application Received - Rivalis Law Careers"
   - **From:** Rivalis Law <FROM_EMAIL>
   - **Content includes:**
     - Confirmation of application receipt
     - Position applied for
     - Submission date
     - Next steps timeline
     - Contact information

5. **Verify Admin Email**
   Check admin inbox for:
   - **Subject:** "New Career Application: [Position] - [Name]"
   - **From:** Rivalis Law <FROM_EMAIL>
   - **Content includes:**
     - Complete candidate information
     - Position and experience details
     - Skills breakdown
     - Links to uploaded documents
     - Why Rivalis response
     - Dashboard link

### Expected Behavior
- ✅ Both emails sent successfully
- ✅ Applicant receives confirmation
- ✅ Admin receives detailed notification
- ✅ Document links work correctly

---

## Email Flow 3: Partner Inquiry

**Endpoint:** `POST /api/partner-inquiry`

**What it does:** Sends two emails when someone submits an initial partnership inquiry:
- Inquiry confirmation email to applicant
- Inquiry notification to admin/partners

### Testing Steps

1. **Navigate to Partner Inquiry Page**
   ```
   https://your-domain.com/apply/partner-inquiry
   ```

2. **Fill Out Inquiry Form**
   - Full name
   - Email address
   - Phone number (optional)
   - Pathway interest (equity/counsel/of-counsel)
   - Primary specialty
   - Years in practice
   - Brief practice overview
   - Why Rivalis

3. **Submit Inquiry**
   Click "Submit Inquiry"

4. **Verify Applicant Email**
   Check applicant's inbox for:
   - **Subject:** "Partnership Inquiry Received - Rivalis Law"
   - **From:** Rivalis Law <FROM_EMAIL>
   - **Content includes:**
     - Thank you message
     - Inquiry details summary
     - 4-step "What Happens Next" timeline
     - Contact information for questions

5. **Verify Admin Email**
   Check admin/partners inbox for:
   - **Subject:** "New Partnership Inquiry: [Name] - [Specialty]"
   - **From:** Rivalis System <FROM_EMAIL>
   - **Content includes:**
     - Applicant information
     - Professional details (pathway, specialty, experience)
     - Practice overview and why Rivalis
     - Dashboard review button
     - SQL query for generating application link

### Expected Behavior
- ✅ Both emails sent successfully
- ✅ Inquiry stored in `partner_inquiries` table
- ✅ Status set to "pending"
- ✅ All data displays correctly

---

## Email Flow 4: Partner Application (Full)

**Endpoint:** `POST /api/partner-application`

**What it does:** Sends two emails when someone completes the full partnership application:
- Application confirmation to applicant
- Complete application details to admin/partners

### Testing Steps

#### Part A: Generate Application Link

1. **Submit Partner Inquiry First**
   Follow steps from Email Flow 3 above

2. **Generate Application Token**
   In Supabase SQL Editor, run:
   ```sql
   UPDATE partner_inquiries 
   SET application_token = gen_random_uuid()::text, 
       status = 'qualified'
   WHERE email = 'test@example.com';
   
   SELECT application_token 
   FROM partner_inquiries 
   WHERE email = 'test@example.com';
   ```
   Copy the token returned

#### Part B: Complete Full Application

3. **Navigate to Application Page**
   ```
   https://your-domain.com/apply/partner-application?token=[YOUR_TOKEN]
   ```

4. **Fill Out Complete Application** (6 sections)
   
   **Section 1: Contact Information**
   - Full name, email, phone, LinkedIn
   - Current firm and title
   
   **Section 2: Professional Background**
   - Bar admissions (multiple)
   - Law school and year
   - Undergraduate institution
   - Practice areas (multiple)
   - Years in practice
   - Representative matters
   - Publications (optional)
   - Speaking engagements (optional)
   - Awards (optional)
   
   **Section 3: Business Development**
   - Annual billings
   - Portable book of business
   - Client concentration
   - Referral sources
   - Marketing activities
   
   **Section 4: Financial Information**
   - Current compensation
   - Compensation expectations
   - Partnership tier preference
   - Capital contribution (optional)
   
   **Section 5: Documents**
   - Upload resume/CV (required)
   - Upload writing sample (required)
   - Upload client list (optional)
   
   **Section 6: References**
   - Add 2-3 professional references
   - Name, relationship, firm, email, phone for each

5. **Submit Application**
   Click "Submit Application"

6. **Verify Applicant Email**
   Check applicant's inbox for:
   - **Subject:** "Partnership Application Received - Rivalis Law"
   - **From:** Rivalis Law <FROM_EMAIL>
   - **Content includes:**
     - Success badge/confirmation
     - List of what was received
     - 4-week review timeline
     - Contact information for questions

7. **Verify Admin/Partners Email**
   Check partners inbox for:
   - **Subject:** "🎯 New Partnership Application: [Name] - [Practice Areas]"
   - **From:** Rivalis System <FROM_EMAIL>
   - **Content includes:**
     - Complete contact information
     - Full professional background with bar admissions and practice areas
     - Detailed business development information
     - Financial details and partnership preferences
     - Links to all uploaded documents
     - All professional references with contact info
     - Dashboard review button
     - Next steps checklist

### Expected Behavior
- ✅ Both emails sent successfully
- ✅ Application stored in `partner_applications` table
- ✅ Inquiry status updated to "application_submitted"
- ✅ All uploaded documents accessible
- ✅ All sections display correctly in admin email

---

## Troubleshooting

### Email Not Received

**Check:**
1. Resend API key is correct in environment variables
2. `FROM_EMAIL` uses verified domain: `@notifications.rivalislaw.com`
3. Check spam/junk folders
4. Verify email in Resend dashboard "Logs" section
5. Check application logs for error messages

**Common Issues:**
- ❌ Wrong API key → Email fails silently
- ❌ Unverified domain → Resend rejects email
- ❌ Missing `NEXT_PUBLIC_APP_URL` → Links in emails break
- ❌ Missing `ADMIN_EMAIL` → Admin notifications fail

### Email Sent But Content Wrong

**Check:**
1. All environment variables set correctly
2. `NEXT_PUBLIC_APP_URL` points to correct domain
3. Form data is complete before submission
4. Database records have all required fields

### Document Links Not Working

**Check:**
1. Supabase Storage policies allow public access to `partner-documents` bucket
2. File upload succeeded before email sent
3. URLs are absolute (include full domain)

---

## Testing Checklist

Before going to production, test all flows:

- [ ] Emergency consultation - user email
- [ ] Emergency consultation - admin email
- [ ] Career application - applicant email
- [ ] Career application - admin email
- [ ] Partner inquiry - applicant email
- [ ] Partner inquiry - admin email
- [ ] Partner application - applicant email
- [ ] Partner application - admin/partners email

For each email, verify:
- [ ] Correct subject line
- [ ] Correct sender email (from notifications.rivalislaw.com)
- [ ] All dynamic content displays correctly
- [ ] Links work and point to correct URLs
- [ ] Email renders well on mobile
- [ ] No HTML/CSS rendering issues
- [ ] No missing environment variables

---

## Monitoring in Production

### Resend Dashboard

1. **Check Email Logs**
   - Go to Resend Dashboard → Logs
   - Filter by date/status
   - Monitor delivery rates

2. **Set Up Webhooks** (Recommended)
   - Configure webhooks for delivery tracking
   - Monitor bounce rates
   - Track spam complaints

3. **Review Analytics**
   - Track open rates (if enabled)
   - Monitor delivery success rate
   - Identify issues early

### Application Logs

Monitor your application logs for:
```
✅ [Email Type] confirmation email sent
✅ [Email Type] notification email sent
❌ Failed to send [email type]: [error message]
```

---

## Environment Variables Reference

Required for all email flows:

```env
# Server-side only (keep secret)
RESEND_API_KEY=re_xxx
FROM_EMAIL=noreply@notifications.rivalislaw.com
ADMIN_EMAIL=partners@notifications.rivalislaw.com

# Public (client-accessible)
NEXT_PUBLIC_APP_URL=https://rivalislaw.com
```

---

## Support

If emails are not working after following this guide:

1. Check Resend dashboard for error messages
2. Review application logs for detailed errors
3. Verify all environment variables are set
4. Confirm domain verification status in Resend
5. Test with a simple email first (emergency consultation)

For Resend API issues: https://resend.com/docs
For application issues: Check application logs and database status
