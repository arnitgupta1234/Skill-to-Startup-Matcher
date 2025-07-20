// src/firebase/db.js
import { db } from "./config";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";

// Save new user
export const createUserProfile = async (uid, data) => {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, data);
};

// Get user
export const getUserProfile = async (uid) => {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);
  return snapshot.exists() ? snapshot.data() : null;
};
