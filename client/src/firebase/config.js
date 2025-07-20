// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAC4cKQBzieOa1Js9omLDtSQLTYRO1lQjw",
  authDomain: "skilltostartup-5eeb1.firebaseapp.com",
  projectId: "skilltostartup-5eeb1",
  storageBucket: "skilltostartup-5eeb1.firebasestorage.app",
  messagingSenderId: "829889225041",
  appId: "1:829889225041:web:eecd1a558f198ac8cc3370"
};


// ✅ Only initialize if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
