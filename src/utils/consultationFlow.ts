/**
 * Consultation Flow Utilities
 * Manages consultation payment status and account creation flow
 */

import { supabase } from '../lib/supabase';

export const STORAGE_KEYS = {
  CONSULTATION_EMAIL: 'consultation_paid_email',
  PENDING_ACCOUNT: 'pending_account_creation',
  PAYMENT_ID: 'payment_id',
} as const;

/**
 * Check if an email or user has paid for consultation
 */
export async function hasConsultationPaid(
  email: string,
  userId?: string | null
): Promise<boolean> {
  try {
    let query = supabase
      .from('payments')
      .select('id')
      .eq('status', 'succeeded')
      .or(`payment_type.eq.consultation,metadata->payment_type.eq.consultation`);

    // Check by user_id if logged in, otherwise by email
    if (userId) {
      query = query.eq('user_id', userId);
    } else {
      query = query.eq('email', email);
    }

    const { data, error } = await query.maybeSingle();
    
    if (error) {
      console.error('Error checking consultation payment:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error checking consultation payment:', error);
    return false;
  }
}

/**
 * Check if user needs to create account before accessing forms
 */
export function needsAccountCreation(user: unknown): boolean {
  if (user) return false; // Already has account
  
  const pendingAccount = localStorage.getItem(STORAGE_KEYS.PENDING_ACCOUNT);
  const paidEmail = localStorage.getItem(STORAGE_KEYS.CONSULTATION_EMAIL);
  
  return pendingAccount === 'true' && !!paidEmail;
}

/**
 * Get stored consultation email
 */
export function getConsultationEmail(): string | null {
  return localStorage.getItem(STORAGE_KEYS.CONSULTATION_EMAIL);
}

/**
 * Get stored payment ID
 */
export function getPaymentId(): string | null {
  return localStorage.getItem(STORAGE_KEYS.PAYMENT_ID);
}

/**
 * Mark that user has paid but needs to create account
 */
export function setAccountCreationPending(email: string, paymentId: string): void {
  localStorage.setItem(STORAGE_KEYS.CONSULTATION_EMAIL, email);
  localStorage.setItem(STORAGE_KEYS.PAYMENT_ID, paymentId);
  localStorage.setItem(STORAGE_KEYS.PENDING_ACCOUNT, 'true');
}

/**
 * Clear account creation pending flags
 */
export function clearAccountCreationFlags(): void {
  localStorage.removeItem(STORAGE_KEYS.CONSULTATION_EMAIL);
  localStorage.removeItem(STORAGE_KEYS.PAYMENT_ID);
  localStorage.removeItem(STORAGE_KEYS.PENDING_ACCOUNT);
}

/**
 * Link payment and form submissions to newly created user account
 */
export async function linkConsultationToAccount(
  userId: string,
  email: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const paymentId = getPaymentId();

    // 1. Link payment to user
    if (paymentId) {
      const { error: paymentError } = await supabase
        .from('payments')
        // @ts-expect-error - Supabase type inference issue
        .update({ user_id: userId })
        .eq('id', paymentId);

      if (paymentError) throw paymentError;
    } else {
      // Link any payments for this email
      const { error: paymentError } = await supabase
        .from('payments')
        // @ts-expect-error - Supabase type inference issue
        .update({ user_id: userId })
        .eq('email', email)
        .is('user_id', null);

      if (paymentError) throw paymentError;
    }

    // 2. Link all form submissions for this email
    const { error: formError } = await supabase
      .from('form_submissions')
      // @ts-expect-error - Supabase type inference issue
      .update({ user_id: userId })
      .eq('email', email)
      .is('user_id', null);

    if (formError) throw formError;

    // 3. Mark profile as consultation paid
    const { error: profileError } = await supabase
      .from('profiles')
      // @ts-expect-error - Supabase type inference issue
      .update({ 
        // consultation_paid: true // We'll add this column to the schema
      })
      .eq('id', userId);

    if (profileError) {
      console.warn('Could not update profile:', profileError);
      // Don't fail if profile update fails
    }

    // 4. Clear localStorage flags
    clearAccountCreationFlags();

    return { success: true };
  } catch (error) {
    console.error('Error linking consultation to account:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to link consultation',
    };
  }
}

/**
 * Check if user can access forms
 * Returns: { canAccess: boolean, reason?: string }
 * Now checks database for payment status across devices
 */
export async function canAccessForms(
  user: unknown,
  email?: string | null
): Promise<{ 
  canAccess: boolean; 
  reason?: string;
  redirectTo?: string;
}> {
  // If logged in, always allow access
  if (user) {
    return { canAccess: true };
  }

  // Get email from parameter, localStorage, or return true (first form access)
  const userEmail = email || 
                    localStorage.getItem(STORAGE_KEYS.CONSULTATION_EMAIL) ||
                    null;

  if (!userEmail) {
    // No email means this is their first form - allow access
    return { canAccess: true };
  }

  // Check database for payment status
  try {
    const { checkConsultationPaid } = await import('../lib/supabase');
    const hasPaid = await checkConsultationPaid(userEmail);

    if (hasPaid) {
      // They've paid but haven't created account - block additional forms
      // Store in localStorage for future checks
      localStorage.setItem(STORAGE_KEYS.PENDING_ACCOUNT, 'true');
      localStorage.setItem(STORAGE_KEYS.CONSULTATION_EMAIL, userEmail);
      
      return {
        canAccess: false,
        reason: 'Please create your account to access additional forms',
        redirectTo: '/signup',
      };
    }

    // No payment found - allow first form access
    return { canAccess: true };
  } catch (error) {
    console.error('Error checking form access:', error);
    // On error, allow access (fail open to avoid blocking legitimate users)
    return { canAccess: true };
  }
}
