// server/config/firebaseAdmin.js
import admin from 'firebase-admin';
import serviceAccount from './firebaseServiceAccountKey.json' assert { type: 'json' };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
