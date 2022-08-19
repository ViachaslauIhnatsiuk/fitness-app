import { useState } from 'react';
import { auth, sendPasswordResetEmail } from '../firebase/firebase';

const useResetPassword = () => {
  const [resetPasswordError, setResetPasswordError] = useState<boolean>(false);

  const handleForgotPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch {
      setResetPasswordError(true);
    }
  };

  return {
    resetPasswordError,
    handleForgotPassword
  };
};

export { useResetPassword };
