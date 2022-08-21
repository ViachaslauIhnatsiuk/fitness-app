import { useState } from 'react';
import { db, auth, setDoc, doc, createUserWithEmailAndPassword } from '../firebase/firebase';

const useReg = () => {
  const [registrationError, setRegistrationError] = useState<boolean>(false);

  const handleRegistration = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        password,
        id: user.uid,
        token: await user.getIdToken(true)
      }).catch((error: Error) => error);
    } catch {
      setRegistrationError(true);
    }
  };

  return {
    registrationError,
    handleRegistration
  };
};

export { useReg };
