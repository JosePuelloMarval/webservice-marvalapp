import { Router } from "express";

import { allUsers } from "../../controllers/userController/Alluser";
import { getUserById } from "../../controllers/userController/GetUserById";
import { createUser} from "../../controllers/userController/CreateUser";
import { updateUser} from "../../controllers/userController/UpdateUser";

const router = Router()

router.get("/", allUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);

export default router;
