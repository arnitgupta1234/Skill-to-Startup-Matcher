// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js'; 
import skillsRoutes from './routes/skills.routes.js';
import matchRoutes from './routes/match.routes.js';
import teamRoutes from './routes/team.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Mount auth routes
app.use('/api/auth', authRoutes);  
app.use('/api/skills', skillsRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/team', teamRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
