// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAC4cKQB",
  authDomain: "skilltostartup.firebaseapp.com",
  projectId: "skilltostartup",
  storageBucket: "skilltostartup.firebasestorage.app",
  messagingSenderId: "82925268041",
  appId: "1:825041:web:eecd1a3370"
};


// ✅ Only initialize if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
