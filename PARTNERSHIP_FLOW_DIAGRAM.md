# Partnership Application System - Visual Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      PARTNERSHIP APPLICATION SYSTEM                          │
│                         Two-Tiered Qualification                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  STAGE 1: INITIAL INQUIRY                                                    │
└─────────────────────────────────────────────────────────────────────────────┘

    User Journey                    Backend Processing                Database
┌──────────────────┐           ┌──────────────────────┐         ┌──────────────┐
│                  │           │                      │         │              │
│ 1. Visit         │           │ API Endpoint:        │         │ Table:       │
│ /join-firm       │──────────▶│ /api/partner-inquiry │────────▶│ partner_     │
│                  │           │                      │         │ inquiries    │
│ 2. Click         │           │ Validates:           │         │              │
│ "Become Partner" │           │ - Required fields    │         │ Fields:      │
│                  │           │ - Email format       │         │ • name       │
│ 3. Redirected to │           │                      │         │ • email      │
│ /apply/partner-  │           │ Stores:              │         │ • phone      │
│ inquiry          │           │ - Contact info       │         │ • pathway    │
│                  │           │ - Practice area      │         │ • specialty  │
│ 4. Fill 8 fields │           │ - Experience level   │         │ • years      │
│    - Name        │           │ - Motivation         │         │ • background │
│    - Email       │           │                      │         │ • motivation │
│    - Phone       │           │ Sets:                │         │ • status     │
│    - Pathway     │           │ - status = 'pending' │         │ • token      │
│    - Specialty   │           │ - created_at         │         │              │
│    - Years       │           │                      │         │ Status:      │
│    - Background  │           │ Optional:            │         │ • pending    │
│    - Motivation  │           │ - Send email         │         │ • qualified  │
│                  │           │   confirmation       │         │ • declined   │
│ 5. Submit        │           │ - Alert partners     │         │              │
│                  │           │                      │         │              │
│ 6. Confirmation  │           │                      │         │              │
│    Screen        │           │                      │         │              │
│    "We'll review │           │                      │         │              │
│    within 3-5    │           │                      │         │              │
│    days"         │           │                      │         │              │
└──────────────────┘           └──────────────────────┘         └──────────────┘
         │                                                                │
         │                         ⏱️  3-5 business days                  │
         │                                                                │
         ▼                                                                ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                      PARTNER REVIEW (Manual)                                  │
└──────────────────────────────────────────────────────────────────────────────┘

    Partner Actions                SQL Operations                   Outcome
┌──────────────────┐           ┌──────────────────────┐         ┌──────────────┐
│                  │           │                      │         │              │
│ 1. Open Supabase │           │ SELECT * FROM        │         │ Decision:    │
│    Dashboard     │──────────▶│ partner_inquiries    │────────▶│              │
│                  │           │ WHERE status =       │         │ ✅ QUALIFIED │
│ 2. Filter by     │           │ 'pending';           │         │              │
│    status =      │           │                      │         │ Generate     │
│    'pending'     │           │                      │         │ token:       │
│                  │           │ UPDATE partner_      │         │              │
│ 3. Review:       │           │ inquiries            │         │ UPDATE SET   │
│    - Background  │           │ SET                  │         │ application_ │
│    - Practice    │           │   application_token  │         │ token =      │
│    - Experience  │           │   = uuid(),          │         │ gen_random_  │
│    - Motivation  │           │   status =           │         │ uuid()       │
│                  │           │   'qualified'        │         │              │
│ 4. Decision:     │           │ WHERE id = 'xxx';    │         │ Send email   │
│    ☑️ Qualified  │           │                      │         │ with link:   │
│    ☐ Declined    │           │ SELECT token         │         │              │
│                  │           │ FROM partner_        │         │ /apply/      │
│ 5. Generate      │           │ inquiries            │         │ partner-     │
│    token (SQL)   │           │ WHERE email =        │         │ application  │
│                  │           │ 'candidate@...';     │         │ ?token={UUID}│
│ 6. Email         │           │                      │         │              │
│    candidate     │           │                      │         │ ❌ DECLINED  │
│    with private  │           │ OR                   │         │              │
│    link          │           │                      │         │ UPDATE SET   │
│                  │           │ UPDATE partner_      │         │ status =     │
│                  │           │ inquiries            │         │ 'declined'   │
│                  │           │ SET status =         │         │              │
│                  │           │ 'declined'           │         │ No email     │
│                  │           │ WHERE id = 'xxx';    │         │ sent         │
└──────────────────┘           └──────────────────────┘         └──────────────┘
         │                                                                │
         │                  📧 Email with private link                    │
         │                                                                │
         ▼                                                                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STAGE 2: FULL APPLICATION                                                   │
└─────────────────────────────────────────────────────────────────────────────┘

    User Journey                    Backend Processing                Database
┌──────────────────┐           ┌──────────────────────┐         ┌──────────────┐
│                  │           │                      │         │              │
│ 1. Receive email │           │ Page Load:           │         │ Table:       │
│    with link     │           │ - Validate token     │         │ partner_     │
│                  │           │ - Check inquiry_id   │         │ applications │
│ 2. Click link:   │           │ - Verify not expired │         │              │
│ /apply/partner-  │──────────▶│                      │         │ Fields:      │
│ application      │           │ API Endpoints:       │         │              │
│ ?token={UUID}    │           │                      │         │ Contact:     │
│                  │           │ /api/partner-        │         │ • full_name  │
│ 3. Token         │           │ application          │         │ • email      │
│    validated     │           │                      │         │ • phone      │
│                  │           │ /api/upload-         │         │ • linkedin   │
│ 4. Complete      │           │ document             │         │ • firm       │
│    6 sections:   │           │                      │         │ • title      │
│                  │           │ Validates:           │         │              │
│ SECTION 1:       │           │ - Token exists       │         │ Experience:  │
│ Contact Info     │           │ - All required       │         │ • bar_admit  │
│ • Legal name     │           │   fields             │         │ • law_school │
│ • Email, phone   │           │ - File types (PDF)   │         │ • practice   │
│ • LinkedIn       │           │ - File size          │         │   _areas[]   │
│ • Current firm   │           │                      │         │ • years      │
│ • Title          │           │ File Uploads:        │         │ • matters    │
│                  │           │ - Upload to Storage  │         │ • pubs       │
│ SECTION 2:       │           │ - Generate URLs      │         │ • speaking   │
│ Experience       │           │ - Return path        │         │ • awards     │
│ • Bar admits[]   │           │                      │         │              │
│ • Law school     │           │ Stores:              │         │ Business:    │
│ • Practice areas │           │ - All form data      │         │ • billings   │
│ • Years practice │           │ - Document URLs      │         │ • portable   │
│ • Matters (text) │           │ - References (JSONB) │         │ • clients    │
│ • Publications   │           │ - inquiry_id (FK)    │         │ • referrals  │
│ • Speaking       │           │                      │         │ • marketing  │
│ • Awards         │           │ Updates:             │         │              │
│                  │           │ - inquiry status     │         │ Financial:   │
│ SECTION 3:       │           │   'application_      │         │ • current    │
│ Business Dev     │           │   submitted'         │         │   _comp      │
│ • Annual billing │           │                      │         │ • expect     │
│ • Portable book  │           │ Optional:            │         │ • tier_pref  │
│ • Client mix     │           │ - Send confirmation  │         │ • capital    │
│ • Referrals      │           │ - Alert partners     │         │              │
│ • Marketing      │           │                      │         │ Documents:   │
│                  │           │                      │         │ • resume_url │
│ SECTION 4:       │           │                      │         │ • writing_   │
│ Financial        │           │                      │         │   sample_url │
│ • Current comp   │           │                      │         │ • client_    │
│ • Expectations   │           │                      │         │   list_url   │
│ • Tier pref      │           │                      │         │              │
│ • Capital        │           │                      │         │ References:  │
│                  │           │                      │         │ • JSONB[]    │
│ SECTION 5:       │           │                      │         │   - name     │
│ Documents        │           │                      │         │   - title    │
│ • Resume (PDF)   │────┐      │                      │         │   - relation │
│ • Writing sample │    │      │                      │         │   - email    │
│ • Client list    │    │      │                      │         │   - phone    │
│   (optional)     │    │      │                      │         │              │
│                  │    │      │                      │         │ Meta:        │
│                  │    │      │                      │         │ • status     │
│                  │    │      │                      │         │ • reviewed_  │
│                  │    │      │                      │         │   by         │
│                  │    │      │                      │         │ • notes      │
│                  │    └─────▶│ Supabase Storage    │         │ • timestamps │
│                  │           │ Bucket:              │         │              │
│                  │           │ partner-documents    │         │ Linked to:   │
│                  │           │                      │         │ inquiry_id   │
│                  │           │ Path:                │         │ (FK)         │
│ SECTION 6:       │           │ {inquiry_id}/        │         │              │
│ References       │           │ {timestamp}_         │         │ Status:      │
│ • Ref 1          │           │ filename.pdf         │         │ • pending    │
│   - Name         │           │                      │         │ • under_     │
│   - Title        │           │ URLs stored in       │         │   review     │
│   - Relation     │           │ application table    │         │ • interview  │
│   - Email        │           │                      │         │ • accepted   │
│   - Phone        │           │                      │         │ • declined   │
│ • Ref 2          │           │                      │         │              │
│ • Ref 3          │           │                      │         │              │
│                  │           │                      │         │              │
│ 5. Submit        │           │                      │         │              │
│    Application   │           │                      │         │              │
│                  │           │                      │         │              │
│ 6. Confirmation  │           │                      │         │              │
│    Screen        │           │                      │         │              │
│    "We'll review │           │                      │         │              │
│    within 10-14  │           │                      │         │              │
│    days"         │           │                      │         │              │
└──────────────────┘           └──────────────────────┘         └──────────────┘
         │                                                                │
         │                      ⏱️  10-14 business days                   │
         │                                                                │
         ▼                                                                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FINAL REVIEW & DECISION                                   │
└─────────────────────────────────────────────────────────────────────────────┘

    Partner Actions                SQL Operations                   Outcome
┌──────────────────┐           ┌──────────────────────┐         ┌──────────────┐
│                  │           │                      │         │              │
│ 1. Review        │           │ SELECT pa.*,         │         │ ✅ INTERVIEW │
│    applications  │──────────▶│   pi.specialty       │────────▶│              │
│    in Supabase   │           │ FROM partner_        │         │ Schedule:    │
│                  │           │   applications pa    │         │ • 2-3 video  │
│ 2. Check:        │           │ JOIN partner_        │         │   calls      │
│    - Experience  │           │   inquiries pi       │         │ • Deep dive  │
│    - Book of     │           │   ON pa.inquiry_id   │         │ • Partner    │
│      business    │           │   = pi.id            │         │   fit        │
│    - Financials  │           │ WHERE pa.status =    │         │              │
│    - Documents   │           │   'pending';         │         │ UPDATE SET   │
│                  │           │                      │         │ status =     │
│ 3. Download docs │           │ Download from:       │         │ 'interview'  │
│    from Storage  │           │ partner-documents    │         │              │
│                  │           │ bucket               │         │              │
│ 4. Contact       │           │                      │         │ ✅ ACCEPTED  │
│    references    │           │ Extract references:  │         │              │
│    (if moving    │           │ SELECT references    │         │ Send:        │
│    forward)      │           │ FROM partner_        │         │ • Offer      │
│                  │           │   applications       │         │   letter     │
│ 5. Decision:     │           │ WHERE id = 'xxx';    │         │ • Partner    │
│    ☑️ Interview  │           │                      │         │   agreement  │
│    ☑️ Accept     │           │ UPDATE partner_      │         │ • Onboarding │
│    ☐ Decline     │           │   applications       │         │   materials  │
│                  │           │ SET status =         │         │              │
│ 6. Update status │           │   'interview'/'      │         │ UPDATE SET   │
│                  │           │   accepted'/         │         │ status =     │
│ 7. Email         │           │   'declined',        │         │ 'accepted'   │
│    candidate     │           │   notes = '...'      │         │              │
│                  │           │ WHERE id = 'xxx';    │         │              │
│                  │           │                      │         │ ❌ DECLINED  │
│                  │           │                      │         │              │
│                  │           │                      │         │ Send:        │
│                  │           │                      │         │ • Polite     │
│                  │           │                      │         │   rejection  │
│                  │           │                      │         │              │
│                  │           │                      │         │ UPDATE SET   │
│                  │           │                      │         │ status =     │
│                  │           │                      │         │ 'declined'   │
└──────────────────┘           └──────────────────────┘         └──────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                           KEY SECURITY FEATURES                              │
└─────────────────────────────────────────────────────────────────────────────┘

🔒 Token-Based Access Control
   • Application requires unique UUID token
   • Token generated only after manual qualification
   • Token validated on page load and file uploads
   • No way to access full application without token

🔒 Row Level Security (RLS)
   • Public can INSERT inquiries (submit forms)
   • Only authenticated users can SELECT (admins)
   • File uploads require valid token
   • Documents bucket is private (not public)

🔒 Data Privacy
   • Financial data encrypted at rest
   • Compensation never exposed in frontend
   • References only accessible to admins
   • Documents require authentication


┌─────────────────────────────────────────────────────────────────────────────┐
│                         TIMELINE SUMMARY                                     │
└─────────────────────────────────────────────────────────────────────────────┘

Day 0:     Candidate submits inquiry
Day 1-5:   Partners review inquiry
Day 5:     Token generated + email sent (if qualified)
Day 5-10:  Candidate completes full application
Day 10-24: Partners review application + references
Day 24-38: Interviews (if moving forward)
Day 38-42: Final decision + offer

Total: 4-6 weeks from inquiry to offer


┌─────────────────────────────────────────────────────────────────────────────┐
│                          TECHNOLOGY STACK                                    │
└─────────────────────────────────────────────────────────────────────────────┘

Frontend:   Next.js 14 (App Router), React, TypeScript, Tailwind CSS
Backend:    Next.js API Routes (serverless functions)
Database:   Supabase (PostgreSQL)
Storage:    Supabase Storage (S3-compatible)
Security:   Row Level Security (RLS), Token-based auth
Email:      Resend / SendGrid (to be integrated)
Hosting:    Vercel / Netlify
