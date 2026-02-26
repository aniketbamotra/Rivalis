# Partnership Application System - Setup Guide

## Overview
Complete partnership application system with two-tiered approach:
1. **Initial Inquiry Form** (`/apply/partner-inquiry`) - Quick qualification form
2. **Full Application** (`/apply/partner-application`) - Comprehensive 6-section application (token-protected)

---

## Files Created

### Frontend Components
- `/app/apply/partner-inquiry/page.tsx` - Initial inquiry form
- `/app/apply/partner-application/page.tsx` - Full application (multi-step, 6 sections)

### API Routes
- `/app/api/partner-inquiry/route.ts` - Handles inquiry submissions
- `/app/api/partner-application/route.ts` - Handles full application submissions
- `/app/api/upload-document/route.ts` - Handles file uploads to Supabase Storage

### Database
- `/PARTNER_FORMS_MIGRATION.sql` - Complete database schema

### Updated
- `/app/join-firm/page.tsx` - All partnership buttons now link to `/apply/partner-inquiry`

---

## Setup Steps

### 1. Database Setup

Run the SQL migration in Supabase:

```bash
# Go to Supabase Dashboard → SQL Editor → New Query
# Copy and paste the entire contents of PARTNER_FORMS_MIGRATION.sql
# Click "Run" to execute
```

This creates:
- `partner_inquiries` table (stores initial inquiries)
- `partner_applications` table (stores full applications)
- `partner-documents` storage bucket (for file uploads)
- Row Level Security (RLS) policies
- Indexes for performance

### 2. Environment Variables

Ensure these are set in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**Important:** The `SUPABASE_SERVICE_ROLE_KEY` is required for server-side operations (bypasses RLS).

### 3. Install Supabase Client (if not already installed)

```bash
npm install @supabase/supabase-js
```

### 4. Email Service Setup (Optional but Recommended)

The API routes have placeholder functions for sending emails. To enable:

#### Option A: Resend (Recommended)

```bash
npm install resend
```

Add to `.env.local`:
```env
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

Update email functions in API routes:
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendConfirmationEmail(email: string, name: string) {
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
}
```

#### Option B: SendGrid, Mailgun, or Other

Follow similar pattern with your preferred email service.

---

## Workflow

### Initial Inquiry Process

1. **User submits inquiry** at `/apply/partner-inquiry`
   - 8 fields: name, email, phone, pathway, specialty, years, background, motivation
   - Status: `pending`

2. **Partners review inquiries** in Supabase Dashboard or custom admin panel
   - Filter by `status = 'pending'`
   - Review candidate background and fit

3. **If qualified, generate application token**
   ```sql
   UPDATE partner_inquiries 
   SET application_token = gen_random_uuid()::text,
       status = 'qualified'
   WHERE id = 'inquiry_id';
   ```

4. **Send private application link** to candidate
   - URL: `https://yourdomain.com/apply/partner-application?token={application_token}`
   - This token validates access to the full application

### Full Application Process

1. **Candidate receives unique token link**
2. **Completes 6-section application**:
   - Contact Information
   - Professional Experience (education, bar admissions, matters, publications)
   - Business Development (billings, portable book, clients)
   - Financial Information (compensation, partnership tier preference)
   - Documents (resume, writing sample, client list)
   - References (3 professional references)

3. **Files uploaded to Supabase Storage** in `partner-documents` bucket
   - Organized by inquiry ID
   - Only accessible to authenticated admins

4. **Application submitted**
   - Status: `pending`
   - Inquiry status updated to `application_submitted`

5. **Partners review applications**
   - Access documents from Supabase Storage
   - Contact references if moving forward
   - Update status: `under_review`, `interview`, `accepted`, `declined`

---

## Database Schema

### partner_inquiries

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| created_at | timestamp | Auto-generated |
| name | text | Full name |
| email | text | Email address (indexed) |
| phone | text | Phone number |
| pathway_interest | text | Preferred partnership pathway |
| primary_specialty | text | Practice area specialty |
| years_practice | int | Years in practice |
| practice_overview | text | Brief background description |
| why_rivalis | text | Motivation for joining |
| status | text | pending, qualified, declined, application_submitted |
| reviewed_by | uuid | Admin who reviewed (FK to auth.users) |
| notes | text | Internal partner notes |
| application_token | text | Unique token for full application access |

### partner_applications

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| inquiry_id | uuid | FK to partner_inquiries |
| access_token | text | Token used for access (indexed) |
| **Contact** | | |
| full_name | text | Legal name |
| email | text | Email |
| phone | text | Phone |
| linkedin_url | text | LinkedIn profile |
| current_firm | text | Current employer |
| current_title | text | Current position |
| **Experience** | | |
| bar_admissions | text[] | Array of bar admissions |
| law_school | text | Law school name |
| law_school_year | int | Graduation year |
| undergrad | text | Undergraduate institution |
| practice_areas | text[] | Array of specialties |
| years_practice | int | Years in practice |
| representative_matters | text | Description of significant work |
| publications | text | Publications and thought leadership |
| speaking_engagements | text | Speaking and conferences |
| awards | text | Awards and recognition |
| **Business** | | |
| annual_billings | text | Billing range |
| portable_book | text | Portable business description |
| client_concentration | text | Client diversity |
| referral_sources | text | Business development sources |
| marketing_activities | text | Marketing activities |
| **Financial** | | |
| current_compensation | text | Current comp range |
| compensation_expectations | text | Desired compensation |
| partnership_tier_preference | text | Preferred tier |
| capital_contribution | text | Capital capacity |
| **Documents** | | |
| resume_url | text | Link to resume in Storage |
| writing_sample_url | text | Link to writing sample |
| client_list_url | text | Link to client list (optional) |
| **References** | | |
| references | jsonb | Array of 3 references (name, title, relationship, email, phone) |
| **Meta** | | |
| status | text | pending, under_review, interview, accepted, declined |
| reviewed_by | uuid | Admin who reviewed |
| notes | text | Internal notes |
| created_at | timestamp | Submission timestamp |
| updated_at | timestamp | Last update timestamp |

---

## Security Features

### Row Level Security (RLS)

**partner_inquiries**:
- ✅ Public can INSERT (submit inquiries)
- ✅ Authenticated users have full access (for admins)
- ✅ Admin role check (optional, for future role-based access)

**partner_applications**:
- ✅ Anyone with valid token can INSERT (submit application)
- ✅ Authenticated users have full access (for admins)
- ✅ Admin role check (optional)

**partner-documents Storage**:
- ✅ Anyone with valid token can upload
- ✅ Authenticated users can read all documents
- ❌ Public cannot list or read documents

### Token Validation

- Application token generated after inquiry qualification
- Token validated on application page load
- Token required for file uploads
- Tokens are UUIDs (unguessable)

---

## Admin Dashboard (Future Enhancement)

Create at `/app/admin/applications/page.tsx`:

```typescript
// List inquiries with status filters
// View full applications with documents
// Update status and add notes
// Generate and send application tokens
// Export data to CSV
```

---

## Testing Checklist

### Initial Inquiry Form
- [ ] Visit `/apply/partner-inquiry`
- [ ] Fill out all required fields
- [ ] Submit form
- [ ] Check Supabase `partner_inquiries` table for new record
- [ ] Verify status = 'pending'

### Generate Application Token
- [ ] In Supabase SQL Editor:
  ```sql
  UPDATE partner_inquiries 
  SET application_token = gen_random_uuid()::text,
      status = 'qualified'
  WHERE email = 'test@example.com';
  
  SELECT application_token FROM partner_inquiries 
  WHERE email = 'test@example.com';
  ```
- [ ] Copy the token

### Full Application
- [ ] Visit `/apply/partner-application?token={YOUR_TOKEN}`
- [ ] Verify access is granted
- [ ] Complete all 6 sections
- [ ] Upload PDF files (resume, writing sample)
- [ ] Verify file upload progress indicators
- [ ] Add 3 references
- [ ] Submit application
- [ ] Check Supabase `partner_applications` table
- [ ] Check Supabase Storage `partner-documents` bucket for files
- [ ] Verify inquiry status updated to 'application_submitted'

### Without Token
- [ ] Visit `/apply/partner-application` (no token)
- [ ] Verify error message displayed
- [ ] Visit `/apply/partner-application?token=invalid`
- [ ] Verify error message displayed

---

## Email Templates

### Inquiry Confirmation Email
**Subject:** Partnership Inquiry Received - Rivalis Law

**Body:**
```
Dear {Name},

Thank you for your interest in partnership opportunities at Rivalis Law.

We've received your inquiry and our founding partners will review it within 3-5 business days. If your background and practice area align with our current needs, we'll send you a private link to our detailed application.

What to Expect:
- Initial review: 3-5 business days
- If qualified: Private application link via email
- Full process: 4-6 weeks from inquiry to decision

Questions? Email us at partners@rivalislaw.com

Best regards,
The Rivalis Law Partnership Team
```

### Application Invitation Email
**Subject:** Rivalis Law Partnership Application - Private Access

**Body:**
```
Dear {Name},

After reviewing your inquiry, we're excited to invite you to complete our comprehensive partnership application.

Your Private Application Link:
{DOMAIN}/apply/partner-application?token={TOKEN}

This link is unique to you and will remain active for 30 days.

The application includes:
- Detailed professional experience
- Business development history
- Financial information
- Document uploads (resume, writing sample, client list)
- Professional references

Please set aside 45-60 minutes to complete the application thoroughly.

Questions? Email partners@rivalislaw.com

Best regards,
The Rivalis Law Founding Partners
```

### Application Confirmation Email
**Subject:** Partnership Application Submitted - Rivalis Law

**Body:**
```
Dear {Name},

Thank you for completing your partnership application.

What Happens Next:
1. Background and reference checks (1-2 weeks)
2. If moving forward: 2-3 video interviews with partners
3. Final candidates receive detailed partnership agreement drafts
4. Decision timeline: 4-6 weeks from submission

We'll contact you within 10-14 business days with next steps.

Best regards,
The Rivalis Law Founding Partners
```

---

## Troubleshooting

### "Missing Supabase credentials" error
- Verify `.env.local` has all required keys
- Restart Next.js dev server after adding env vars

### "Invalid token" on application page
- Verify token exists in `partner_inquiries.application_token`
- Check token matches URL parameter exactly
- Ensure inquiry status is 'qualified'

### File upload fails
- Verify `partner-documents` bucket exists in Supabase Storage
- Check bucket is set to private (not public)
- Verify storage policies allow uploads with valid token

### Database permission errors
- Verify RLS policies are created (from migration SQL)
- Check `SUPABASE_SERVICE_ROLE_KEY` is set (bypasses RLS in API routes)

### Email not sending
- Check email service credentials in `.env.local`
- Verify email service is configured correctly
- Check API route console logs for errors

---

## Production Deployment

### Before Going Live

1. **Run database migration** in production Supabase
2. **Set production environment variables** in Vercel/hosting platform
3. **Test full flow** end-to-end in production
4. **Set up email service** (Resend, SendGrid, etc.)
5. **Create admin dashboard** for reviewing applications
6. **Set up monitoring** for form submissions and errors
7. **Configure domain** for email sending (SPF, DKIM)
8. **Add rate limiting** to prevent spam (optional)

### Recommended Enhancements

- [ ] Admin dashboard for reviewing applications
- [ ] Email notifications (confirmation, status updates)
- [ ] Auto-responder for inquiries
- [ ] Status tracking page for applicants
- [ ] Calendar integration for interview scheduling
- [ ] Document preview in admin panel
- [ ] Export applications to PDF
- [ ] Analytics tracking (inquiry → application → acceptance rate)

---

## Support

If you encounter issues:
1. Check Supabase Dashboard → Logs for errors
2. Check browser console for frontend errors
3. Verify database schema matches migration SQL
4. Test with Supabase SQL Editor directly

---

**System Status:** ✅ Ready for Testing
**Next Step:** Run database migration and test inquiry submission
