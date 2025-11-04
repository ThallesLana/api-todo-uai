import { Router } from 'express';
import { InfoController } from '@/controllers/info.controller.js';

const router = Router();

router.get('/', InfoController.info);
router.get('/health', InfoController.healthCheck);

export default router;
