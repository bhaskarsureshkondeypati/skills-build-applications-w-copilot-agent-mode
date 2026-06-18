import { Router } from 'express';

const router = Router();

// List activities
router.get('/', async (req, res) => {
  res.json([]);
});

// Create activity
router.post('/', async (req, res) => {
  const { type, duration } = req.body;
  res.status(201).json({ id: Date.now().toString(), type, duration });
});

export default router;
