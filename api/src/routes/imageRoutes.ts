import { Router } from 'express';
import { uploadImgController } from '../controllers/uploadImgController';
import { validadeImg } from '../middlewares/validateImg';

const router = Router();

router.post('/upload', validadeImg, uploadImgController);

export default router;