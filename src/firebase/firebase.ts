import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, getDoc, doc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import {
  User,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  updatePassword,
  browserSessionPersistence,
  browserLocalPersistence,
  setPersistence,
  onAuthStateChanged,
  reauthenticateWithCredential,
  EmailAuthProvider,
  reauthenticateWithPopup
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyClHWmN4BpJhnzDPGxV15ZPSuApmPR7FFs',
  authDomain: 'fitness-app-b0ec5.firebaseapp.com',
  projectId: 'fitness-app-b0ec5',
  storageBucket: 'fitness-app-b0ec5.appspot.com',
  messagingSenderId: '902700817508',
  appId: '1:902700817508:web:987c04a20f412bce355371',
  measurementId: 'G-JET62TQVNS'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export {
  app,
  db,
  auth,
  storage,
  googleProvider,
  facebookProvider,
  browserSessionPersistence,
  browserLocalPersistence,
  setDoc,
  getDoc,
  doc,
  ref,
  getDownloadURL,
  uploadBytes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  signOut,
  updatePassword,
  setPersistence,
  onAuthStateChanged,
  reauthenticateWithCredential,
  EmailAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  reauthenticateWithPopup
};

export type { User };
