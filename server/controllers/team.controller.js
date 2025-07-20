import { db } from '../config/firebaseAdmin.js';

// Send a request
export const sendRequest = async (req, res) => {
  const { fromUid, toUid } = req.body;

  if (!fromUid || !toUid) {
    return res.status(400).json({ message: 'Both fromUid and toUid are required' });
  }

  try {
    await db.collection('teamRequests').add({
      fromUid,
      toUid,
      status: 'pending',
      createdAt: new Date(),
    });

    res.status(200).json({ message: 'Request sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send request', error: error.message });
  }
};

// Accept or reject request
export const updateRequestStatus = async (req, res) => {
  const { requestId, status } = req.body;

  if (!requestId || !['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Valid requestId and status are required' });
  }

  try {
    await db.collection('teamRequests').doc(requestId).update({ status });
    res.status(200).json({ message: `Request ${status}` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update request', error: error.message });
  }
};

// Fetch received requests
export const getReceivedRequests = async (req, res) => {
  const { uid } = req.params;

  try {
    const snapshot = await db.collection('teamRequests')
      .where('toUid', '==', uid)
      .get();

    const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ requests });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch requests', error: err.message });
  }
};

// Fetch accepted teammates
export const getTeammates = async (req, res) => {
  const { uid } = req.params;

  try {
    const snapshot = await db.collection('teamRequests')
      .where('status', '==', 'accepted')
      .where('fromUid', '==', uid)
      .get();

    const teammates = snapshot.docs.map(doc => doc.data().toUid);
    res.status(200).json({ teammates });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch teammates', error: err.message });
  }
};
