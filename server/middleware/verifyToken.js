// server/middleware/verifyToken.js
import { auth } from '../config/firebase.js';

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token error:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};
