# Stripe Payment Integration Setup Guide

## Overview
Stripe Checkout integration for $299 consultation payments with Netlify Functions backend.

## 🎯 What's Implemented

### Frontend (`src/`)
- ✅ **PaymentModal**: Redirects to Stripe Checkout
- ✅ **PaymentSuccess**: Handles return from Stripe after payment
- ✅ **Cross-device payment verification**: Checks database for payment status
- ✅ **Stripe.js library**: Client-side Stripe integration

### Backend (`netlify/functions/`)
- ✅ **create-checkout-session.js**: Creates Stripe Checkout sessions
- ✅ **stripe-webhook.js**: Handles payment confirmation webhooks

### Payment Flow
1. User submits form → Payment modal appears
2. Click "Pay $299" → Redirected to Stripe Checkout
3. Complete payment on Stripe
4. Redirected to `/payment-success`
5. Webhook confirms payment → Records in database
6. User prompted to create account

---

## 📋 Setup Instructions

### 1. Get Stripe API Keys

1. Create/login to Stripe account: https://dashboard.stripe.com
2. Navigate to **Developers → API keys**
3. Copy your keys:
   - `Publishable key` (starts with `pk_test_` or `pk_live_`)
   - `Secret key` (starts with `sk_test_` or `sk_live_`)

### 2. Set Up Environment Variables

#### Local Development (`.env`)
Create a `.env` file in the project root:

```bash
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_SECRET_KEY=sk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_... # We'll get this in step 3
```

#### Netlify Deployment
Add environment variables in Netlify dashboard:
1. Go to: **Site settings → Environment variables**
2. Add each variable from above
3. **Important**: Don't prefix Netlify function vars with `VITE_`

### 3. Set Up Stripe Webhook

#### For Local Development (using Stripe CLI)
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to http://localhost:8888/.netlify/functions/stripe-webhook

# Copy the webhook signing secret (starts with whsec_)
# Add it to your .env as STRIPE_WEBHOOK_SECRET
```

#### For Production (Netlify)
1. Go to: https://dashboard.stripe.com/webhooks
2. Click **Add endpoint**
3. Endpoint URL: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
4. Events to listen for:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
5. Copy the **Signing secret** 
6. Add to Netlify environment variables as `STRIPE_WEBHOOK_SECRET`

### 4. Test the Integration

#### Test Mode (Recommended First)
Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Any future expiry date, any CVC

#### Test Flow
1. Start dev server: `npm run dev`
2. Fill out any intake form
3. Click submit → Payment modal appears
4. Click "Pay $299" → Redirected to Stripe
5. Use test card: `4242 4242 4242 4242`
6. Complete payment
7. Should redirect to `/payment-success`
8. Check Supabase `payments` table for record

#### Verify Webhook
Check your Netlify function logs or Stripe dashboard to confirm webhook received.

---

## 🔧 Configuration

### Checkout Session Settings
Edit `netlify/functions/create-checkout-session.js`:

```javascript
const session = await stripe.checkout.sessions.create({
  line_items: [{
    price_data: {
      currency: 'usd',              // Change currency
      unit_amount: amount * 100,    // Price in cents
      product_data: {
        name: 'Legal Consultation', // Change product name
        description: '...',          // Change description
      },
    },
    quantity: 1,
  }],
  // ... other settings
});
```

### Success/Cancel URLs
URLs are automatically set based on current page:
- Success: `{current_site}/payment-success?session_id={CHECKOUT_SESSION_ID}`
- Cancel: `{current_page}` (user returns to form)

---

## 📊 Database Schema

### `payments` Table
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  email TEXT NOT NULL,
  stripe_payment_id TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL, -- 'succeeded', 'pending', 'failed'
  payment_method TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Webhook automatically creates records when payments complete.

---

## 🚨 Troubleshooting

### Payment Modal Shows Error
**Error**: "Stripe failed to initialize"
- **Fix**: Check `VITE_STRIPE_PUBLISHABLE_KEY` is set in `.env`
- **Fix**: Make sure key starts with `pk_test_` or `pk_live_`

### Redirect to Stripe Fails
**Error**: "Failed to create checkout session"
- **Fix**: Check Netlify function logs for errors
- **Fix**: Verify `STRIPE_SECRET_KEY` is set
- **Fix**: Test function directly: `curl -X POST http://localhost:8888/.netlify/functions/create-checkout-session`

### Webhook Not Firing
**Error**: Payment succeeds but not recorded in database
- **Fix**: Check webhook URL is correct in Stripe dashboard
- **Fix**: Verify `STRIPE_WEBHOOK_SECRET` matches
- **Fix**: Check Netlify function logs for webhook errors
- **Fix**: Test webhook locally with Stripe CLI

### Payment Success But Database Not Updated
**Error**: User sees success page but payment not in Supabase
- **Cause**: Webhook hasn't fired yet (can take a few seconds)
- **Fix**: Wait 10-30 seconds and refresh
- **Fix**: Check webhook logs in Stripe dashboard
- **Fix**: Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly

### "Method Not Allowed" Error
**Error**: 405 error when calling Netlify function
- **Fix**: Ensure you're making a POST request
- **Fix**: Check function file is in `netlify/functions/` directory
- **Fix**: Redeploy to Netlify

---

## 🔐 Security Notes

### Environment Variables
- ✅ **Client-side** (`VITE_` prefix): Publishable key only
- ❌ **Never expose**: Secret keys, webhook secrets, service role keys
- ✅ **Server-side only**: All sensitive keys in Netlify Functions

### Webhook Verification
Webhook handler verifies Stripe signature to prevent fraud:
```javascript
stripe.webhooks.constructEvent(body, signature, secret);
```

### PCI Compliance
- ✅ **Stripe handles all card data** - you never touch it
- ✅ **Stripe Checkout is PCI DSS compliant**
- ✅ **No card data stored in your database**

---

## 💰 Going Live

### 1. Switch to Live Keys
In Stripe dashboard, toggle "Test mode" OFF and get live keys:
- `pk_live_...`
- `sk_live_...`

### 2. Update Environment Variables
Replace test keys with live keys in Netlify dashboard.

### 3. Create Live Webhook
Create new webhook endpoint for production URL with live mode enabled.

### 4. Update Stripe Settings
- Set business information
- Add bank account for payouts
- Configure email receipts
- Set statement descriptor (what appears on customer's card statement)

### 5. Test with Real Card
Do one real payment test before going fully live.

---

## 📈 Monitoring

### Stripe Dashboard
- View all payments: https://dashboard.stripe.com/payments
- Webhook logs: https://dashboard.stripe.com/webhooks
- Failed payments: https://dashboard.stripe.com/payments?status[]=failed

### Supabase
Query payments:
```sql
SELECT * FROM payments 
WHERE status = 'succeeded' 
ORDER BY created_at DESC;
```

### Netlify
Function logs: **Netlify dashboard → Functions → View logs**

---

## 🔄 Payment Flow Diagram

```
User Submits Form
       ↓
Payment Modal Opens
       ↓
User Clicks "Pay $299"
       ↓
[Frontend] redirectToCheckout()
       ↓
[Backend] create-checkout-session.js
       ↓
[Stripe] Checkout page loads
       ↓
User Enters Card Info
       ↓
[Stripe] Processes payment
       ↓
[Webhook] stripe-webhook.js receives event
       ↓
[Database] Payment recorded in Supabase
       ↓
[Redirect] User → /payment-success
       ↓
Show account creation prompt
```

---

## 📚 Additional Resources

- [Stripe Checkout Docs](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [Supabase Database Docs](https://supabase.com/docs/guides/database)

---

## ✅ Checklist

Before deploying to production:

- [ ] Stripe account verified
- [ ] Live API keys obtained
- [ ] Environment variables set in Netlify
- [ ] Webhook endpoint created for production URL
- [ ] Webhook secret added to Netlify
- [ ] Test payment completed successfully
- [ ] Database records payment correctly
- [ ] Success page shows correctly
- [ ] Email in localStorage persists cross-device
- [ ] Account creation prompt works
- [ ] Supabase RLS policies allow webhook writes

---

## 🆘 Support

If you encounter issues:
1. Check Netlify function logs
2. Check Stripe webhook logs
3. Check Supabase logs
4. Review this guide's troubleshooting section
5. Test with Stripe CLI locally first

**Stripe Support**: https://support.stripe.com  
**Netlify Support**: https://answers.netlify.com
