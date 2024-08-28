import { Router } from 'express';
import { uploadImgController } from '../controllers/uploadImgController';

const router = Router();

router.post('/upload', uploadImgController);

export default router;