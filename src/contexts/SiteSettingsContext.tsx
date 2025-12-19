import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { SiteSettings } from '../types/database';
import { SiteSettingsContext } from '../hooks/useSiteSettings';

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (fetchError) throw fetchError;
      
      setSettings(data);
    } catch (err) {
      console.error('Error fetching site settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch site settings');
      
      // Set default values if fetch fails
      setSettings({
        id: '',
        firm_name: 'Rivalis Law',
        attorney_name: 'Aaishwarya Aeron, Esq.',
        attorney_credentials: 'NY & MI Bar | Oxford AI Certified | Big 4 Trained',
        bar_admission: 'New York and Michigan',
        firm_tagline: 'Big 4 Trained Attorney | AI Governance | Global Immigration | M&A Transactions',
        phone_primary: '+1 (313) 771-2283',
        phone_display: '+1 (313) 771-2283',
        email_contact: 'contact@rivalislaw.com',
        email_employment: 'employment@rivalislaw.com',
        email_ip: 'ip@rivalislaw.com',
        email_privacy: 'privacy@rivalislaw.com',
        email_ai: 'ai@rivalislaw.com',
        email_formation: 'formation@rivalislaw.com',
        email_deals: 'deals@rivalislaw.com',
        email_investigations: 'investigations@rivalislaw.com',
        email_contracts: 'contracts@rivalislaw.com',
        email_legal: 'legal@rivalislaw.com',
        linkedin_url: 'https://linkedin.com/in/aaishaeron',
        updated_at: new Date().toISOString(),
        updated_by: null
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const value = {
    settings,
    loading,
    error,
    refreshSettings: fetchSettings
  };

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
};
