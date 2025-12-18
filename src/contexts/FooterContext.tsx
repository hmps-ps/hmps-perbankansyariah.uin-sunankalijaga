import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, FooterSettings } from '@/lib/supabase';

interface FooterContextType {
  footerData: FooterSettings | null;
  loading: boolean;
  error: string | null;
}

const FooterContext = createContext<FooterContextType | undefined>(undefined);

export const FooterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [footerData, setFooterData] = useState<FooterSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFooterSettings();
  }, []);

  const fetchFooterSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: supabaseError } = await supabase
        .from('footer_settings')
        .select('*')
        .maybeSingle();

      if (supabaseError) {
        throw supabaseError;
      }

      if (data) {
        setFooterData(data as FooterSettings);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch footer data';
      setError(errorMessage);
      console.error('Error fetching footer settings:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FooterContext.Provider value={{ footerData, loading, error }}>
      {children}
    </FooterContext.Provider>
  );
};

export const useFooter = (): FooterContextType => {
  const context = useContext(FooterContext);
  if (context === undefined) {
    throw new Error('useFooter must be used within a FooterProvider');
  }
  return context;
};
