# Stripe + Netlify Functions - Setup Checklist

## ✅ Step-by-Step Setup (15 minutes)

### **Step 1: Get Stripe API Keys** (3 min)

1. Go to: https://dashboard.stripe.com/test/apikeys
2. You'll see two keys:
   - **Publishable key** (starts with `pk_test_`) - Copy this
   - **Secret key** (Click "Reveal test key", starts with `sk_test_`) - Copy this

Add to your `.env` file:
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
```

---

### **Step 2: Get Supabase Service Role Key** (2 min)

You already have the regular keys, now get the service role key:

1. Go to: Supabase Dashboard → Your Project → Settings → API
2. Find **`service_role` key** (NOT the anon key)
3. Click "Reveal" and copy it

Add to your `.env` file:
```bash
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

⚠️ **Important**: This key has admin access. Keep it secret!

---

### **Step 3: Deploy to Netlify** (5 min)

#### Option A: Connect GitHub (Recommended)
```bash
# 1. Push your code to GitHub
git add .
git commit -m "Add Stripe payment integration"
git push origin main

# 2. Go to Netlify: https://app.netlify.com
# 3. Click "Add new site" → "Import an existing project"
# 4. Connect your GitHub repo
# 5. Deploy settings:
#    - Build command: npm run build
#    - Publish directory: dist
# 6. Click "Deploy site"
```

#### Option B: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login and deploy
netlify login
netlify init
netlify deploy --prod
```

---

### **Step 4: Add Environment Variables to Netlify** (3 min)

In Netlify Dashboard:
1. Go to: **Site settings → Environment variables**
2. Click "Add a variable" for each:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
```

3. **Don't add `STRIPE_WEBHOOK_SECRET` yet** - we'll get that in the next step

4. Click "Redeploy" in Netlify after adding all variables

---

### **Step 5: Set Up Stripe Webhook** (2 min)

Now that your site is deployed, create the webhook:

1. Go to: https://dashboard.stripe.com/test/webhooks
2. Click **"Add endpoint"**
3. **Endpoint URL**: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
   - Replace `your-site` with your actual Netlify domain
4. **Events to listen for**, click "Select events" and choose:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.payment_failed`
5. Click "Add endpoint"
6. On the webhook details page, click "Reveal" next to **Signing secret**
7. Copy the secret (starts with `whsec_`)

Back in Netlify:
1. **Site settings → Environment variables**
2. Add: `STRIPE_WEBHOOK_SECRET=whsec_your_secret_here`
3. **Redeploy** your site

---

## 🧪 **Step 6: Test It!** (5 min)

### Test Payment Flow

1. Visit your deployed site
2. Fill out any intake form
3. Submit → Click "Pay $299"
4. You'll be redirected to Stripe Checkout
5. Use test card: **4242 4242 4242 4242**
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits
6. Complete payment
7. You should be redirected back to `/payment-success`

### Verify Payment Recorded

**Check Stripe:**
1. Go to: https://dashboard.stripe.com/test/payments
2. You should see your $299 payment ✅

**Check Supabase:**
1. Go to: Supabase Dashboard → Table Editor → `payments`
2. You should see a new row with the payment ✅

**Check Webhook:**
1. Go to: https://dashboard.stripe.com/test/webhooks
2. Click your webhook
3. Check "Events" tab - should show `checkout.session.completed` ✅

---

## 📝 **Your Current Setup**

✅ **Frontend code**: Ready  
✅ **Netlify functions**: Created  
✅ **Environment variables**: Documented  
❌ **Stripe keys**: Need to add  
❌ **Deployed to Netlify**: Need to deploy  
❌ **Webhook configured**: Need to set up  

---

## 🔍 **What Each File Does**

### Frontend
- `src/lib/stripe.ts` - Creates Stripe session, redirects user
- `src/components/Common/PaymentModal.tsx` - Shows payment button
- `src/pages/PaymentSuccess.tsx` - Handles return from Stripe

### Backend (Netlify Functions)
- `netlify/functions/create-checkout-session.js` - Creates Stripe Checkout session
- `netlify/functions/stripe-webhook.js` - Receives payment confirmation, writes to database

### Database
- `payments` table in Supabase - Stores all payment records

---

## 🆘 **Troubleshooting**

### "Cannot find create-checkout-session function"
- ✅ Make sure you deployed to Netlify (not just local)
- ✅ Check Netlify Functions tab shows both functions
- ✅ Verify files are in `netlify/functions/` directory

### "Webhook signature verification failed"
- ✅ Check `STRIPE_WEBHOOK_SECRET` matches Stripe Dashboard
- ✅ Make sure you copied the secret from the TEST mode webhook
- ✅ Redeploy after adding the secret

### Payment succeeds but not in database
- ✅ Check Netlify Functions logs for errors
- ✅ Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
- ✅ Check Stripe webhook shows "succeeded" status
- ✅ Wait 10-30 seconds (webhooks can be delayed)

### "Missing environment variable"
- ✅ Check all variables are in Netlify (not just `.env`)
- ✅ Redeploy after adding variables
- ✅ Variables starting with `VITE_` are for frontend
- ✅ Variables without `VITE_` are for functions only

---

## 🚀 **You're Done When...**

- [ ] All environment variables added to Netlify
- [ ] Site deployed to Netlify
- [ ] Stripe webhook created and configured
- [ ] Test payment completes successfully
- [ ] Payment appears in Stripe Dashboard
- [ ] Payment recorded in Supabase `payments` table
- [ ] User redirected to success page

---

## 📞 **Need Help?**

1. Check Netlify function logs: **Netlify Dashboard → Functions → Logs**
2. Check Stripe webhook events: **Stripe Dashboard → Webhooks → Your webhook → Events**
3. Check Supabase logs: **Supabase Dashboard → Logs**

Everything is built and ready - you just need to add the keys and deploy! 🎉
