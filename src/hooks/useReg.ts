import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialUserData } from '../components/registration/registrationUserData/constants';
import { IUserData } from '../components/registration/registrationUserData/models';
import { db, auth, setDoc, doc, createUserWithEmailAndPassword } from '../firebase/firebase';

const useReg = () => {
  const [registrationError, setRegistrationError] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>(initialUserData);
  const navigate = useNavigate();

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
        token: await user.getIdToken(true),
        userData
      }).catch((error: Error) => error);
      navigate('/');
    } catch {
      setRegistrationError(true);
    }
  };

  return {
    registrationError,
    userData,
    setUserData,
    handleRegistration
  };
};

export { useReg };
