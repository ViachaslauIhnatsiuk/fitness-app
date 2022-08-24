import { db, auth, doc, setDoc, updateEmail, updatePassword } from '../firebase/firebase';

const useProfileUpdate = () => {
  return {
    async updateUserProfile(name: string, email: string, password: string): Promise<void> {
      const user = auth.currentUser!;
      await updatePassword(user, password);
      await updateEmail(user, email);
      setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        password,
        id: user.uid,
        token: await user.getIdToken(true)
      }).catch((error: Error) => error);
    }
  };
};

export { useProfileUpdate };
