import { useNavigate } from 'react-router-dom';
import {
  db,
  auth,
  signInWithPopup,
  googleProvider,
  facebookProvider,
  twitterProvider,
  doc,
  setDoc
} from '../firebase/firebase';

const useSocialAuth = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const { user } = await signInWithPopup(auth, googleProvider);
    setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      id: user.uid,
      token: await user.getIdToken(true)
    }).catch((error: Error) => error);
    navigate('/');
  };

  const signInWithFacebook = async () => {
    await signInWithPopup(auth, facebookProvider);
  };

  const signInWithTwitter = async () => {
    await signInWithPopup(auth, twitterProvider);
  };

  return {
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter
  };
};

export { useSocialAuth };
