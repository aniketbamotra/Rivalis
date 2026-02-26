# Partnership Application Management - Quick Reference

## Managing Inquiries in Supabase

### View All Pending Inquiries
```sql
SELECT 
  id,
  name,
  email,
  primary_specialty,
  pathway_interest,
  years_practice,
  created_at
FROM partner_inquiries
WHERE status = 'pending'
ORDER BY created_at DESC;
```

### View Specific Inquiry Details
```sql
SELECT * FROM partner_inquiries
WHERE email = 'candidate@email.com';
```

### Approve Inquiry & Generate Application Token
```sql
-- Generate token for qualified candidate
UPDATE partner_inquiries 
SET 
  application_token = gen_random_uuid()::text,
  status = 'qualified',
  reviewed_by = auth.uid(),  -- Your user ID
  notes = 'Strong AI governance background, 15+ years experience'
WHERE id = 'inquiry_id_here';

-- Get the token to send to candidate
SELECT application_token, email, name 
FROM partner_inquiries 
WHERE id = 'inquiry_id_here';
```

### Decline Inquiry
```sql
UPDATE partner_inquiries 
SET 
  status = 'declined',
  reviewed_by = auth.uid(),
  notes = 'Practice area not aligned with current needs'
WHERE id = 'inquiry_id_here';
```

---

## Managing Full Applications

### View All Applications
```sql
SELECT 
  pa.id,
  pa.full_name,
  pa.email,
  pa.partnership_tier_preference,
  pa.annual_billings,
  pa.status,
  pa.created_at,
  pi.primary_specialty
FROM partner_applications pa
LEFT JOIN partner_inquiries pi ON pa.inquiry_id = pi.id
ORDER BY pa.created_at DESC;
```

### View Full Application Details
```sql
SELECT * FROM partner_applications
WHERE email = 'candidate@email.com';
```

### View Application with Inquiry Info
```sql
SELECT 
  pa.*,
  pi.primary_specialty,
  pi.pathway_interest,
  pi.why_rivalis
FROM partner_applications pa
JOIN partner_inquiries pi ON pa.inquiry_id = pi.id
WHERE pa.id = 'application_id_here';
```

### Update Application Status
```sql
-- Move to interview stage
UPDATE partner_applications 
SET 
  status = 'interview',
  reviewed_by = auth.uid(),
  notes = 'Scheduled for partner interviews - strong candidate',
  updated_at = now()
WHERE id = 'application_id_here';

-- Accept candidate
UPDATE partner_applications 
SET 
  status = 'accepted',
  reviewed_by = auth.uid(),
  notes = 'Partnership agreement sent - equity tier',
  updated_at = now()
WHERE id = 'application_id_here';

-- Decline candidate
UPDATE partner_applications 
SET 
  status = 'declined',
  reviewed_by = auth.uid(),
  notes = 'Portable book below minimum threshold',
  updated_at = now()
WHERE id = 'application_id_here';
```

---

## Accessing Uploaded Documents

### List All Documents for Candidate
```sql
-- First get the application
SELECT id, resume_url, writing_sample_url, client_list_url
FROM partner_applications
WHERE email = 'candidate@email.com';
```

### Download Document from Storage

1. Go to **Supabase Dashboard → Storage → partner-documents**
2. Navigate to folder with inquiry ID (folder structure: `{inquiry_id}/{timestamp}_filename.pdf`)
3. Click on file to download
4. Or use direct URL from `resume_url`, `writing_sample_url`, `client_list_url` columns

### Programmatic Access (if building admin dashboard)
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Download file
const { data, error } = await supabase.storage
  .from('partner-documents')
  .download('inquiry-id/timestamp_resume.pdf');

// Get public URL (requires authentication)
const { data: urlData } = supabase.storage
  .from('partner-documents')
  .getPublicUrl('inquiry-id/timestamp_resume.pdf');
```

---

## Reference Checks

### Extract References from Application
```sql
SELECT 
  full_name,
  email,
  references
FROM partner_applications
WHERE id = 'application_id_here';
```

The `references` field is JSONB with structure:
```json
[
  {
    "name": "John Doe",
    "title": "Partner at XYZ Law",
    "relationship": "Former supervisor",
    "email": "john@xyzlaw.com",
    "phone": "+1 (555) 123-4567"
  },
  ...
]
```

### Add Reference Notes
```sql
UPDATE partner_applications 
SET notes = notes || E'\n\nREFERENCE CHECKS:\n- John Doe: Excellent feedback, confirmed billing numbers\n- Jane Smith: Strong recommendation, highlighted leadership skills'
WHERE id = 'application_id_here';
```

---

## Application Statistics

### Inquiry Conversion Rate
```sql
SELECT 
  COUNT(*) FILTER (WHERE status = 'pending') as pending_count,
  COUNT(*) FILTER (WHERE status = 'qualified') as qualified_count,
  COUNT(*) FILTER (WHERE status = 'declined') as declined_count,
  COUNT(*) FILTER (WHERE status = 'application_submitted') as submitted_count,
  ROUND(
    COUNT(*) FILTER (WHERE status IN ('qualified', 'application_submitted'))::numeric / 
    COUNT(*)::numeric * 100, 
    2
  ) as conversion_rate_percent
FROM partner_inquiries;
```

### Applications by Status
```sql
SELECT 
  status,
  COUNT(*) as count,
  ARRAY_AGG(full_name) as candidates
FROM partner_applications
GROUP BY status
ORDER BY count DESC;
```

### Applications by Partnership Tier
```sql
SELECT 
  partnership_tier_preference,
  COUNT(*) as count,
  AVG(years_practice) as avg_years_practice
FROM partner_applications
GROUP BY partnership_tier_preference
ORDER BY count DESC;
```

### Applications by Practice Area
```sql
SELECT 
  pi.primary_specialty,
  COUNT(*) as application_count,
  AVG(pa.years_practice) as avg_experience
FROM partner_applications pa
JOIN partner_inquiries pi ON pa.inquiry_id = pi.id
GROUP BY pi.primary_specialty
ORDER BY application_count DESC;
```

### Time to Application
```sql
SELECT 
  pi.name,
  pi.created_at as inquiry_date,
  pa.created_at as application_date,
  EXTRACT(DAY FROM pa.created_at - pi.created_at) as days_to_apply
FROM partner_applications pa
JOIN partner_inquiries pi ON pa.inquiry_id = pi.id
ORDER BY days_to_apply;
```

---

## Email Candidate Application Link

### Generate and Send Link

1. **Approve inquiry and generate token** (see above SQL)

2. **Copy the application URL**:
   ```
   https://yourdomain.com/apply/partner-application?token={APPLICATION_TOKEN}
   ```

3. **Send email to candidate** with this template:

**Subject:** Rivalis Law Partnership Application - Private Access

**Body:**
```
Dear {Name},

After reviewing your inquiry, we're excited to invite you to complete our comprehensive partnership application.

Your Private Application Link:
https://rivalislaw.com/apply/partner-application?token={TOKEN}

This link is unique to you and will remain active for 30 days.

The application includes:
- Detailed professional experience
- Business development history
- Financial information (confidential)
- Document uploads (resume, writing sample, optional client list)
- Professional references

Please set aside 45-60 minutes to complete the application thoroughly.

If you have any questions, feel free to reply to this email or contact us at partners@rivalislaw.com

Best regards,
The Rivalis Law Founding Partners
```

---

## Bulk Operations

### Decline All Old Pending Inquiries (30+ days)
```sql
UPDATE partner_inquiries 
SET 
  status = 'declined',
  notes = 'Auto-declined after 30 days of no response'
WHERE 
  status = 'pending' 
  AND created_at < NOW() - INTERVAL '30 days';
```

### Export All Applications to Review
```sql
SELECT 
  pa.full_name,
  pa.email,
  pa.phone,
  pi.primary_specialty,
  pa.partnership_tier_preference,
  pa.years_practice,
  pa.annual_billings,
  pa.current_compensation,
  pa.compensation_expectations,
  pa.status,
  pa.created_at,
  pa.resume_url,
  pa.writing_sample_url
FROM partner_applications pa
JOIN partner_inquiries pi ON pa.inquiry_id = pi.id
WHERE pa.status = 'pending'
ORDER BY pa.created_at DESC;
```

### Mark All Applications as Reviewed
```sql
UPDATE partner_applications 
SET 
  status = 'under_review',
  updated_at = now()
WHERE status = 'pending';
```

---

## Common Queries

### Find Applications Missing Documents
```sql
SELECT 
  full_name,
  email,
  CASE 
    WHEN resume_url IS NULL THEN 'Missing resume'
    WHEN writing_sample_url IS NULL THEN 'Missing writing sample'
    ELSE 'All documents uploaded'
  END as document_status
FROM partner_applications
WHERE resume_url IS NULL OR writing_sample_url IS NULL;
```

### Find High-Value Candidates
```sql
SELECT 
  pa.full_name,
  pa.email,
  pa.years_practice,
  pa.annual_billings,
  pi.primary_specialty,
  pa.status
FROM partner_applications pa
JOIN partner_inquiries pi ON pa.inquiry_id = pi.id
WHERE 
  pa.annual_billings IN ('1m-2m', '2m-5m', '5m+')
  AND pa.years_practice >= 10
  AND pa.status = 'pending'
ORDER BY pa.created_at DESC;
```

### Find Candidates by Pathway
```sql
SELECT 
  full_name,
  email,
  partnership_tier_preference,
  capital_contribution,
  status
FROM partner_applications
WHERE partnership_tier_preference = 'equity'
ORDER BY created_at DESC;
```

---

## Data Cleanup

### Delete Test Submissions
```sql
-- BE CAREFUL! This deletes data permanently
DELETE FROM partner_applications 
WHERE email LIKE '%test%' OR email LIKE '%example%';

DELETE FROM partner_inquiries 
WHERE email LIKE '%test%' OR email LIKE '%example%';
```

### Delete Specific Application
```sql
-- First delete application
DELETE FROM partner_applications WHERE id = 'application_id_here';

-- Then reset inquiry status (optional)
UPDATE partner_inquiries 
SET 
  status = 'qualified',
  application_token = gen_random_uuid()::text
WHERE id = 'inquiry_id_here';
```

---

## Security Checks

### Verify RLS is Enabled
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('partner_inquiries', 'partner_applications');
-- rowsecurity should be TRUE for both
```

### View Active Policies
```sql
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename IN ('partner_inquiries', 'partner_applications');
```

---

## Backup & Export

### Export All Inquiries
```sql
COPY (
  SELECT * FROM partner_inquiries
) TO '/tmp/partner_inquiries.csv' CSV HEADER;
```

### Export All Applications
```sql
COPY (
  SELECT * FROM partner_applications
) TO '/tmp/partner_applications.csv' CSV HEADER;
```

Or use **Supabase Dashboard → Table Editor → Export to CSV**

---

## Quick Status Reference

### Inquiry Statuses
- `pending` - New inquiry, not yet reviewed
- `qualified` - Approved, application token generated
- `declined` - Not a fit, no application sent
- `application_submitted` - Candidate completed full application

### Application Statuses
- `pending` - New application, not yet reviewed
- `under_review` - Partners reviewing application
- `interview` - Scheduled for interviews
- `accepted` - Offer extended
- `declined` - Not moving forward

---

## Need Help?

Common issues and solutions:

1. **Can't access documents?**
   - Verify you're authenticated in Supabase Dashboard
   - Check Storage policies in Supabase → Storage → partner-documents → Policies

2. **Token not working?**
   - Verify token exists: `SELECT application_token FROM partner_inquiries WHERE id = 'inquiry_id'`
   - Check inquiry status is 'qualified'

3. **References not showing?**
   - JSONB field - use: `SELECT references FROM partner_applications WHERE id = 'app_id'`
   - Format as JSON in admin panel

4. **Want to resend application link?**
   - Get token: `SELECT application_token FROM partner_inquiries WHERE email = 'candidate@email.com'`
   - Rebuild URL: `https://yourdomain.com/apply/partner-application?token={TOKEN}`

---

**Pro Tip:** Bookmark these queries in Supabase SQL Editor for quick access!
