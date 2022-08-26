import { useState } from 'react';
import { auth, sendPasswordResetEmail } from '../firebase/firebase';

const usePasswordReset = () => {
  const [resetPasswordError, setResetPasswordError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleForgotPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch {
      setResetPasswordError(true);
    }
  };

  return {
    resetPasswordError,
    success,
    handleForgotPassword
  };
};

export { usePasswordReset };
