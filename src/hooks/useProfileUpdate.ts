import { useState } from 'react';
import { db, auth, doc, setDoc, updatePassword, User } from '../firebase/firebase';

const useProfileUpdate = () => {
  const [success, setSuccess] = useState<boolean>(false);

  const updateUserProfile = async (name: string, password: string): Promise<void> => {
    const user = auth.currentUser as User;
    await updatePassword(user, password);
    setDoc(doc(db, 'users', user.uid), {
      name,
      email: user.email,
      password,
      id: user.uid,
      token: await user.getIdToken(true)
    }).catch((error: Error) => error);
    setSuccess(true);
  };
  return {
    success,
    setSuccess,
    updateUserProfile
  };
};

export { useProfileUpdate };
