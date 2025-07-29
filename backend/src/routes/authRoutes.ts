import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { register, login } from '../controllers/AuthController';
import { validateAuth } from '../middleware/validate';

const router = Router();

router.post('/register', validateAuth, expressAsyncHandler(register));
router.post('/login', validateAuth, expressAsyncHandler(login));


export default router;