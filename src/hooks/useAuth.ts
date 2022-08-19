import { useState } from 'react';
import { db, auth, getDoc, doc, signInWithEmailAndPassword } from '../firebase/firebase';

const useAuth = () => {
  const [loginError, setLoginError] = useState(false);

  const handleLogin = async (email: string, password: string): Promise<void> => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      getDoc(doc(db, 'users', user.uid)).catch((error: Error) => error);
    } catch {
      setLoginError(true);
    }
  };

  return {
    loginError,
    handleLogin
  };
};

export { useAuth };
