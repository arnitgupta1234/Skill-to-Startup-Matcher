import express from 'express';
import {
  sendRequest,
  updateRequestStatus,
  getReceivedRequests,
  getTeammates
} from '../controllers/team.controller.js';

const router = express.Router();

router.post('/send', sendRequest);               // POST /api/team/send
router.patch('/status', updateRequestStatus);    // PATCH /api/team/status
router.get('/received/:uid', getReceivedRequests); // GET /api/team/received/:uid
router.get('/teammates/:uid', getTeammates);     // GET /api/team/teammates/:uid

export default router;
