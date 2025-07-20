// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAC4cKQBzieOa1Js9omLDtSQLTYRO1lQjw",
  authDomain: "skilltostartup-5eeb1.firebaseapp.com",
  projectId: "skilltostartup-5eeb1",
  storageBucket: "skilltostartup-5eeb1.firebasestorage.app",
  messagingSenderId: "829889225041",
  appId: "1:829889225041:web:eecd1a558f198ac8cc3370"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
