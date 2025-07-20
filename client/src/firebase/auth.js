// src/firebase/auth.js;
import { auth } from '../firebase/config';
console.log('Auth:', auth);

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

export const registerUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutUser = () => signOut(auth);

export const trackAuthState = (callback) =>
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
