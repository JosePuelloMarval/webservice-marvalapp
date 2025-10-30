import { Router } from 'express';

import { createProperty } from '../../controllers/propertyController/CreateProperty';
import { allProperty } from '../../controllers/propertyController/AllProperty';
import { getPropertyById } from '../../controllers/propertyController/GetPropertyById';
import { requireAuth } from '../../middlewares/requireAuth';

const router = Router();

router.post('/create-account-status', requireAuth, createProperty);
router.get('/get-all-account-status', requireAuth, allProperty);
router.get('/get-account-status-by-id/:id', requireAuth, getPropertyById);

export default router;
