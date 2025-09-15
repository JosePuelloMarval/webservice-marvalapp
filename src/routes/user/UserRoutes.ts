import { Router } from 'express';

import { allUsers } from '../../controllers/userController/Alluser';
import { getUserById } from '../../controllers/userController/GetUserById';
import { createUser } from '../../controllers/userController/CreateUser';
import { updateUser } from '../../controllers/userController/UpdateUser';
import { createRole } from '../../controllers/userController/CreateRoleController';
import { requireAuth } from '../../middlewares/requireAuth';
const router = Router();

router.get('/all-user', requireAuth, allUsers);
router.get('/:id', requireAuth, getUserById);
router.post('/create-user', createUser);
router.put('/:id', requireAuth, updateUser);
router.post('/create-role', createRole);

export default router;
