# Rivalis Next.js Migration - Deployment Checklist

## Pre-Deployment Status
✅ Next.js 15.5.9 migration complete
✅ All 25+ routes migrated and tested
✅ API routes configured (checkout, webhooks, consultation-fee, emergency-email)
✅ Middleware implemented for protected routes
✅ TypeScript configuration fixed (composite flag added)
✅ Dev server running successfully on localhost:3000
✅ Critical routes tested:
  - Homepage: ✓
  - Service pages: ✓
  - Intake forms: ✓
  - Authentication (login/signup): ✓
  - Protected routes (dashboard): ✓

## Netlify Deployment Configuration
✅ netlify.toml updated for Next.js:
  - Build command: `npm run build`
  - Publish directory: `.next`
  - Node version: 20
  - Dev port: 3000

## Environment Variables Required

Add the following environment variables to Netlify Dashboard:

### Public Variables (NEXT_PUBLIC_*)
These variables are embedded in the client-side bundle.

```
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_your-stripe-key
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-profile
NEXT_PUBLIC_API_BASE_URL=https://your-domain.netlify.app
```

### Private Variables (Secret)
These variables remain server-side only.

```
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
STRIPE_SECRET_KEY=sk_live_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
RESEND_API_KEY=re_your-resend-key
```

## Pre-Deployment Steps

1. **Verify Build Locally**
   ```bash
   npm run build
   npm run preview
   ```
   
2. **Test API Routes**
   - Verify `/api/checkout` endpoint
   - Verify `/api/webhooks/stripe` endpoint
   - Verify `/api/consultation-fee` endpoint
   - Verify `/api/emergency-email` endpoint

3. **Check Environment Variables**
   - All NEXT_PUBLIC_* variables set correctly
   - Database connection working (Supabase)
   - Stripe keys valid
   - Email service configured (Resend)

## Deployment Steps

1. **Connect Repository to Netlify**
   - Log in to Netlify dashboard
   - Click "Add new site" → "Import an existing project"
   - Select GitHub repository and nextjs-migration branch

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Environment variables: Add all variables from "Environment Variables Required" section

3. **Set Custom Domain**
   - Go to Site settings → Domain management
   - Add custom domain (if applicable)
   - Update DNS records if needed

4. **Enable Branch Deployments**
   - Settings → Deploy contexts
   - Configure preview deployments for pull requests
   - Production: nextjs-migration branch

5. **Configure Webhooks**
   - Stripe webhook endpoint: `https://your-domain.netlify.app/api/webhooks/stripe`
   - Resend webhook (if applicable)

## Post-Deployment Verification

1. **Test Homepage**
   - Load https://your-domain
   - Verify all CSS loads correctly
   - Check responsive design on mobile

2. **Test Service Pages**
   - Navigate to each service (/services/immigration, etc.)
   - Verify content displays correctly

3. **Test Intake Forms**
   - Load a form (/forms/fraud-investigation)
   - Verify form fields render
   - Test form submission (if form has test endpoint)

4. **Test Authentication**
   - Create test account
   - Verify email confirmation works
   - Test login/logout
   - Test protected route access

5. **Test Payment Flow (Stripe)**
   - Initiate checkout
   - Verify Stripe redirects correctly
   - Test with Stripe test card: 4242 4242 4242 4242
   - Verify webhook handling works

6. **Monitor Logs**
   - Check Netlify build logs for errors
   - Monitor function logs for API errors
   - Check browser console for client-side errors

## Rollback Plan

If deployment fails:

1. **Revert to Previous Version**
   ```bash
   git reset --hard <previous-commit>
   git push origin nextjs-migration --force
   ```

2. **Redeploy from Netlify Dashboard**
   - Trigger manual redeploy from previous commit

3. **Contact Netlify Support**
   - If build fails with detailed error
   - Reference build logs and error messages

## Monitoring

1. **Set Up Alerts**
   - Netlify: Deploy failures
   - Stripe: Failed payments
   - Supabase: Database errors
   - Sentry: Runtime errors (optional)

2. **Regular Checks**
   - Check Netlify analytics
   - Monitor Stripe transaction logs
   - Review Supabase database logs
   - Check for TypeScript type errors in production

## Notes

- This migration removed React Router completely
- All navigation uses Next.js Link component
- Protected routes use middleware-based authentication
- API routes handle Stripe webhooks and email notifications
- Database migrations handled through Supabase UI
