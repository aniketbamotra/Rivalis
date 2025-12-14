# Stripe Payment Links - No Backend Setup

## ✨ Simple Setup (5 minutes, no backend needed!)

### Step 1: Create Stripe Payment Link

1. **Go to Stripe Dashboard**: https://dashboard.stripe.com/payment-links
2. **Click "New"** button
3. **Configure the payment link**:
   - **Name**: Legal Consultation
   - **Amount**: $299.00 USD
   - **Description**: Initial consultation and case review with access to all intake forms
   - **One-time payment**: Selected
   - **Collect customer email**: ✅ Yes
   - **After payment**: Redirect to URL → `https://yoursite.com/payment-success`

4. **Click "Create link"**
5. **Copy the payment link** (looks like: `https://buy.stripe.com/test_xxxxx`)

### Step 2: Add to Environment Variables

Add to your `.env` file:
```bash
VITE_STRIPE_PAYMENT_LINK=https://buy.stripe.com/test_your_link_here
```

For Netlify deployment, add to **Site settings → Environment variables**.

### Step 3: That's It! 🎉

The payment flow now works:
- User clicks "Pay $299"
- Redirects to Stripe Payment Link
- Stripe handles all payment processing
- Returns to your `/payment-success` page

---

## 🔄 How Payment Tracking Works

### Without Backend (Current Setup)
- ✅ Payment processed by Stripe
- ✅ User redirected to success page
- ⚠️ Manual payment verification via Stripe Dashboard
- ⚠️ No automatic database record (need to check Stripe manually)

### Upgrading Later (Optional)
If you want automatic payment tracking, you can add Netlify Functions later:
- Auto-record payments in Supabase
- Email confirmations
- Real-time payment status
- No code changes needed in frontend

---

## 📊 Tracking Payments

### Check Payments in Stripe
1. Go to: https://dashboard.stripe.com/payments
2. See all payments with customer emails
3. Export to CSV for records

### Manual Verification
When a user says they paid:
1. Search their email in Stripe Dashboard
2. Check if payment status is "Succeeded"
3. Manually mark their account as paid in Supabase

### Future: Automatic Tracking
To automate this, you'd add:
- Stripe webhook → Netlify Function
- Function writes to Supabase
- No manual checking needed

---

## 🧪 Testing

### Test Mode
1. Use test payment link (starts with `buy.stripe.com/test_`)
2. Use test card: `4242 4242 4242 4242`
3. Any future expiry, any CVC
4. Complete payment
5. Check Stripe Dashboard for payment

### Go Live
1. Toggle Stripe to "Live mode"
2. Create new payment link in live mode
3. Update `.env` with live payment link
4. Redeploy

---

## 🔐 Security

- ✅ **No card data touches your site** - all on Stripe
- ✅ **PCI compliant** - Stripe handles everything
- ✅ **Secure redirect** - official Stripe domain
- ✅ **No backend to secure** - stateless

---

## ✅ Pros vs Cons

### Stripe Payment Links (Current)
✅ No backend needed  
✅ 5-minute setup  
✅ Stripe handles everything  
✅ PCI compliant  
❌ Manual payment verification  
❌ No automatic database updates  
❌ Less customization  

### Netlify Functions (Alternative)
✅ Automatic payment tracking  
✅ Database integration  
✅ Email notifications  
✅ More customization  
❌ Requires backend setup  
❌ More complex  

---

## 🚀 Quick Start Commands

```bash
# 1. Add payment link to .env
echo "VITE_STRIPE_PAYMENT_LINK=https://buy.stripe.com/test_xxxxx" >> .env

# 2. Build
npm run build

# 3. Deploy to Netlify
git push origin main
```

Done! No backend, no webhooks, no functions. Just works! 🎉

---

## 💡 When to Upgrade

Consider adding Netlify Functions if you need:
- Automatic payment tracking
- Email confirmations
- Real-time payment status
- Integration with your database
- Custom business logic

But for getting started? **Payment Links are perfect!** 👌
