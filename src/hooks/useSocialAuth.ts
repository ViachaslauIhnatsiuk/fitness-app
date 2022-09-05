import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  db,
  auth,
  signInWithPopup,
  googleProvider,
  facebookProvider,
  doc,
  setDoc,
  User
} from '../firebase/firebase';

const useSocialAuth = () => {
  const [socialAuthError, setSocialAuthError] = useState<boolean>(false);
  const navigate = useNavigate();

  const setUserToDatabase = async (user: User, hint: string) => {
    setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      name: user.email?.split('@')[0],
      id: hint === 'SAF' ? `${user.uid}SAF` : `${user.uid}SAG`,
      password: 'Password1',
      avatar: '',
      token: await user.getIdToken(true)
    }).catch((error: Error) => error);
    navigate('/');
  };

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      await setUserToDatabase(user, 'SAG');
    } catch {
      setSocialAuthError(true);
    }
  };

  const signInWithFacebook = async () => {
    try {
      const { user } = await signInWithPopup(auth, facebookProvider);
      await setUserToDatabase(user, 'SAF');
    } catch {
      setSocialAuthError(true);
    }
  };

  return {
    signInWithGoogle,
    signInWithFacebook,
    setSocialAuthError,
    socialAuthError
  };
};

export { useSocialAuth };
