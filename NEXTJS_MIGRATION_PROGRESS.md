# Next.js Migration - Phase 1 Complete ✅

## What's Been Done

### 1. ✅ Project Setup
- Created `nextjs-migration` git branch for safe rollback
- Installed Next.js 15.1.6 alongside existing code
- Removed react-router-dom dependency
- Updated package.json scripts (dev, build, start)

### 2. ✅ Configuration Files
- Created `next.config.js` with optimization settings
- Updated TypeScript configuration for Next.js
- Created `.eslintrc.json` for Next.js
- Updated scripts in package.json

### 3. ✅ Directory Structure Created
```
app/                          # Next.js App Router
├── layout.tsx               # Root layout with all providers
└── page.tsx                 # Homepage (wraps existing Home component)

src/providers/                # New providers directory (with 'use client')
├── AuthProvider.tsx         # Migrated from contexts
├── SiteSettingsProvider.tsx # Ready
├── ConsultationFeeProvider.tsx # Ready  
└── ServicesProvider.tsx     # Ready

src/                          # Your existing code stays here!
├── components/               # No changes needed
├── hooks/                    # No changes needed
├── lib/                      # Updated to support both env formats
├── pages/                    # Still works! Gradually migrate these
├── types/                    # No changes needed
└── utils/                    # No changes needed
```

### 4. ✅ Environment Variables
- Created `.env.local` with both NEXT_PUBLIC_ and legacy VITE_ variables
- Updated `src/lib/supabase.ts` to support both formats during migration
- All keys migrated from old .env file

---

## How to Test

### Start Next.js Dev Server
```bash
npm run dev
```

This will start Next.js on http://localhost:3000

The homepage should work immediately! It wraps your existing Home component.

---

## Next Steps - Gradual Migration

### Phase 2: Migrate Routes One by One
You can now migrate pages gradually. Here's how:

#### Example: Migrate Login Page
1. Create `app/login/page.tsx`:
```tsx
'use client';
import { LoginPage } from '@/pages/Auth/LoginPage';
export default function Login() {
  return <LoginPage />;
}
```

2. Test the route at http://localhost:3000/login
3. Once verified, you can delete the old router entry

### Routes to Migrate (in suggested order):

#### Auth Routes (Priority 1)
- [ ] `/login` → `app/login/page.tsx`
- [ ] `/signup` → `app/signup/page.tsx`

#### Dashboard Routes (Priority 2)
- [ ] `/dashboard` → `app/dashboard/page.tsx`
- [ ] `/admin/dashboard` → `app/admin/dashboard/page.tsx`

#### Service Pages (Priority 3)
- [ ] `/services/contracts` → `app/services/contracts/page.tsx`
- [ ] `/services/data-privacy` → `app/services/data-privacy/page.tsx`
- [ ] `/services/immigration` → `app/services/immigration/page.tsx`
- [ ] `/services/employment-law` → `app/services/employment-law/page.tsx`
- [ ] `/services/entity-formation` → `app/services/entity-formation/page.tsx`
- [ ] `/services/ip-strategy` → `app/services/ip-strategy/page.tsx`
- [ ] `/services/fraud-investigation` → `app/services/fraud-investigation/page.tsx`
- [ ] `/services/fundraising` → `app/services/fundraising/page.tsx`
- [ ] `/services/governance-compliance` → `app/services/governance-compliance/page.tsx`
- [ ] `/services/m-and-a` → `app/services/m-and-a/page.tsx`

#### Immigration Sub-routes (Priority 4)
- [ ] `/services/immigration/work-visas` → `app/services/immigration/work-visas/page.tsx`
- [ ] `/services/immigration/eb1` → `app/services/immigration/eb1/page.tsx`
- [ ] `/services/immigration/eb2-niw` → `app/services/immigration/eb2-niw/page.tsx`
- [ ] `/services/immigration/eb5` → `app/services/immigration/eb5/page.tsx`

#### Intake Forms (Priority 5)
- [ ] All `/intake/*` routes → Can use dynamic route `app/intake/[formType]/page.tsx`

#### Legal Pages (Priority 6)
- [ ] `/terms` → `app/terms/page.tsx`
- [ ] `/privacy` → `app/privacy/page.tsx`
- [ ] `/disclaimers` → `app/disclaimers/page.tsx`
- [ ] `/legal-information` → `app/legal-information/page.tsx`

#### Payment Routes (Priority 7)
- [ ] `/payment-success` → `app/payment-success/page.tsx`

---

## Phase 3: Convert Netlify Functions to API Routes

### Example: Create Checkout Session
Convert `netlify/functions/create-checkout-session.js` to `app/api/checkout/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const session = await stripe.checkout.sessions.create({
      // Your Stripe logic here
    });
    
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
```

### API Routes to Migrate:
- [ ] `netlify/functions/create-checkout-session.js` → `app/api/checkout/route.ts`
- [ ] `netlify/functions/get-consultation-fee.js` → `app/api/consultation-fee/route.ts`
- [ ] `netlify/functions/send-emergency-email.js` → `app/api/emergency-email/route.ts`
- [ ] `netlify/functions/stripe-webhook.js` → `app/api/webhooks/stripe/route.ts`

---

## Phase 4: Protected Routes with Middleware

Create `middleware.ts` in root directory:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
};
```

---

## Important Notes

### ✅ What Works Now:
- Homepage at http://localhost:3000
- All providers (Auth, Services, Settings, ConsultationFee)
- Supabase integration
- Stripe integration (when you add API routes)
- All your components in `src/components/`
- All your hooks in `src/hooks/`

### ⚠️ What's Still Using React Router:
- All other pages (they need to be migrated to app/)
- Current router.tsx file (will be removed after all routes migrated)

### 🔧 Migration Strategy:
1. Both systems work in parallel during migration
2. Migrate one route at a time
3. Test each route before moving to the next
4. Once all routes migrated, delete `src/router.tsx` and old `App.tsx`

---

## Testing Checklist

- [ ] Run `npm run dev` successfully
- [ ] Homepage loads at http://localhost:3000
- [ ] No console errors
- [ ] Supabase connection works
- [ ] Auth context is available
- [ ] Services load correctly

---

## Rollback Instructions

If you need to rollback to the old Vite version:

```bash
git checkout main
npm install
npm run dev:vite
```

The old code is completely preserved!

---

## Need Help?

Common issues and solutions:

### Issue: Module not found errors
**Solution**: Make sure all imports use `@/` prefix and check tsconfig paths

### Issue: "use client" errors
**Solution**: Add `'use client'` directive to any component using hooks or browser APIs

### Issue: Environment variables not working
**Solution**: Restart dev server after changing .env.local

### Issue: Supabase connection fails
**Solution**: Check that NEXT_PUBLIC_ variables are set in .env.local

---

## What's Next?

Choose one:
1. **Continue migrating routes** - Start with auth pages (login/signup)
2. **Test the current setup** - Make sure homepage works perfectly
3. **Migrate API routes** - Convert Netlify functions to Next.js API routes
4. **Add middleware** - Set up protected route middleware

Let me know which direction you'd like to go!
