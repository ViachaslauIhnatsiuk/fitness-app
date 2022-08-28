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

  const setUserToDatabase = async (user: User) => {
    setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      name: user.email?.split('@')[0],
      id: user.uid,
      token: await user.getIdToken(true)
    }).catch((error: Error) => error);
    navigate('/');
  };

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      await setUserToDatabase(user);
    } catch {
      setSocialAuthError(true);
    }
  };

  const signInWithFacebook = async () => {
    try {
      const { user } = await signInWithPopup(auth, facebookProvider);
      await setUserToDatabase(user);
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
