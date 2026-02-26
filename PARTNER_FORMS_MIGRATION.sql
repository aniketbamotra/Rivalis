-- Partnership Forms Database Schema
-- Run this in your Supabase SQL Editor

-- Partner Inquiries Table (Initial Contact Form)
CREATE TABLE IF NOT EXISTS partner_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Contact Info
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    
    -- Partnership Details
    pathway_interest TEXT NOT NULL, -- project, partnership, equity, unsure
    primary_specialty TEXT NOT NULL,
    years_practice INTEGER NOT NULL,
    
    -- Background
    practice_overview TEXT NOT NULL,
    why_rivalis TEXT NOT NULL,
    
    -- Status Tracking
    status TEXT DEFAULT 'pending', -- pending, reviewing, qualified, rejected
    reviewed_by TEXT,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    
    -- Application Link (if qualified)
    application_token UUID,
    application_link_sent_at TIMESTAMP WITH TIME ZONE
);

-- Full Partnership Applications Table
CREATE TABLE IF NOT EXISTS partner_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    inquiry_id UUID REFERENCES partner_inquiries(id),
    access_token UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    
    -- Section 1: Contact & Basic Info
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    linkedin_url TEXT,
    current_firm TEXT,
    current_position TEXT,
    preferred_work_location TEXT,
    
    -- Section 2: Practice & Experience
    bar_admissions TEXT[], -- array of states
    primary_specialties TEXT[], -- array of specialties
    years_experience INTEGER NOT NULL,
    education_credentials TEXT,
    notable_achievements TEXT,
    
    -- Section 3: Business Development
    annual_billings TEXT NOT NULL, -- range like "$500k-$1M"
    portable_book TEXT NOT NULL,
    client_base_description TEXT NOT NULL,
    business_dev_strengths TEXT[], -- array of strengths
    
    -- Section 4: Partnership Preferences
    preferred_pathway TEXT NOT NULL, -- project, partnership, equity
    capital_contribution_capacity TEXT,
    current_compensation TEXT,
    transition_timeline TEXT NOT NULL,
    why_rivalis TEXT NOT NULL,
    
    -- Section 5: Documents (URLs to Supabase Storage)
    resume_url TEXT,
    writing_sample_url TEXT,
    client_list_url TEXT,
    additional_docs_urls TEXT[], -- array of URLs
    
    -- Section 6: References
    professional_references JSONB, -- array of reference objects
    has_conflicts BOOLEAN,
    conflicts_details TEXT,
    additional_info TEXT,
    
    -- Status
    status TEXT DEFAULT 'submitted', -- submitted, under_review, interview, accepted, rejected
    reviewed_by TEXT,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    decision_notes TEXT,
    
    -- Metadata
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_partner_inquiries_email ON partner_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_partner_inquiries_status ON partner_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_partner_inquiries_created ON partner_inquiries(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_partner_applications_email ON partner_applications(email);
CREATE INDEX IF NOT EXISTS idx_partner_applications_status ON partner_applications(status);
CREATE INDEX IF NOT EXISTS idx_partner_applications_token ON partner_applications(access_token);
CREATE INDEX IF NOT EXISTS idx_partner_applications_inquiry ON partner_applications(inquiry_id);

-- Enable Row Level Security
ALTER TABLE partner_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies (adjust based on your auth setup)
-- For now, allow insert for anyone, but require auth for read/update
CREATE POLICY "Allow public insert" ON partner_inquiries
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public insert" ON partner_applications
    FOR INSERT TO anon WITH CHECK (true);

-- Admin access (replace with your admin role/user)
CREATE POLICY "Admin full access inquiries" ON partner_inquiries
    FOR ALL TO authenticated USING (true);

CREATE POLICY "Admin full access applications" ON partner_applications
    FOR ALL TO authenticated USING (true);

-- Storage bucket for partner documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('partner-documents', 'partner-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Allow authenticated uploads" ON storage.objects
    FOR INSERT TO anon WITH CHECK (bucket_id = 'partner-documents');

CREATE POLICY "Allow authenticated access" ON storage.objects
    FOR SELECT TO authenticated USING (bucket_id = 'partner-documents');
