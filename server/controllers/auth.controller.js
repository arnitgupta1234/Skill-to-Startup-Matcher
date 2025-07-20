// server/controllers/auth.controller.js
import admin from '../config/firebaseAdmin.js';

export const verifyUser = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email, name, picture } = decodedToken;

    return res.status(200).json({ uid, email, name, picture });
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};
