import { useState, useEffect, useRef } from 'react';

export const useMapBox = () => {
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const isFetching = useRef(false);

  const fetchToken = async () => {
    try {
      const response = await fetch('/api/config/mapbox');
      if (response.status === 401) return;
      const data = await response.json();
      setToken(data.token);
    } catch (error) {
      console.error('[useMapBox] Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFetching.current || token) return;
    isFetching.current = true;
    fetchToken();
  }, [token]);

  return { token, loading };
};
