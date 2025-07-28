import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { ItemController } from '../controllers/ItemController';
import { validateItem } from '../middleware/validate';
import authenticate from '../middleware/authenticate';

const router = Router();
const ctrl = new ItemController();

router.use(authenticate);

router.get('/', expressAsyncHandler(ctrl.getAll.bind(ctrl)));

router.post('/', validateItem, expressAsyncHandler(ctrl.add.bind(ctrl)));
router.put('/:id', validateItem, expressAsyncHandler(ctrl.update.bind(ctrl)));
router.delete('/:id', expressAsyncHandler(ctrl.remove.bind(ctrl)));
router.get('/search', expressAsyncHandler(ctrl.search.bind(ctrl)));
router.get('/report', expressAsyncHandler(ctrl.report.bind(ctrl)));

export default router;
