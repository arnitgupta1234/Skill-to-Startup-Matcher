import express from 'express';
import { findMatches } from '../controllers/match.controller.js';

const router = express.Router();

router.post('/find', findMatches); // POST /api/match/find

export default router;
