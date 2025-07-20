import { db } from "./config";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp
} from "firebase/firestore";

// --- Skill Input (User Side) ---
export const saveUserSkills = async (uid, data) => {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, data, { merge: true });
};

export const getUserSkills = async (uid) => {
  const docSnap = await getDoc(doc(db, "users", uid));
  return docSnap.exists() ? docSnap.data() : null;
};

// --- Admin Panel (Startup Posting) ---
export const addStartup = async (data) => {
  const ref = collection(db, "startups");
  await addDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const getStartupsByUser = async (uid) => {
  const q = query(collection(db, "startups"), where("createdBy", "==", uid));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
