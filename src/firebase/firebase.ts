import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, getDoc, doc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

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

export {
  app,
  db,
  auth,
  setDoc,
  getDoc,
  doc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
};
