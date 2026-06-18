import { Router } from 'express';

const router = Router();

// Simple leaderboard placeholder
router.get('/', async (req, res) => {
  res.json({ leaderboard: [] });
});

export default router;
