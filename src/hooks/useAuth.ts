import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword, signOut } from '../firebase/firebase';

const useAuth = () => {
  const [loginError, setLoginError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch {
      setLoginError(true);
    }
  };

  const handleLogout = async (): Promise<void> => {
    await signOut(auth);
    navigate('/');
    window.location.reload();
  };

  return {
    loginError,
    handleLogin,
    handleLogout
  };
};

export { useAuth };
