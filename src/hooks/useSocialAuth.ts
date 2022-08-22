import {
  auth,
  signInWithPopup,
  googleProvider,
  facebookProvider,
  twitterProvider
} from '../firebase/firebase';

const useSocialAuth = () => {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
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
