import express from 'express';
import { saveUserSkills, getUserSkills } from '../controllers/skills.controller.js';

const router = express.Router();

router.post('/save', saveUserSkills);
router.get('/:uid', getUserSkills);

export default router;
