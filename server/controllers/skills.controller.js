import { db } from '../config/firebaseAdmin.js';

export const saveUserSkills = async (req, res) => {
  const { uid, skills, availability } = req.body;

  if (!uid || !skills || !availability) {
    return res.status(400).json({ message: 'uid, skills, and availability are required' });
  }

  try {
    await db.collection('users').doc(uid).set({ skills, availability }, { merge: true });
    res.status(200).json({ message: 'Skills saved successfully' });
  } catch (err) {
    console.error('Error saving skills:', err.message);
    res.status(500).json({ message: 'Failed to save skills' });
  }
};

export const getUserSkills = async (req, res) => {
  const { uid } = req.params;

  if (!uid) {
    return res.status(400).json({ message: 'uid is required' });
  }

  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(userDoc.data());
  } catch (err) {
    console.error('Error fetching user skills:', err.message);
    res.status(500).json({ message: 'Failed to get user data' });
  }
};
