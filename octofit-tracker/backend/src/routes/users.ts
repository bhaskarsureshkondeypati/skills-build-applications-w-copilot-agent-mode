import { Router } from 'express';

const router = Router();

// List users (placeholder)
router.get('/', async (req, res) => {
  res.json([]);
});

// Create user (placeholder)
router.post('/', async (req, res) => {
  const { name } = req.body;
  res.status(201).json({ id: Date.now().toString(), name });
});

export default router;
