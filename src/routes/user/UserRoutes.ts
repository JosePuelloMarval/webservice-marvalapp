import { Router } from "express";

import { allUsers } from "../../controllers/userController/Alluser";
import { getUserById } from "../../controllers/userController/GetUserById";
import { createUser} from "../../controllers/userController/CreateUser";
import { updateUser} from "../../controllers/userController/UpdateUser";
import { createRole } from "../../controllers/userController/CreateRoleController";

const router = Router()

router.get("/all-user", allUsers);
router.get("/:id", getUserById);
router.post("/create-user", createUser);
router.put("/:id", updateUser);
router.post("/create-role", createRole);

export default router;
