import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function usePageView() {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        await supabase.from('page_views').insert([{
          page: location.pathname,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent || null,
        }]);
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    };

    trackPageView();
  }, [location]);
}
