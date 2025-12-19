import { createContext, useContext } from 'react';
import type { SiteSettings } from '../types/database';

interface SiteSettingsContextType {
  settings: SiteSettings | null;
  loading: boolean;
  error: string | null;
  refreshSettings: () => Promise<void>;
}

export const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
}
