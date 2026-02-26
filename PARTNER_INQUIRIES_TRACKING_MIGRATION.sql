-- Migration: Add Application Link Tracking Columns
-- Run this in Supabase SQL Editor

-- Add the new tracking columns to partner_inquiries table
ALTER TABLE partner_inquiries 
ADD COLUMN IF NOT EXISTS application_link_send_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS application_link_last_send_status TEXT;

-- Add comments for documentation
COMMENT ON COLUMN partner_inquiries.application_link_send_count IS 'Number of times application link was sent to this candidate';
COMMENT ON COLUMN partner_inquiries.application_link_last_send_status IS 'Status of last send attempt: success, failed, or sending';

-- Optional: Backfill existing records that have sent_at but no count
-- This sets count to 1 and status to success for existing sent links
UPDATE partner_inquiries 
SET application_link_send_count = 1,
    application_link_last_send_status = 'success'
WHERE application_link_sent_at IS NOT NULL 
  AND application_link_send_count IS NULL;

-- Verify the columns were added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'partner_inquiries' 
  AND column_name IN ('application_link_send_count', 'application_link_last_send_status');

-- Expected output:
-- column_name                      | data_type | is_nullable
-- -------------------------------- | --------- | -----------
-- application_link_send_count      | integer   | YES
-- application_link_last_send_status| text      | YES
