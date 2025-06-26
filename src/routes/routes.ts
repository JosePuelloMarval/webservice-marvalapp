import { Router } from "express";

import { loginHandler } from "../controllers/authController/authController";
import { requireAuth } from "../middlewares/requireAuth";
import Usuario from "./user/UserRoutes";
import RealState from "./realstate/RealStateRoutes";

const router = Router()

router.post('/login', loginHandler);

router.use("/users", Usuario);
router.use("/projects", RealState);

export default router;
