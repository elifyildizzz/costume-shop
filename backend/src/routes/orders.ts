import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Orders listesi' });
});

export default router;
