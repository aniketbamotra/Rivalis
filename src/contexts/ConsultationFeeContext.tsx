import { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { getConsultationFee } from '../lib/supabase';

interface ConsultationFeeContextType {
  consultationFee: number;
  loading: boolean;
}

export const ConsultationFeeContext = createContext<ConsultationFeeContextType>({
  consultationFee: 499,
  loading: true,
});

export function ConsultationFeeProvider({ children }: { children: ReactNode }) {
  const [consultationFee, setConsultationFee] = useState(499);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFee = async () => {
      try {
        const fee = await getConsultationFee();
        setConsultationFee(fee);
      } catch (error) {
        console.error('Error fetching consultation fee:', error);
        // Keep default 499
      } finally {
        setLoading(false);
      }
    };

    fetchFee();
  }, []);

  return (
    <ConsultationFeeContext.Provider value={{ consultationFee, loading }}>
      {children}
    </ConsultationFeeContext.Provider>
  );
}
