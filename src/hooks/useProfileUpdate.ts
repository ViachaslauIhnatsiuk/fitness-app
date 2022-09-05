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
  EmailAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  reauthenticateWithPopup
} from '../firebase/firebase';
import { useAppSelector } from '../store/model';
import { selectProfile } from '../store/selectors';
import { setNewPassword } from '../store/slices/profileSlice';
import { useAppDispatch } from '../store/store';

const useProfileUpdate = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const { currentUser } = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();

  const updateUserProfile = async (name: string, password: string): Promise<void> => {
    const user = auth.currentUser as User;
    if (currentUser.id.endsWith('SAG')) {
      const provider = new GoogleAuthProvider();
      await reauthenticateWithPopup(user, provider);
    } else if (currentUser.id.endsWith('SAF')) {
      const provider = new FacebookAuthProvider();
      await reauthenticateWithPopup(user, provider);
    } else {
      const credential = EmailAuthProvider.credential(currentUser.email, currentUser.password);
      await reauthenticateWithCredential(user, credential);
    }
    await updatePassword(user, password);
    dispatch(setNewPassword(password));
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
