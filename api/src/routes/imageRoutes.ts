import { Router } from 'express';
import { uploadImgController } from '../controllers/uploadImgController';
import { validadeImg } from '../middlewares/validateImg';
import { validateLeitura } from '../middlewares/leitura';

const router = Router();

router.post('/upload', validadeImg, validateLeitura, uploadImgController);

export default router;