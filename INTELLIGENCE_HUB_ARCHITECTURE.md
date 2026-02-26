# Intelligence Hub Implementation - Architecture Guide

## Component Tree & Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Main Application                              │
└─────────────────────────────────────────────────────────────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
    ┌─────────▼────────────┐   ┌─────────▼─────────────┐
    │ Navigation Component │   │  Intelligence Hub     │
    │                      │   │    Join the Firm      │
    └──────────────────────┘   └───────────────────────┘
              │                        │
         [NEW LINKS]          [Uses data files]
    • Intelligence Hub              │
    • Join the Firm          ┌──────┴──────┬──────────┬─────────┐
                             │             │          │         │
                    ┌────────▼──┐  ┌──────▼─┐  ┌───▼────┐  ┌──▼────┐
                    │ Articles   │  │Resources│  │Newsroom│  │Paywall│
                    │ (6 items)  │  │(6 items)│  │(3 items) │ │Comp.  │
                    └────────────┘  └─────────┘  └────────┘  └───────┘
```

---

## Data Flow: Content → Page → User

### **Intelligence Hub: Article Display**

```
1. DATA LAYER
   └─ /src/data/intelligence-articles.ts
      ├─ 6 article objects
      ├─ Categories (AI, Space, CRISPR, etc.)
      └─ Metadata (date, slug, excerpt)

2. PAGE COMPONENT
   └─ /app/intelligence-hub/page.tsx
      ├─ Imports articles array
      ├─ State: activeFilter
      ├─ Filter: Filter articles by category
      └─ Render: Article grid with cards

3. USER INTERACTION
   ├─ User clicks filter tab
   ├─ activeFilter state updates
   ├─ Grid re-renders with filtered articles
   └─ User clicks "Read More" → Navigate to article detail page
```

### **Newsletter: Signup to Confirmation**

```
1. USER SUBMITS FORM
   └─ /intelligence-hub#subscribe
      └─ Form: email, firstName (optional), company (optional)

2. API CALL
   └─ POST /api/newsletter/subscribe
      ├─ Body: { email, firstName?, company? }
      ├─ Validate: Email format
      ├─ Check: Existing subscriber?
      ├─ Insert: Into newsletter_subscribers table
      └─ Email: Send confirmation via Resend

3. DATABASE
   └─ Supabase table: newsletter_subscribers
      ├─ email ← Primary identifier
      ├─ first_name ← Optional
      ├─ status ← "active" (default)
      ├─ subscribed_at ← Timestamp
      └─ RLS: Only subscribed user can see own record

4. EMAIL
   └─ Resend sends confirmation
      ├─ From: intelligence@rivalislaw.com
      ├─ Template: Professional with logo
      └─ Content: Welcome message, what to expect, premium upsell

5. USER FEEDBACK
   └─ Page shows: "✓ Thanks for subscribing!"
      ├─ Auto-hides after 5 seconds
      └─ Form resets
```

### **Premium Resource: Access Control**

```
1. USER VISITS RESOURCE
   └─ /intelligence-hub/resources/jurisdiction-matrix
      └─ isPremium = true

2. PAGE CHECKS ACCESS
   └─ Call: checkResourceAccess(userId, resourceId, isPremium)
      ├─ Query: Is resource free?
      │  └─ No → Continue
      ├─ Query: Has user active payment?
      │  └─ Check: payments table, last 30 days
      ├─ Query: Has user explicit access?
      │  └─ Check: resource_access table
      └─ Result: { hasAccess: boolean, reason: string }

3. IF NO ACCESS
   └─ Show: ResourcePaywall component
      ├─ Lock icon
      ├─ "Benefits included" list
      └─ Button: "Unlock Premium Access"

4. USER CLICKS "UNLOCK"
   └─ Call: /api/checkout
      ├─ Body: { resourceId, type: 'premium_intelligence_access' }
      └─ Response: Stripe sessionId

5. STRIPE CHECKOUT
   └─ User pays
      └─ Webhook: payment_intent.succeeded
         ├─ Record: payments table
         ├─ Grant: resource_access record
         └─ User can now access resource

6. IF HAS ACCESS
   └─ Show: Full content
      └─ Download button/access link
```

---

## Database Schema Relationships

```
┌──────────────────────────────────┐
│    newsletter_subscribers        │
├──────────────────────────────────┤
│ id (UUID, PK)                    │
│ email (TEXT, UNIQUE)             │
│ first_name                       │
│ status: active|unsubscribed      │
│ subscribed_at (TIMESTAMP)        │
└──────────────────────────────────┘
           ▲
           │ Tracks subscriptions
           │
    [Newsletter Form]


┌──────────────────────────────────┐
│   intelligence_articles          │
├──────────────────────────────────┤
│ id (UUID, PK)                    │
│ title                            │
│ category                         │
│ date                             │
│ content                          │
│ slug (UNIQUE)                    │
│ is_featured                      │
│ status: draft|published          │
│ author_id (FK → profiles)        │
└──────────────────────────────────┘
           ▲
           │ Displays on
           │
    [Intelligence Hub Page]


┌──────────────────────────────────┐
│   intelligence_resources         │
├──────────────────────────────────┤
│ id (UUID, PK)                    │
│ title                            │
│ type: template|guide|tool        │
│ is_premium (BOOLEAN)             │
│ file_url                         │
│ slug (UNIQUE)                    │
└──────────────────────────────────┘
      │                    ▲
      │ Links to           │ Protects
      │                    │
      ├──────────────┬─────┴───┐
      │              │         │
      ▼              ▼         │
┌──────────────────────────────────┐
│    resource_access               │
├──────────────────────────────────┤
│ id (UUID, PK)                    │
│ user_id (FK → profiles)          │
│ resource_id (FK)                 │
│ access_type: purchased|newsletter│
│ payment_id (FK → payments) ◄─────┤─── Links to payment
│ accessed_at (TIMESTAMP)          │
└──────────────────────────────────┘
           ▲
           │ Grants access
           │
      [Access Control Logic]
      checkResourceAccess()


┌──────────────────────────────────┐
│      payments                    │ (Existing)
├──────────────────────────────────┤
│ id (UUID, PK)                    │
│ user_id (FK → profiles)          │
│ stripe_payment_id                │
│ amount                           │
│ status: pending|succeeded|failed │
│ created_at                       │
└──────────────────────────────────┘
           ▲
           │ Triggers access grant
           │
    [Stripe Webhook]
    → Calls: grantResourceAccess()


┌──────────────────────────────────┐
│    newsroom_items                │
├──────────────────────────────────┤
│ id (UUID, PK)                    │
│ title                            │
│ description                      │
│ item_date (DATE)                 │
│ type: press|speaking|quote       │
│ link (URL)                       │
└──────────────────────────────────┘
           ▲
           │ Displays on
           │
    [Intelligence Hub Page]
```

---

## API Endpoint Details

### **Newsletter Subscribe**

**Endpoint:** `POST /api/newsletter/subscribe`

**Flow:**
```
Frontend Form
    │
    ├─ Validate email (HTML5 + JS)
    │
    └─ POST /api/newsletter/subscribe
         │
         ├─ Validate email (regex)
         │
         ├─ SELECT * FROM newsletter_subscribers WHERE email = ?
         │
         ├─ If exists:
         │  └─ UPDATE status = 'active' (if unsubscribed)
         │
         ├─ Else:
         │  └─ INSERT new row
         │
         ├─ Send confirmation email (Resend)
         │
         └─ Return { success: true }
         
         ├─ On error:
         │  └─ Return { error: message } + status code
         │
         └─ User sees: ✓ Confirmation message
```

**Error Handling:**
```
❌ Invalid email format
   └─ 400 Bad Request

❌ Supabase insert error
   └─ 500 Internal Server Error

❌ Email send failure
   └─ 201 Created (still store in DB)

✅ All success
   └─ 201 Created
```

---

## Component Integration Points

### **Navigation Component** (`/src/components/Layout/Navigation.tsx`)
```tsx
// Desktop menu
<li>
  <Link href="/intelligence-hub" className="nav-link">
    Intelligence Hub
  </Link>
</li>

<li>
  <Link href="/join-firm" className="nav-link">
    Join the Firm
  </Link>
</li>

// Mobile menu
<Link href="/intelligence-hub" className="nav-mobile-link">
  Intelligence Hub
</Link>
```

### **Intelligence Hub Page** (`/app/intelligence-hub/page.tsx`)
```tsx
// Import data
import { intelligenceArticles } from '@/src/data/intelligence-articles';
import { intelligenceResources } from '@/src/data/intelligence-resources';
import { newsroomItems } from '@/src/data/intelligence-newsroom';

// Use data
{intelligenceArticles.map(article => (
  <ArticleCard key={article.id} article={article} />
))}

// Call API
const response = await fetch('/api/newsletter/subscribe', {
  method: 'POST',
  body: JSON.stringify({ email, firstName, company })
});
```

### **ResourcePaywall Component** (`/src/components/ResourcePaywall.tsx`)
```tsx
// Used on premium resource detail pages (to be created)
<ResourcePaywall
  resourceId={resource.id}
  resourceTitle={resource.title}
  onPaymentSuccess={handleSuccess}
/>

// Calls checkout API
const response = await fetch('/api/checkout', {
  method: 'POST',
  body: JSON.stringify({ resourceId, type: 'premium_intelligence_access' })
});
```

---

## State Management

### **Local Component State** (Sufficient for current implementation)

```
Intelligence Hub Page:
├─ activeFilter: string → Filter articles by category
├─ newsletter.email: string → Form input
├─ newsletter.loading: boolean → API call in progress
└─ newsletter.submitted: boolean → Show success message

Join the Firm Page:
└─ (No state needed - static content)
```

### **Server State** (Supabase)

```
Newsletter flow:
├─ Write: INSERT into newsletter_subscribers
├─ Read: SELECT to check duplicates
└─ Update: UPDATE status if resubscribing

Premium access:
├─ Write: INSERT into resource_access (via webhook)
├─ Read: SELECT resource_access for current user
└─ Join: With payments table to check payment status

Content:
├─ (Initial hardcoded data)
├─ Can migrate to Supabase tables later
└─ Or connect to external CMS
```

---

## Future Enhancements

### **Planned - Not Yet Built**

1. **Article Detail Pages** (`/intelligence-hub/perspectives/[slug]`)
   - Individual article page with full content
   - Related articles sidebar
   - Comments/discussion section (optional)

2. **Resource Download** (`/intelligence-hub/resources/[slug]`)
   - Download button for free resources
   - Paywall for premium
   - Track downloads for analytics

3. **Careers Page** (`/careers`)
   - Job listings (from Supabase or hardcoded)
   - Filter by department/location
   - Apply button → Careers form

4. **Admin Dashboard** (`/admin/intelligence-hub`)
   - Create/edit articles
   - Upload resources
   - View newsletter subscribers
   - Analytics (most read articles, etc.)

5. **Email Automation** (Using your Resend + Supabase)
   - Send biweekly briefings to subscribers
   - Personalized recommendations
   - Unsubscribe management

6. **CMS Integration** (When ready)
   - Connect to Sanity/Contentful
   - Replace hardcoded data with CMS queries
   - Non-technical content updates

---

## Testing Checklist

Before going live, verify:

```
Navigation:
☐ Hover over nav → See "Intelligence Hub" and "Join the Firm"
☐ Click → Routes to correct pages
☐ Mobile menu shows both links
☐ Links are clickable and functional

Intelligence Hub Page:
☐ All 6 articles display
☐ Images load (placeholder divs)
☐ Filter tabs work (click each category)
☐ Articles filter correctly
☐ Newsletter form input accepts email
☐ Newsletter form submits without error
☐ Confirmation message appears
☐ Check Supabase → email in newsletter_subscribers table
☐ Check email inbox → Confirmation email arrives
☐ Premium badges show on 3 resources
☐ Page is mobile responsive

Join the Firm Page:
☐ Hero section displays correctly
☐ Two-column section renders
☐ 15 practice area cards display
☐ Partnership tier cards display
☐ "Most Popular" badge on middle tier
☐ All CTAs link to real pages
☐ Page is mobile responsive

Database:
☐ All 5 tables created (check Supabase UI)
☐ RLS policies enabled
☐ Indexes created
☐ Can query newsletter_subscribers
☐ Can query intelligence_articles (when data added)

API:
☐ POST /api/newsletter/subscribe with valid email
☐ Expect 201 response
☐ Check Supabase table for new record
☐ POST with invalid email → 400 error
☐ POST with existing email → Success response

Styling:
☐ Uses navy/gold color scheme
☐ Headings use serif font
☐ Body text uses Inter font
☐ Buttons have correct styling
☐ Responsive at 375px, 768px, 1024px, 1920px
```

---

## File Structure Summary

```
rivalis/
├── src/
│   ├── data/
│   │   ├── intelligence-articles.ts ← Article content
│   │   ├── intelligence-resources.ts ← Resource content
│   │   └── intelligence-newsroom.ts ← Newsroom content
│   ├── lib/
│   │   └── intelligence-hub-access.ts ← Premium access logic
│   └── components/
│       └── ResourcePaywall.tsx ← Premium content lock
│
├── app/
│   ├── intelligence-hub/
│   │   └── page.tsx ← Main Intelligence Hub page
│   ├── join-firm/
│   │   └── page.tsx ← Main Join the Firm page
│   └── api/
│       └── newsletter/
│           └── subscribe/
│               └── route.ts ← Newsletter signup API
│
└── SUPABASE_INTELLIGENCE_HUB.sql ← Database schema
```

---

**Total files created: 10**  
**Total files modified: 1**  
**Database tables: 5**  
**API endpoints: 1**  
**Page components: 2**  

🚀 Ready for deployment!
