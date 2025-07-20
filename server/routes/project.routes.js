import express from 'express';
import { createTask, getTasks, updateTaskStatus } from '../controllers/project.controller.js';

const router = express.Router();

router.post('/tasks', createTask);
router.get('/tasks/:userId', getTasks);
router.put('/tasks/:taskId', updateTaskStatus);

export default router;
