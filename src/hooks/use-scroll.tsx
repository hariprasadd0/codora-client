import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useScrollRestoration() {
  const location = useLocation();

  useEffect(() => {
    console.log('hit');

    window.scrollTo(0, 0);
  }, [location.pathname]);
}
