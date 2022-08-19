import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const useReg = () => {
  const [registrationError, setRegistrationError] = useState<boolean>(false);

  const handleRegistration = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    const auth = getAuth();
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
