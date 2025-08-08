import { Router } from "express";

import { allUsers } from "../../controllers/userController/Alluser";
import { getUserById } from "../../controllers/userController/GetUserById";
import { createUser} from "../../controllers/userController/CreateUser";
import { updateUser} from "../../controllers/userController/UpdateUser";
import { createRole } from "../../controllers/userController/CreateRoleController";
import { requireAuth } from "../../middlewares/requireAuth";
const router = Router()

router.get("/all-user", allUsers, requireAuth);
router.get("/:id", getUserById, requireAuth);
router.post("/create-user", createUser, requireAuth);
router.put("/:id", updateUser, requireAuth);
router.post("/create-role", createRole, requireAuth);

export default router;
