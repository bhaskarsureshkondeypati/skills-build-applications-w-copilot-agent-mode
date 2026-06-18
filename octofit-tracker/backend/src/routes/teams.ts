import { Router } from 'express';

const router = Router();

// List teams
router.get('/', async (req, res) => {
  res.json([]);
});

// Create team
router.post('/', async (req, res) => {
  const { name } = req.body;
  res.status(201).json({ id: Date.now().toString(), name });
});

export default router;
