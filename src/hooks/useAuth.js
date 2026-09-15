import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signInAnonymously } from '../config/firebase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        signInAnonymously(auth)
          .then((credential) => {
            setUser(credential.user);
          })
          .catch((err) => {
            console.error('Error auth anónima:', err);
            setError(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, error };
}