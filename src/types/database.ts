// Database types for Supabase
// These types match the database schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          company_name: string | null;
          phone: string | null;
          role: 'user' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          company_name?: string | null;
          phone?: string | null;
          role?: 'user' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          company_name?: string | null;
          phone?: string | null;
          role?: 'user' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          short_description: string | null;
          price: number | null;
          price_type: 'fixed' | 'hourly' | 'custom' | 'starting_at';
          type: string | null; // 'consultation' or 'service'
          calendly_url: string | null;
          features: Json;
          category: string | null;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          short_description?: string | null;
          price?: number | null;
          price_type?: 'fixed' | 'hourly' | 'custom' | 'starting_at';
          type?: string | null;
          calendly_url?: string | null;
          features?: Json;
          category?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          short_description?: string | null;
          price?: number | null;
          price_type?: 'fixed' | 'hourly' | 'custom' | 'starting_at';
          type?: string | null;
          calendly_url?: string | null;
          features?: Json;
          category?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      form_submissions: {
        Row: {
          id: string;
          user_id: string | null;
          email: string;
          form_type: string;
          form_data: Json;
          status: 'pending' | 'pending_payment' | 'reviewed' | 'in_progress' | 'completed' | 'archived';
          assigned_to: string | null;
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          email: string;
          form_type: string;
          form_data: Json;
          status?: 'pending' | 'pending_payment' | 'reviewed' | 'in_progress' | 'completed' | 'archived';
          assigned_to?: string | null;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          email?: string;
          form_type?: string;
          form_data?: Json;
          status?: 'pending' | 'pending_payment' | 'reviewed' | 'in_progress' | 'completed' | 'archived';
          assigned_to?: string | null;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      purchases: {
        Row: {
          id: string;
          user_id: string | null;
          service_id: string | null;
          form_submission_id: string | null;
          status: 'pending' | 'paid' | 'in_progress' | 'completed' | 'cancelled';
          amount: number | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          service_id?: string | null;
          form_submission_id?: string | null;
          status?: 'pending' | 'paid' | 'in_progress' | 'completed' | 'cancelled';
          amount?: number | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          service_id?: string | null;
          form_submission_id?: string | null;
          status?: 'pending' | 'paid' | 'in_progress' | 'completed' | 'cancelled';
          amount?: number | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      payments: {
        Row: {
          id: string;
          user_id: string | null;
          email: string;
          purchase_id: string | null;
          stripe_payment_id: string | null;
          stripe_customer_id: string | null;
          amount: number;
          currency: string;
          status: 'pending' | 'succeeded' | 'failed' | 'refunded';
          payment_method: string | null;
          receipt_url: string | null;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          email: string;
          purchase_id?: string | null;
          stripe_payment_id?: string | null;
          stripe_customer_id?: string | null;
          amount: number;
          currency?: string;
          status?: 'pending' | 'succeeded' | 'failed' | 'refunded';
          payment_method?: string | null;
          receipt_url?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          email?: string;
          purchase_id?: string | null;
          stripe_payment_id?: string | null;
          stripe_customer_id?: string | null;
          amount?: number;
          currency?: string;
          status?: 'pending' | 'succeeded' | 'failed' | 'refunded';
          payment_method?: string | null;
          receipt_url?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
      };
      site_settings: {
        Row: {
          id: string;
          firm_name: string;
          attorney_name: string;
          attorney_credentials: string;
          bar_admission: string;
          firm_tagline: string | null;
          phone_primary: string;
          phone_display: string;
          email_contact: string;
          email_employment: string | null;
          email_ip: string | null;
          email_privacy: string | null;
          email_ai: string | null;
          email_formation: string | null;
          email_deals: string | null;
          email_investigations: string | null;
          email_contracts: string | null;
          email_legal: string | null;
          linkedin_url: string | null;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          firm_name?: string;
          attorney_name?: string;
          attorney_credentials?: string;
          bar_admission?: string;
          firm_tagline?: string | null;
          phone_primary?: string;
          phone_display?: string;
          email_contact?: string;
          email_employment?: string | null;
          email_ip?: string | null;
          email_privacy?: string | null;
          email_ai?: string | null;
          email_formation?: string | null;
          email_deals?: string | null;
          email_investigations?: string | null;
          email_contracts?: string | null;
          email_legal?: string | null;
          linkedin_url?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          id?: string;
          firm_name?: string;
          attorney_name?: string;
          attorney_credentials?: string;
          bar_admission?: string;
          firm_tagline?: string | null;
          phone_primary?: string;
          phone_display?: string;
          email_contact?: string;
          email_employment?: string | null;
          email_ip?: string | null;
          email_privacy?: string | null;
          email_ai?: string | null;
          email_formation?: string | null;
          email_deals?: string | null;
          email_investigations?: string | null;
          email_contracts?: string | null;
          email_legal?: string | null;
          linkedin_url?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Convenience types
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Service = Database['public']['Tables']['services']['Row'];
export type FormSubmission = Database['public']['Tables']['form_submissions']['Row'];
export type SiteSettings = Database['public']['Tables']['site_settings']['Row'];
export type Purchase = Database['public']['Tables']['purchases']['Row'];
export type Payment = Database['public']['Tables']['payments']['Row'];

// Partner types
export interface PartnerInquiry {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone?: string | null;
  pathway_interest: string;
  primary_specialty: string;
  years_practice: number;
  practice_overview: string;
  why_rivalis: string;
  status: string;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  notes?: string | null;
  application_token?: string | null;
  application_link_sent_at?: string | null;
}

export interface PartnerApplication {
  id: string;
  created_at: string;
  inquiry_id?: string | null;
  access_token: string;
  full_name: string;
  email: string;
  phone?: string | null;
  linkedin_url?: string | null;
  current_firm?: string | null;
  current_position?: string | null;
  bar_admissions?: string[] | null;
  primary_specialties?: string[] | null;
  years_experience?: number | null;
  education_credentials?: string | null;
  notable_achievements?: string | null;
  annual_billings?: string | null;
  portable_book?: string | null;
  client_base_description?: string | null;
  business_dev_strengths?: string[] | null;
  preferred_pathway?: string | null;
  capital_contribution_capacity?: string | null;
  current_compensation?: string | null;
  transition_timeline?: string | null;
  why_rivalis?: string | null;
  resume_url?: string | null;
  writing_sample_url?: string | null;
  client_list_url?: string | null;
  additional_docs_urls?: string[] | null;
  professional_references?: unknown | null; // JSONB
  has_conflicts?: boolean | null;
  conflicts_details?: string | null;
  additional_info?: string | null;
  status: string;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  decision_notes?: string | null;
  completed_at?: string | null;
  inquiry?: {
    full_name?: string;
    email?: string;
    pathway_interest?: string;
  } | null;
}

// Insert types
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ServiceInsert = Database['public']['Tables']['services']['Insert'];
export type FormSubmissionInsert = Database['public']['Tables']['form_submissions']['Insert'];
export type PurchaseInsert = Database['public']['Tables']['purchases']['Insert'];
export type PaymentInsert = Database['public']['Tables']['payments']['Insert'];

// Update types
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];
export type ServiceUpdate = Database['public']['Tables']['services']['Update'];
export type FormSubmissionUpdate = Database['public']['Tables']['form_submissions']['Update'];
export type PurchaseUpdate = Database['public']['Tables']['purchases']['Update'];
export type PaymentUpdate = Database['public']['Tables']['payments']['Update'];
