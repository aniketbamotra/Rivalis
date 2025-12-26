import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper functions for common operations

// Services
export const getServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('display_order');
  
  if (error) throw error;
  return data;
};

export const getServiceBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateServicePrice = async (id: string, price: number) => {
  const { data, error } = await supabase
    .from('services')
    // @ts-expect-error - Supabase type inference issue
    .update({ price })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Get consultation fee from services table
export const getConsultationFee = async (): Promise<number> => {
  const { data, error } = await supabase
    .from('services')
    .select('price')
    .eq('type', 'consultation')
    .maybeSingle();
  
  if (error) {
    console.warn('Error fetching consultation fee, using default 499:', error);
    return 499; // Fallback
  }
  
  const result = data as { price: number | null } | null;
  
  if (!result || result.price === null) {
    console.warn('Consultation fee not found, using default 499');
    return 499; // Fallback
  }
  
  return result.price;
};

// Form Submissions
export const submitForm = async (
  formType: string,
  email: string,
  formData: Record<string, unknown>
) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  // Check if this user/email has paid for consultation
  const hasConsultationPaid = await checkConsultationPaid(email, user?.id);
  
  // Determine form status based on payment
  const formStatus = hasConsultationPaid ? 'pending' : 'pending_payment';
  
  const { data, error } = await supabase
    .from('form_submissions')
    // @ts-expect-error - Supabase type inference issue
    .insert({
      form_type: formType,
      email,
      form_data: formData,
      user_id: user?.id || null,
      status: formStatus
    })
    .select()
    .single();
  
  if (error) throw error;
  
  // Return status info along with data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return {
    ...(data as any),
    needsPayment: !hasConsultationPaid
  };
};

// Check if consultation has been paid
export const checkConsultationPaid = async (
  email: string,
  userId?: string | null
): Promise<boolean> => {
  try {
    let query = supabase
      .from('payments')
      .select('id')
      .eq('status', 'succeeded');

    // Check by user_id if logged in, otherwise by email
    if (userId) {
      query = query.eq('user_id', userId);
    } else {
      query = query.eq('email', email);
    }

    const { data, error } = await query.maybeSingle();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error checking consultation payment:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error checking consultation payment:', error);
    return false;
  }
};

// Record consultation payment
export const recordConsultationPayment = async (
  email: string,
  stripePaymentId: string,
  amount: number,
  userId?: string | null
) => {
  const { data, error } = await supabase
    .from('payments')
    // @ts-expect-error - Supabase type inference issue
    .insert({
      user_id: userId || null,
      email,
      stripe_payment_id: stripePaymentId,
      amount,
      currency: 'usd',
      status: 'succeeded',
      payment_method: 'card',
      metadata: { payment_type: 'consultation' }
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Update form submissions after payment
export const updateFormSubmissionsAfterPayment = async (email: string) => {
  const { error } = await supabase
    .from('form_submissions')
    // @ts-expect-error - Supabase type inference issue
    .update({ status: 'pending' })
    .eq('email', email)
    .eq('status', 'pending_payment');
  
  if (error) throw error;
};

export const getFormSubmissions = async (formType?: string) => {
  let query = supabase
    .from('form_submissions')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (formType) {
    query = query.eq('form_type', formType);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const updateFormSubmissionStatus = async (
  id: string,
  status: string,
  adminNotes?: string
) => {
  const { data, error } = await supabase
    .from('form_submissions')
    // @ts-expect-error - Supabase type inference issue
    .update({ status, admin_notes: adminNotes })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// User Profile
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateUserProfile = async (
  userId: string,
  updates: { full_name?: string; company_name?: string; phone?: string }
) => {
  const { data, error} = await supabase
    .from('profiles')
    // @ts-expect-error - Supabase type inference issue
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Purchases
export const getUserPurchases = async (userId: string) => {
  const { data, error } = await supabase
    .from('purchases')
    .select(`
      *,
      service:services(*),
      form_submission:form_submissions(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const getAllPurchases = async () => {
  const { data, error } = await supabase
    .from('purchases')
    .select(`
      *,
      service:services(*),
      form_submission:form_submissions(*),
      profile:profiles(*)
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Payments
export const getUserPayments = async (userId: string) => {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Admin: Get all users
export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Admin: Update user role
export const updateUserRole = async (userId: string, role: 'user' | 'admin') => {
  const { data, error } = await supabase
    .from('profiles')
    // @ts-expect-error - Supabase type inference issue
    .update({ role })
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};
