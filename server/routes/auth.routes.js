// server/routes/auth.routes.js
import express from 'express';
import { verifyUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/verify', verifyUser);

export default router;
