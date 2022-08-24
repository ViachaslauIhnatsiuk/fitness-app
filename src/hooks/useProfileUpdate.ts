import { db, auth, doc, setDoc, updateEmail, updatePassword, User } from '../firebase/firebase';

const useProfileUpdate = () => {
  const updateUserProfile = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    const user = auth.currentUser as User;
    await updatePassword(user, password);
    await updateEmail(user, email);
    setDoc(doc(db, 'users', user.uid), {
      name,
      email,
      password,
      id: user.uid,
      token: await user.getIdToken(true)
    }).catch((error: Error) => error);
  };
  return {
    updateUserProfile
  };
};

export { useProfileUpdate };
