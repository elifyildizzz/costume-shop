import { Router } from 'express';
const router = Router();

router.get('/test', (req, res) => {
  res.send('Auth route çalışıyor');
});

export default router;
