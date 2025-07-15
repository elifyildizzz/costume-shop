import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Costumes listesi' });
});

export default router;
