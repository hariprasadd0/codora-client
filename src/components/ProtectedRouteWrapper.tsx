import { useAuthStore } from '@/modules/auth/store/auth.store';
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const ProtectedRouteWrapper = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const { token, user } = useAuthStore();

  useEffect(() => {
    const unsubFinished = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    if (useAuthStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return () => {
      unsubFinished();
    };
  }, []);

  if (!isHydrated) {
    return <div></div>
  }

  return token && user ? (
    children
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
};
