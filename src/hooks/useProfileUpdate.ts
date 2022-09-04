import { useState } from 'react';
import { IUserData } from '../components/registration/registrationUserData/models';
import {
  db,
  auth,
  doc,
  setDoc,
  getDoc,
  updatePassword,
  User,
  reauthenticateWithCredential,
  EmailAuthProvider
} from '../firebase/firebase';
import { useAppSelector } from '../store/model';
import { selectProfile } from '../store/selectors';

const useProfileUpdate = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const { currentUser } = useAppSelector(selectProfile);

  const updateUserProfile = async (name: string, password: string): Promise<void> => {
    const user = auth.currentUser as User;
    const credential = EmailAuthProvider.credential(currentUser.email, currentUser.password);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, password);
    setDoc(doc(db, 'users', user.uid), {
      ...currentUser,
      name,
      email: user.email,
      password,
      id: user.uid,
      token: await user.getIdToken(true)
    }).catch((error: Error) => error);
    setSuccess(true);
  };

  const updateUserData = async (userData: IUserData) => {
    const user = auth.currentUser as User;
    const userProfile = (await getDoc(doc(db, 'users', user.uid))).data();
    setDoc(doc(db, 'users', user.uid), {
      ...userProfile,
      userData
    }).catch((error: Error) => error);
    setSuccess(true);
  };

  return {
    success,
    setSuccess,
    updateUserProfile,
    updateUserData
  };
};

export { useProfileUpdate };
