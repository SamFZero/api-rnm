import { Router } from 'express';
import { saveQR, getAllQRs, syncQRs } from '../controllers/qr.js';

const router = Router();

router.post('/', saveQR);
router.get('/', getAllQRs);
router.post('/sync', syncQRs);

export default router;