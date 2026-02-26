import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface UserAccessStatus {
  hasAccess: boolean;
  reason: 'free' | 'premium_subscriber' | 'newsletter' | 'no_access';
  accessExpiry?: Date;
}

/**
 * Check if user has access to a premium resource
 * Access granted if:
 * 1. User has made a successful payment in the last 30 days
 * 2. User is newsletter subscriber (optional: gated premium)
 * 3. Resource is free
 */
export async function checkResourceAccess(
  userId: string | null,
  resourceId: string,
  isPremium: boolean
): Promise<UserAccessStatus> {
  // Free resources accessible to all
  if (!isPremium) {
    return {
      hasAccess: true,
      reason: 'free',
    };
  }

  // Premium resource - need user
  if (!userId) {
    return {
      hasAccess: false,
      reason: 'no_access',
    };
  }

  try {
    // Check if user has explicit access via resource_access table
    const { data: access } = await supabase
      .from('resource_access')
      .select('accessed_at')
      .eq('user_id', userId)
      .eq('resource_id', resourceId)
      .single();

    if (access) {
      return {
        hasAccess: true,
        reason: 'premium_subscriber',
      };
    }

    // Check if user has active payment (successful within 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: payment } = await supabase
      .from('payments')
      .select('created_at')
      .eq('user_id', userId)
      .eq('status', 'succeeded')
      .gte('created_at', thirtyDaysAgo.toISOString())
      .single();

    if (payment) {
      return {
        hasAccess: true,
        reason: 'premium_subscriber',
        accessExpiry: new Date(payment.created_at).getTime() + 30 * 24 * 60 * 60 * 1000,
      };
    }

    // Check newsletter subscription (optional: for early access)
    const { data: newsletter } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('status', 'active')
      .single();

    if (newsletter) {
      return {
        hasAccess: true,
        reason: 'newsletter',
      };
    }

    return {
      hasAccess: false,
      reason: 'no_access',
    };
  } catch (error) {
    console.error('Error checking resource access:', error);
    return {
      hasAccess: false,
      reason: 'no_access',
    };
  }
}

/**
 * Record resource access after successful payment
 */
export async function grantResourceAccess(
  userId: string,
  resourceId: string,
  paymentId?: string
) {
  try {
    const { error } = await supabase.from('resource_access').insert({
      user_id: userId,
      resource_id: resourceId,
      access_type: paymentId ? 'purchased' : 'newsletter_subscriber',
      payment_id: paymentId || null,
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error granting resource access:', error);
    return { success: false, error };
  }
}

/**
 * Get all resources user has access to
 */
export async function getUserAccessibleResources(userId: string) {
  try {
    const { data: access } = await supabase
      .from('resource_access')
      .select('resource_id')
      .eq('user_id', userId);

    return access?.map(a => a.resource_id) || [];
  } catch (error) {
    console.error('Error fetching user resources:', error);
    return [];
  }
}
