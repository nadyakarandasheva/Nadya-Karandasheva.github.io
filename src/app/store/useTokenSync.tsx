import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { tokenActions } from './token';

export const useTokenSync = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'token') {
        if (event.newValue) {
          dispatch(tokenActions.set(event.newValue));
        } else {
          dispatch(tokenActions.logout());
        }
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [dispatch]);
};
