// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAC4cKQBzie",
  authDomain: "skilltostartup.firebaseapp.com",
  projectId: "skilltostartup",
  storageBucket: "skilltostartupfirebasestorage.app",
  messagingSenderId: "82951222335041",
  appId: "1:82225041:web:eecc8cc3370"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
