import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { IUser } from '../models/User';

const updateFirestoreState = (user: IUser) => {
  const userId = auth.currentUser?.uid as string;
  setDoc(doc(db, 'users', userId), user).catch(() => {});
};

export { updateFirestoreState };
