import { db } from '../config/firebaseAdmin.js';

export const findMatches = async (req, res) => {
  const { uid, skills } = req.body;

  if (!uid || !skills || !Array.isArray(skills)) {
    return res.status(400).json({ message: 'uid and skills array required' });
  }

  try {
    const snapshot = await db.collection('users').get();
    const matches = [];

    snapshot.forEach(doc => {
      const user = doc.data();
      if (doc.id !== uid && Array.isArray(user.skills)) {
        const commonSkills = user.skills.filter(skill => skills.includes(skill));
        if (commonSkills.length > 0) {
          matches.push({
            uid: doc.id,
            skills: user.skills,
            availability: user.availability,
            commonSkills,
          });
        }
      }
    });

    res.status(200).json({ matches });
  } catch (err) {
    console.error('Error finding matches:', err.message);
    res.status(500).json({ message: 'Failed to find matches' });
  }
};
