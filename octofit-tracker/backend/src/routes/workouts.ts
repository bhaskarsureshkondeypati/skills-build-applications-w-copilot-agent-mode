import { Router } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const items = await Workout.find().sort({ createdAt: -1 }).exec();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'failed to load workouts' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, duration, calories } = req.body;
    const w = new Workout({ title, duration, calories });
    await w.save();
    res.status(201).json(w);
  } catch (err) {
    res.status(500).json({ error: 'failed to create workout' });
  }
});

export default router;
