'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getServices } from '../lib/supabase';
import type { Service } from '../types/database';

interface ServicesContextType {
  services: Service[];
  loading: boolean;
  getServiceBySlug: (slug: string) => Service | null;
  getServicePrice: (slug: string) => string;
  refreshServices: () => Promise<void>;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export function useServices() {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within ServicesProvider');
  }
  return context;
}

export function ServicesProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const getServiceBySlug = (slug: string) => {
    return services.find(service => service.slug === slug) || null;
  };

  const getServicePrice = (slug: string) => {
    const service = getServiceBySlug(slug);
    if (!service || !service.price) return 'Contact for pricing';
    
    switch (service.price_type) {
      case 'starting_at':
        return `Starting at $${service.price.toLocaleString()}`;
      case 'fixed':
        return `$${service.price.toLocaleString()}`;
      case 'hourly':
        return `$${service.price}/hour`;
      case 'custom':
      default:
        return 'Contact for pricing';
    }
  };

  const refreshServices = async () => {
    setLoading(true);
    await fetchServices();
  };

  return (
    <ServicesContext.Provider value={{
      services,
      loading,
      getServiceBySlug,
      getServicePrice,
      refreshServices
    }}>
      {children}
    </ServicesContext.Provider>
  );
}